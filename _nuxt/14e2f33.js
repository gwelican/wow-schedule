(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{500:function(t,e,o){var content=o(514);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(23).default)("16c88736",content,!0,{sourceMap:!1})},513:function(t,e,o){"use strict";o(500)},514:function(t,e,o){var r=o(22)((function(i){return i[1]}));r.push([t.i,".timeslot{\n  --tw-bg-opacity:1;\n  background-color:rgba(191, 219, 254, var(--tw-bg-opacity));\n  --tw-border-opacity:1;\n  border-color:rgba(0, 0, 0, var(--tw-border-opacity));\n  border-style:solid;\n  border-right-width:2px;\n  border-left-width:2px;\n  height:0.375rem;\n  width:2.5rem;\n  gap:0px\n}\n.timeslot:nth-child(2n+0){\n  --tw-border-opacity:1;\n  border-color:rgba(0, 0, 0, var(--tw-border-opacity));\n  border-style:solid;\n  border-top-width:2px\n}\n.timeslot:nth-child(4n+0){\n  border-top-style:dotted;\n  --tw-border-opacity:1;\n  border-color:rgba(0, 0, 0, var(--tw-border-opacity));\n  border-top-width:2px\n}\n.timeslot-time{\n  margin-top:-0.75rem;\n  padding-right:0.25rem;\n  text-align:right;\n  --tw-text-opacity:1;\n  color:rgba(0, 0, 0, var(--tw-text-opacity));\n  grid-row:span 3 / span 3;\n  grid-row-start:2\n}\n.selected{\n  --tw-bg-opacity:1;\n  background-color:rgba(4, 120, 87, var(--tw-bg-opacity))\n}",""]),t.exports=r},543:function(t,e,o){"use strict";o.r(e);o(76);var r=o(28),n=o(26),c=o(40),l=o(41),d=o(38),f=o(20),m=o(19),v=(o(15),o(305),o(306),o(307),o(308),o(309),o(310),o(311),o(312),o(313),o(314),o(315),o(316),o(317),o(318),o(29),o(49),o(53),o(85),o(57),o(35),o(181),o(88),o(48),o(14),o(12),o(13),o(60),o(86),o(508),o(42),o(150)),w=o(74),y=o(511),h=o.n(y);function S(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,r=Object(f.a)(t);if(e){var n=Object(f.a)(this).constructor;o=Reflect.construct(r,arguments,n)}else o=r.apply(this,arguments);return Object(d.a)(this,o)}}var x,_,k,D=function(t,e,o,desc){var r,n=arguments.length,c=n<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,o):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(n<3?r(c):n>3?r(e,o,c):r(e,o))||c);return n>3&&c&&Object.defineProperty(e,o,c),c};!function(t){t[t.DELETE=0]="DELETE",t[t.ADD=1]="ADD"}(_||(_={})),function(t){t[t.DOWN=0]="DOWN",t[t.UP=1]="UP"}(k||(k={}));var O=Object(v.namespace)("myschedule"),T=x=function(t){Object(l.a)(o,t);var e=S(o);function o(){var t;return Object(n.a)(this,o),(t=e.apply(this,arguments)).forceRenderNumber=100,t.timezone="PST",t.timezones=["PST","EST"],t.availability=new Map,t.days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],t.mouseButtonState=k.UP,t.operation=_.ADD,t}return Object(c.a)(o,[{key:"save",value:function(){var t=this,e=Array.from(this.availability).map((function(e){var o=Object(r.a)(e,2),n=o[0];return o[1].map((function(e){return{start:Number(e.start.toFormat("HHmm")),end:Number(e.end.toFormat("HHmm")),timezone:t.timezone,day:n}}))}));this.saveSchedule({apollo:this.$apollo,timezone:this.timezone,schedule:e.flat()}).then((function(){t.$toast.success("Saved").goAway(2e3)}))}},{key:"daySortFunction",get:function(){var t=this;return function(a,b){var e=t.days.findIndex((function(t){return t===a})),o=t.days.findIndex((function(t){return t===b}));return e===o?0:e<o?-1:1}}},{key:"hours",get:function(){for(var t=[],i=0;i<24;i++)t.push(i);return t}},{key:"mouseUp",value:function(){this.mouseButtonState=k.UP,this.createAvailabilityRangesFromTimeslots(),this.forceRenderNumber++}},{key:"createAvailabilityRangesFromTimeslots",value:function(){if(this.timeslot.size>1){var t=h.a.groupBy(Array.from(this.timeslot),(function(t){return t.split("_")[0]})),e=Object.keys(t);this.cleanupInactiveDays(e);for(var o=0,r=e;o<r.length;o++){var n=r[o],c=t[n].map((function(t){var slot=parseInt(t.split("_")[1]),e=2345===slot?14:15;return w.Interval.fromDateTimes(w.DateTime.fromObject({hour:Math.floor(slot/100),minute:slot%100}),w.DateTime.fromObject({hour:Math.floor(slot/100),minute:slot%100}).plus(w.Duration.fromObject({minutes:e})))})),l=w.Interval.merge(c);this.availability.set(n,l)}}this.forceRenderNumber++}},{key:"cleanupInactiveDays",value:function(t){var e=this;Array.from(this.availability.keys()).filter((function(e){return!t.includes(e)})).forEach((function(t){e.availability.delete(t)}))}},{key:"mouseOver",value:function(t,slot){var e=x.createKey(t,slot);this.mouseButtonState===k.DOWN&&this.$refs[e]&&(this.operation===_.ADD?this.selectTimeslot(t,slot):this.operation===_.DELETE&&this.deSelectTimeslot(t,slot))}},{key:"selectTimeslot",value:function(t,slot){var e=x.createKey(t,slot);if(this.$refs[e]){var o=this.$refs[e];o.length>0&&o[0].classList.add("selected")}this.addTimeslotKey(e)}},{key:"deSelectTimeslot",value:function(t,slot){var e=x.createKey(t,slot);if(this.$refs[e]){var o=this.$refs[e];o.length>0&&o[0].classList.remove("selected")}this.deleteTimeslotKey(e)}},{key:"mouseDown",value:function(t,slot){this.operation=this.timeslot.has(x.createKey(t,slot))?_.DELETE:_.ADD,this.mouseButtonState=k.DOWN,this.mouseOver(t,slot)}},{key:"createSlot",value:function(t,e){return String(t).padStart(2,"0")+String(e).padStart(2,"0")}},{key:"getTimeslotClasses",value:function(t,slot){var e=["timeslot"];return this.timeslot.has(x.createKey(t,slot))&&e.push("selected"),e}},{key:"mounted",value:function(){var t=this;this.loadSchedule(this.$apollo).then((function(){t.createAvailabilityRangesFromTimeslots()}))}}],[{key:"createKey",value:function(t,slot){return"".concat(t,"_").concat(slot)}}]),o}(v.Vue);D([O.Mutation],T.prototype,"deleteTimeslotKey",void 0),D([O.Mutation],T.prototype,"addTimeslotKey",void 0),D([O.State],T.prototype,"timeslot",void 0),D([O.Action],T.prototype,"loadSchedule",void 0),D([O.Action],T.prototype,"saveSchedule",void 0);var j=T=x=D([Object(v.Component)({filters:{humanDate:function(t){return t.start.toFormat("HH:mm")+"-"+t.end.toFormat("HH:mm")}},middleware:"auth.middleware"})],T),R=(o(513),o(112)),A=o(148),C=o.n(A),E=o(218),P=o(499),F=o(541),component=Object(R.a)(j,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",[o("div",{staticClass:"tw-rounded tw-bg-gray-700 tw-mx-auto tw-flex xs:tw-w-1/2 lg:tw-w-3/4"},[o("div",{staticClass:"lg:tw-w-1/2 xs:tw-w-1/3 tw-m-1 tw-flex-col tw-flex tw-items-center"},[o("v-select",{staticClass:"tw-w-2/3",staticStyle:{"flex-grow":"0","flex-direction":"column-reverse"},attrs:{"background-color":"#035b45",rounded:"",items:t.timezones,label:"timezone"}}),t._v(" "),t._l(Array.from(t.availability.keys()).sort(t.daySortFunction),(function(e){return o("div",{key:e,staticClass:"tw-rounded tw-bg-gray-500 tw-mt-2 tw-p-2 hover:tw-bg-blue-800 tw-w-full"},[t._v("\n        "+t._s(e)+":\n        "),t._l(t.availability.get(e),(function(e){return o("span",{key:e.start.toISO(),staticClass:"tw-h-auto"},[t._v("\n          ["+t._s(t._f("humanDate")(e))+"]\n        ")])}))],2)})),t._v(" "),o("v-btn",{staticClass:"tw-w-1/2 tw-mt-2",on:{click:t.save}},[t._v("Save")])],2),t._v(" "),o("div",{key:t.forceRenderNumber,staticClass:"tw-bg-white tw-p-6 lg:tw-w-1/2 xs:tw-w-2/3 tw-rounded tw-px-2 tw-py-1 tw-m-1"},[o("div",{staticClass:"tw-grid tw-grid-flow-col tw-grid-cols-7 tw-w-auto tw-m-auto tw-text-black tw-col-start-2"},t._l(t.days,(function(e,r){return o("div",{key:r,class:"tw-col-start-"+(r+2)},[o("span",{staticClass:"xs:tw-text-xs"},[t._v("\n            "+t._s(e)+"\n          ")])])})),0),t._v(" "),t._l(t.hours,(function(e){return o("div",{key:e,staticClass:"tw-grid tw-grid-flow-col tw-grid-cols-7 tw-w-auto tw-m-auto",on:{mouseup:function(e){return e.stopPropagation(),t.mouseUp(e)}}},[o("div",{staticClass:"timeslot-time tw-w-full xs:tw-text-2xs"},[t._v(t._s(e)+":00")]),t._v(" "),t._l(t.days,(function(r){return t._l([0,15,30,45],(function(n){return o("div",{key:r+"_"+t.createSlot(e,n),ref:r+"_"+t.createSlot(e,n),refInFor:!0,class:t.getTimeslotClasses(r,t.createSlot(e,n)),attrs:{"data-time":r+"_"+t.createSlot(e,n)},on:{mouseover:function(o){t.mouseOver(r,t.createSlot(e,n))},mousedown:function(o){t.mouseDown(r,t.createSlot(e,n))},mouseup:function(e){return e.stopPropagation(),t.mouseUp(e)},touchstart:function(o){o.stopPropagation(),t.mouseDown(r,t.createSlot(e,n))},touchend:function(e){return e.stopPropagation(),t.mouseUp(e)},touchmove:function(o){o.stopPropagation(),t.mouseOver(r,t.createSlot(e,n))}}})}))}))],2)}))],2)])])}),[],!1,null,null,null);e.default=component.exports;C()(component,{VBtn:E.a,VContainer:P.a,VSelect:F.a})}}]);