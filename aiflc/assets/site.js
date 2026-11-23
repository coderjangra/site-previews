(function(){
var d=document,h=d.documentElement,W='919888012118',M='info.aiflc@gmail.com';
function q(s,c){return (c||d).querySelector(s)}
function qa(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))}
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,st=h.classList.contains('static');

/* preview notice */
var nb=q('.notice button');
if(nb)nb.addEventListener('click',function(){h.classList.add('nb');try{sessionStorage.setItem('aiflc-nb','1')}catch(e){}});

/* header shadow */
var hd=q('.hdr');
function sc(){if(hd)hd.classList.toggle('sc',window.scrollY>8)}
window.addEventListener('scroll',sc,{passive:true});sc();

/* drawer */
var mb=q('.menu-btn'),dr=q('#drawer'),sm=q('.scrim');
function setD(o){if(!dr)return;h.classList.toggle('drawer-open',o);mb.setAttribute('aria-expanded',o?'true':'false');if(o){setTimeout(function(){q('.x',dr).focus()},60)}else mb.focus()}
if(mb&&dr){
mb.addEventListener('click',function(){setD(true)});
q('.x',dr).addEventListener('click',function(){setD(false)});
if(sm)sm.addEventListener('click',function(){setD(false)});
qa('a',dr).forEach(function(a){a.addEventListener('click',function(){h.classList.remove('drawer-open')})});
d.addEventListener('keydown',function(e){
if(!h.classList.contains('drawer-open'))return;
if(e.key==='Escape')setD(false);
if(e.key==='Tab'){var f=qa('a,button',dr),a=f[0],z=f[f.length-1];if(e.shiftKey&&d.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus()}}
});
matchMedia('(min-width: 921px)').addEventListener('change',function(e){if(e.matches&&h.classList.contains('drawer-open'))setD(false)});
}

/* scroll reveal */
var rv=qa('.rv,.ruler');
if(!rm&&!st&&'IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.12});
rv.forEach(function(el){io.observe(el)});
}else rv.forEach(function(el){el.classList.add('in')});

/* SMIL animations off for reduced motion / static */
if(rm||st)qa('svg').forEach(function(s){if(s.pauseAnimations){s.pauseAnimations();try{s.setCurrentTime(3.2)}catch(e){}}});

/* greeting rotator */
var rot=q('.rot');
if(rot&&!rm&&!st){
var words;try{words=JSON.parse(rot.getAttribute('data-words'))}catch(e){words=[]}
var w=q('.w',rot),l=q('.l',rot),i=0;
if(words.length)setInterval(function(){
if(d.hidden)return;
i=(i+1)%words.length;rot.classList.add('out');
setTimeout(function(){w.textContent=words[i][0];l.textContent=words[i][1];rot.classList.remove('out')},420);
},2600);
}

/* course filters */
var fb=qa('[data-filter]');
fb.forEach(function(b){b.addEventListener('click',function(){
var g=b.getAttribute('data-filter'),n=0;
fb.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
qa('.langs .stamp-w').forEach(function(c){var on=g==='all'||(' '+c.getAttribute('data-g')+' ').indexOf(' '+g+' ')>-1;c.hidden=!on;if(on){n++;c.classList.add('in')}});
var o=q('#f-count');if(o)o.textContent=n+(n===1?' language shown':' languages shown');
})});

/* "book a demo" links prefill the language */
qa('[data-demo]').forEach(function(a){a.addEventListener('click',function(){
var s=q('#d-lang');if(s){s.value=a.getAttribute('data-demo');}
setTimeout(function(){var n=q('#d-name');if(n)n.focus({preventScroll:true})},rm?0:650);
})});

/* forms -> WhatsApp / email */
qa('form[data-msg]').forEach(function(f){f.addEventListener('submit',function(e){
e.preventDefault();
if(!f.reportValidity())return;
var lines=[f.getAttribute('data-msg')],seen={};
qa('[data-l]',f).forEach(function(el){
if((el.type==='radio'||el.type==='checkbox')&&!el.checked)return;
var v=(el.value||'').trim(),k=el.getAttribute('data-l');if(!v)return;
if(seen[k]){seen[k].push(v);return}seen[k]=[v];
});
for(var k in seen)lines.push(k+': '+seen[k].join(', '));
var t=lines.join('\n'),via=e.submitter&&e.submitter.value;
if(via==='mail')location.href='mailto:'+M+'?subject='+encodeURIComponent(f.getAttribute('data-subj')||'Enquiry from website')+'&body='+encodeURIComponent(t);
else window.open('https://wa.me/'+W+'?text='+encodeURIComponent(t),'_blank','noopener');
})});

/* map facade */
qa('.map[data-src]').forEach(function(m){var b=q('.load',m);if(b)b.addEventListener('click',function(){
var f=d.createElement('iframe');f.src=m.getAttribute('data-src');f.title='Google Map showing AIFLC, SCF 19, Sector 8-B, Chandigarh';f.setAttribute('allowfullscreen','');f.referrerPolicy='no-referrer-when-downgrade';
m.appendChild(f);b.remove();
})});
})();
