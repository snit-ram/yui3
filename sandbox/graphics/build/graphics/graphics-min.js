YUI.add("graphics",function(D){function B(E){this._config=E;B.superclass.constructor.apply(this,arguments);}B.NAME="graphics";B.ATTRS={engine:{getter:function(){return this._engine;},validator:function(E){return(E=="canvas"||E=="vml");},setter:function(E){this._engine=this._getAPI(E);return this._engine;}}};D.extend(B,D.Base,{_config:null,_engine:null,_getAPI:function(G){var F,E=this._config;switch(G){case"canvas":F=new D.CanvasAPI(E);break;case"vml":F=new D.VMLAPI(E);break;}return F;},beginFill:function(E,F){var G=this.get("engine");return G.beginFill.apply(G,arguments);},beginGradientFill:function(K,E,F,I,M,L,N,H,J){var G=this.get("engine");return G.beginGradientFill.apply(G,arguments);},clear:function(){var E=this.get("engine");return E.clear.apply(E);},curveTo:function(G,F,I,H,E,K){var J=this.get("engine");return J.curveTo.apply(J,arguments);},drawCircle:function(F,H,E){var G=this.get("engine");return G.drawCircle.apply(G,arguments);},drawEllipse:function(E,I,F,G){var H=this.get("engine");return H.beginGradientFill.apply(H,arguments);},drawRectangle:function(E,I,F,G){var H=this.get("engine");return H.drawRectangle.apply(H,arguments);},drawRoundRect:function(E,K,F,G,I,H){var J=this.get("engine");return J.drawRoundRect.apply(J,arguments);},endFill:function(){var E=this.get("engine");return E.endFill.apply(E);},lineGradientStyle:function(K,E,F,I,L,M,H,J){var G=this.get("engine");return G.lineGradientStyle.apply(G,arguments);},lineStyle:function(L,I,H,K,M,G,E,J){var F=this.get("engine");return F.lineStyle.apply(F,arguments);},lineTo:function(E,G){var F=this.get("engine");return F.lineTo.apply(F,arguments);},moveTo:function(E,G){var F=this.get("engine");return F.moveTo.apply(F,arguments);}});D.Graphics=B;function A(E){A.superclass.constructor.apply(this,arguments);}A.NAME="canvasAPI";A.ATTRS={parent:{getter:function(){return this._parent;},setter:function(E){if(D.Lang.isString(E)){this._parent=document.getElementById(E);}else{this._parent=E;}return this._parent;}},canvas:{getter:function(){if(!this._canvas){this._setCanvas();}return this._canvas;}},context:{getter:function(){if(!this._context){this._context=this.get("canvas").getContext("2d");}return this._context;}},x:{getter:function(){return this._x;},setter:function(E){this._x=E;return E;},validator:function(E){return D.Lang.isNumber(E);}},y:{getter:function(){return this._y;},setter:function(E){this._y=E;return E;},validator:function(E){return D.Lang.isNumber(E);}},fillColor:{getter:function(){return this._fillColor;},setter:function(E){this._fillColor=E;return E;}},fillAlpha:{getter:function(){return this._fillAlpha;},setter:function(E){this._fillAlpha=E;return E;}},lineColor:{getter:function(){return this._lineColor;},setter:function(E){this._lineColor=E;return E;}},lineWidth:{getter:function(){return this._lineWidth;},setter:function(E){this._lineWidth=E;return E;},validator:function(E){return D.Lang.isNumber(E);}},lineAlpha:{getter:function(){return this._lineAlpha;},setter:function(E){this._lineAlpha=E;return E;},validator:function(E){return D.Lang.isNumber(E);}},fillType:{getter:function(){return this._fillType;},setter:function(E){this._fillType=E;return E;},validator:function(E){return(E==="solid"||E==="linear"||E==="radial");}},fillColors:{getter:function(){return this._fillColors;},setter:function(E){this._fillColors=E;return E;},validator:function(E){return D.Lang.isArray(E);}},fillRatios:{getter:function(){return this._fillRatios;},setter:function(E){this._fillRatios=E;return E;},validator:function(E){return D.Lang.isArray(E);}},fillRotation:{getter:function(){return this._fillRotation;},setter:function(E){this._fillRotation=E;return E;},validator:function(E){return D.Lang.isNumber(E);}}};D.extend(A,D.Base,{_setCanvas:function(){var E=this.get("parent");this._canvas=document.createElement("canvas");this._canvas.width=parseInt(this._parent.style.width,10)||E.width;this._canvas.height=parseInt(this._parent.style.height,10)||E.height;this._context=this._canvas.getContext("2d");E.appendChild(this._canvas);},_canvas:null,_context:null,_fillType:"solid",_x:0,_y:0,_fillColor:null,_fillAlpha:1,_lineColor:null,_lineWidth:1,_lineAlpha:1,_fillColors:[],_fillRatios:null,_fillRotation:0,beginFill:function(F,G){var E=this.get("context");this.set("fillColor",F);this.set("fillAlpha",G);this.set("fillType","solid");E.beginPath();E.fillStyle=F;},beginGradientFill:function(J,E,F,H,M,K,N,G,I){this.set("fillType",J);this.set("fillColors",E);this.set("fillRatios",H);this.set("fillRotation",M);var L=this.get("context");L.beginPath();},clear:function(){this.set("fillColor",null);this.set("lineColor",null);this.set("lineWidth",1);this.set("fillAlpha",1);this.set("lineAlpha",1);},curveTo:function(H,G,J,I,E,K){var F=this.get("context");F.bezierCurveTo(arguments);},drawCircle:function(F,K,E){var I=0,H=360,J=false,G=this.get("context");this.set("x",F);this.set("y",K);I*=(Math.PI/180);H*=(Math.PI/180);G.beginPath();G.fillStyle=this._getFill(E*2,E*2);G.arc(F+E,K+E,E,I,H,J);},drawEllipse:function(F,H,G,E){},drawRectangle:function(E,K,G,I){var H=this.get("fillColor"),J=this.get("lineColor"),F=this.get("context");F.beginPath();F.fillStyle=this._getFill(G,I);if(H||this.get("fillColors")){F.fillRect(E,K,G,I);}if(J){F.strokeRect(E,K,G,I);}},drawRoundRect:function(E,K,G,I,H,J){var F=this.get("context");F.beginPath();F.fillStyle=this._getFill(G,I);F.moveTo(E,K+J);F.lineTo(E,K+I-J);F.quadraticCurveTo(E,K+I,E+H,K+I);F.lineTo(E+G-H,K+I);F.quadraticCurveTo(E+G,K+I,E+G,K+I-J);F.lineTo(E+G,K+J);F.quadraticCurveTo(E+G,K,E+G-H,K);F.lineTo(E+H,K);F.quadraticCurveTo(E,K,E,K+J);},endFill:function(){var E=this.get("context");if(this.get("lineColor")){E.stroke();}if(this.get("fillColor")||this.get("fillColors")){E.fill();}E.closePath();},lineGradientStyle:function(I,F,E,J,H,G,L,K){},lineStyle:function(K,H,G,J,L,F,E,I){var M=this.get("context");this.set("lineWidth",K);this.set("lineColor",H);this.set("lineAlpha",G);M.strokeStyle=H;M.lineWidth=K;},lineTo:function(E,G){var F=this.get("context");
F.lineTo(E,G);this.set("x",E);this.set("y",G);},moveTo:function(E,G){var F=this.get("context");F.moveTo(E,G);this.set("x",E);this.set("y",G);},_getFill:function(E,G){var F=this.get("fillType");if(F==="solid"){return this.get("fillColor");}if(F==="linear"){return this._getLinearGradient(E,G,"fill");}return this._getRadialGradient(E,G,"fill");},_getLineFill:function(E,G){var F=this.get("lineType");if(F==="solid"){return this.get("lineColor");}if(F==="linear"){return this._getLinearGradient(E,G,"line");}return this._getRadialGradient(E,G,"line");},_getLinearGradient:function(R,L,N){var F=this.get(N+"Colors"),K=this.get(N+"Ratios"),J,H,P=this.get("x"),O=this.get("y"),I,M,G,S=this.get("context"),E=this.get(N+"Rotation"),Q;switch(E){case 45:Q=S.createLinearGradient(P+R,O+L,P,O);break;case 90:Q=S.createLinearGradient(P+R,O,P,O);break;case 135:Q=S.createLinearGradient(P+R,O,P,O+L);break;case 180:Q=S.createLinearGradient(P,O,P,O+L);break;case 225:Q=S.createLinearGradient(P,O,P+R,O+L);break;case 270:Q=S.createLinearGradient(P,O,P+R,O);break;case 315:Q=S.createLinearGradient(P,O+L,P+R,O);break;default:Q=S.createLinearGradient(P,O+L,P,O);break;}H=F.length;G=0;for(J=0;J<H;++J){I=F[J];M=K[J]||G;Q.addColorStop(M,I);G=(J+1)/H;}return Q;},_getRadialGradient:function(Q,K,M){var E=this.get(M+"Colors"),J=this.get(M+"Ratios"),I,G,O=this.get("x"),N=this.get("y"),H,L,F,P,R=this.get("context");P=R.createRadialGradient(O+Q/2,N+Q/2,Q/2,O+Q,N+K,Q/2);G=E.length;F=0;for(I=0;I<G;++I){H=E[I];L=J[I]||F;P.addColorStop(L,H);F=(I+1)/G;}return P;}});D.CanvasAPI=A;function C(E){C.superclass.constructor.apply(this,arguments);}C.NAME="vmlAPI";C.ATTRS={parent:{getter:function(){return this._parent;},setter:function(E){if(D.Lang.isString(E)){this._parent=document.getElementById(E);}else{this._parent=E;}return this._parent;}},canvas:{getter:function(){if(!this._canvas){this._setCanvas();}return this._canvas;}},x:{getter:function(){return this._x;},setter:function(E){this._x=E;return E;},validator:function(E){return D.Lang.isNumber(E);}},y:{getter:function(){return this._y;},setter:function(E){this._y=E;return E;},validator:function(E){return D.Lang.isNumber(E);}},fillColor:{getter:function(){return this._fillColor;},setter:function(E){this._fillColor=E;return E;}},fillAlpha:{getter:function(){return this._fillAlpha;},setter:function(E){this._fillAlpha=E;return E;}},lineColor:{getter:function(){return this._lineColor;},setter:function(E){this._lineColor=E;return E;}},lineWidth:{getter:function(){return this._lineWidth;},setter:function(E){this._lineWidth=E;return E;},validator:function(E){return D.Lang.isNumber(E);}},lineAlpha:{getter:function(){return this._lineAlpha;},setter:function(E){this._lineAlpha=E;return E;},validator:function(E){return D.Lang.isNumber(E);}},fillType:{getter:function(){return this._fillType;},setter:function(E){this._fillType=E;return E;},validator:function(E){return D.Lang.isString(E);}},fillProps:{getter:function(){return this._fillProps;},setter:function(E){this._fillProps=E;return E;},validator:function(E){return D.Lang.isObject(E);}}};D.extend(C,D.Base,{_fillType:"solid",_fillProps:null,_canvas:null,_setCanvas:function(){var G=this.get("parent"),E=parseInt(G.style.width,10),F=parseInt(G.style.height,10);this._canvas=document.createElement("v:group");this._canvas.setAttribute("id","engine");this._canvas.style.width=E+"px";this._canvas.style.height=F+"px";this._canvas.setAttribute("coordsize",E+" "+F);G.appendChild(this._canvas);},_x:0,_y:0,_fillColor:null,_fillAlpha:1,_lineColor:null,_lineWidth:1,_lineAlpha:1,beginFill:function(E,F){this.set("fillColor",E);this.set("fillAlpha",F);},beginGradientFill:function(L,E,F,I,O,M,P,G,J){var N={},H=1,K=E.length;N.type="linear"?"gradient":"GradientRadial";N.color=E[0];for(;H<K;++H){N["color"+(H+1)]=E[H];}N.angle=O;this.set("fillProps",N);this.set("fillType",L);},clear:function(){},curveTo:function(G,F,I,H,E,J){},drawCircle:function(M,L,J){var O=J*2,K=this.get("lineColor"),G=this.get("lineWidth"),F=this.get("fillColor"),N,I,H,E=document.createElement("v:oval");E.setAttribute("strokeweight",G+"px");E.setAttribute("strokecolor",K);E.style.left=M+"px";E.style.top=L+"px";E.style.width=O+"px";E.style.height=O+"px";if(this.get("fillType")==="solid"){E.fillcolor=F;}else{I=this.get("fillProps");N=document.createElement("v:fill");for(H in I){if(I.hasOwnProperty(H)){N[H]=I[H];}}E.appendChild(N);}this.get("canvas").appendChild(E);},drawEllipse:function(E,H,F,G){},drawRectangle:function(M,K,N,I){var F=this.get("lineWidth"),E=this.get("fillColor"),J=this.get("lineColor"),L=document.createElement("v:rect"),O,H,G;L.setAttribute("strokeweight",F+"px");L.style.width=N+"px";L.style.height=I+"px";L.style.top=K;L.style.left=M;if(this.get("fillType")==="solid"){L.fillColor=E;}else{H=this.get("fillProps");O=document.createElement("v:fill");for(G in H){if(H.hasOwnProperty(G)){O[G]=H[G];}}L.appendChild(O);}L.strokecolor=J;this.get("canvas").appendChild(L);},drawRoundRect:function(P,O,Q,J,M,G){var F=this.get("lineWidth"),E=this.get("fillColor"),L=this.get("lineColor"),N=document.createElement("v:roundrect"),K=Math.min(Q/2,J/2),R=Math.round((M/K)*100),S,I,H;N.setAttribute("strokeweight",F+"px");N.arcsize=R+"%";N.style.width=Q+"px";N.style.height=J+"px";N.style.top=O;N.style.left=P;if(this.get("fillType")==="solid"){N.fillColor=E;}else{I=this.get("fillProps");S=document.createElement("v:fill");for(H in I){if(I.hasOwnProperty(H)){S[H]=I[H];}}N.appendChild(S);}N.strokecolor=L;this.get("canvas").appendChild(N);},endFill:function(){},lineGradientStyle:function(I,F,E,J,H,G,L,K){},lineStyle:function(H,G,L,J,I,K,E,F){this.set("lineWidth",H);this.set("lineColor",G);this.set("lineAlpha",L);},lineTo:function(E,F){},moveTo:function(E,F){this.set("x",E);this.set("y",F);}});D.VMLAPI=C;},"@VERSION@");