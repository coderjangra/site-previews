(()=>{
const d=document,h=d.documentElement,q=(s,c=d)=>c.querySelector(s),qa=(s,c=d)=>[...c.querySelectorAll(s)];
const WA='918427833083',MAIL='letspartydecor01@gmail.com';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* preview banner */
const pb=q('.pb button');
pb&&pb.addEventListener('click',()=>{h.classList.add('nb');try{sessionStorage.setItem('lpdb','1')}catch(e){}});

/* header shadow */
const hd=q('.hd');
const sc=()=>hd&&hd.classList.toggle('sc',scrollY>8);
addEventListener('scroll',sc,{passive:true});sc();

/* mobile drawer */
const dw=q('#dw'),bu=q('.burger');
if(dw&&bu){
  const set=o=>{dw.classList.toggle('open',o);bu.setAttribute('aria-expanded',o);d.body.classList.toggle('lock',o);(o?q('.dw-x',dw):bu).focus()};
  bu.addEventListener('click',()=>set(true));
  dw.addEventListener('click',e=>{if(e.target===dw||e.target.closest('.dw-x'))set(false)});
  d.addEventListener('keydown',e=>{if(e.key==='Escape'&&dw.classList.contains('open'))set(false)});
}

/* scroll reveal + run ambient SVG motion only while visible */
if('IntersectionObserver' in window&&!RM){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
  qa('.rv').forEach(el=>io.observe(el));
  const ao=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('on',e.isIntersecting)));
  qa('.anim').forEach(el=>ao.observe(el));
}else h.classList.add('static');

/* start ambient SVG motion once the page has settled */
addEventListener('load',()=>setTimeout(()=>h.classList.add('go'),600));

/* gentle parallax on the hero art */
const art=q('.hero-art .px');
if(art&&!RM&&matchMedia('(pointer:fine)').matches){
  let raf=0;
  q('.hero').addEventListener('pointermove',e=>{
    cancelAnimationFrame(raf);
    raf=requestAnimationFrame(()=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;art.style.transform=`translate3d(${x*-14}px,${y*-10}px,0) rotate(${x*1.2}deg)`});
  });
}

/* click-to-load map */
qa('[data-map]').forEach(b=>b.addEventListener('click',()=>{
  const f=d.createElement('iframe');
  f.src=b.dataset.map;f.title=b.dataset.title||'Map';f.allowFullscreen=true;f.referrerPolicy='no-referrer-when-downgrade';
  b.replaceWith(f);
},{once:true}));

/* confetti */
const burst=el=>{
  if(RM||!el)return;
  const r=el.getBoundingClientRect(),c=d.createElement('div'),cols=['#f39c12','#f7b52c','#d9547c','#f9dbe3','#e9c46a','#5c1f50'];
  c.className='burst';c.style.left=r.left+r.width/2+'px';c.style.top=r.top+r.height/2+'px';
  for(let i=0;i<22;i++){const s=d.createElement('i'),a=Math.random()*6.283,v=60+Math.random()*110;
    s.style.cssText=`--x:${Math.cos(a)*v}px;--y:${Math.sin(a)*v-50}px;--r:${Math.random()*720}deg;background:${cols[i%6]}`;c.append(s)}
  d.body.append(c);setTimeout(()=>c.remove(),1300);
};

/* enquiry forms -> WhatsApp message */
const fmt=v=>{if(!v)return'';const t=new Date(v+'T00:00');return isNaN(t)?v:t.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})};
const val=(f,n)=>{const el=f.elements[n];return el&&el.value?el.value.trim():''};
const build=f=>{
  const th=qa('[name=theme]:checked',f).map(i=>i.value).join(', ');
  const rows=[['Occasion',val(f,'type')],['Date',fmt(val(f,'date'))],['City',val(f,'city')],['Venue',val(f,'venue')],['Guests',val(f,'guests')],['Theme',th],['Ideas',val(f,'ideas')],['Message',val(f,'msg')],['Name',val(f,'name')],['Phone',val(f,'phone')]].filter(r=>r[1]);
  return "Hello Let's Party Decor! I'd like to plan an event with you."+(rows.length?'\n\n'+rows.map(r=>'• '+r[0]+': '+r[1]).join('\n'):'');
};
const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
qa('input[type=date]').forEach(i=>i.min=today.toISOString().slice(0,10));

qa('form[data-wa]').forEach(f=>{
  const box=f.closest('[data-box]')||f,pv=q('[data-preview]',box),ml=q('[data-mail]',box),bar=q('[data-progress]',box),cnt=q('[data-count]',box);
  const keys=['type','date','city','guests','name'];
  const upd=e=>{
    const m=build(f);
    if(pv){pv.textContent=m;if(e){pv.classList.remove('flash');void pv.offsetWidth;pv.classList.add('flash')}}
    if(ml)ml.href='mailto:'+MAIL+'?subject='+encodeURIComponent("Event enquiry via website")+'&body='+encodeURIComponent(m);
    if(bar){const n=keys.filter(k=>val(f,k)).length+(qa('[name=theme]:checked',f).length||val(f,'ideas')?1:0);bar.style.setProperty('--p',Math.round(n/6*100));if(cnt)cnt.textContent=n}
  };
  f.addEventListener('input',upd);f.addEventListener('change',upd);upd();
  f.addEventListener('submit',e=>{
    e.preventDefault();
    burst(e.submitter||q('[type=submit]',f));
    window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(build(f)),'_blank','noopener');
  });
});

/* preselect occasion from ?type= */
const pick=s=>{
  if(!/^[a-z-]+$/.test(s||''))return null;
  const r=q(`input[data-slug="${s}"]`);
  if(r){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}))}
  return r;
};
pick(new URLSearchParams(location.search).get('type'));

/* mood gallery filter + "plan this" */
const tabs=qa('[data-filter]');
tabs.forEach(b=>b.addEventListener('click',()=>{
  const v=b.dataset.filter;
  tabs.forEach(x=>x.setAttribute('aria-pressed',x===b));
  qa('[data-cat]').forEach(c=>{const show=v==='all'||c.dataset.cat===v;c.hidden=!show;if(show){c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop')}});
}));
qa('[data-pick]').forEach(b=>b.addEventListener('click',()=>{
  const r=pick(b.dataset.pick),t=q('#planner');
  if(!r||!t)return;
  t.scrollIntoView({behavior:RM?'auto':'smooth'});
  setTimeout(()=>{r.focus({preventScroll:true});burst(r.nextElementSibling)},RM?0:650);
}));
})();
