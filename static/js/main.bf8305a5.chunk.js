(this["webpackJsonpstocks-analyzer"]=this["webpackJsonpstocks-analyzer"]||[]).push([[0],{158:function(t,e,a){},192:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),c=a(15),o=a.n(c),s=(a(158),a(76)),i=s.c,l=a(225),u=a(227),d=a(223),j=a(224),b=a(226),m=a(222),f=a(219),h=a(220),O=a(122);function p(t){var e=t[0],a=parseInt(t[1]),n=parseFloat(t[2]),r=parseFloat(t[3]);return{symbol:e,date:isNaN(a)?-1:a,amount:isNaN(n)?-1:n,price:isNaN(r)?-1:r}}var x=a(25),v=a(128),y=a.n(v),g=a(126),S=a.n(g),w=a(127),C=a.n(w),A=a(230);var D=a(24),k=a(229),E=a(132),P=a(5);function T(t){return Object(P.jsx)(D.a,{utils:E.a,children:Object(P.jsx)(k.a,{margin:"normal",format:"MM/dd/yyyy",value:function(t){var e=new Date(t);return function(t){var e=t+1;return e<10?"0"+e.toString():e.toString()}(e.getMonth())+"/"+function(t){return t<10?"0"+t.toString():t.toString()}(e.getDate())+"/"+e.getFullYear().toString()}(t.value),onChange:function(e){e&&t.onChange(e.getTime())},variant:"dialog",KeyboardButtonProps:{"aria-label":"change date"}})})}function M(t,e){return Math.round((t+Number.EPSILON)*Math.pow(10,e))/Math.pow(10,e)}function R(t,e){var a=t.toFixed(e);return"0.00"!==a?a:t.toString()}function F(t){var e=Object(n.useState)(!1),a=Object(x.a)(e,2),r=a[0],c=a[1],o=Object(n.useState)(t.data.symbol),s=Object(x.a)(o,2),i=s[0],l=s[1],u=Object(n.useState)(t.data.date),j=Object(x.a)(u,2),b=j[0],f=j[1],h=Object(n.useState)(t.data.amount),O=Object(x.a)(h,2),p=O[0],v=O[1],g=Object(n.useState)(t.data.price),w=Object(x.a)(g,2),D=w[0],k=w[1],E=new Date(t.data.date),R=new Intl.NumberFormat("en-US"),F=0===t.data.amount?"neither":t.data.amount>0?"buy":"sell",N="buy"===F?"red":"sell"===F?"green":"black",z=t.isUsed?"line-through":"none";function W(){c(!r)}return Object(P.jsxs)(m.a,{children:[Object(P.jsx)(d.a,{children:r?Object(P.jsx)(C.a,{onClick:function(e){return t.updateRow(t.uuid,{symbol:i,date:b,amount:p,price:D}),void W()}}):Object(P.jsx)(S.a,{onClick:function(t){W()}})}),Object(P.jsx)(d.a,{style:{minWidth:80,textDecoration:z},children:r?Object(P.jsx)(A.a,{value:i,onChange:function(t){return l(t.target.value)},variant:"outlined",inputProps:{style:{minWidth:"60"}}}):t.data.symbol}),Object(P.jsx)(d.a,{children:r?Object(P.jsx)("div",{style:{minWidth:140},children:Object(P.jsx)(T,{value:t.data.date,onChange:function(t){return f(t)}})}):E.toLocaleDateString()+" "+E.toLocaleTimeString()}),Object(P.jsx)(d.a,{style:{color:N},children:r?Object(P.jsx)(A.a,{type:"number",value:p,onChange:function(t){var e=parseFloat(t.target.value);e&&v(e)},inputProps:{style:{color:N}},style:{minWidth:100},variant:"outlined"}):t.data.amount}),Object(P.jsx)(d.a,{style:{color:N},children:r?Object(P.jsx)(A.a,{type:"number",value:D,onChange:function(t){var e=parseFloat(t.target.value);e&&k(e)},inputProps:{style:{color:N}},style:{minWidth:100},variant:"outlined"}):"$"+R.format(t.data.price)}),Object(P.jsx)(d.a,{style:{color:N},children:r?"$"+R.format(M(D*p,2)):"$"+R.format(M(t.data.price*t.data.amount,2))}),Object(P.jsx)(d.a,{onClick:function(){return t.deleteRow(t.uuid)},children:Object(P.jsx)(y.a,{})})]})}var N=a(46),z=a.n(N),W=a(130),$=a.n(W),I=a(129),B=a.n(I);function J(t){return Object(P.jsx)("div",{children:Object(P.jsxs)(z.a,{container:!0,spacing:3,children:[Object(P.jsx)(z.a,{item:!0,xs:12,sm:1}),Object(P.jsx)(z.a,{item:!0,xs:12,sm:3,children:Object(P.jsx)("h2",{children:t.title})}),Object(P.jsx)(z.a,{item:!0,xs:12,sm:3}),Object(P.jsx)(z.a,{item:!0,xs:12,sm:4,children:Object(P.jsxs)("h2",{children:[Object(P.jsx)(B.a,{}),Object(P.jsx)(A.a,{disabled:!0})]})}),Object(P.jsx)(z.a,{item:!0,xs:12,sm:1,children:Object(P.jsx)("h2",{children:Object(P.jsx)($.a,{onClick:function(){t.addRow()}})})}),Object(P.jsx)(z.a,{item:!0,xs:12,sm:1})]})})}function U(t){return Object(P.jsxs)("div",{children:[Object(P.jsxs)(j.a,{component:f.a,children:[Object(P.jsx)(J,{title:t.title,addRow:t.addRow}),Object(P.jsx)("div",{style:{maxHeight:400,overflowX:"auto"},children:Object(P.jsxs)(l.a,{stickyHeader:!0,children:[Object(P.jsx)(b.a,{children:Object(P.jsxs)(m.a,{children:[Object(P.jsx)(d.a,{}),Object(P.jsx)(d.a,{children:"Symbol "}),Object(P.jsx)(d.a,{children:"Date"}),Object(P.jsx)(d.a,{children:"Amount"}),Object(P.jsx)(d.a,{children:"Price"}),Object(P.jsx)(d.a,{children:"Total"}),Object(P.jsx)(d.a,{})]})}),Object(P.jsx)(u.a,{children:Object.entries(t.data).map((function(e){var a=e[0],n=e[1],r=0===t.dcaData[a];return Object(P.jsx)(F,{uuid:a,data:n,isUsed:r,updateRow:t.updateRow,deleteRow:t.deleteRow},a)}))})]})})]}),Object(P.jsxs)("div",{children:[Object(P.jsx)("input",{type:"file",accept:".csv",onChange:function(e){if(e.target.files){var a=e.target.files[0],n=new FileReader;n.onload=function(e){var a,n=null===(a=e.target)||void 0===a?void 0:a.result;if(n){for(var r=Object(O.parse)(n.toString()),c=[],o=1;o<r.data.length;o++){var s=p(r.data[o]);c.push(s)}t.onImportComplete(c)}},n.readAsBinaryString(a)}}}),Object(P.jsx)(h.a,{onClick:function(){var e=t.title,a="data:text/csv;charset=utf-8,"+function(t){var e=t.map((function(t){var e=[];return e.push(t.symbol),e.push(t.date.toString()),e.push(t.amount.toString()),e.push(t.price.toString()),e}));return e.unshift(["symbol","date","amount","price"]),e}(Object.values(t.data)).map((function(t){return t.join(",")})).join("\n"),n=document.createElement("a");n.setAttribute("href",a),n.setAttribute("download",e+".csv"),n.click(),n.remove()},children:"Export"})]})]})}var H=a(228),K=a(67),L=Object(K.b)({name:"currentPrices",initialState:{},reducers:{updateCurrentPrices:function(t,e){Object.entries(e.payload).forEach((function(e){var a=e[0],n=e[1];t[a]=n}))}}}),Y=function(t){return t.currentPrices},Z=L.actions.updateCurrentPrices,G=L.reducer,X=a(87),q=a(107);var Q=Object(K.b)({name:"transactionsData",initialState:{transactions:{},summaryData:{dollarCostAveragesTransactions:{},dollarCostAveragesSummary:{},dollarCostAveragesProfitsSummary:{profits:{},notSoldAmount:{}}}},reducers:{addTransaction:function(t,e){var a=Object(q.uuid)();if(e.payload)t.transactions[a]=e.payload;else{var n={symbol:"",date:Date.now(),amount:0,price:0};t.transactions[a]=n}},bulkAddTransactions:function(t,e){e.payload.forEach((function(e){var a=Object(q.uuid)();t.transactions[a]=e}))},deleteAllTransactions:function(t){t.transactions={}},updateTransaction:function(t,e){var a=t.transactions[e.payload.id],n=e.payload.transaction;void 0!==n.amount&&(a.amount=n.amount),void 0!==n.date&&(a.date=n.date),void 0!==n.price&&(a.price=n.price),void 0!==n.symbol&&(a.symbol=n.symbol)},removeTransaction:function(t,e){delete t.transactions[e.payload.id]},updateDollarCostAverageTransactions:function(t,e){t.summaryData.dollarCostAveragesTransactions=e.payload},updateDollarCostAverageSummary:function(t,e){t.summaryData.dollarCostAveragesSummary=e.payload},updateDollarCostAverageProfitSummary:function(t,e){t.summaryData.dollarCostAveragesProfitsSummary=e.payload}}}),V=Q.actions,_=V.addTransaction,tt=V.bulkAddTransactions,et=V.deleteAllTransactions,at=V.updateTransaction,nt=V.removeTransaction,rt=V.updateDollarCostAverageTransactions,ct=V.updateDollarCostAverageSummary,ot=V.updateDollarCostAverageProfitSummary,st=function(t){return t.transactionsData.transactions},it=function(t){return t.transactionsData.summaryData.dollarCostAveragesSummary},lt=function(t){return t.transactionsData.summaryData.dollarCostAveragesProfitsSummary},ut=Object(X.a)([st],(function(t){var e=Object.entries(t).map((function(t){return{id:t[0],amount:t[1].amount,date:t[1].date,price:t[1].price,symbol:t[1].symbol}}));e.sort((function(t,e){return t.date-e.date}));var a={},n=new Map;return e.forEach((function(t){if(function(t){return t.amount>0}(t))a[t.id]={result:{amount:t.amount,date:t.date,price:t.price,symbol:t.symbol},sells:{}};else{var e=n.get(t.symbol);e||(e=[]),e.push(t),n.set(t.symbol,e)}})),Object.values(a).forEach((function(t){for(var e=t.result,a=e.symbol,r=n.get(a);r&&0!==r.length&&0!==e.amount;){var c=r.pop();if(c){var o=0;-1*c.amount<=e.amount?(o=c.amount,e.amount+=c.amount,c.amount=0):(o=-1*e.amount,c.amount+=e.amount,e.amount=0,r.push(c)),t.sells[c.id]={amount:o,date:c.date,price:c.price,symbol:c.symbol}}}})),a})),dt=Object(X.a)([ut],(function(t){var e={};return Object.entries(t).forEach((function(t){var a=t[0];e[a]=t[1].result.amount,Object.entries(t[1].sells).forEach((function(t){var a=t[0];e[a]=t[1].amount}))})),e})),jt=Q.reducer;function bt(){var t=i(it),e=i(lt),a=i(Y),n=Object.keys(t).filter((function(t){return a[t]})).map((function(t){return{symbol:t,price:a[t]}}));return Object(P.jsxs)("div",{children:[Object(P.jsx)("h3",{children:"Wallet"}),Object(P.jsx)("table",{children:Object(P.jsx)("tbody",{children:Object.entries(e.notSoldAmount).map((function(t){var e=t[0],a=t[1];return Object(P.jsxs)("tr",{children:[Object(P.jsx)("td",{children:e}),Object(P.jsx)("td",{children:a.toFixed(2)}),Object(P.jsx)("td",{})]},"wallet-"+e)}))})},"wallet"),Object(P.jsxs)(H.a,{container:!0,spacing:3,children:[Object(P.jsxs)(H.a,{item:!0,xs:12,sm:6,children:[Object(P.jsx)("h3",{children:"Dollar Cost Averages"}),Object(P.jsx)("table",{children:Object(P.jsx)("tbody",{children:Object.entries(t).map((function(t){var e=t[0],a=t[1].price;return Object(P.jsxs)("tr",{children:[Object(P.jsx)("td",{children:e}),Object(P.jsxs)("td",{children:["$",R(a,2)]})]},"dca-summary-"+e)}))})},"dca-summary")]}),Object(P.jsxs)(H.a,{item:!0,xs:12,sm:6,children:[Object(P.jsx)("h3",{children:"Current Prices"}),Object(P.jsx)("table",{children:Object(P.jsx)("tbody",{children:n.map((function(t){return Object(P.jsxs)("tr",{children:[Object(P.jsx)("td",{children:t.symbol}),Object(P.jsxs)("td",{children:["$",R(t.price,2)]})]},"current-prices-"+t.symbol)}))})},"current-prices")]}),Object(P.jsxs)(H.a,{item:!0,xs:12,sm:6,children:[Object(P.jsx)("h3",{children:"Unrealized Profits"}),Object(P.jsx)("table",{children:Object(P.jsx)("tbody",{children:Object.entries(e.notSoldAmount).map((function(e){var n=e[0],r=e[1],c=t[n].price,o=c*r,s=a[n],i=s*r-o;return Object(P.jsxs)("tr",{children:[Object(P.jsx)("td",{children:n}),Object(P.jsxs)("td",{children:["$",i.toFixed(2)]}),Object(P.jsx)("td",{children:R((s-c)/c*100,2)+"%"})]},"dca-unrealized-profits-"+n)}))})},"dca-unrealized-profits")]}),Object(P.jsxs)(H.a,{item:!0,xs:12,sm:6,children:[Object(P.jsx)("h3",{children:"Profits"}),Object(P.jsx)("table",{children:Object(P.jsxs)("tbody",{children:[Object.entries(e.profits).map((function(t){var e=t[0],a=t[1];return Object(P.jsxs)("tr",{children:[Object(P.jsx)("td",{children:e}),Object(P.jsxs)("td",{children:["$",a.toFixed(2)]})]},"dca-profits-"+e)})),Object(P.jsxs)("tr",{children:[Object(P.jsx)("td",{children:"Total"}),Object(P.jsxs)("td",{children:["$",Object.values(e.profits).reduce((function(t,e){return t+e}),0).toFixed(2)]})]},"dca-profits-sum")]})},"dca-profits")]})]})]})}function mt(t,e,a){var n=t.get(e);n||(n=0),n+=a,t.set(e,n)}function ft(t,e){var a=new Map,n=new Map,r=new Map;Object.keys(t).forEach((function(c){var o=t[c],s=o.result.symbol,i=Object.keys(o.sells),l=o.result.amount,u=e[c].amount-l;0!==l&&mt(r,s,l),mt(a,s,u*e[c].price),i.forEach((function(t){var e=o.sells[t],a=-1*e.amount*e.price;mt(n,s,a)}))}));var c=new Map;a.forEach((function(t,e){return mt(c,e,-1*t)})),n.forEach((function(t,e){return mt(c,e,t)}));var o={profits:{},notSoldAmount:{}};return c.forEach((function(t,e){return o.profits[e]=t})),r.forEach((function(t,e){return o.notSoldAmount[e]=t})),o}var ht=a(74),Ot=a(131),pt=a(78),xt={apiKey:pt.a,authDomain:pt.b,databaseURL:pt.c,storageBucket:pt.d},vt=Object(Ot.a)(xt),yt=Object(ht.a)(vt);var gt=function(){var t=Object(s.b)(),e=i(st),a=i(ut),r=i(dt);return Object(n.useEffect)((function(){var e=Object(ht.c)(yt),a=Object(ht.b)(e,(function(e){if(e.exists()){var a=e.val().cryptos;console.log(a),t(Z(a))}else console.log("No data available")}));return function(){a()}}),[t]),Object(n.useEffect)((function(){var n=function(t){var e=new Map,a=new Map;Object.keys(t).forEach((function(n){var r=t[n];if(0!==r.result.amount){var c=r.result.symbol;mt(e,c,r.result.amount),mt(a,c,r.result.amount*r.result.price)}}));var n={};return e.forEach((function(t,e){var r=a.get(e);if(r){var c=r/t;n[e]={symbol:e,price:c}}})),n}(a),r=ft(a,e);ft(a,e),t(rt(a)),t(ct(n)),t(ot(r))}),[t,e,a]),Object(P.jsxs)("div",{children:[Object(P.jsx)(bt,{}),Object(P.jsx)(U,{title:"Cryptos",data:e,dcaData:r,addRow:function(e){t(_(e||null))},updateRow:function(e,a){t(at({id:e,transaction:a}))},deleteRow:function(e){t(nt({id:e}))},onImportComplete:function(e){t(et()),t(tt(e))}}),Object(P.jsx)("div",{style:{height:100}})]})},St=Object(K.a)({reducer:{transactionsData:jt,currentPrices:G}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(P.jsx)(r.a.StrictMode,{children:Object(P.jsx)(s.a,{store:St,children:Object(P.jsx)(gt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},78:function(t){t.exports=JSON.parse('{"a":"AIzaSyBZGThYE4vJkZfhlIHnj3WHoDknJOiKzKA","b":"stocks-analyzer-9cd73.firebaseapp.com","c":"https://stocks-analyzer-9cd73-default-rtdb.firebaseio.com","d":"stocks-analyzer-9cd73.appspot.com"}')}},[[192,1,2]]]);
//# sourceMappingURL=main.bf8305a5.chunk.js.map