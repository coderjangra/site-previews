(function(){
"use strict";
var d=document,H=d.documentElement,WA="919780118307",MAIL="chandigarhpropertyonline786@gmail.com";
function $(s,c){return (c||d).querySelector(s)}
function $$(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))}

/* preview banner */
var pvb=$(".pv button");
if(pvb)pvb.addEventListener("click",function(){H.classList.add("nb");try{sessionStorage.setItem("pv-x","1")}catch(e){}});

/* header shadow */
var hd=$(".hd"),ticking=0;
function onS(){ticking=0;if(hd)hd.classList.toggle("up",scrollY>8)}
addEventListener("scroll",function(){if(!ticking){ticking=1;requestAnimationFrame(onS)}},{passive:true});onS();

/* drawer */
var bg=$(".burger"),dr=$(".drawer");
function setDr(o){H.classList.toggle("open",o);if(bg)bg.setAttribute("aria-expanded",o);d.body.style.overflow=o?"hidden":"";if(o){var f=$("a,button",dr);f&&setTimeout(function(){f.focus()},60)}else if(bg)bg.focus()}
if(bg&&dr){bg.addEventListener("click",function(){setDr(true)});
$$("[data-close]").forEach(function(b){b.addEventListener("click",function(){setDr(false)})});
d.addEventListener("keydown",function(e){if(e.key==="Escape"&&H.classList.contains("open"))setDr(false)});
dr.addEventListener("keydown",function(e){if(e.key!=="Tab")return;var f=$$("a,button",dr),a=f[0],z=f[f.length-1];if(e.shiftKey&&d.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus()}});}

/* reveal */
var rv=$$(".rv,.steps");
if("IntersectionObserver" in window&&!H.classList.contains("static")){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:.08});
rv.forEach(function(el){io.observe(el)});
}else rv.forEach(function(el){el.classList.add("in")});

/* map facade */
$$("[data-map]").forEach(function(b){b.addEventListener("click",function(){
var f=d.createElement("iframe");f.src="https://www.google.com/maps?q="+encodeURIComponent(b.getAttribute("data-map"))+"&output=embed";
f.title="Google Map: Chandigarh Property Online office";f.loading="lazy";f.referrerPolicy="no-referrer-when-downgrade";f.allowFullscreen=true;
b.parentNode.replaceChild(f,b)})});

/* helpers */
function wa(t){return "https://wa.me/"+WA+"?text="+encodeURIComponent(t)}
function mail(t,s){return "mailto:"+MAIL+"?subject="+encodeURIComponent(s)+"&body="+encodeURIComponent(t)}
function go(u){var a=d.createElement("a");a.href=u;a.target="_blank";a.rel="noopener";d.body.appendChild(a);a.click();a.remove()}
function val(f,n){var e=f.elements[n];return e?String(e.value||"").trim():""}
function radio(f,n){var e=$("input[name='"+n+"']:checked",f);return e?e.value:""}

/* contact form */
var cf=$("#cf");
if(cf){var send=function(e,m){e.preventDefault();if(!cf.reportValidity())return;
var t="Hello Chandigarh Property Online,\n\n"+(val(cf,"topic")?"I'm writing about: "+val(cf,"topic")+"\n":"")+val(cf,"msg")+"\n\nName: "+val(cf,"name")+(val(cf,"phone")?"\nPhone: "+val(cf,"phone"):"")+"\n(Sent from your website)";
go(m?mail(t,"Property enquiry from "+val(cf,"name")):wa(t))};
cf.addEventListener("submit",function(e){send(e,0)});
var cm=$("#cf-mail");cm&&cm.addEventListener("click",function(e){send(e,1)});}

/* find a property */
var fb=$("#fb");
if(!fb)return;
var P={buy:["Buy a property","Budget"],rent:["Take a property on rent","Monthly rent budget"],sell:["Sell my property","Expected price"],let:["Rent out my property","Expected monthly rent"]};
var B={sale:["Under ₹50 lakh","₹50 lakh – ₹1 crore","₹1 – 2 crore","₹2 – 5 crore","Above ₹5 crore"],rent:["Under ₹15,000 / month","₹15,000 – 30,000 / month","₹30,000 – 60,000 / month","₹60,000 – 1 lakh / month","Above ₹1 lakh / month"]};
var SZ={plot:"e.g. 200 sq. yd, corner, park-facing",flat:"e.g. 3 BHK, 1,500 sq. ft, lift",kothi:"e.g. 1 kanal, double storey",commercial:"e.g. SCO, showroom, 600 sq. ft office"};
var TN={plot:"Plot",flat:"Flat",kothi:"Kothi",commercial:"Commercial"};
var sel=fb.elements.budget,bl=$("#l-budget"),al=$("#l-area"),sz=fb.elements.size,out=$("#msg"),sb=$("#send"),mb=$("#mail"),cp=$("#copy"),lastK="";
function kind(p){return p==="rent"||p==="let"?"rent":"sale"}
function fillB(){var p=radio(fb,"purpose")||"buy",k=kind(p);bl.textContent=P[p][1];al.textContent=p==="sell"||p==="let"?"Where is the property?":"Preferred areas";
if(k===lastK)return;lastK=k;var cur=sel.value;sel.innerHTML="";[["","Select a range"]].concat(B[k].map(function(x){return [x,x]})).concat([["Not sure yet","Not sure yet"]]).forEach(function(o){var op=d.createElement("option");op.value=o[0];op.textContent=o[1];sel.appendChild(op)});if(cur&&$$("option",sel).some(function(o){return o.value===cur}))sel.value=cur}
function build(){var p=radio(fb,"purpose")||"buy",t=radio(fb,"type"),ar=$$("input[name='area']:checked",fb).map(function(x){return x.value}),L=[];
L.push("• Looking to: "+P[p][0]);
if(t)L.push("• Property type: "+TN[t]);
if(val(fb,"size"))L.push("• Size / configuration: "+val(fb,"size"));
if(ar.length)L.push("• "+(p==="sell"||p==="let"?"Location":"Preferred areas")+": "+ar.join(", "));
if(val(fb,"sectors"))L.push("• Sectors / phases: "+val(fb,"sectors"));
if(sel.value)L.push("• "+P[p][1]+": "+sel.value);
if(val(fb,"when"))L.push("• Timeline: "+val(fb,"when"));
if(val(fb,"notes"))L.push("• Notes: "+val(fb,"notes"));
var n=val(fb,"name");
return "Hello Chandigarh Property Online,\nI have a property requirement:\n\n"+L.join("\n")+"\n\n"+(n?"Name: "+n+"\n":"")+"(Sent from your website)"}
function upd(){fillB();var t=build();out.textContent=t;sb.href=wa(t);mb.href=mail(t,"Property requirement from website");if(t&&sz){var ty=radio(fb,"type");sz.placeholder=SZ[ty]||"e.g. 3 BHK, 200 sq. yd, 600 sq. ft"}syncF()}
fb.addEventListener("input",upd);fb.addEventListener("change",upd);
fb.addEventListener("submit",function(e){e.preventDefault();go(sb.href)});
cp&&cp.addEventListener("click",function(){var t=out.textContent,ok=function(){cp.lastChild.textContent=" Copied";setTimeout(function(){cp.lastChild.textContent=" Copy text"},1800)};
if(navigator.clipboard)navigator.clipboard.writeText(t).then(ok,function(){});});

/* sample listing filters */
var cards=$$(".lcard[data-p]"),fl=$("#flt"),cnt=$("#cnt"),emp=$("#empty");
function filt(){var p=radio(fl,"fp")||"all",t=radio(fl,"ft")||"all",n=0;cards.forEach(function(c){var s=(p==="all"||c.dataset.p===p)&&(t==="all"||c.dataset.t===t);c.hidden=!s;if(s)n++});
cnt.textContent="Showing "+n+" sample card"+(n===1?"":"s");emp.hidden=n>0}
function setR(f,n,v){var e=$("input[name='"+n+"'][value='"+v+"']",f);if(e)e.checked=true}
var synced=0;
function syncF(){if(!fl||!synced)return;setR(fl,"fp",kind(radio(fb,"purpose")||"buy"));var t=radio(fb,"type");setR(fl,"ft",t||"all");filt()}
if(fl){fl.addEventListener("change",filt);filt()}
fb.addEventListener("change",function(){synced=1;syncF()});
$$("[data-ask]").forEach(function(b){b.addEventListener("click",function(){var c=b.closest(".lcard");setR(fb,"purpose",c.dataset.p==="rent"?"rent":"buy");setR(fb,"type",c.dataset.t);upd();fb.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});var f=$("input[name='type']:checked",fb);f&&f.focus({preventScroll:true})})});

/* prefill from URL (home quick search) */
var q=new URLSearchParams(location.search),qp=q.get("purpose"),qt=q.get("type"),qa=q.get("area");
if(qp&&P[qp])setR(fb,"purpose",qp);if(qt&&TN[qt])setR(fb,"type",qt);
if(qa){var m=$$("input[name='area']",fb).filter(function(x){return x.value.toLowerCase()===qa.toLowerCase()});if(m.length)m[0].checked=true;else fb.elements.sectors.value=qa.slice(0,80)}
if(qp||qt)synced=1;
upd();
})();
