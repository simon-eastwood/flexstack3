(this.webpackJsonpflexstack3=this.webpackJsonpflexstack3||[]).push([[0],{36:function(e,t,n){},37:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var i=n(1),o=n.n(i),r=n(20),d=n.n(r),a=(n(36),n(25)),c=(n(37),n(38),n(0)),s=n(15),l=function(e){if(e.getType()===c.TabNode.TYPE)return e.getConfig();throw Error("Node ".concat(e.getId()," is not a tab and so does not have config"))},f=function(e,t){var n=Math.max(e,t);return isNaN(n)?e||(t||void 0):n},h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i={minWidth:void 0,preferredWidth:void 0,width:void 0};if(e.getChildren().forEach((function(e){var t,n,o;if(e.getType()!==c.TabNode.TYPE)throw Error("tabset has a child which is not a tab - this is not expected");var r=e;i.minWidth=f(i.minWidth,null===(t=l(r))||void 0===t?void 0:t.minWidth),i.width=f(i.width,null===(n=l(r))||void 0===n?void 0:n.width),i.preferredWidth=f(i.preferredWidth,null===(o=l(r))||void 0===o?void 0:o.preferredWidth)})),i.preferredWidth||(i.width?i.preferredWidth=i.width:i.preferredWidth=i.minWidth),t){var o={};i.minWidth&&i.minWidth>0&&e.getMinWidth()!==i.minWidth&&(o.minWidth=i.minWidth);var r=e.getWidth();if(!n&&r?o.width=999999999:!r&&n&&i.width&&r!==i.width&&(o.width=i.width),Object.keys(o).length>0){var d=c.Actions.updateNodeAttributes(e.getId(),o);e.getModel().doAction(d)}}return i},g=function e(t,n){var i=0,o=!1,r=t.getChildren().filter((function(e){return e.getType()===c.TabSetNode.TYPE}));return r.length>=2&&n&&t.getOrientation()===c.Orientation.HORZ&&(o=!0),t.getChildren().forEach((function(r){if(r.getType()===c.TabSetNode.TYPE){var d=h(r,n,o);t.getOrientation()===c.Orientation.HORZ?i+=d.preferredWidth?d.preferredWidth:d.minWidth:i=f(i,d.preferredWidth?d.preferredWidth:d.minWidth)}else if(r.getType()===c.RowNode.TYPE){var a=e(r,n,o);t.getOrientation()===c.Orientation.HORZ?i+=a:i=f(i,a)}})),i},u=function e(t){var n=0;return console.log("analying row tabs"),t.getChildren().forEach((function(t){t.getType()===c.TabSetNode.TYPE?n++:t.getType()===c.RowNode.TYPE&&(n+=e(t))})),n},p=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=g(e.getRoot(),t,n),o=u(e.getRoot()),r={model:e,preferredWidth:i,nrOfTabsets:o};return console.log(r),r},v=function(e,t){var n,i=new Map,o=1;return e.visitNodes((function(e){if("tabset"===e.getType()){var t=e;i.set(o++,t)}})),n=t||i.size,i.size<2||(i.forEach((function(t,o){if(o>=n){var r=new Map;t.getChildren().forEach((function(e){if("tab"===e.getType()){var t=e;r.set(t,m(t,n-1))}})),r.forEach((function(t,n){var o,r=i.get(t.destMajor);o=r?c.Actions.moveNode(n.getId(),r.getId(),c.DockLocation.CENTER,t.destMinor-1,!!t.destPref&&t.destPref>0):c.Actions.moveNode(n.getId(),e.getRoot().getId(),c.DockLocation.CENTER,-1,!1),e.doAction(o)}));var d=c.Actions.deleteTabset(t.getId());e.doAction(d)}})),b(e)),e},b=function(e){var t=new Map,n=1;e.visitNodes((function(e){if("tabset"===e.getType()){var i=e;t.set(n++,i)}}));var i=new Map;e.visitNodes((function(e){"tab"===e.getType()&&i.set(e,m(e,t.size))})),i.forEach((function(n,i){var o;if(0!==n.destMajor){var r=t.get(n.destMajor);r&&(o=c.Actions.moveNode(i.getId(),r.getId(),c.DockLocation.CENTER,n.destMinor-1,!!n.destPref&&n.destPref>0),e.doAction(o))}}))},m=function(e){var t,n,i,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;if((null===(t=l(e))||void 0===t||null===(n=t.panelPreferences)||void 0===n?void 0:n.length)>=o){i=l(e).panelPreferences[o-1];var r=Math.floor(Math.abs(i)),d=Math.round(Math.abs(i)===r?0:10*(Math.abs(i)-r));return{destPref:i,destMajor:r,destMinor:d}}return{destPref:i,destMajor:0,destMinor:-1}},w={id:"igra",bundle:[{type:"pdf",uri:"https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",title:"Communication",doPrecheck:!1,panelPreferences:[1.1,1.1,1.1,1.1,1.1]},{type:"pdf",uri:"https://ai.stanford.edu/~nilsson/MLBOOK.pdf#view=FitH",title:"Letter",doPrechack:!1,panelPreferences:[-1.3,-1.3,2.1,2.1,2.1]},{type:"pdf",uri:"https://patentimages.storage.googleapis.com/68/80/73/6a17a66e9ec8c5/US11107588.pdf#view=FitH",title:"Claims",doPrechack:!1,panelPreferences:[-1.4,-2.2,-3.2,3.1,3.1]},{type:"pdf",uri:"https://patentimages.storage.googleapis.com/68/80/73/6a17a66e9ec8c5/US11107588.pdf#view=FitH",title:"Orig Claims",doPrechack:!1,panelPreferences:[-1.2,-1.2,-1.2,-1.2,4.1]},{type:"pdf",uri:"https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",title:"Machine Learning",doPrecheck:!1,panelPreferences:[-1.5,2.1,3.1,4.1,5.1]}]},T={global:{rootOrientationVertical:!1,tabSetClassNameHeader:"MyTabsetClass"},layout:{type:"row",children:[{type:"tabset",selected:0,config:{name:"1"},children:[{name:"",type:"tab",component:"",enableClose:!1,config:{}}]},{type:"tabset",selected:0,config:{name:"2"},children:[{type:"tab",name:"",component:"",enableClose:!1,config:{}}]},{type:"tabset",selected:0,config:{name:"3"},children:[{type:"tab",name:"",component:"",enableClose:!1,config:{}}]},{type:"tabset",selected:0,config:{name:"4"},children:[{type:"tab",name:"",component:"",enableClose:!1,config:{}}]},{type:"tabset",selected:0,config:{name:"5"},children:[{type:"tab",name:"",component:"",enableClose:!0,config:{}}]}]}},y=function(e){var t=e.getComponent();return!t||0===t.length},O=function(e){var t,n=function(){var e=new Array,t=c.Model.fromJson(T);return t.visitNodes((function(t){if(t.getType()===c.TabNode.TYPE){var n=t;y(n)&&e.push(n)}})),w.bundle.forEach((function(n){var i=n.panelPreferences[e.length-1],o=Math.floor(Math.abs(i)),r=(Math.round(Math.abs(i)===o?0:10*(Math.abs(i)-o)),function(e){switch(e){case"pdf":return{minWidth:50,preferredWidth:void 0,width:void 0};case"123check":return{minWidth:774,preferredWidth:1280,width:1280};case"image":return{minWidth:250,preferredWidth:void 0,width:void 0};default:return{minWidth:void 0,preferredWidth:void 0,width:void 0}}}(n.type)),d=e[0];o<=e.length&&(d=e[o-1]);var a=Object(s.a)(Object(s.a)(Object(s.a)({},d.getConfig()),r),n),l={name:n.title,component:n.type,config:a},f=c.Actions.updateNodeAttributes(d.getId(),l);t.doAction(f)})),e.forEach((function(e){return console.log(e)})),t}(),i=n;if(console.log("loading model"),e)i=v(n,e+1),t=p(i,!0,!0);else{t=p(n,!0,!0);var o=0;for(t.model.visitNodes((function(e){e.getType()===c.TabSetNode.TYPE&&o++}));o>1&&200<t.preferredWidth;)i=v(t.model,o),t=p(i,!0,!0),o--}return function(e){var t=new Array;console.log("deleting"),e.visitNodes((function(e){e.getType()===c.TabNode.TYPE&&y(e)&&t.push(c.Actions.deleteTab(e.getId()))})),t.forEach((function(t){return e.doAction(t)}))}(t.model),t},j=n(2);var M=function(){var e=Object(i.useState)((function(){return O()})),t=Object(a.a)(e,2),n=t[0],o=t[1];Object(i.useEffect)((function(){n.model.setOnAllowDrop((function(e,t){return t.location!==c.DockLocation.LEFT&&t.location!==c.DockLocation.RIGHT||!(n.nrOfTabsets>=6)}))}),[n]);var r=Object(i.useState)(1),d=Object(a.a)(r,2),s=(d[0],d[1],6<=n.nrOfTabsets);return Object(j.jsxs)("div",{className:"outer",children:[Object(j.jsx)("button",{onClick:function(){6>n.nrOfTabsets&&function(e){var t,n=c.Actions.addNode({type:"tab",component:"pdf",config:{type:"pdf",uri:"https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",title:"ML",doPrecheck:!1,panelPreferences:[-1.5,2.1,3.1,4.1,5.1]}},e.model.getRoot().getId(),c.DockLocation.RIGHT,0,!0),i=e.model.doAction(n);if(console.log(i),(null===i||void 0===i||null===(t=i.getParent())||void 0===t?void 0:t.getType())===c.TabSetNode.TYPE){var o,r=c.Actions.updateNodeAttributes(""+(null===i||void 0===i||null===(o=i.getParent())||void 0===o?void 0:o.getId()),{config:{name:""+(e.nrOfTabsets+1)}});e.model.doAction(r)}}(n)},disabled:s,children:"Add Tabset"}),Object(j.jsx)("button",{onClick:function(){!function(e){console.log("Equalise");var t={width:999999999,weight:1};console.log("Root orientation is"+e.model.getRoot().getOrientation()),e.model.visitNodes((function(n){if(n.getType()===c.TabSetNode.TYPE||n.getType()===c.RowNode.TYPE){var i=c.Actions.updateNodeAttributes(n.getId(),t);e.model.doAction(i)}}))}(n)},children:"Equalize"}),Object(j.jsxs)("span",{children:["\xa0\xa0\xa0Number of tabsets: ",n.nrOfTabsets,"\xa0\xa0\xa0\xa0"]}),Object(j.jsx)("span",{children:6<=n.nrOfTabsets?"MAXIMUM REACHED":""}),Object(j.jsx)("div",{className:"inner",children:n&&Object(j.jsx)(c.Layout,{onAction:function(e){return e},onModelChange:function(e){o(p(n.model,!1))},onRenderTabSet:function(e,t){var n,i=null===(n=e.getConfig())||void 0===n?void 0:n.name;t.buttons.push(Object(j.jsx)("span",{children:i||"0"}))},model:n.model,factory:function(e){var t=e.getComponent();if("text"===t)return Object(j.jsx)("div",{dangerouslySetInnerHTML:{__html:e.getConfig().uri}});if("pdf"===t){return Object(j.jsxs)("div",{style:{height:"100%",width:"100%",overflow:"hidden"},children:["  ",Object(j.jsx)("iframe",{src:e.getConfig().uri,className:"invisible-scrollbar",style:{height:"99%",width:"99%",overflow:"hidden",border:"none"},scrolling:"no"})," "]})}if("image"===t){return Object(j.jsx)("img",{src:e.getConfig().uri,style:{height:"99%",width:"99%"}})}if("123check"===t){return Object(j.jsx)("img",{src:e.getConfig().uri,style:{width:"1200px",height:"1000px"}})}}})})]})};d.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(M,{})}),document.getElementById("container"))}},[[56,1,2]]]);
//# sourceMappingURL=main.10c6a147.chunk.js.map