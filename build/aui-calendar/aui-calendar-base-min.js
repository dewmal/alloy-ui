AUI.add("aui-calendar-base",function(AH){var x=AH.Lang,AZ=x.isString,C=x.isArray,AU=x.isBoolean,p=x.isUndefined,k=x.isNumber,AA=AH.WidgetStdMod,R="active",o="blank",t="blankDays",Q="boundingBox",l="calendar",I="circle",AY="clearfix",n="currentDay",h="currentMonth",H="currentYear",z="dates",AE="dateFormat",AT="day",AG="default",W="disabled",w=".",d="firstDayOfWeek",Y="hd",Ac="headerContentNode",e="headerTitleNode",N="helper",v="hidden",S="hover",u="icon",K="iconNextNode",AS="iconPrevNode",Ad="locale",Aa="maxDate",Ae="minDate",q="monthdays",f="monthDays",AW="monthDaysNode",O="next",AV="prev",m="selectMultipleDates",s="state",AM="title",AQ="triangle",r="week",AO="weekdays",b="weekDays",Ah="weekDaysNode",Ag="calendar:select",a=AH.ClassNameManager.getClassName,AF=a(l),Z=a(l,W),AL=a(l,AT),P=a(l,AT,o),i=a(l,AT,v),c=a(l,Y),AJ=a(N,AY),J=a(u),AI=a(u,I,AQ,"l"),AC=a(u,I,AQ,"r"),B=a(l,q),AK=a(l,O),j=a(l,AV),Ab=a(s,R),M=a(s,AG),F=a(s,S),AX=a(l,AM),G=a(l,r),Af=a(l,AO),AR=function(A){A.halt();},AP=7,y=31,U='<div class="'+[c,M,AJ].join(" ")+'"></div>',AN='<a href="" class="'+[J,AI,j].join(" ")+'">Back</a>',D='<a href="" class="'+[J,AC,AK].join(" ")+'">Prev</a>',V='<div class="'+[P,i].join(" ")+'"></div>',AD='<div class="'+AX+'"></div>',E='<div class="'+[B,AJ].join(" ")+'"></div>',AB='<div class="'+[Af,AJ].join(" ")+'"></div>',T=['<div class="'+G+'">',0,"</div>"],g=['<a href="#" class="'+[AL,M].join(" ")+'">',0,"</a>"];var X=AH.Component.create({NAME:l,ATTRS:{blankDays:{valueFn:"_valueBlankDays"},currentDay:{value:(new Date()).getDate()},currentMonth:{value:(new Date()).getMonth()},currentYear:{value:(new Date()).getFullYear()},dates:{value:[new Date()],validator:C,setter:"_setDates"},dateFormat:{value:"%m/%d/%Y",validator:AZ},firstDayOfWeek:{value:0,validator:k},headerContentNode:{valueFn:function(){return AH.Node.create(U);}},headerTitleNode:{valueFn:function(){return AH.Node.create(AD);}},iconNextNode:{valueFn:function(){return AH.Node.create(D);}},iconPrevNode:{valueFn:function(){return AH.Node.create(AN);}},maxDate:{value:null,setter:"_setMinMaxDate"},minDate:{value:null,setter:"_setMinMaxDate"},monthDays:{valueFn:"_valueMonthDays"},monthDaysNode:{valueFn:function(){return AH.Node.create(E);}},selectMultipleDates:{value:false},setValue:{value:true,validator:AU},weekDays:{valueFn:"_valueWeekDays"},weekDaysNode:{valueFn:function(){return AH.Node.create(AB);}}},HTML_PARSER:{blankDays:function(L){var A=L.all(w+P);return A.size()?A:null;},monthDays:function(L){var A=L.all(w+AL);return A.size()?A:null;},weekDays:function(L){var A=L.all(w+G);return A.size()?A:null;},headerTitleNode:w+AX,monthDaysNode:w+B,weekDaysNode:w+Af,headerContentNode:w+c,iconNextNode:w+AK,iconPrevNode:w+j},UI_ATTRS:[z],BIND_UI_ATTRS:[h,H],prototype:{initializer:function(){var A=this;A.selectedDates=[];},renderUI:function(){var A=this;A.blankDays=A.get(t);A.headerContentNode=A.get(Ac);A.headerTitleNode=A.get(e);A.iconNextNode=A.get(K);A.iconPrevNode=A.get(AS);A.monthDays=A.get(f);A.monthDaysNode=A.get(AW);A.weekDays=A.get(b);A.weekDaysNode=A.get(Ah);A._renderWeekDays();A._renderBlankDays();A._renderMonthDays();A._renderIconControls();A._renderTitleNode();A._renderStdContent();A.get(Q).addClass(AF);},bindUI:function(){var A=this;A._createEvents();A._bindDelegateDOMEvents();A._bindDelegateMonthDays();},eachSelectedDate:function(L,Ai){var A=this;AH.Array.each(Ai||A.get(z),L,A);},formatDate:function(Aj,Ai){var L=this;var A=L.get(Ad);return AH.DataType.Date.format(Aj,{format:Ai,locale:A});},getCurrentDate:function(){var A=this;var L=A._normalizeYearMonth();return(new Date(L.year,L.month,L.day));},getDaysInMonth:function(Ai,Aj){var A=this;var L=A._normalizeYearMonth(Ai,Aj);return(32-new Date(L.year,L.month,32).getDate());},getDetailedSelectedDates:function(){var A=this;var L=[];A.eachSelectedDate(function(Ai){L.push({year:Ai.getFullYear(),month:Ai.getMonth(),day:Ai.getDate()});});return L;},getFirstDate:function(Ai,Aj){var A=this;var L=A._normalizeYearMonth(Ai,Aj);return(new Date(L.year,L.month,1));},getFirstDayOfWeek:function(L,Ai){var A=this;return A.getFirstDate(L,Ai).getDay();},getFormattedSelectedDates:function(){var A=this;var L=[];A.eachSelectedDate(function(Ai){L.push(A.formatDate(Ai,A.get(AE)));});return L;},getLastDate:function(Aj,Ak){var A=this;var Ai=A._normalizeYearMonth(Aj,Ak);var L=A.getDaysInMonth(Ai.month);return(new Date(Ai.year,Ai.month,L));},getSelectedDates:function(){var A=this;return A.get(z);},isAlreadySelected:function(L){var A=this;var Ai=false;A.eachSelectedDate(function(Ak,Aj){if(A._compareDates(Ak,L)){Ai=true;}});return Ai;},navigateMonth:function(Ak){var A=this;var Aj=A.get(h);var Ai=A.get(H);var L=new Date(Ai,Aj+Ak);A.set(h,L.getMonth());A.set(H,L.getFullYear());},parseDate:function(L){var A=this;return(L?new Date(L):new Date());},removeDate:function(L){var A=this;var Ai=[];A.eachSelectedDate(function(Ak,Aj){if(!A._compareDates(Ak,L)){Ai.push(Ak);}});A.set(z,Ai);},selectNextMonth:function(L){var A=this;A.navigateMonth(+1);L.preventDefault();},selectPrevMonth:function(L){var A=this;A.navigateMonth(-1);L.preventDefault();},_bindDelegateDOMEvents:function(){var A=this;var Ai=A.headerContentNode;var L=A.get(Q);L.on("click",AR);L.on("mousedown",AR);Ai.delegate("click",A.selectNextMonth,w+AC,A);Ai.delegate("click",A.selectPrevMonth,w+AI,A);},_bindDelegateMonthDays:function(){var A=this;var L=A.get(Q);L.delegate("click",AH.bind(A._onClickDays,A),w+AL);L.delegate("mouseenter",AH.bind(A._onMouseEnterDays,A),w+AL);L.delegate("mouseleave",AH.bind(A._onMouseLeaveDays,A),w+AL);},_createEvents:function(){var A=this;var L=function(Ai,Aj){A.publish(Ai,{defaultFn:Aj,queuable:false,emitFacade:true,bubbles:true,prefix:l});};L(Ag,A._defSelectFn);},_compareDates:function(L,A){return(L.getTime()==A.getTime());},_defSelectFn:function(Aj){var A=this;var Ai=Aj.date.normal;var L=Ai[Ai.length-1];if(L){A.set(n,L.getDate());A.set(h,L.getMonth());A.set(H,L.getFullYear());}A._syncView();},_getLocaleMap:function(){var A=this;return AH.DataType.Date.Locale[A.get(Ad)];
},_getDayName:function(Ai){var L=this;var A=L._getLocaleMap();return A.A[Ai];},_getDayNameShort:function(Ai){var L=this;var A=L._getLocaleMap();return A.a[Ai];},_getDayNameMin:function(Ai){var A=this;var L=A._getDayNameShort(Ai);return L.slice(0,L.length-1);},_getMonthName:function(Ai){var L=this;var A=L._getLocaleMap();return A.B[Ai];},_getMonthNameShort:function(Ai){var L=this;var A=L._getLocaleMap();return A.b[Ai];},_handleSelectEvent:function(){var A=this;var Aj=A.getSelectedDates();var Ai=A.getFormattedSelectedDates();var L=A.getDetailedSelectedDates();A.fire(Ag,{date:{detailed:L,formatted:Ai,normal:Aj}});},_normalizeYearMonth:function(Aj,Am,L){var A=this;var Al=A.get(n);var Ak=A.get(h);var Ai=A.get(H);if(p(L)){L=Al;}if(p(Am)){Am=Ak;}if(p(Aj)){Aj=Ai;}return{year:Aj,month:Am,day:L};},_onClickDays:function(Ak){var A=this;var Al=Ak.currentTarget||Ak.target;var Ai=A.monthDays.indexOf(Al)+1;var Aj=Al.test(w+Z);if(!Aj){A.set(n,Ai);var L=A.getCurrentDate();if(A.isAlreadySelected(L)){A.removeDate(L);}else{A._selectDate();}}Ak.preventDefault();},_onMouseEnterDays:function(L){var A=this;var Ai=L.currentTarget||L.target;Ai.replaceClass(M,F);},_onMouseLeaveDays:function(L){var A=this;var Ai=L.currentTarget||L.target;Ai.replaceClass(F,M);},_renderBlankDays:function(){var A=this;A.blankDays.appendTo(A.monthDaysNode);},_renderStdContent:function(){var A=this;var L=AH.Node.create("<div></div>");L.append(A.weekDaysNode);L.append(A.monthDaysNode);A.setStdModContent(AA.HEADER,A.headerContentNode.getDOM());A.setStdModContent(AA.BODY,L);},_renderTitleNode:function(){var A=this;A.headerContentNode.append(A.headerTitleNode);},_renderIconControls:function(){var A=this;A.headerContentNode.append(A.iconNextNode);A.headerContentNode.append(A.iconPrevNode);},_renderMonthDays:function(){var A=this;A.monthDays.appendTo(A.monthDaysNode);},_renderWeekDays:function(){var A=this;A.weekDays.appendTo(A.weekDaysNode);},_restrictDate:function(L,Am){var A=this;var Al=A.get(Aa);var Ak=A.get(Ae);var Aj=Ak&&(L<Ak);var Ai=Al&&(L>Al);if(Aj||Ai){Am.addClass(Z);}else{Am.removeClass(Z);}},_selectDate:function(){var A=this;var L=A.getCurrentDate();if(!A.isAlreadySelected(L)){var Ai=A.get(z);if(!A.get(m)){Ai=[];}Ai.push(L);A.set(z,Ai);}},_setDates:function(L){var A=this;AH.Array.each(L,function(Aj,Ai){if(AZ(Aj)){L[Ai]=A.parseDate(Aj);}});return L;},_setMinMaxDate:function(L){var A=this;if(AZ(L)){L=A.parseDate(L);}return L;},_syncDays:function(){var A=this;var Ai=A.getDaysInMonth();var Aj=A.getFirstDayOfWeek();var L=A.getCurrentDate();A.monthDays.each(function(Al,Ak){if(Ak>=Ai){Al.addClass(i);}else{Al.removeClass(i);}L.setDate(Ak+1);A._restrictDate(L,Al);});A.blankDays.each(function(Al,Ak){var Am=(Aj-A.get(d)+AP)%AP;if(Ak<Am){Al.removeClass(i);}else{Al.addClass(i);}});},_syncHeader:function(){var A=this;var Ai=A.get(h);var L=A.get(H);var Aj=[A._getMonthName(Ai),L].join(" ");A.headerTitleNode.html(Aj);},_syncSelectedDays:function(Aj){var A=this;var Ai=A.get(h);var L=A.get(H);A.monthDays.replaceClass(Ab,M);A.monthDays.replaceClass(F,M);A.eachSelectedDate(function(Am,Al){var An=(Ai==Am.getMonth())&&(L==Am.getFullYear());if(An){var Ak=A.monthDays.item(Am.getDate()-1);Ak.addClass(Ab);try{Ak.focus();}catch(Ao){}}},Aj);},_syncView:function(){var A=this;A._syncDays();A._syncHeader();A._syncSelectedDays();},_uiSetCurrentMonth:function(L){var A=this;A._syncView();},_uiSetCurrentYear:function(L){var A=this;A._syncView();},_uiSetDates:function(L){var A=this;A._handleSelectEvent();},_valueBlankDays:function(){var Ai=[];var A=AP;while(A--){Ai.push(V);}var L=AH.DOM.create(Ai.join(""));return AH.all(L.childNodes);},_valueMonthDays:function(){var A=this;var Ai=0;var L=[];while(Ai++<y){g[1]=Ai;L.push(g.join(""));}var Aj=AH.DOM.create(L.join(""));return AH.all(Aj.childNodes);},_valueWeekDays:function(){var L=this;var Aj=0;var Ai=[];var Al=L.get(d);while(Aj<AP){var Ak=(Aj+Al)%AP;var A=L._getDayNameMin(Ak);T[1]=A;Ai[Aj++]=T.join("");}var Am=AH.DOM.create(Ai.join(""));return AH.all(Am.childNodes);}}});AH.Calendar=AH.augment(X,AH.WidgetStdMod);},"@VERSION@",{requires:["aui-overlay-context","datatype-date","widget-locale"],skinnable:true});