(function(e){function t(t){for(var n,r,l=t[0],u=t[1],c=t[2],d=0,m=[];d<l.length;d++)r=l[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&m.push(i[r][0]),i[r]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);f&&f(t);while(m.length)m.shift()();return a.push.apply(a,c||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],n=!0,r=1;r<o.length;r++){var l=o[r];0!==i[l]&&(n=!1)}n&&(a.splice(t--,1),e=u(u.s=o[0]))}return e}var n={},r={app:0},i={app:0},a=[];function l(e){return u.p+"js/"+({"home~mobile":"home~mobile",home:"home",mobile:"mobile"}[e]||e)+"."+{"home~mobile":"eccb38d6",home:"e7f5b6f9",mobile:"7f22356d"}[e]+".js"}function u(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,u),o.l=!0,o.exports}u.e=function(e){var t=[],o={home:1,mobile:1};r[e]?t.push(r[e]):0!==r[e]&&o[e]&&t.push(r[e]=new Promise((function(t,o){for(var n="css/"+({"home~mobile":"home~mobile",home:"home",mobile:"mobile"}[e]||e)+"."+{"home~mobile":"31d6cfe0",home:"54556e57",mobile:"ff7c3558"}[e]+".css",i=u.p+n,a=document.getElementsByTagName("link"),l=0;l<a.length;l++){var c=a[l],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===n||d===i))return t()}var m=document.getElementsByTagName("style");for(l=0;l<m.length;l++){c=m[l],d=c.getAttribute("data-href");if(d===n||d===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=n,delete r[e],f.parentNode.removeChild(f),o(a)},f.href=i;var s=document.getElementsByTagName("head")[0];s.appendChild(f)})).then((function(){r[e]=0})));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,o){n=i[e]=[t,o]}));t.push(n[2]=a);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=l(e);var m=new Error;c=function(t){d.onerror=d.onload=null,clearTimeout(f);var o=i[e];if(0!==o){if(o){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;m.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",m.name="ChunkLoadError",m.type=n,m.request=r,o[1](m)}i[e]=void 0}};var f=setTimeout((function(){c({type:"timeout",target:d})}),12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(t)},u.m=e,u.c=n,u.d=function(e,t,o){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(u.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(o,n,function(t){return e[t]}.bind(null,n));return o},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=t,c=c.slice();for(var m=0;m<c.length;m++)t(c[m]);var f=d;a.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},1115:function(e,t,o){"use strict";t["a"]={error:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABc0lEQVRYhe3XsUrEQBQF0FnESguLbcRSLAWx0MY/sFArsbZUG8kHTLFpZsPcex8WLlhapVUbO39A/AYtdF3/YWxcWERlAyGLkAspwrwXDgOB95xr80NijAcAhmaWpn0AnNUGADCMMW5NW29mSdIbgN1aAGaWqtYD2DSzFELYmAnAOedijHskX3u93spMAM45B+Bc0qP3fnEmgJRSB8AlyZuyLOcaAUh67/f72+P3wWAwT/JekjUCALD/22/bCKD277SAFtACWsC/BaSUOpIuUkqdmQBIHptZInncOMB7v/Q1lp1IevPeLzUKkGQkr5xzjuSVJGsMEGNclzTy3nfNLHnvu5JGjQEkPZA8newledoIAMARgKfx+DXuLctyDsATycPKAADDyRHrt2RZtiDppSiKnZ/Oi6LYIfmcZdlCJUCMcW/azUjS9WTv99uTdE0yrwSYJiGENZIfeZ4v/1WX5/mypFEIYbVWgKS7irvjba2AuvIJyiqMJrkwPfIAAAAASUVORK5CYII=",loading:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwcHgiIGhlaWdodD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXJvbGxpbmciIHN0eWxlPSJiYWNrZ3JvdW5kOiByZ2IoMjQzLCAyNDMsIDI0Mykgbm9uZSByZXBlYXQgc2Nyb2xsIDAlIDAlOyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGNkY2RjIiBzdHJva2Utd2lkdGg9IjIiIHI9IjUiIHN0cm9rZS1kYXNoYXJyYXk9IjIzLjU2MTk0NDkwMTkyMzQ0NyA5Ljg1Mzk4MTYzMzk3NDQ4MyI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJsaW5lYXIiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L3N2Zz4=",mobileError:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXJvbGxpbmciIHN0eWxlPSJiYWNrZ3JvdW5kOiByZ2IoMCwgMCwgMCkgbm9uZSByZXBlYXQgc2Nyb2xsIDAlIDAlOyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGNkY2RjIiBzdHJva2Utd2lkdGg9IjIiIHI9IjUiIHN0cm9rZS1kYXNoYXJyYXk9IjIzLjU2MTk0NDkwMTkyMzQ0NyA5Ljg1Mzk4MTYzMzk3NDQ4MyIgdHJhbnNmb3JtPSJyb3RhdGUoOC43NTY2NCA1MCA1MCkiPjwvY2lyY2xlPjwvc3ZnPg==",mobileLoading:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXJvbGxpbmciIHN0eWxlPSJiYWNrZ3JvdW5kOiByZ2IoMCwgMCwgMCkgbm9uZSByZXBlYXQgc2Nyb2xsIDAlIDAlOyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGNkY2RjIiBzdHJva2Utd2lkdGg9IjIiIHI9IjUiIHN0cm9rZS1kYXNoYXJyYXk9IjIzLjU2MTk0NDkwMTkyMzQ0NyA5Ljg1Mzk4MTYzMzk3NDQ4MyIgdHJhbnNmb3JtPSJyb3RhdGUoOC43NTY2NCA1MCA1MCkiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ibGluZWFyIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9jaXJjbGU+PC9zdmc+"}},"3dfd":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},r=[],i={name:"App",created:function(){this.$IS_TOUCH?(document.body.style.backgroundColor="black",this.$router.push("/mobile")):this.$router.push("/home")}},a=i,l=o("2877"),u=Object(l["a"])(a,n,r,!1,null,null,null);t["a"]=u.exports},"41cb":function(e,t,o){"use strict";var n=o("2b0e"),r=o("8c4f");n["default"].use(r["a"]),t["a"]=new r["a"]({routes:[{path:"/home",name:"home",component:function(){return Promise.all([o.e("home~mobile"),o.e("home")]).then(o.bind(null,"bb51"))}},{path:"/mobile",name:"mobile",component:function(){return Promise.all([o.e("home~mobile"),o.e("mobile")]).then(o.bind(null,"8bea"))}}]})},"56d7":function(e,t,o){"use strict";o.r(t),function(e){o("6762"),o("2fdb"),o("be4f"),o("450d");var t=o("896a"),n=o.n(t),r=(o("46a1"),o("e5f2")),i=o.n(r),a=(o("9e1f"),o("6ed5")),l=o.n(a),u=(o("0fb7"),o("f529")),c=o.n(u),d=(o("acb6"),o("c673")),m=o.n(d),f=(o("a7cc"),o("df33")),s=o.n(f),b=(o("9d4c"),o("e450")),I=o.n(b),p=(o("b5d8"),o("f494")),y=o.n(p),g=(o("aaa5"),o("a578")),h=o.n(g),A=(o("eca7"),o("3787")),N=o.n(A),M=(o("425f"),o("4105")),Z=o.n(M),v=(o("1951"),o("eedf")),w=o.n(v),j=(o("10cb"),o("f3ad")),S=o.n(j),k=(o("cadf"),o("551c"),o("f751"),o("097d"),o("f5df"),o("db43"),o("2b0e")),P=o("caf9"),W=o("3dfd"),D=o("41cb"),C=o("1115"),z="ontouchend"in document;k["default"].config.productionTip=!1,k["default"].use(P["a"],{preLoad:1,error:z?C["a"].mobileError:C["a"].error,loading:z?C["a"].mobileLoading:C["a"].loading,attempt:1,adapter:{error:function(e){var t=e.src;console.log("v-lazy img load error with url : "+t)}}}),k["default"].use(S.a),k["default"].use(w.a),k["default"].use(Z.a),k["default"].use(N.a),k["default"].use(h.a),k["default"].use(y.a),k["default"].use(I.a),k["default"].use(s.a),k["default"].use(m.a),k["default"].prototype.$message=c.a,k["default"].prototype.$msgbox=l.a,k["default"].prototype.$notify=i.a,k["default"].prototype.$loading=n.a.service,k["default"].prototype.$getImgPath=function(e){return window.location.href.includes("file://")?e:"/api/image?f="+e},k["default"].prototype.$PLATFORM=e.platform,k["default"].prototype.$IS_TOUCH=z,k["default"].prototype.$IS_E=Boolean(window.require),k["default"].prototype.$IS_E_NOTIFY=function(){return k["default"].prototype.$IS_E||i()({title:"提示",message:"当前非Electron环境",duration:1500}),k["default"].prototype.$IS_E},new k["default"]({router:D["a"],render:function(e){return e(W["a"])}}).$mount("#app")}.call(this,o("f28c"))},db43:function(e,t,o){}});