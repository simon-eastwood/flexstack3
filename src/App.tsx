import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import 'flexlayout-react/style/light.css'

import { Layout, Model, TabNode, Action, DockLocation, TabSetNode, RowNode, Orientation } from 'flexlayout-react';

import { addTabset, analyseModel, equaliseWidth } from './FlexModelUtils';


import { loadTemplateModel } from './LoadTemplate'
import { IAnalyzedModel } from './types';

const MAXTABSETS = 6;


function App() {
  // currentModel is what we're currently rendering.
  // If we need to alter the layout due to size restrictions, the previous state is saved in "stashedModels" so that it can be restored later
  const [currentModel, setCurrentModel] = useState<IAnalyzedModel>(() => {
    return loadTemplateModel()
  });

  useEffect(() => {
    currentModel.model.setOnAllowDrop((dragNode, dropInfo) => {
 /*      if (dropInfo.location === DockLocation.BOTTOM || dropInfo.location === DockLocation.TOP) {
        // blocking drop on bottom / top to avoid complications with setting width for layouts with multi horz rows
        return false;
      } else */ if ((dropInfo.location === DockLocation.LEFT || dropInfo.location === DockLocation.RIGHT) && currentModel.nrOfHorizontalTabsets >= MAXTABSETS) {
        return false;
      }

      return true;

    });
  }, [currentModel]);


  const [maxPanels, setMaxPanels] = useState(1);



  const factory = (node: TabNode) => {
    var component = node.getComponent();
    if (component === "text") {
      return <div dangerouslySetInnerHTML={{ __html: node.getConfig().uri }} />
    } else if (component === "pdf") {
      const iStyles = {
        height: '99%',
        width: '99%',
        overflow: 'hidden',
        border: 'none'
      }
      const cont = {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      }
      return <div style={cont}>  <iframe src={node.getConfig().uri} className="invisible-scrollbar" style={iStyles} scrolling="no" /> </div>
    } else if (component === "image") {
      const s = {
        height: '99%',
        width: '99%'
      }
      return <img src={node.getConfig().uri} style={s} />
    } else if (component === "123check") {
      const s = {
        width: '1200px',
        height: '1000px'
      }
      return <img src={node.getConfig().uri} style={s} />
    }
  }

  const interceptAction = (action: Action) => {

    // when tabs are moved by the user, this can lead to a "divide" whereby a new tabset is created automatically for the tab
    // this new tabset will not have a minimum size and so this needs to be set
    // also for deletion of tabs or addition of nodes, the size may be impacted
    // setTimeout(() => {
    //   setCurrentModel(analyseModel(currentModel.model, true /* update min sizes if needed*/));
    // }, 100);

    return action;
  }

  const loadPanels = (event: any) => {
    setMaxPanels(parseInt(event.target.value));
    setCurrentModel(loadTemplateModel(parseInt(event.target.value)));
  }



  const modelChanged = (model: Model) => {
    setCurrentModel(analyseModel(currentModel.model, false /* avoid infintie loop*/))
  }

  const add = () => {

    if (MAXTABSETS > currentModel.nrOfHorizontalTabsets) {
      addTabset(currentModel);
    }

  }

  const equalise = () => {
    equaliseWidth(currentModel);
  }

  const disabled = (MAXTABSETS <= currentModel.nrOfHorizontalTabsets);

  return (
    <div className="outer">
      <button onClick={add} disabled={disabled}>
        Add Tabset
      </button>
      <button onClick={equalise} >
        Equalize Width
      </button>
      <span>
        &nbsp;&nbsp;&nbsp;Number of horizontal tabsets: {currentModel.nrOfHorizontalTabsets}&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      <span>
        {(MAXTABSETS <= currentModel.nrOfHorizontalTabsets) ? "MAXIMUM REACHED" : ""}
      </span>
      <div className="inner" >
        {currentModel && (
          <Layout
            onAction={interceptAction}
            onModelChange={modelChanged}
            model={currentModel.model}
            factory={factory} />)}
      </div>
    </div>

  );
}

export default App;
