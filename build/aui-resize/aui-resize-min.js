AUI.add("aui-resize-base",function(AR){var AC=AR.Lang,F=AC.isArray,Ag=AC.isBoolean,Al=AC.isString,Ad=AC.trim,S=AR.Array.indexOf,AJ=".",b=",",Z=" ",Y="active",s="activeHandle",w="activeHandleEl",f="all",AU="autoHide",Aa="bottom",AV="className",AY="cursor",Q="diagonal",AZ="dotted",AL="dragCursor",D="grip",AD="gripsmall",h="handle",r="handles",AI="hidden",C="horizontal",AG="icon",e="inner",E="left",q="margin",X="node",k="nodeName",AA="none",n="offsetHeight",Ak="offsetWidth",H="parentNode",U="position",Ac="proxy",g="proxyEl",O="relative",AS="resize",W="resizing",K="right",Ap="static",N="top",AP="vertical",AW="wrap",Am="wrapper",AO="wrapTypes",o="resize:mouseUp",c="resize:resize",i="resize:align",p="resize:end",x="resize:start",AE="t",Ao="tr",AF="r",Af="br",AQ="b",Ai="bl",AK="l",Aq="tl",u=function(A){return(A instanceof AR.Node);},Ar=function(A){return h+A.toUpperCase();},An=function(){return Array.prototype.slice.call(arguments).join(Z);},v=AR.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),j=AR.ClassNameManager.getClassName,P=j(AG),Ah=j(AG,AD,Q,Af),AN=j(AG,D,AZ,C),z=j(AG,D,AZ,AP),Ae=j(AS),AX=j(AS,h),AH=j(AS,h,Y),I=j(AS,h,e),l=j(AS,h,e,"{handle}"),As=j(AS,h,"{handle}"),G=j(AS,AI,r),d=j(AS,Ac),Aj=j(AS,Am),AM=An(P,Ah),Ab=An(P,AN),V=An(P,z),J=/^(t|b)$/i,y=/^(tl|l|bl)$/i,t=/^(tl|t|tr)$/i,m=/^(bl|br|l|r|tl|tr)$/i,AT='<div class="'+An(AX,As)+'">'+'<div class="'+An(I,l)+'"></div>'+"</div>",AB='<div class="'+d+'"></div>',At='<div class="'+Aj+'"></div>',a=[AE,Ao,AF,Af,AQ,Ai,AK,Aq];var M=AR.Component.create({NAME:AS,ATTRS:{activeHandle:{value:null,validator:Al},activeHandleEl:{value:null,validator:u},autoHide:{value:false,validator:Ag},handles:{setter:function(L){var A=this;var B=[];if(F(L)){B=L;}else{if(Al(L)){if(L.toLowerCase()==f){B=a;}else{AR.each(L.split(b),function(T,R){var Au=Ad(T);if(S(a,Au)>-1){B.push(Au);}});}}}return B;},value:f},node:{setter:AR.one},proxy:{value:false,validator:Ag},proxyEl:{setter:AR.one,valueFn:function(){return AR.Node.create(AB);}},resizing:{value:false,validator:Ag},wrap:{setter:function(R){var A=this;var L=A.get(X);var T=L.get(k);var B=A.get(AO);if(B.test(T)){R=true;}return R;},value:false,validator:Ag},wrapTypes:{readOnly:true,value:/canvas|textarea|input|select|button|img/i},wrapper:{setter:function(){var A=this;var B=A.get(X);var L=B;if(A.get(AW)){L=AR.Node.create(At);B.placeBefore(L);L.append(B);A._copyStyles(B,L);B.setStyles({position:Ap,left:0,top:0});}return L;},value:null,writeOnce:true}},EXTENDS:AR.Base,prototype:{CSS_INNER_HANDLE_MAP:{r:V,l:V,t:Ab,b:Ab,br:AM},changeHeightHandles:false,changeLeftHandles:false,changeTopHandles:false,changeWidthHandles:false,delegate:null,info:null,lastInfo:null,originalInfo:null,initializer:function(){var A=this;A.info={};A.originalInfo={};A.get(X).addClass(Ae);A.renderer();},renderUI:function(){var A=this;A._renderHandles();A._renderProxy();},bindUI:function(){var A=this;A._createEvents();A._bindDD();A._bindHandle();},syncUI:function(){var A=this;A._setHideHandlesUI(A.get(AU));},destructor:function(){var A=this;var B=A.get(X);var L=A.get(Am);AR.Event.purgeElement(L,true);A.eachHandle(function(R){A.delegate.dd.destroy();R.remove(true);});if(A.get(AW)){B.setStyles({margin:L.getStyle(q),position:L.getStyle(U)});L.placeBefore(B);L.remove(true);}B.removeClass(Ae);B.removeClass(G);},renderer:function(){this.renderUI();this.bindUI();this.syncUI();},eachHandle:function(B){var A=this;AR.each(A.get(r),function(T,L){var R=A.get(Ar(T));B.apply(A,[R,T,L]);});},_bindDD:function(){var A=this;A.delegate=new AR.DD.Delegate({bubbleTargets:A,container:A.get(Am),dragConfig:{clickPixelThresh:0,clickTimeThresh:0,useShim:true,move:false},nodes:AJ+AX,target:false});A.on("drag:drag",A._handleResizeEvent);A.on("drag:dropmiss",A._handleMouseUpEvent);A.on("drag:end",A._handleResizeEndEvent);A.on("drag:start",A._handleResizeStartEvent);},_bindHandle:function(){var A=this;var B=A.get(Am);B.on("mouseenter",AR.bind(A._onWrapperMouseEnter,A));B.on("mouseleave",AR.bind(A._onWrapperMouseLeave,A));B.delegate("mouseenter",AR.bind(A._onHandleMouseEnter,A),AJ+AX);B.delegate("mouseleave",AR.bind(A._onHandleMouseLeave,A),AJ+AX);},_createEvents:function(){var A=this;var B=function(L,R){A.publish(L,{defaultFn:R,queuable:false,emitFacade:true,bubbles:true,prefix:AS});};B(x,this._defResizeStartFn);B(c,this._defResizeFn);B(i,this._defResizeAlignFn);B(p,this._defResizeEndFn);B(o,this._defMouseUpFn);},_renderHandles:function(){var A=this;var B=A.get(Am);A.eachHandle(function(L){B.append(L);});},_renderProxy:function(){var B=this;var A=B.get(g);B.get(Am).get(H).append(A.hide());},_buildHandle:function(L){var A=this;var B=AR.Node.create(AR.substitute(AT,{handle:L}));B.one(AJ+I).addClass(A.CSS_INNER_HANDLE_MAP[L]);return B;},_checkSize:function(Au,B){var A=this;var T=A.info;var R=A.originalInfo;var L=(Au==n)?N:E;T[Au]=B;if(((L==E)&&A.changeLeftHandles)||((L==N)&&A.changeTopHandles)){T[L]=R[L]+R[Au]-B;}},_copyStyles:function(T,Au){var B=this;var A=T.getStyle(U).toLowerCase();if(A==Ap){A=O;}var R={position:A};var L={};AR.each([N,K,Aa,E],function(Aw){var Av=q+v(Aw);L[Av]=Au.getStyle(Av);R[Av]=T.getStyle(Av);});Au.setStyles(R);T.setStyles(L);T.setStyles({margin:0});Au.set(n,T.get(n));Au.set(Ak,T.get(Ak));},_extractHandleName:AR.cached(function(L){var B=L.get(AV);var A=B.match(new RegExp(j(AS,h,"(\\w{1,2})\\b")));return A?A[1]:null;}),_getInfo:function(T,A){var Ay=this,Au;var Aw=A.dragEvent.target;if(A){Au=(Aw.actXY.length?Aw.actXY:Aw.lastXY);}var Av=T.getXY();var R=Av[0];var L=Av[1];var B=T.get(n);var Ax=T.get(Ak);return{actXY:Au,bottom:(L+B),left:R,offsetHeight:B,offsetWidth:Ax,right:(R+Ax),top:L};},_resize:function(){var A=this;var R=A.get(s);var Au=A.info;var T=A.originalInfo;var L=Au.actXY[0]-T.actXY[0];var B=Au.actXY[1]-T.actXY[1];var Av={t:function(){Au.top=T.top+B;Au.offsetHeight=T.offsetHeight-B;},r:function(){Au.offsetWidth=T.offsetWidth+L;},l:function(){Au.left=T.left+L;Au.offsetWidth=T.offsetWidth-L;},b:function(){Au.offsetHeight=T.offsetHeight+B;
},tr:function(){this.t();this.r();},br:function(){this.b();this.r();},tl:function(){this.t();this.l();},bl:function(){this.b();this.l();}};Av[R](L,B);},_setOffset:function(L,B,A){L.set(Ak,B);L.set(n,A);},_syncUI:function(){var A=this;var L=A.info;var R=A.get(Am);var B=A.get(X);A._setOffset(R,L.offsetWidth,L.offsetHeight);if(A.changeLeftHandles||A.changeTopHandles){R.setXY([L.left,L.top]);}if(!R.compareTo(B)){A._setOffset(B,L.offsetWidth,L.offsetHeight);}if(AR.UA.webkit){B.setStyle(AS,AA);}},_syncProxyUI:function(){var B=this;var R=B.info;var L=B.get(w);var A=B.get(g);var T=L.getStyle(AY);A.show().setStyle(AY,T);B.delegate.dd.set(AL,T);B._setOffset(A,R.offsetWidth,R.offsetHeight);A.setXY([R.left,R.top]);},_updateChangeHandleInfo:function(B){var A=this;A.changeHeightHandles=J.test(B);A.changeLeftHandles=y.test(B);A.changeTopHandles=t.test(B);A.changeWidthHandles=m.test(B);},_updateInfo:function(B){var A=this;A.info=A._getInfo(A.get(Am),B);},_setActiveHandlesUI:function(L){var A=this;var B=A.get(w);if(B){if(L){A.eachHandle(function(R){R.removeClass(AH);});B.addClass(AH);}else{B.removeClass(AH);}}},_setHideHandlesUI:function(B){var A=this;var L=A.get(Am);if(!A.get(W)){if(B){L.addClass(G);}else{L.removeClass(G);}}},_defMouseUpFn:function(B){var A=this;A.set(W,false);},_defResizeFn:function(B){var A=this;A._handleResizeAlignEvent(B.dragEvent);if(A.get(Ac)){A._syncProxyUI();}else{A._syncUI();}},_defResizeAlignFn:function(B){var A=this;var R=A.originalInfo;A.lastInfo=A.info;A._updateInfo(B);var L=A.info;A._resize();if(!A.con){if(L.offsetHeight<=15){A._checkSize(n,15);}if(L.offsetWidth<=15){A._checkSize(Ak,15);}}},_defResizeEndFn:function(L){var A=this;var B=L.dragEvent.target;B.actXY=[];if(A.get(Ac)){A._syncProxyUI();A.get(g).hide();}A._syncUI();A.set(s,null);A.set(w,null);A._setActiveHandlesUI(false);},_defResizeStartFn:function(B){var A=this;A.set(W,true);A.originalInfo=A._getInfo(A.get(Am),B);A._updateInfo(B);},_handleMouseUpEvent:function(A){this.fire(o,{dragEvent:A,info:this.info});},_handleResizeEvent:function(A){this.fire(c,{dragEvent:A,info:this.info});},_handleResizeAlignEvent:function(A){this.fire(i,{dragEvent:A,info:this.info});},_handleResizeEndEvent:function(A){this.fire(p,{dragEvent:A,info:this.info});},_handleResizeStartEvent:function(A){this.fire(x,{dragEvent:A,info:this.info});},_onWrapperMouseEnter:function(B){var A=this;if(A.get(AU)){A._setHideHandlesUI(false);}},_onWrapperMouseLeave:function(B){var A=this;if(A.get(AU)){A._setHideHandlesUI(true);}},_onHandleMouseEnter:function(L){var A=this;var B=L.currentTarget;var R=A._extractHandleName(B);if(!A.get(W)){A.set(s,R);A.set(w,B);A._setActiveHandlesUI(true);A._updateChangeHandleInfo(R);}},_onHandleMouseLeave:function(B){var A=this;if(!A.get(W)){A._setActiveHandlesUI(false);}}}});AR.each(a,function(B,A){M.ATTRS[Ar(B)]={setter:function(){return this._buildHandle(B);},value:null,writeOnce:true};});AR.Resize=M;},"@VERSION@",{requires:["aui-base","dd-drag","dd-delegate","dd-drop","substitute"],skinnable:true});AUI.add("aui-resize-constrain",function(U){var J=U.Lang,P=J.isBoolean,T=J.isNumber,R=J.isString,a=function(A){return(A instanceof U.Node);},d="borderBottomWidth",G="borderLeftWidth",Z="borderRightWidth",K="borderTopWidth",N="bottom",M="con",e="constrain",f="host",S="left",I="maxHeight",W="maxWidth",B="minHeight",L="minWidth",g="node",C="offsetHeight",O="offsetWidth",E="preserveRatio",Y="region",V="resizeConstrained",Q="right",F="tickX",D="tickY",X="top",c="view",b="viewportRegion";function H(){H.superclass.constructor.apply(this,arguments);}U.mix(H,{NAME:V,NS:M,ATTRS:{constrain:{setter:function(A){if(A&&(a(A)||R(A)||A.nodeType)){A=U.one(A);}return A;}},minHeight:{value:15,validator:T},minWidth:{value:15,validator:T},maxHeight:{value:Infinity,validator:T},maxWidth:{value:Infinity,validator:T},preserveRatio:{value:false,validator:P},tickX:{value:false},tickY:{value:false}}});U.extend(H,U.Plugin.Base,{constrainBorderInfo:null,initializer:function(){var A=this;var h=A.get(f);A.constrainBorderInfo={bottom:0,left:0,right:0,top:0};h.delegate.dd.plug(U.Plugin.DDConstrained,{tickX:A.get(F),tickY:A.get(D)});h.after("resize:align",U.bind(A._handleResizeAlignEvent,A));h.on("resize:start",U.bind(A._handleResizeStartEvent,A));},_checkConstrain:function(h,p,i){var n=this;var q=n.get(f);var A=q.info;var l=n._getConstrainRegion();if(l){var m=A[h]+A[i];var j=l[p]-n.constrainBorderInfo[p];if(m>=j){A[i]-=(m-j);}var k=A[h];var o=l[h]+n.constrainBorderInfo[h];if(k<=o){A[h]+=(o-k);A[i]-=(o-k);}}},_checkHeight:function(){var A=this;var i=A.get(f);var l=i.info;var k=i.originalInfo;var h=A.get(I);var j=A.get(B);A._checkConstrain(X,N,C);if(l.offsetHeight>h){i._checkSize(C,j);}if(l.offsetHeight<j){i._checkSize(C,h);}},_checkRatio:function(){var l=this;var n=l.get(f);var h=n.info;var j=n.originalInfo;var o=j.offsetWidth;var A=j.offsetHeight;var k=j.top;var p=j.left;var m=function(){return(h.offsetWidth/o);};var i=function(){return(h.offsetHeight/A);};if(n.changeHeightHandles){h.offsetWidth=o*i();l._checkWidth();h.offsetHeight=A*m();}else{if(n.changeWidthHandles){h.offsetHeight=A*m();l._checkHeight();h.offsetWidth=o*i();}}if(n.changeTopHandles){h.top=k+(A-h.offsetHeight);}if(n.changeLeftHandles){h.left=p+(o-h.offsetWidth);}},_checkRegion:function(){var A=this;var h=A.get(f);var i=A._getConstrainRegion();return U.DOM.inRegion(null,i,true,h.info);},_checkWidth:function(){var A=this;var j=A.get(f);var l=j.info;var k=j.originalInfo;var i=A.get(W);var h=A.get(L);A._checkConstrain(S,Q,O);if(l.offsetWidth<h){j._checkSize(O,h);}if(l.offsetWidth>i){j._checkSize(O,i);}},_getConstrainRegion:function(){var A=this;var i=A.get(f);var h=i.get(g);var k=A.get(e);var j=null;if(k){if(k==c){j=h.get(b);}else{if(a(k)){j=k.get(Y);}else{j=k;}}}return j;},_handleResizeAlignEvent:function(i){var A=this;var h=A.get(f);A._checkHeight();A._checkWidth();if(A.get(E)){A._checkRatio();}A._recalculateXY();if(A.get(e)&&!A._checkRegion()){h.info=h.lastInfo;}},_handleResizeStartEvent:function(h){var A=this;
A._updateConstrainBorderInfo();},_recalculateXY:function(){var A=this;var h=A.get(f);var j=h.info;var i=h.originalInfo;j.left=i.left+(j.left-i.left);j.top=i.top+(j.top-i.top);},_updateConstrainBorderInfo:function(){var h=this;var i=h.get(e);if(a(i)){var A=function(j){return parseFloat(i.getStyle(j))||0;};h.constrainBorderInfo.bottom=A(d);h.constrainBorderInfo.left=A(G);h.constrainBorderInfo.right=A(Z);h.constrainBorderInfo.top=A(K);}}});U.namespace("Plugin");U.Plugin.ResizeConstrained=H;},"@VERSION@",{requires:["aui-resize-base","dd-constrain","plugin"],skinnable:false});AUI.add("aui-resize",function(B){},"@VERSION@",{skinnable:true,use:["aui-resize-base","aui-resize-constrain"]});