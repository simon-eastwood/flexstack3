(this.webpackJsonpflexstack3=this.webpackJsonpflexstack3||[]).push([[0],{36:function(e,t,o){},37:function(e,t,o){},56:function(e,t,o){"use strict";o.r(t);var n=o(1),i=o.n(n),r=o(20),d=o.n(r),a=(o(36),o(25)),c=(o(37),o(38),o(0)),s=o(15),l=function(e){if(e.getType()===c.TabNode.TYPE)return e.getConfig();throw Error("Node ".concat(e.getId()," is not a tab and so does not have config"))},f=function(e,t){var o=Math.max(e,t);return isNaN(o)?e||(t||void 0):o},h=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n={minWidth:void 0,preferredWidth:void 0,width:void 0};if(e.getChildren().forEach((function(e){var t,o,i;if(e.getType()!==c.TabNode.TYPE)throw Error("tabset has a child which is not a tab - this is not expected");var r=e;n.minWidth=f(n.minWidth,null===(t=l(r))||void 0===t?void 0:t.minWidth),n.width=f(n.width,null===(o=l(r))||void 0===o?void 0:o.width),n.preferredWidth=f(n.preferredWidth,null===(i=l(r))||void 0===i?void 0:i.preferredWidth)})),n.preferredWidth||(n.width?n.preferredWidth=n.width:n.preferredWidth=n.minWidth),t){var i={};n.minWidth&&n.minWidth>0&&e.getMinWidth()!==n.minWidth&&(i.minWidth=n.minWidth);var r=e.getWidth();if(!o&&r?i.width=999999999:!r&&o&&n.width&&r!==n.width&&(i.width=n.width),Object.keys(i).length>0){var d=c.Actions.updateNodeAttributes(e.getId(),i);e.getModel().doAction(d)}}return n},g=function e(t,o){var n=0,i=!1,r=t.getChildren().filter((function(e){return e.getType()===c.TabSetNode.TYPE}));return r.length>=2&&o&&t.getOrientation()===c.Orientation.HORZ&&(i=!0),t.getChildren().forEach((function(r){if(r.getType()===c.TabSetNode.TYPE){var d=h(r,o,i);t.getOrientation()===c.Orientation.HORZ?n+=d.preferredWidth?d.preferredWidth:d.minWidth:n=f(n,d.preferredWidth?d.preferredWidth:d.minWidth)}else if(r.getType()===c.RowNode.TYPE){var a=e(r,o,i);t.getOrientation()===c.Orientation.HORZ?n+=a:n=f(n,a)}})),n},p=function e(t){var o=0;return console.log("analying row tabs"),t.getOrientation()===c.Orientation.VERT&&(o=1),t.getChildren().forEach((function(n){if(n.getType()===c.TabSetNode.TYPE)t.getOrientation()===c.Orientation.HORZ&&o++;else if(n.getType()===c.RowNode.TYPE){var i=e(n);t.getOrientation()===c.Orientation.HORZ?o+=i:(console.log("Hit vertical row"),o=f(o,i))}})),o},u=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=g(e.getRoot(),t,o),i=p(e.getRoot()),r={model:e,preferredWidth:n,nrOfHorizontalTabsets:i};return console.log(r),r},v=function(e,t){var o,n=new Map,i=1;return e.visitNodes((function(e){if("tabset"===e.getType()){var t=e;n.set(i++,t)}})),o=t||n.size,n.size<2||(n.forEach((function(t,i){if(i>=o){var r=new Map;t.getChildren().forEach((function(e){if("tab"===e.getType()){var t=e;r.set(t,m(t,o-1))}})),r.forEach((function(t,o){var i,r=n.get(t.destMajor);i=r?c.Actions.moveNode(o.getId(),r.getId(),c.DockLocation.CENTER,t.destMinor-1,!!t.destPref&&t.destPref>0):c.Actions.moveNode(o.getId(),e.getRoot().getId(),c.DockLocation.CENTER,-1,!1),e.doAction(i)}));var d=c.Actions.deleteTabset(t.getId());e.doAction(d)}})),b(e)),e},b=function(e){var t=new Map,o=1;e.visitNodes((function(e){if("tabset"===e.getType()){var n=e;t.set(o++,n)}}));var n=new Map;e.visitNodes((function(e){"tab"===e.getType()&&n.set(e,m(e,t.size))})),n.forEach((function(o,n){var i;if(0!==o.destMajor){var r=t.get(o.destMajor);r&&(i=c.Actions.moveNode(n.getId(),r.getId(),c.DockLocation.CENTER,o.destMinor-1,!!o.destPref&&o.destPref>0),e.doAction(i))}}))},m=function(e){var t,o,n,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;if((null===(t=l(e))||void 0===t||null===(o=t.panelPreferences)||void 0===o?void 0:o.length)>=i){n=l(e).panelPreferences[i-1];var r=Math.floor(Math.abs(n)),d=Math.round(Math.abs(n)===r?0:10*(Math.abs(n)-r));return{destPref:n,destMajor:r,destMinor:d}}return{destPref:n,destMajor:0,destMinor:-1}},w={id:"igra",bundle:[{type:"pdf",uri:"https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",title:"Communication",doPrecheck:!1,panelPreferences:[1.1,1.1,1.1,1.1,1.1]},{type:"pdf",uri:"https://ai.stanford.edu/~nilsson/MLBOOK.pdf#view=FitH",title:"Letter",doPrechack:!1,panelPreferences:[-1.3,-1.3,2.1,2.1,2.1]},{type:"pdf",uri:"https://patentimages.storage.googleapis.com/68/80/73/6a17a66e9ec8c5/US11107588.pdf#view=FitH",title:"Claims",doPrechack:!1,panelPreferences:[-1.4,-2.2,-3.2,3.1,3.1]},{type:"pdf",uri:"https://patentimages.storage.googleapis.com/68/80/73/6a17a66e9ec8c5/US11107588.pdf#view=FitH",title:"Nr 4",doPrechack:!1,panelPreferences:[-1.2,-1.2,-1.2,-1.2,4.1]},{type:"pdf",uri:"https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",title:"Nr 5",doPrecheck:!1,panelPreferences:[-1.5,2.1,3.1,4.1,5.1]}]},T={global:{rootOrientationVertical:!1},layout:{type:"row",children:[{type:"tabset",selected:0,children:[{name:"",type:"tab",component:"",enableClose:!1,config:{}}]},{type:"tabset",selected:0,children:[{type:"tab",name:"",component:"",enableClose:!1,config:{}}]},{type:"tabset",selected:0,children:[{type:"tab",name:"",component:"",enableClose:!1,config:{}}]},{type:"tabset",selected:0,children:[{type:"tab",name:"",component:"",enableClose:!1,config:{}}]},{type:"tabset",selected:0,children:[{type:"tab",name:"",component:"",enableClose:!0,config:{}}]}]}},O=function(e){var t=e.getComponent();return!t||0===t.length},y=function(e){var t,o=function(){var e=new Array,t=c.Model.fromJson(T);return t.visitNodes((function(t){if(t.getType()===c.TabNode.TYPE){var o=t;O(o)&&e.push(o)}})),w.bundle.forEach((function(o){var n=o.panelPreferences[e.length-1],i=Math.floor(Math.abs(n)),r=(Math.round(Math.abs(n)===i?0:10*(Math.abs(n)-i)),function(e){switch(e){case"pdf":return{minWidth:50,preferredWidth:void 0,width:void 0};case"123check":return{minWidth:774,preferredWidth:1280,width:1280};case"image":return{minWidth:250,preferredWidth:void 0,width:void 0};default:return{minWidth:void 0,preferredWidth:void 0,width:void 0}}}(o.type)),d=e[0];i<=e.length&&(d=e[i-1]);var a=Object(s.a)(Object(s.a)(Object(s.a)({},d.getConfig()),r),o),l={name:o.title,component:o.type,config:a},f=c.Actions.updateNodeAttributes(d.getId(),l);t.doAction(f)})),e.forEach((function(e){return console.log(e)})),t}(),n=o;if(console.log("loading model"),e)n=v(o,e+1),t=u(n,!0,!0);else{t=u(o,!0,!0);var i=0;for(t.model.visitNodes((function(e){e.getType()===c.TabSetNode.TYPE&&i++}));i>1&&200<t.preferredWidth;)n=v(t.model,i),t=u(n,!0,!0),i--}return function(e){var t=new Array;console.log("deleting"),e.visitNodes((function(e){e.getType()===c.TabNode.TYPE&&O(e)&&t.push(c.Actions.deleteTab(e.getId()))})),t.forEach((function(t){return e.doAction(t)}))}(t.model),t},j=o(3);var N=function(){var e=Object(n.useState)((function(){return y()})),t=Object(a.a)(e,2),o=t[0],i=t[1],r=Object(n.useState)(1),d=Object(a.a)(r,2),s=(d[0],d[1],function(e){console.log("setting onAllowDrop"),e.model.setOnAllowDrop((function(t,o){o.node;return o.location===c.DockLocation.BOTTOM||o.location===c.DockLocation.TOP?(console.log("blocking drop on bottom / top to avoid complications with setting width"),!1):o.location!==c.DockLocation.LEFT&&o.location!==c.DockLocation.RIGHT||!(e.nrOfHorizontalTabsets>=6)})),i(e)}),l=6<=o.nrOfHorizontalTabsets;return Object(j.jsxs)("div",{className:"outer",children:[Object(j.jsx)("button",{onClick:function(){6>o.nrOfHorizontalTabsets&&function(e){console.log("ADDED");var t=c.Actions.addNode({type:"tab",component:"pdf",config:{type:"pdf",uri:"https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",title:"Nr 5",doPrecheck:!1,panelPreferences:[-1.5,2.1,3.1,4.1,5.1]}},e.model.getRoot().getId(),c.DockLocation.RIGHT,0,!0);e.model.doAction(t)}(o)},disabled:l,children:"Add Tabset"}),Object(j.jsx)("button",{onClick:function(){!function(e){console.log("Equalise");var t={width:999999999,weight:1};console.log("Root orientation is"+e.model.getRoot().getOrientation()),e.model.visitNodes((function(o){if(o.getType()===c.TabSetNode.TYPE&&o.getParent().getType()===c.RowNode.TYPE){var n=o.getParent();if(n.getType()===c.RowNode.TYPE)if(n.getOrientation()===c.Orientation.HORZ&&n.getChildren().length>1){var i=c.Actions.updateNodeAttributes(o.getId(),t);e.model.doAction(i),console.log("Setting size of ")}else console.log("Not setting size of "+o.getId()),console.log(n.getOrientation()),console.log(e.model.toJson())}}))}(o)},children:"Equalize Width"}),Object(j.jsxs)("span",{children:["\xa0\xa0\xa0Number of horizontal tabsets: ",o.nrOfHorizontalTabsets,"\xa0\xa0\xa0\xa0"]}),Object(j.jsx)("span",{children:6<=o.nrOfHorizontalTabsets?"MAXIMUM REACHED":""}),Object(j.jsx)("div",{className:"inner",children:o&&Object(j.jsx)(c.Layout,{onAction:function(e){return e},onModelChange:function(e){s(u(o.model,!1))},model:o.model,factory:function(e){var t=e.getComponent();if("text"===t)return Object(j.jsx)("div",{dangerouslySetInnerHTML:{__html:e.getConfig().uri}});if("pdf"===t){return Object(j.jsxs)("div",{style:{height:"100%",width:"100%",overflow:"hidden"},children:["  ",Object(j.jsx)("iframe",{src:e.getConfig().uri,className:"invisible-scrollbar",style:{height:"99%",width:"99%",overflow:"hidden",border:"none"},scrolling:"no"})," "]})}if("image"===t){return Object(j.jsx)("img",{src:e.getConfig().uri,style:{height:"99%",width:"99%"}})}if("123check"===t){return Object(j.jsx)("img",{src:e.getConfig().uri,style:{width:"1200px",height:"1000px"}})}}})})]})};d.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(N,{})}),document.getElementById("container"))}},[[56,1,2]]]);
//# sourceMappingURL=main.baf1e047.chunk.js.map