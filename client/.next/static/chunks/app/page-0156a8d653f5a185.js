(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{51696:function(e,t,a){Promise.resolve().then(a.bind(a,67721))},67721:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return p}});var n=a(57437),s=a(25476);a(44495),a(61396);var r=a(2265),l=a(56926),o=a(35048),i=a(97796),d=a(24235),c=a(50039),m=a(61419);let h=[{name:"Jan",total:Math.floor(10*Math.random())+5},{name:"Feb",total:Math.floor(10*Math.random())+5},{name:"Mar",total:Math.floor(10*Math.random())+5},{name:"Apr",total:Math.floor(10*Math.random())+5},{name:"May",total:Math.floor(10*Math.random())+5},{name:"Jun",total:Math.floor(10*Math.random())+5},{name:"Jul",total:Math.floor(10*Math.random())+5},{name:"Aug",total:Math.floor(10*Math.random())+5},{name:"Sep",total:Math.floor(10*Math.random())+5},{name:"Oct",total:Math.floor(10*Math.random())+5},{name:"Nov",total:Math.floor(10*Math.random())+5},{name:"Dec",total:Math.floor(10*Math.random())+5}];function x(){return(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"Transaction chart"}),(0,n.jsx)(o.h,{width:"100%",height:350,children:(0,n.jsxs)(i.v,{data:h,children:[(0,n.jsx)(d.K,{dataKey:"name",stroke:"#888888",fontSize:12,tickLine:!1,axisLine:!1}),(0,n.jsx)(c.B,{stroke:"#888888",fontSize:12,tickLine:!1,axisLine:!1,tickFormatter:e=>"".concat(e)}),(0,n.jsx)(m.$,{dataKey:"total",fill:"#86efac",radius:[4,4,0,0]})]})})]})}var u=a(75813),f=a(43079),g=a(1270);function p(){let{address:e}=(0,l.mA)(),[t,a]=(0,r.useState)([]);return(0,r.useEffect)(()=>{async function t(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:420,n=await fetch("".concat("https://api.dataponte.com","/library/attestation-by-address/").concat(e,"?clientId=").concat(t)),s=await n.json();console.log(s),a(s)}e&&t(e)},[e]),(0,n.jsx)("main",{className:"flex min-h-screen  flex-col items-center justify-between p-24",children:e?(0,n.jsxs)("div",{className:"grid sm:grid-cols-7 mx-auto gap-4 p-4 items-start",children:[(0,n.jsx)("div",{className:"col-span-2 p-4 rounded-md",children:(0,n.jsx)(g.Z,{username:"JohnDoe",address:e,totalTokens:t.length})}),(0,n.jsxs)("main",{className:"col-span-5",children:[(0,n.jsx)(u.Z,{profit:500,totalContributions:t.length,approvedContributions:15,profitGrowth:7,user:!0}),(0,n.jsxs)("div",{className:"grid grid-cols-1 gap-8 m-12",children:[(0,n.jsx)(f.Z,{transactions:t}),(0,n.jsx)(x,{})]})]})]}):(0,n.jsx)("div",{className:"flex flex-col items-center justify-center",children:(0,n.jsx)(s.Z,{})})})}},25476:function(e,t,a){"use strict";a.d(t,{Z:function(){return M}});var n=a(57437),s=a(3762),r=a(2265),l=a(56926),o=a(61396),i=a.n(o),d=a(63014),c=a(60382),m=a(50431),h=a(2677),x=a(68247),u=a(68492),f=a(2246),g=a(1111),p=a(31869),j=a(88971),v=a(66486),y=a(16725);function b(e){let{loading:t,balance:a,token:s,active:r}=e,{switchNetwork:o}=(0,l.g0)();return(0,n.jsx)("div",{className:"flex flex-row items-center gap-4 p-4 rounded-lg outline ".concat(r&&"outline-green-300"," ").concat(!r&&"hover:bg-green-300/50 cursor-pointer"),onClick:()=>{r||null==o||o(s.id)},children:(0,n.jsxs)("div",{className:"flex flex-col",children:[(0,n.jsx)("span",{className:"text-sm tracking-wider text-green-300 font-bold uppercase",children:s.name}),(0,n.jsx)("span",{className:"text-gray-300 font-bold ",children:t?"loading":a})]})})}function N(e){let{showModal:t,open:a,setShowModal:s}=e,{disconnect:o}=(0,l.qL)(),[N,M]=(0,r.useState)(!0),{chain:w,chains:k}=(0,l.LN)(),[C,Z]=(0,r.useState)([]),{address:S,isConnected:L}=(0,l.mA)();async function F(){navigator.clipboard.writeText(S),d.Am.success("Copied to clipboard")}return(0,r.useEffect)(()=>{async function e(){console.log(w);for(let e=0;e<k.length;e++){let t=(0,m.v)({chain:k[e],transport:(0,h.d)(k[e].rpcUrls.default.http[0])}),a=await t.getBalance({address:S});(a=(0,c.d)(a),0==e)?Z([{chain:k[e],balance:a,active:(null==w?void 0:w.id)==k[e].id}]):Z(t=>[...t,{chain:k[e],balance:a,active:(null==w?void 0:w.id)==k[e].id}])}}S&&k&&(e(),M(!1))},[S,k,w]),(0,n.jsx)(y.Z,{title:"",showModal:t,children:L?(0,n.jsxs)("div",{className:"flex flex-col divide-solid",children:[(0,n.jsxs)("div",{id:"username",className:"text-lg",children:[(0,n.jsx)("h1",{children:"Portfolio"}),(0,n.jsx)("span",{className:"text-lg font-bold ml-4",children:"$ 0.00"}),(0,n.jsxs)("div",{className:"grid grid-cols-4 gap-2 my-4 text-gray-900",children:[(0,n.jsx)("div",{className:"rounded-md bg-green-200 flex justify-center py-4 hover:shadow-sm hover:bg-green-400",children:(0,n.jsx)(x.Z,{})}),(0,n.jsx)("div",{className:"rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400",children:(0,n.jsx)(u.Z,{})}),(0,n.jsx)("div",{className:"rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400",children:(0,n.jsx)(f.Z,{})}),(0,n.jsx)("div",{className:"rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400",children:(0,n.jsx)(g.Z,{})})]})]}),(0,n.jsx)("div",{id:"balances",className:"grid grid-cols-1 py-4 gap-4",children:C.map((e,t)=>(0,n.jsx)(b,{loading:N,token:e.chain,balance:e.balance,active:e.active},t))}),(0,n.jsxs)("div",{className:"grid grid-cols-3 p-4 gap-2",children:[(0,n.jsx)("button",{className:"font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400",onClick:()=>F(),children:(0,n.jsx)(p.Z,{})}),(0,n.jsx)(i(),{href:"/profile/settings",className:" font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400",children:(0,n.jsx)(j.Z,{})}),(0,n.jsx)("button",{className:"text-red-500 flex justify-center  py-4 font-bold hover:bg-red-200   px-3 rounded-md",onClick:()=>{o(),s(!1)},children:(0,n.jsx)(v.Z,{})})]})]}):(0,n.jsx)("p",{children:"Not connected"})})}function M(){let{connect:e,connectors:t}=(0,l.$4)(),{address:a,status:o,isConnected:i,isConnecting:d,isReconnecting:c,isDisconnected:m}=(0,l.mA)(),{chain:h,chains:x}=(0,l.LN)(),[u,f]=(0,r.useState)(!1),{data:g}=(0,l.KQ)({address:a});return((0,r.useEffect)(()=>{if(!m)return;let a=localStorage.getItem("wagmi.connected"),n=!!a&&JSON.parse(a);n&&e({connector:t})},[e,t,m]),d)?(0,n.jsx)("div",{className:"text-md text-white bg-gray-800 rounded-full py-1 px-8",children:"Loading"}):!d&&a?(0,n.jsxs)("div",{className:"flex rounded-md  items-center gap-2",children:[(0,n.jsxs)("button",{className:" bg-gray-800 py-1 px-4 outline rounded-md outline-gray-900 text-md overflow truncate tracking-wider hover:outline-indigo-500",onClick:()=>f(!u),children:[function(e,t){if(e.length<=t)return e;let a=Math.floor((t-3)/2),n=e.slice(0,a),s=e.slice(-a);return n+"..."+s}(a,13),u&&(0,n.jsx)(N,{address:a,showModal:u,setShowModal:f})]}),(null==h?void 0:h.id)!=420&&(null==h?void 0:h.id)!=84531&&(null==h?void 0:h.id)!=5&&(0,n.jsx)(s.z,{className:"bg-red-600",onClick:()=>f(!u),children:"Unsupported Chain"})]}):c||i||d||a?(0,n.jsx)("div",{className:"text-md text-white bg-cf-500 rounded-full py-1 px-8",children:"Loading"}):(0,n.jsx)("div",{className:"flex gap-4 items-center",children:(0,n.jsx)("div",{className:"flex gap-4",children:!c&&!i&&t.map(t=>(0,n.jsx)("button",{className:"bg-gray-800 text-md text-gray-3for00 rounded-md text-md py-1 px-4",onClick:()=>e({connector:t}),children:t.name},t.id))})})}},16725:function(e,t,a){"use strict";a.d(t,{Z:function(){return d}});var n=a(57437),s=a(9805),r=a(89663),l=a(96689),o=a(2265),i=a(56926);function d(e){let{title:t,children:a,showModal:d}=e,[c,m]=(0,o.useState)(!0),{chain:h}=(0,i.LN)(),{switchNetwork:x}=(0,i.g0)();(0,o.useEffect)(()=>{d&&m(d)},[d]);let u=e=>{m(e)};return(0,n.jsx)(s.u.Root,{show:c,as:o.Fragment,children:(0,n.jsxs)(r.V,{as:"div",className:"relative z-10",onClose:u,children:[(0,n.jsx)(s.u.Child,{as:o.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,n.jsx)("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})}),(0,n.jsx)("div",{className:"fixed inset-0 z-10 overflow-y-auto",children:(0,n.jsx)("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ",children:(0,n.jsx)(s.u.Child,{as:o.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:(0,n.jsxs)(r.V.Panel,{className:"relative transform overflow-hidden rounded-lg bg-gray-600 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6",children:[(0,n.jsx)("h2",{className:"text-xl font-bold mb-4",children:t}),(0,n.jsx)("div",{className:"absolute right-0 top-0 hidden pr-4 pt-4 sm:block ",children:(0,n.jsxs)("button",{type:"button",className:"rounded-md bg-gray-600 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:()=>u(!1),children:[(0,n.jsx)("span",{className:"sr-only",children:"Close"}),(0,n.jsx)(l.Z,{className:"h-6 w-6","aria-hidden":"true"})]})}),(0,n.jsx)("div",{className:"",children:a})]})})})})]})})}}},function(e){e.O(0,[638,396,522,358,321,666,893,241,936,275,289,971,596,744],function(){return e(e.s=51696)}),_N_E=e.O()}]);