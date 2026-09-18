(()=>{'use strict';
if(location.protocol==='file:'){
 document.querySelectorAll('a[href]').forEach(a=>{const url=new URL(a.getAttribute('href'),location.href);if(url.protocol==='file:'&&url.pathname.endsWith('/')){url.pathname+='index.html';a.href=url.href;}});
}else if(/\/index\.html$/.test(location.pathname)){
 history.replaceState(null,'',location.pathname.replace(/index\.html$/,'')+location.search+location.hash);
}
})();
