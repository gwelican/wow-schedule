(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{101:function(e,t,n){"use strict";var r={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(n(350),n(112)),c=n(148),l=n.n(c),f=n(495),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{dark:""}},[404===e.error.statusCode?n("h1",[e._v("\n    "+e._s(e.pageNotFound)+"\n  ")]):n("h1",[e._v("\n    "+e._s(e.otherError)+"\n  ")]),e._v(" "),n("NuxtLink",{attrs:{to:"/"}},[e._v(" Home page ")])],1)}),[],!1,null,"495dc2cf",null);t.a=component.exports;l()(component,{VApp:f.a})},227:function(e,t,n){"use strict";var r=n(1),o=n(303),c=n.n(o);r.default.component("Apexchart",c.a)},260:function(e,t,n){var content=n(351);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(23).default)("760ccb54",content,!0,{sourceMap:!1})},305:function(e,t,n){"use strict";n(78);var r=n(21),o=n(26),c=n(40),l=n(41),f=n(39),v=n(20),d=n(19),h=(n(79),n(15),n(150)),y=n(98);function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(v.a)(e);if(t){var o=Object(v.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var k=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},O=Object(h.namespace)("token"),j=function(e){Object(l.a)(f,e);var t,n=m(f);function f(){var e;return Object(o.a)(this,f),(e=n.apply(this,arguments)).items=[{icon:"mdi-apps",title:"my Schedule",to:"/my-schedule"},{icon:"mdi-chart-bubble",title:"Who is available",to:"/"}],e}return Object(c.a)(f,[{key:"logout",value:(t=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.$cookies.remove(y.a),this.$cookies.remove(y.b),this.clearTokens(),e.next=5,this.$router.push("/login");case 5:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})}]),f}(h.Vue);k([O.State],j.prototype,"user",void 0),k([O.State],j.prototype,"loggedIn",void 0),k([O.Action("clearTokens")],j.prototype,"clearTokens",void 0);var x=j=k([h.Component],j),R=n(112),w=n(148),T=n.n(w),A=n(495),_=n(500),S=n(220),M=n(214),I=n(181),D=n(501),z=n(496),V=n(215),F=n(216),$=n(138),E=n(169),P=n(497),B=n(487),L=n(498),C=n(499),component=Object(R.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{dark:"",dense:"",app:""}},[n("v-tabs",{attrs:{"center-active":"",centered:""}},e._l(e.items,(function(t){return n("v-tab",{key:t.to,attrs:{to:t.to,href:t.href}},[void 0===t.visible?n("v-card",[n("v-card-title",[e._v("\n            "+e._s(t.title)+"\n          ")])],1):e._e()],1)})),1),e._v(" "),e.$store.state.token.loggedIn?n("v-menu",{attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("v-btn",e._g(e._b({},"v-btn",o,!1),r),[e._v(e._s(e.user))])]}}],null,!1,2354707395)},[e._v(" "),n("v-list",[n("v-list-item",[n("v-list-item-content",[e._v(" User settings(todo) ")])],1)],1)],1):e._e(),e._v(" "),e.loggedIn?n("v-btn",{on:{click:e.logout}},[n("v-icon",[e._v("mdi-logout")])],1):e._e()],1),e._v(" "),n("v-main",[n("v-container",[n("nuxt")],1)],1),e._v(" "),n("v-footer",{attrs:{app:""}},[n("span",[e._v("© "+e._s((new Date).getFullYear()))])])],1)}),[],!1,null,null,null);t.a=component.exports;T()(component,{VApp:A.a,VAppBar:_.a,VBtn:S.a,VCard:M.a,VCardTitle:I.c,VContainer:D.a,VFooter:z.a,VIcon:V.a,VList:F.a,VListItem:$.a,VListItemContent:E.a,VMain:P.a,VMenu:B.a,VTab:L.a,VTabs:C.a})},324:function(e,t,n){n(325),e.exports=n(326)},341:function(e,t,n){"use strict";n.r(t),n.d(t,"auth",(function(){return r}));var r=function(e){var t=e.redirect;if(!e.store.state.token.loggedIn)return console.log("redirect to login"),t("/login")};t.default=r},350:function(e,t,n){"use strict";n(260)},351:function(e,t,n){var r=n(22)((function(i){return i[1]}));r.push([e.i,"h1[data-v-495dc2cf]{\n  font-size:20px\n}",""]),e.exports=r},420:function(e,t,n){"use strict";n.r(t),n.d(t,"getIntervalForTime",(function(){return _}));n(78),n(51),n(37),n(59),n(10),n(61),n(66);var r,o=n(142),c=n(21),l=n(26),f=n(40),v=n(41),d=n(39),h=n(20),y=n(19),m=(n(79),n(15),n(306),n(29),n(50),n(307),n(308),n(309),n(310),n(311),n(312),n(313),n(314),n(315),n(316),n(317),n(318),n(319),n(53),n(35)),k=n(74),O=n(94),j=n.n(O);function x(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return R(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return R(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function w(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(h.a)(e);if(t){var o=Object(h.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(d.a)(this,n)}}var T=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(y.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},A=function(e){Object(v.a)(d,e);var t,n=w(d);function d(){var e;return Object(l.a)(this,d),(e=n.apply(this,arguments)).series=[],e}return Object(f.a)(d,[{key:"loadAvailability",value:(t=Object(c.a)(regeneratorRuntime.mark((function e(t){var n,map,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.query({query:j()(r||(r=Object(o.a)(["\n        query UserData {\n          availability {\n            availability {\n              intervals {\n                start\n                end\n                timezone\n              }\n              day\n            }\n            username\n            userId\n            timezone\n          }\n        }\n      "])))});case 2:n=e.sent,map=S(n.data.availability),c=M(map),this.context.commit("setSeries",c);case 6:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})},{key:"setSeries",value:function(e){this.series=e}}]),d}(m.VuexModule);function _(e,t,n){return k.Interval.fromDateTimes(k.DateTime.fromObject({hour:Math.floor(e/100),minute:Math.floor(e%100),zone:n}),k.DateTime.fromObject({hour:Math.floor(t/100),minute:Math.floor(t%100),zone:n}))}function S(e){var t,n,map=new Map,r=x(e);try{for(r.s();!(n=r.n()).done;){var o=n.value;map.set(o.username,new Map);var c,l=x(o.availability);try{for(l.s();!(c=l.n()).done;){var f,v=c.value,d=[],h=x(v.intervals);try{for(h.s();!(f=h.n()).done;){var y=f.value;d.push(_(y.start,y.end,y.timezone))}}catch(e){h.e(e)}finally{h.f()}null===(t=map.get(o.username))||void 0===t||t.set(v.day,k.Interval.merge(d))}}catch(e){l.e(e)}finally{l.f()}}}catch(e){r.e(e)}finally{r.f()}return map}function M(map){var e,t=[{data:[]}],n=[-72,-48,-24,0,24,48,72],r=x(map.keys());try{for(r.s();!(e=r.n()).done;){var o,c=e.value,l=map.get(c),f=x(n);try{for(f.s();!(o=f.n()).done;){var v=o.value,d=k.DateTime.local().plus(k.Duration.fromObject({hour:v})).weekdayShort;if(l.has(d)){var h,y=x(null==l?void 0:l.get(d));try{for(y.s();!(h=y.n()).done;){var m=h.value;t[0].data.push({x:c,y:[m.start.toLocal().plus(k.Duration.fromObject({hour:v})).toJSDate().getTime(),m.end.toLocal().plus(k.Duration.fromObject({hour:v})).toJSDate().getTime()]})}}catch(e){y.e(e)}finally{y.f()}}}}catch(e){f.e(e)}finally{f.f()}}}catch(e){r.e(e)}finally{r.f()}return t}T([m.Action],A.prototype,"loadAvailability",null),T([m.Mutation],A.prototype,"setSeries",null),A=T([Object(m.Module)({stateFactory:!0,namespaced:!0})],A),t.default=A},422:function(e,t,n){"use strict";n.r(t);n(78),n(51),n(37),n(59),n(10),n(61),n(66);var r,o,c=n(142),l=n(21),f=n(26),v=n(40),d=n(41),h=n(39),y=n(20),m=n(19),k=(n(79),n(15),n(29),n(423),n(50),n(424),n(426),n(427),n(428),n(429),n(430),n(431),n(432),n(433),n(434),n(435),n(436),n(437),n(438),n(439),n(440),n(53),n(35)),O=n(94),j=n.n(O),x=n(74);function R(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return w(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return w(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(y.a)(e);if(t){var o=Object(y.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var A=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},_=function(e){Object(d.a)(y,e);var t,n,h=T(y);function y(){var e;return Object(f.a)(this,y),(e=h.apply(this,arguments)).timeslot=new Set,e.timezone="",e.weekdays={Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:7},e}return Object(v.a)(y,[{key:"saveSchedule",value:(n=Object(l.a)(regeneratorRuntime.mark((function e(t){var n,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.apollo,o=t.schedule,l=t.timezone,e.next=3,n.mutate({mutation:j()(r||(r=Object(c.a)(["\n        mutation($schedule: [IntervalInput], $timezone: String) {\n          saveSchedule(schedule: $schedule, timezone: $timezone) {\n            availability {\n              day\n              intervals {\n                day\n                end\n                start\n                timezone\n              }\n            }\n          }\n        }\n      "]))),variables:{schedule:o,timezone:l}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)}))),function(e){return n.apply(this,arguments)})},{key:"loadSchedule",value:(t=Object(l.a)(regeneratorRuntime.mark((function e(t){var n,r,l,f,v,d,h,y,m,k,O;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.query({query:j()(o||(o=Object(c.a)(["\n        query UserData {\n          myschedule {\n            availability {\n              day\n              intervals {\n                end\n                start\n                timezone\n              }\n            }\n          }\n        }\n      "])))});case 2:n=e.sent,r=new Set,l=R(n.data.myschedule.availability),e.prev=5,l.s();case 7:if((f=l.n()).done){e.next=33;break}v=f.value,d=R(v.intervals),e.prev=10,d.s();case 12:if((h=d.n()).done){e.next=23;break}if(y=h.value,this.timezone){e.next=17;break}return e.next=17,this.context.commit("setTimezone",y.timezone);case 17:for(m=S(y.start),k=S(y.end),O=v.day;k.diff(m,"minutes").minutes>0;)r.add(O+"_"+m.toFormat("HHmm")),m=m.plus(x.Duration.fromObject({minutes:15}));case 21:e.next=12;break;case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(10),d.e(e.t0);case 28:return e.prev=28,d.f(),e.finish(28);case 31:e.next=7;break;case 33:e.next=38;break;case 35:e.prev=35,e.t1=e.catch(5),l.e(e.t1);case 38:return e.prev=38,l.f(),e.finish(38);case 41:return e.next=43,this.context.commit("setTimeslot",r);case 43:case"end":return e.stop()}}),e,this,[[5,35,38,41],[10,25,28,31]])}))),function(e){return t.apply(this,arguments)})},{key:"setTimezone",value:function(e){this.timezone=e}},{key:"addTimeslotKey",value:function(e){this.timeslot.add(e)}},{key:"deleteTimeslotKey",value:function(e){this.timeslot.delete(e)}},{key:"setTimeslot",value:function(e){this.timeslot=e}}]),y}(k.VuexModule);function S(slot){return x.DateTime.now().set({hour:slot/100,minute:slot%100,second:0,millisecond:0})}A([k.Action],_.prototype,"saveSchedule",null),A([k.Action],_.prototype,"loadSchedule",null),A([k.Mutation],_.prototype,"setTimezone",null),A([k.Mutation],_.prototype,"addTimeslotKey",null),A([k.Mutation],_.prototype,"deleteTimeslotKey",null),A([k.Mutation],_.prototype,"setTimeslot",null),_=A([Object(k.Module)({stateFactory:!0,namespaced:!0})],_),t.default=_},441:function(e,t,n){"use strict";n.r(t);n(78);var r=n(21),o=n(26),c=n(40),l=n(41),f=n(39),v=n(20),d=n(19),h=(n(79),n(15),n(35)),y=n(122);function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(v.a)(e);if(t){var o=Object(v.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var k=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},O=function(e){Object(l.a)(f,e);var t,n=m(f);function f(){var e;return Object(o.a)(this,f),(e=n.apply(this,arguments)).loggedIn=!1,e}return Object(c.a)(f,[{key:"clearTokens",value:function(){this.context.commit("setAccessToken",""),this.context.commit("setRefreshToken",""),this.context.commit("setUser",""),this.context.commit("setLoggedIn",!1)}},{key:"saveAccessToken",value:(t=Object(r.a)(regeneratorRuntime.mark((function e(t){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(null==(data=Object(y.a)(t))?void 0:data.exp)&&data.exp<Date.now()&&(this.context.commit("setUser",data.battle_tag),this.context.commit("setLoggedIn",!0),this.context.commit("setAccessToken",t));case 2:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})},{key:"setAccessToken",value:function(e){this.accessToken=e}},{key:"saveRefreshToken",value:function(e){var data=Object(y.a)(e);(null==data?void 0:data.exp)&&data.exp<Date.now()&&this.context.commit("setRefreshToken",e)}},{key:"setRefreshToken",value:function(e){this.refreshToken=e}},{key:"setUser",value:function(e){this.user=e}},{key:"setLoggedIn",value:function(e){this.loggedIn=e}}]),f}(h.VuexModule);k([h.Action],O.prototype,"clearTokens",null),k([h.Action],O.prototype,"saveAccessToken",null),k([h.Mutation],O.prototype,"setAccessToken",null),k([h.Action],O.prototype,"saveRefreshToken",null),k([h.Mutation],O.prototype,"setRefreshToken",null),k([h.Mutation],O.prototype,"setUser",null),k([h.Mutation],O.prototype,"setLoggedIn",null),O=k([Object(h.Module)({stateFactory:!0,namespaced:!0})],O),t.default=O},460:function(e,t,n){"use strict";n.r(t);var r=n(299),o=n(179),c=n(98);t.default=function(e){var t=e.$toast,n=e.req,link=Object(r.a)((function(e){var n=e.networkError,r=e.graphQLErrors;n?n.statusCode?t.error("Failed to talk to the server"):r&&t.error("Server error"):t.error("Failed to talk to the server")})),l=new o.a(n&&n.headers.cookie);return{link:link,getAuth:function(){return"Bearer "+l.get(c.a)},httpEndpoint:"https://wow-data.gwelican.eu/graphql"}}},98:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return l}));var r=n(21),o=(n(79),n(122)),c="AccessToken",l="RefreshToken",f=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t){var n,r,f,v,data,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.store,r=t.$cookies,f=r.get(c),v=r.get(l),void 0===f){e.next=16;break}if(data=Object(o.a)(f),!(Date.now()>=1e3*data.exp)){e.next=14;break}console.log(Date.now()),console.log(data.exp),console.log(f),console.log("Expired accessToken"),console.log(data),r.remove(c),e.next=16;break;case 14:return e.next=16,n.dispatch("token/saveAccessToken",f);case 16:if(void 0===v){e.next=26;break}if(d=Object(o.a)(v),!(Date.now()>=1e3*d.exp)){e.next=24;break}console.log("Expired refreshToken"),console.log(d),r.remove(l),e.next=26;break;case 24:return e.next=26,n.dispatch("token/saveRefreshToken",v);case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.c=f}},[[324,8,2,9]]]);