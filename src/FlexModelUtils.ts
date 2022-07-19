import { Model, TabNode, TabSetNode, Orientation, Actions, Action, Node as FLNode, DockLocation, RowNode } from 'flexlayout-react';
import { IAnalyzedModel, IDimensions } from './types';

interface IConfig {
    width: number | undefined,
    minWidth: number | undefined,
    panelPreferences: number[],
    preferredWidth: number | undefined,
    nrOfHTabsets:number | undefined
}


// typesafe access to avoid typos in code
const getConfig = (tab: FLNode): IConfig => {
    if (tab.getType() === TabNode.TYPE) {
        return (tab as TabSetNode).getConfig() as IConfig;
    } else {
        throw Error(`Node ${tab.getId()} is not a tab and so does not have config`)
    }
}

// return the max, taking into account that either or both might be undefined
const max = (dimension1: number | undefined, dimension2: number | undefined): number | undefined => {
    let result = Math.max(dimension1!, dimension2!);
    if (isNaN(result)) {
        if (dimension1) return dimension1;
        if (dimension2) return dimension2;
        return undefined
    } else {
        return result;
    }
}


const setTabSetSize = (tabset: TabSetNode, updateIfNeeded: boolean, safeToSetWidth: boolean = false): IDimensions => {
    const result: IDimensions = {
        minWidth: undefined,
        preferredWidth: undefined,
        width: undefined
    };

    // iterate through the tabs to get sizes
    tabset.getChildren().forEach(node => {
        if (node.getType() !== TabNode.TYPE) {
            throw Error("tabset has a child which is not a tab - this is not expected")
        }

        const tab = node as TabNode;

        result.minWidth = max(result.minWidth, getConfig(tab)?.minWidth);
        result.width = max(result.width, getConfig(tab)?.width);
        result.preferredWidth = max(result.preferredWidth, getConfig(tab)?.preferredWidth);
    })

    if (!result.preferredWidth) {
        if (result.width) {
            result.preferredWidth = result.width;
        } else {
            result.preferredWidth = result.minWidth;
        }
    }

    // to avoid infinite loops, updates cannot be done on model updates
    if (updateIfNeeded) {
        // only modify if different because this causes a model update which again causes analyse
        type Attrs = {
            minWidth?: number,
            width?: number
        };
        const attrs: Attrs = {};
        if (result.minWidth && result.minWidth > 0 && tabset.getMinWidth() !== result.minWidth) {
            attrs.minWidth = result.minWidth;
        }
        const currentWidth = tabset.getWidth();
        if (!safeToSetWidth && currentWidth) {
            // Reset the width or there will be layout problems
            attrs.width = 999999999;  // only way to clear an already-set width
        } else if (!currentWidth && safeToSetWidth && result.width && currentWidth !== result.width) {
            // if the current width is undefined (otherwise the user has set it and we'd better leave it alone)
            // and it is safe to set the width (there are other tabsets to use free space)
            // and there IS a width to set and its new
            // only then: set the width
            attrs.width = result.width;
        }


        // Now set the size information collated from the child tabs at the tabset level in the model
        if (Object.keys(attrs).length > 0) {
            const setSize = Actions.updateNodeAttributes(tabset.getId(), attrs);
            tabset.getModel().doAction(setSize);
        }
    }

    return result;
}

// returns preferred width (defaulting to the min width if there is no prefferd) of all tabsets in the row
const analyseRow = (row: RowNode, updateIfNeeded: boolean, safeToSetWidth: boolean = false): number => {
    let preferredWidth = 0;
    let setWidth = false;

    const tabsetChildren = row.getChildren().filter((node) => node.getType() === TabSetNode.TYPE);
    if (tabsetChildren.length >= 2 && updateIfNeeded && row.getOrientation() === Orientation.HORZ) {
        setWidth = true; // can only do this if there enough tabsets
    }

    row.getChildren().forEach(node => {
        if (node.getType() === TabSetNode.TYPE) {
            const ts = setTabSetSize(node as TabSetNode, updateIfNeeded, setWidth);

            if (row.getOrientation() === Orientation.HORZ) {
                preferredWidth += ts.preferredWidth ? ts.preferredWidth : ts.minWidth!;
            } else {
                preferredWidth = max(preferredWidth, ts.preferredWidth ? ts.preferredWidth : ts.minWidth)!;
            }
        } else if (node.getType() === RowNode.TYPE) {
            // recurse for child row
            const childRowPreferredWidth = analyseRow(node as RowNode, updateIfNeeded, setWidth);
            if (row.getOrientation() === Orientation.HORZ) {
                preferredWidth += childRowPreferredWidth;
            } else {
                preferredWidth = max(preferredWidth, childRowPreferredWidth)!;
            }
        }
    })

    return preferredWidth;
}


const analyseRowTabs = (row: RowNode): number => {
    let nrOfHTabSets = 0;
    console.log("analying row tabs")
    
    // for a vertial row, the nr Of tabsets = max of child rows and 1
    if (row.getOrientation() === Orientation.VERT) {
        nrOfHTabSets = 1;
    }

    row.getChildren().forEach(node => {
        if (node.getType() === TabSetNode.TYPE) {
            if (row.getOrientation() === Orientation.HORZ) {
                nrOfHTabSets++;
            } 
        } else if (node.getType() === RowNode.TYPE ) {
            // recurse for child row
            const childRowNrOfHTabSets = analyseRowTabs(node as RowNode);
            if (row.getOrientation() === Orientation.HORZ) {  
                nrOfHTabSets += childRowNrOfHTabSets;
            } else {
                // I'm a vertical row, so take the max of chilren
                console.log("Hit vertical row")
                nrOfHTabSets = max(nrOfHTabSets, childRowNrOfHTabSets)!;
            }
        }
    })

    return nrOfHTabSets;
}

export const analyseModel = (modelToAnalyse: Model, updateIfNeeded: boolean = true, alsoSetWidth: boolean = false): IAnalyzedModel => {

    // call analyze row with root
    const size = analyseRow(modelToAnalyse.getRoot(), updateIfNeeded, alsoSetWidth);

    const tabs = analyseRowTabs (modelToAnalyse.getRoot());

    const result: IAnalyzedModel = {
        model: modelToAnalyse,
        preferredWidth: size,
        nrOfHorizontalTabsets: tabs
    }

    console.log(result);
    return result;
}


export const cloneModel = (modelToClone: IAnalyzedModel): IAnalyzedModel => {
    let saveCurrentJson = modelToClone.model.toJson();
    let clone = { ...modelToClone };
    clone.model = Model.fromJson(saveCurrentJson);
    return clone;
}



// 1. find the tabsets within the model and put them into a map based on their panel number
// 2. for each panel, if its panel nr is larger than max panel then it needs to be deleted but not before...
// 3. ...moving its children to their preferred destination specified in panelPreferences.
// The child nodes are then moved to their new preferred / available panel
export const removeTabset = (model: Model, maxPanelNr?: number): Model => {
    let maxPanel = -1;
    const panels = new Map<number, TabSetNode>();


    // first find out how many tabsets there are in the model and collect them in a map. 
    let panelNr = 1;
    model.visitNodes((node) => {
        if (node.getType() === 'tabset') {
            const ts = node as TabSetNode;
            panels.set(panelNr++, ts);
        }
    });
    maxPanel = (maxPanelNr) ? maxPanelNr : panels.size;

    if (panels.size < 2) {
        // don't want to delete the last tabset, so bail out here
        return model;
    }

    // Now delete the top N tabsets
    // if this function is called without a maxPanelNr then that's just the last panel (e.g. 5)
    // if this function is called with a maxPanelNr (cos we're loading a template and the user only wants e.g. 2 panels) then that could be more than 1

    panels.forEach((ts, panelNr) => {
        if (panelNr >= maxPanel) {
            // move the children
            const childrenToMove = new Map<TabNode, Destination>();
            ts.getChildren().forEach((child) => {
                if (child.getType() === 'tab') {
                    const tab = child as TabNode;
                    childrenToMove.set(tab, tabToDestination(tab, maxPanel - 1));
                }
            })

            childrenToMove.forEach((dest, child) => {
                let p = panels.get(dest.destMajor);
                let mv;
                if (p) {
                    mv = Actions.moveNode(child.getId(), p!.getId(), DockLocation.CENTER, dest.destMinor - 1, (dest.destPref ? dest.destPref > 0 : false) /* +ve = selected */);
                } else {
                    // got to move it somewhere....then to root
                    mv = Actions.moveNode(child.getId(), model.getRoot().getId(), DockLocation.CENTER, - 1, false);
                }
                model.doAction(mv);
            })


            // delete the tabset. Actually an empty tabset will not be rendered
            // but this will confuse the task of finding next tab to remove
            // so better to clean up
            let del = Actions.deleteTabset(ts.getId());
            model.doAction(del);
        }
    })

    // With less tabsets, some other tabs might prefer to be moved
    reorderTabs(model);
    return model;
}

// move tabs if necessary so that they are all on their preferred panel, in the preferred order
const reorderTabs = (model: Model) => {
    const panels = new Map<number, TabSetNode>();

    // first find out how many tabsets there are in the model 
    let panelNr = 1;
    model.visitNodes((node) => {
        if (node.getType() === 'tabset') {
            const ts = node as TabSetNode;
            panels.set(panelNr++, ts);
        }
    });

    // Now iterate through the tabs and see where to move them
    const tabsToMove = new Map<TabNode, Destination>();
    model.visitNodes((node) => {
        if (node.getType() === 'tab') {
            tabsToMove.set(node as TabNode, tabToDestination(node as TabNode, panels.size));
        }
    });


    // now do the moves
    tabsToMove.forEach((dest, tab) => {
        let mv;

        if (dest.destMajor !== 0) {
            let p = panels.get(dest.destMajor);
            // tabOrder is the number after the decimal point
            if (p) {
                mv = Actions.moveNode(tab.getId(), p!.getId(), DockLocation.CENTER, dest.destMinor - 1, (dest.destPref ? dest.destPref > 0 : false) /* +ve = selected */);
                model.doAction(mv);
            }
        }

    })


}


// use tab config to see, for the given max panel, where the tab should go
type Destination = {
    destPref: number | undefined, // the original config value (can be negative or undefined)
    destMajor: number, // 0 means unknown destination
    destMinor: number
}
const tabToDestination = (tab: TabNode, maxPanel: number = 4): Destination => {
    let destPref;

    if (getConfig(tab)?.panelPreferences?.length >= maxPanel) {
        destPref = getConfig(tab).panelPreferences[maxPanel - 1];
        const destMajor = Math.floor(Math.abs(destPref));
        const destMinor = Math.round((Math.abs(destPref) === destMajor) ? 0 : (Math.abs(destPref) - destMajor) * 10);

        return {
            destPref,
            destMajor,
            destMinor
        }
    } else {
        return {
            destPref,
            destMajor: 0,
            destMinor: -1
        }
    }

}


export const addTabset = (m: IAnalyzedModel) => {
    console.log("ADDED")

     const a = Actions.addNode(  {type:"tab", component: "pdf", config:         {
            "type": "pdf",
            "uri": "https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",
            "title": "Nr 5",
            "doPrecheck": false,
            "panelPreferences": [-1.5, 2.1, 3.1, 4.1, 5.1]
        }},  m.model.getRoot().getId(), DockLocation.RIGHT, 0, true)

    m.model.doAction(a);
    

}

export const equaliseWidth = (m: IAnalyzedModel) => {
    console.log("Equalise");
    type Attrs = {
            weight?: number,
            width?: number
    };
    const attrs: Attrs = {};
    attrs.width = 999999999; // only way to clear an already-set width
    attrs.weight = 1;
  
    console.log ("Root orientation is" + m.model.getRoot().getOrientation() )
    m.model.visitNodes(node => {
        if (node.getType() === TabSetNode.TYPE && node.getParent()!.getType() === RowNode.TYPE) {
            const p = node.getParent()!;
          
            if (p.getType() === RowNode.TYPE) {
                if (p.getOrientation() === Orientation.HORZ && p.getChildren().length > 1) {
                              const setSize = Actions.updateNodeAttributes(node.getId(), attrs);
                    m.model.doAction(setSize);
                    console.log ("Setting size of " )
                } else {
                                    /* const setSize = Actions.updateNodeAttributes(node.getId(), attrs);
                    m.model.doAction(setSize); */
                    console.log("Not setting size of " + node.getId()); console.log(p.getOrientation()); 
                    console.log (m.model.toJson())
                }
            }
  
        }
    });

}