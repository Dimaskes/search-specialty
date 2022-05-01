(function(){"use strict";var e={4933:function(e,t,n){n(6992),n(8674),n(9601),n(7727);var i=n(144),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}}),n("v-main",[n("v-container",[n("search-specialty")],1)],1)],1)},s=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"search__container"},[n("async-input",{attrs:{items:e.specialtyList,"item-option":"title",groupName:"Специальность","empty-text":"Не найдено специальностей",label:"Врач, заболевания, услуги"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),n("div",{staticClass:"search__actions"},[n("button",{staticClass:"search__button",attrs:{type:"button"},on:{click:e.loadSpecialty}},[e._v(" Найти ")])])],1)},o=[],a=(n(1539),n(9669)),l=n.n(a);function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return new Promise((function(n,i){l().get("json/specialty.json",{params:{search:e,page:t}}).then((function(e){return n(e.data)})).catch((function(e){return i(e)}))}))}var p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.unFocusHandler,expression:"unFocusHandler"}],staticClass:"search__wrapper"},[n("ul",{class:{"search__label-active":e.isActiveLabel},attrs:{id:"search"}},[e.selectedItems.length?n("v-icon",{staticClass:"clear-icon",on:{click:e.clearSelectedItems}},[e._v(" mdi-close ")]):e._e(),e._l(e.selectedItems,(function(t,i){return n("li",{key:t.id||t},[e._v(" "+e._s(t[e.itemOption]||t)+e._s(e.getSelectedPostfix(i))+" ")])})),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.searchInput,expression:"searchInput",modifiers:{trim:!0}}],ref:"searchInput",attrs:{type:"text",autocomplete:"off"},domProps:{value:e.searchInput},on:{input:[function(t){t.target.composing||(e.searchInput=t.target.value.trim())},e.changeValue],focus:function(t){e.isFocused=!0},blur:function(t){return e.$forceUpdate()}}})],2),n("label",{staticClass:"search__label",class:{"search__label-active":e.searchInput},attrs:{for:"search"}},[e._v(" "+e._s(e.label)+" ")]),n("dropdown-menu",{attrs:{"empty-text":e.emptyText,isOpen:e.isFocused,items:e.filteredItems,search:e.searchInput,option:e.itemOption,"group-name":e.groupName},on:{selectItem:e.selectItem}})],1)},d=[],h=(n(7327),n(6699),n(2023),n(561),n(6486)),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dropdown-list",class:{active:e.isOpen},on:{scroll:e.scrollHandler}},[e.visibleItems.length?n("ul",[e.groupName?n("li",{staticClass:"dropdown-list__item dropdown-list__item-group"},[e._v(" "+e._s(e.groupName)+" ")]):e._e(),e._l(e.visibleItems,(function(t){return n("li",{key:t.id||t,staticClass:"dropdown-list__item",domProps:{innerHTML:e._s(e.getOptionText(t[e.option]||t))},on:{click:function(n){return n.preventDefault(),e.selectItem(t)}}})}))],2):n("div",{staticClass:"dropdown-list__empty"},[e._v(e._s(e.emptyText))])])},m=[],v=n(8932),g=(n(7042),n(4916),n(4765),n(2222),{name:"dropdown-menu",props:{isOpen:{type:Boolean,required:!0},items:{type:Array,required:!0},option:{type:String,default:""},groupName:{type:String,default:""},search:{type:String,default:""},emptyText:{type:String,required:!0}},data:function(){return{visibleItems:[],pageSize:10}},watch:{items:function(e){this.visibleItems=e.slice(0,this.pageSize)}},methods:{getOptionText:function(e){if(!this.search||!this.hasMatchedSubstring(e,this.search))return e;var t=e.toLowerCase().indexOf(this.search.toLowerCase());return this.getHighlightedText(e,t,this.search.length)},getHighlightedText:function(e,t,n){return e.slice(0,t)+"<b>"+e.slice(t,t+n)+"</b>"+e.slice(t+n,e.length)},hasMatchedSubstring:function(e,t){return e.toLowerCase().includes(t.toLowerCase())},selectItem:function(e){this.$emit("selectItem",e)},scrollHandler:function(e){var t=this.visibleItems.length;this.isScrollEnd(e)&&t<this.items.length&&(this.visibleItems=[].concat((0,v.Z)(this.visibleItems),(0,v.Z)(this.items.slice(t,t+this.pageSize))))},isScrollEnd:function(e){return e.target.offsetHeight+e.target.scrollTop>=e.target.scrollHeight}}}),y=g,_=n(1001),b=(0,_.Z)(y,f,m,!1,null,"06388942",null),I=b.exports,S={name:"async-input",components:{DropdownMenu:I},props:{value:{type:String,required:!0},items:{type:Array,default:function(){return[]}},itemOption:{type:String,default:""},label:{type:String,required:!0},emptyText:{type:String,required:!0},groupName:{type:String,default:""}},data:function(){return{isFocused:!1,searchInput:"",selectedItems:[]}},computed:{filteredItems:function(){var e=this;return this.excludeSelectedItemsArr.filter((function(t){return t.title.toLowerCase().includes(e.value.toLowerCase())}))},excludeSelectedItemsArr:function(){var e=this;return this.items.filter((function(t){return!e.selectedItems.includes(t)}))},isActiveLabel:function(){return this.selectedItems.length||this.value||this.isFocused}},methods:{changeValue:(0,h.debounce)((function(){this.$emit("input",this.searchInput)}),600),selectItem:function(e){this.selectedItems.push(e),this.clearSearchInput(),this.$refs.searchInput.focus()},getSelectedPostfix:function(e){return e+1===this.selectedItems.length?"":","},clearSelectedItems:function(){this.selectedItems.splice(0,this.selectedItems.length)},clearSearchInput:function(){this.searchInput="",this.$emit("input","")},unFocusHandler:function(){this.isFocused=!1,this.clearSearchInput()}}},w=S,x=n(3453),O=n.n(x),C=n(24),Z=n(6392),k=n.n(Z),T=n(7860),j=(0,_.Z)(w,p,d,!1,null,"333e9237",null),L=j.exports;O()(j,{VIcon:C.Z}),k()(j,{ClickOutside:T.Z});var A={name:"search-specialty",components:{AsyncInput:L},data:function(){return{specialtyList:[],search:""}},methods:{loadSpecialty:function(){var e=this;u().then((function(t){var n=t.data;e.specialtyList=n})).catch((function(e){console.log("Error in method GET json/specialty.json - ".concat(e))}))}},mounted:function(){this.loadSpecialty()}},H=A,$=(0,_.Z)(H,c,o,!1,null,"1d57d996",null),E=$.exports,F={name:"App",components:{SearchSpecialty:E}},P=F,M=n(7524),N=n(3827),V=n(2255),q=n(7877),z=(0,_.Z)(P,r,s,!1,null,"1f061d8b",null),B=z.exports;O()(z,{VApp:M.Z,VAppBar:N.Z,VContainer:V.Z,VMain:q.Z});var D=n(5591);i.Z.use(D.Z);var G=new D.Z({}),U=n(2649),J=n.n(U);i.Z.config.productionTip=!1,i.Z.use(J()),new i.Z({vuetify:G,render:function(e){return e(B)}}).$mount("#app")}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var s=t[i]={id:i,loaded:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.loaded=!0,s.exports}n.m=e,function(){var e=[];n.O=function(t,i,r,s){if(!i){var c=1/0;for(u=0;u<e.length;u++){i=e[u][0],r=e[u][1],s=e[u][2];for(var o=!0,a=0;a<i.length;a++)(!1&s||c>=s)&&Object.keys(n.O).every((function(e){return n.O[e](i[a])}))?i.splice(a--,1):(o=!1,s<c&&(c=s));if(o){e.splice(u--,1);var l=r();void 0!==l&&(t=l)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[i,r,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var r,s,c=i[0],o=i[1],a=i[2],l=0;if(c.some((function(t){return 0!==e[t]}))){for(r in o)n.o(o,r)&&(n.m[r]=o[r]);if(a)var u=a(n)}for(t&&t(i);l<c.length;l++)s=c[l],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(u)},i=self["webpackChunkclinic_task"]=self["webpackChunkclinic_task"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(4933)}));i=n.O(i)})();
//# sourceMappingURL=app-legacy.f950b3f1.js.map