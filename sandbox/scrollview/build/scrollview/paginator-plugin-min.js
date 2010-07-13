YUI.add("paginator-plugin",function(E){var C=E.ScrollView.CLASS_NAMES,B=0.5,D=E.ScrollViewBase.UI_SRC;function A(){A.superclass.constructor.apply(this,arguments);}A.NAME="paginatorPlugin";A.NS="paginator";A.ATTRS={pageSelector:{value:null},selectedIndex:{value:0},totalPages:{value:0}};E.extend(A,E.Plugin.Base,{initializer:function(){var F=this.get("host");this.afterHostMethod("_uiSizeCB",this._calculatePageOffsets);this.afterHostMethod("_touchesBegan",this._setBoundaryPoints);this.afterHostMethod("_flick",this._afterFlick);this.afterHostEvent("scroll:end",this._scrollEnded);this.after("selectedIndexChange",this._afterSelectedIndexChange);if(F.get("bounce")!==0){this._originalHostBounce=F.get("bounce");F.set("bounce",B);}},destroy:function(){var F=this.get("host");if(F.get("bounce")!==0){F.set("bounce",this._originalHostBounce);}},_calculatePageOffsets:function(){var G=this.get("host").get("contentBox"),I=this.get("pageSelector"),F,H=[];F=I?G.all(I):G.get("children");F.each(function(K,J){H.push(K.get("offsetLeft"));},this);H.push(G.get("scrollWidth")-this.get("host").get("width"));this._minPoints=H;this.set("totalPages",F.size());},_setBoundaryPoints:function(H){var G=this.get("host"),F=this.get("selectedIndex");if(G._scrollsHorizontal){if(E.Lang.isNumber(this._minPoints[F-1])){G._minScrollX=this._minPoints[F-1];}else{G._minScrollX=this._minPoints[F];}G._maxScrollX=this._minPoints[F+1];}},_afterFlick:function(L){var J=this.get("host")._currentVelocity,G=J>0,K=Math.abs(J),I=this.get("host"),F=this.get("selectedIndex"),H=this.get("totalPages");if(K<1){I._currentVelocity=G?1:-1;}if(G&&F<H-1){this.set("selectedIndex",F+1,{src:D});}else{if(!G&&F>0){this.set("selectedIndex",F-1,{src:D});}}},_scrollEnded:function(I){var H=this.get("host"),F=this.get("selectedIndex"),G=this.get("totalPages");if(I.staleScroll){if(H._scrolledHalfway){if(H._scrolledForward&&F<G-1){this.set("selectedIndex",F+1);}else{if(F>0){this.set("selectedIndex",F-1);}else{this.snapToCurrentPage();}}}else{this.snapToCurrentPage();}}},_afterSelectedIndexChange:function(F){if(F.src!==D){this._uiSelectedIndex(F.newVal);}},_uiSelectedIndex:function(F){this.scrollToPage(F,350,"ease-out");},nextPage:function(G){var F=this.get("selectedIndex");if(F<this.get("totalPages")-1){this.set("selectedIndex",F+1);}},prevPage:function(G){var F=this.get("selectedIndex");if(F>0){this.set("selectedIndex",F-1);}},scrollToPage:function(G,I,K){var H=this.get("host"),F=H.get("scrollX"),J=H.get("scrollY");if(H._scrollsHorizontal){F=this._minPoints[G];H.set("scrollX",F,{duration:I,easing:K});}},snapToCurrentPage:function(){this.get("host").set("scrollX",this._minPoints[this.get("selectedIndex")],{duration:300,easing:"ease-out"});}});E.namespace("Plugin");E.Plugin.PaginatorPlugin=A;},"@VERSION@",{requires:["plugin"]});