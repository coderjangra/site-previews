(()=>{const d=document,h=d.documentElement,$=s=>d.querySelector(s),W='917986061054';
const pb=$('.pb button');pb&&pb.addEventListener('click',()=>{h.classList.add('pbx');try{sessionStorage.setItem('ccpb','1')}catch(e){}});
const hd=$('.hdr'),sc=()=>hd.classList.toggle('sc',scrollY>8);addEventListener('scroll',sc,{passive:true});sc();
const bt=$('.burger'),dr=$('#drawer'),inert=o=>d.querySelectorAll('[data-inert]').forEach(e=>e.inert=o);
const tog=o=>{h.classList.toggle('nav-open',o);bt.setAttribute('aria-expanded',o);bt.setAttribute('aria-label',o?'Close menu':'Open menu');inert(o);if(o)setTimeout(()=>dr.querySelector('.dr-x').focus(),60);else bt.focus()};
if(bt&&dr){bt.addEventListener('click',()=>tog(!h.classList.contains('nav-open')));
dr.addEventListener('click',e=>{if(e.target===dr||e.target.closest('[data-close]'))tog(false)});
d.addEventListener('keydown',e=>{if(e.key==='Escape'&&h.classList.contains('nav-open'))tog(false)});
matchMedia('(min-width:941px)').addEventListener('change',e=>{if(e.matches&&h.classList.contains('nav-open'))tog(false)})}
const rv=d.querySelectorAll('.rv');
if('IntersectionObserver'in window&&!h.classList.contains('static')){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -6% 0px',threshold:.08});rv.forEach(e=>io.observe(e))}else rv.forEach(e=>e.classList.add('in'));
d.querySelectorAll('[data-map]').forEach(b=>b.addEventListener('click',()=>{const f=d.createElement('iframe');f.src=b.dataset.map;f.title='Google Map: Booth No. 116, Sector 37-C, Chandigarh';f.referrerPolicy='no-referrer-when-downgrade';f.allow='fullscreen';b.replaceWith(f)}));
d.querySelectorAll('[data-y]').forEach(e=>e.textContent=new Date().getFullYear());
const q=$('#enq');if(q){const v=n=>(q.elements[n].value||'').trim(),ml=$('#q-mail'),er=$('#q-e');
const msg=()=>{const L=["Hello Custom Cakes! I have a question."],a=(k,x)=>x&&L.push(k+': '+x);a('Name',v('name'));a('Phone',v('phone'));a('Occasion',v('occasion'));a('Date needed',v('date'));L.push('',v('message'));return L.join('\n')};
const up=()=>{ml.href='mailto:customcakesofficial@gmail.com?subject='+encodeURIComponent('Cake enquiry')+'&body='+encodeURIComponent(msg())};
q.addEventListener('input',up);up();
const ok=()=>{if(!v('name')||!v('message')){er.textContent='Please add your name and your question.';(v('name')?q.elements.message:q.elements.name).focus();return false}er.textContent='';return true};
ml.addEventListener('click',e=>{if(!ok())e.preventDefault()});
q.addEventListener('submit',e=>{e.preventDefault();if(ok())window.open('https://wa.me/'+W+'?text='+encodeURIComponent(msg()),'_blank','noopener')})}
})();
