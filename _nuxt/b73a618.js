(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{515:function(t,e,o){"use strict";o.r(e);o(73);var n=o(28),r=o(38),c=o(39),l=o(34),f=o(19),m=o(16),d=(o(14),o(174)),h=o(86);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,n=Object(f.a)(t);if(e){var r=Object(f.a)(this).constructor;o=Reflect.construct(n,arguments,r)}else o=n.apply(this,arguments);return Object(l.a)(this,o)}}var v=function(t,e,o,desc){var n,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,o):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(r<3?n(c):r>3?n(e,o,c):n(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c},w=Object(d.namespace)("availability"),T=function(t){Object(c.a)(o,t);var e=y(o);function o(){var t;return Object(n.a)(this,o),(t=e.apply(this,arguments)).forceRedrawCounter=1,t.daysToShow=1,t.options={chart:{type:"rangeBar",zoom:{enabled:!1}},plotOptions:{bar:{horizontal:!0,barHeight:"80%"}},annotations:{xaxis:[{x:h.DateTime.local().setZone("PST").toJSDate().getTime(),label:{text:"NOW"}}]},tooltip:{enabled:!0,y:{formatter:function(t,e){var o=e.seriesIndex,n=e.dataPointIndex,r=e.w,c=h.DateTime.fromMillis(r.config.series[o].data[n].y[0]),l=h.DateTime.fromMillis(r.config.series[o].data[n].y[1]);return r.config.series[o].data[n].x+": "+c.toFormat("ccc HH:mm")+" - "+l.toFormat("ccc HH:mm")}}},xaxis:{tickAmount:6,tickPlacement:"on",type:"datetime",labels:{formatter:function(t,e){return h.DateTime.fromJSDate(new Date(t)).toFormat("ccc HH:mm")}},min:h.DateTime.local().set({minute:0}).toJSDate().getTime(),max:h.DateTime.local().plus(h.Duration.fromObject({days:t.daysToShow})).set({minute:0}).toJSDate().getTime()}},t}return Object(r.a)(o,[{key:"DaysToShowChange",value:function(){this.options.xaxis.min=h.DateTime.local().set({minute:0}).toJSDate().getTime(),this.options.xaxis.max=h.DateTime.local().plus(h.Duration.fromObject({days:this.daysToShow})).set({minute:0}).toJSDate().getTime(),this.options.xaxis.tickAmount=4*this.daysToShow,this.forceRedrawCounter++}},{key:"mounted",value:function(){this.loadAvailability(this.$apollo)}}]),o}(d.Vue);v([Object(d.Watch)("daysToShow")],T.prototype,"DaysToShowChange",null),v([w.Action],T.prototype,"loadAvailability",void 0),v([w.State],T.prototype,"series",void 0);var x=T=v([Object(d.Component)({filters:{humanDate:function(t){return h.DateTime.fromMillis(t).toISO()}},middleware:"auth"})],T),D=o(106),O=o(142),S=o.n(O),j=o(206),R=o(173),C=o(475),k=o(464),J=o(476),V=o(511),component=Object(D.a)(x,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",[o("v-card",[o("v-card-title",[t._v("Availability")]),t._v(" "),o("v-card-text",[o("v-row",[o("v-col",{attrs:{cols:"1"}},[o("v-select",{attrs:{items:[1,2,3,4,5,6,7],label:"Days to show"},model:{value:t.daysToShow,callback:function(e){t.daysToShow=e},expression:"daysToShow"}})],1)],1),t._v(" "),o("v-row",{key:t.forceRedrawCounter},[o("v-col",[o("client-only",{key:t.forceRedrawCounter},[o("apexchart",{ref:"chart",attrs:{type:"rangeBar",options:t.options,series:t.series,height:"200%"}})],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;S()(component,{VCard:j.a,VCardText:R.b,VCardTitle:R.c,VCol:C.a,VContainer:k.a,VRow:J.a,VSelect:V.a})}}]);