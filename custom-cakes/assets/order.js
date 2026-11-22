(()=>{const d=document,f=d.getElementById('ob');if(!f)return;
const $=s=>d.querySelector(s),A=s=>[...d.querySelectorAll(s)],E=f.elements,
st=A('.step'),N=st.length,ck=$('#ck'),cw=$('.cw'),pg=A('[data-go]'),bar=$('.bar i'),nx=$('[data-next]'),pv=$('[data-prev]'),er=$('.ob-n .err'),
NM=['Occasion','Flavour','Size','Egg','Message','Date','Review'],
FL={Chocolate:['#6B3A26','#F3E1CF','#3E1F14'],Vanilla:['#F5DDA6','#FFF6E6','#F4A6BD'],Butterscotch:['#E9B566','#FFF0D6','#C77A2A'],Pineapple:['#F6D77C','#FFFBEA','#F2C230'],'Black forest':['#4A2418','#FFF8F0','#2A120B'],'Red velvet':['#A8243A','#FFF6EC','#FFFFFF'],Strawberry:['#F6B3C4','#FFF3F6','#D9406E'],Mango:['#F7C35A','#FFF4DC','#F08A24'],Coffee:['#8A5A3C','#F4E3D3','#4B2A1A'],'Something else':['#F5DDA6','#FFF6E6','#B5D6A7']},
SZ={'Half kg':[1,.84],'1 kg':[1,.94],'1.5 kg':[2,.92],'2 kg':[2,1],'3 kg':[3,.95],Bigger:[3,1]},
OC={Birthday:'birthday',Anniversary:'anniversary','Baby shower':'baby','Wedding / engagement':'wedding','Kids’ party':'kids','Office / team':'office'},
SL={birthday:'Birthday',anniversary:'Anniversary',baby:'Baby shower',wedding:'Wedding / engagement',kids:'Kids’ party',office:'Office / team'};
let cur=0,mx=0,lf='';
const v=n=>{const e=E[n];return e?(e.value||'').trim():''};
const occ=()=>{const o=v('occasion');return o==='Something else'?(v('occasion_other')||o):o};
const flv=()=>{const o=v('flavour');return o==='Something else'?(v('flavour_other')||o):o};
const siz=()=>{const o=v('size');return o==='Bigger'?'Bigger'+(v('size_other')?': '+v('size_other'):''):o};
const dt=()=>{const x=v('date');if(!x)return'';const t=new Date(x+'T00:00');return isNaN(t)?x:t.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'})};
const when=()=>{const x=dt();return x?(v('mode')||'Needed')+' on '+x+(v('time')?', '+v('time').toLowerCase():''):''};
function msg(){const L=["Hello Custom Cakes! I'd like to order a cake.",''],a=(k,x)=>x&&L.push(k+': '+x);
a('Occasion',occ());a('Flavour',flv());a('Size',siz());a('Shape',v('shape'));a('Egg',v('egg'));a('Message on cake',v('message')&&'"'+v('message')+'"');a('Theme / design',v('theme'));
if(E.refphoto.checked)L.push("I'll share a reference photo here.");a('When',when());if(v('mode')==='Delivery')a('Delivery to',v('address'));
L.push('');a('Name',v('name'));a('Phone',v('phone'));L.push('','Could you please confirm availability and the price? Thank you!');return L.join('\n')}
function wrap(m){const w=m.split(/\s+/);let a='',b='';for(const x of w){if(!b&&(!a||(a+' '+x).length<=18))a=a?a+' '+x:x;else b=b?b+' '+x:x}return[a,b]}
function paint(){const o=v('occasion'),c=FL[v('flavour')]||FL.Vanilla,z=SZ[v('size')]||[2,.94];
ck.dataset.occ=OC[o]||'other';['--sp','--cr','--dr'].forEach((k,i)=>ck.style.setProperty(k,c[i]));ck.dataset.tiers=z[0];ck.style.setProperty('--s',z[1]);ck.dataset.egg=v('egg');
const[a,b]=wrap(v('message')||'Your message here'),m1=$('#m1'),m2=$('#m2'),fs=Math.max(10,Math.min(15,15*19/Math.max(a.length,b.length,1)));
m1.textContent=a;m2.textContent=b;m1.setAttribute('y',b?289:298);m2.setAttribute('y',b?289+fs+3:307);m1.parentNode.setAttribute('font-size',fs.toFixed(1));
$('#cnt').textContent=v('message').length;
const ch={occasion:occ(),flavour:flv(),size:siz(),egg:v('egg'),date:dt()};
A('.chips li').forEach(li=>{const k=li.dataset.k,x=ch[k],t='<b>'+li.querySelector('b').textContent+'</b> · '+(x?esc(x):'not chosen');if(li.innerHTML!==t){li.innerHTML=t;li.classList.toggle('set',!!x)}});
A('[data-other]').forEach(e=>e.hidden=!/^(Something else|Bigger)$/.test(v(e.dataset.other)));$('[data-addr]').hidden=v('mode')!=='Delivery';
const rows=[['Occasion',occ(),0],['Flavour',flv(),1],['Size',[siz(),v('shape')].filter(Boolean).join(', '),2],['Egg',v('egg'),3],['Message',v('message')?'“'+v('message')+'”':'No writing',4],['Theme',v('theme'),4],['When',when(),5]];
$('#rv').innerHTML=rows.filter(r=>r[1]).map(r=>'<div class="rr"><dt>'+r[0]+'</dt><dd><span>'+esc(r[1])+'</span><button type="button" class="ed" data-ed="'+r[2]+'">Edit<span class="sr"> '+r[0].toLowerCase()+'</span></button></dd></div>').join('');
const t=msg();$('#s-wa').href='https://wa.me/917986061054?text='+encodeURIComponent(t);$('#s-ml').href='mailto:customcakesofficial@gmail.com?subject='+encodeURIComponent('Cake order: '+(occ()||'custom cake'))+'&body='+encodeURIComponent(t);
if(c.join()!==lf){if(lf){cw.classList.remove('wob');void cw.getBBox();cw.classList.add('wob')}lf=c.join()}}
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function bad(i){if(i===0&&!v('occasion'))return'Please pick an occasion, or choose “Something else”.';if(i===1&&!v('flavour'))return'Please choose a flavour. “Something else” works too.';
if(i===2&&!v('size'))return'Please pick a size.';if(i===3&&!v('egg'))return'Please choose eggless, with egg, or either.';if(i===5){if(!v('mode'))return'Please choose pickup or delivery.';if(!v('date'))return'Please pick the date you need it.'}
if(i===6&&!v('name'))return'Please add your name so the shop knows who’s ordering.';return''}
function go(i,back){st[cur].classList.remove('on');cur=i;mx=Math.max(mx,i);const s=st[i];s.classList.toggle('rev',!!back);s.classList.add('on');
pg.forEach((b,j)=>{b.disabled=j>mx;b.classList.toggle('cu',j===i);b.classList.toggle('dn',j<i||j<=mx&&j!==i&&!bad(j));j===i?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current')});
bar.style.setProperty('--p',((i+1)/N*100)+'%');pv.hidden=i===0;nx.hidden=i===N-1;if(i<N-1)nx.firstChild.textContent='Next: '+NM[i+1];er.textContent='';
s.focus({preventScroll:true});const r=f.getBoundingClientRect();if(r.top<0||r.top>innerHeight*.6)f.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
if(i===N-1){ck.classList.remove('party');void ck.getBBox();ck.classList.add('party')}}
function fail(m){er.textContent=m;er.classList.remove('shake');void er.offsetWidth;er.classList.add('shake')}
nx.addEventListener('click',()=>{const m=bad(cur);m?fail(m):go(cur+1)});pv.addEventListener('click',()=>cur&&go(cur-1,1));
pg.forEach((b,j)=>b.addEventListener('click',()=>j!==cur&&go(j,j<cur)));
f.addEventListener('click',e=>{const b=e.target.closest('[data-ed]');b&&go(+b.dataset.ed,1)});
f.addEventListener('input',paint);f.addEventListener('change',paint);
f.addEventListener('submit',e=>{e.preventDefault();cur<N-1?nx.click():$('#s-wa').click()});
f.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT'&&e.target.type!=='checkbox'){e.preventDefault();cur<N-1&&nx.click()}});
const sendOk=e=>{const m=bad(6);if(m){e.preventDefault();fail(m);E.name.focus()}};$('#s-wa').addEventListener('click',sendOk);$('#s-ml').addEventListener('click',sendOk);
const cp=$('#s-cp');cp.addEventListener('click',()=>{const l=cp.querySelector('span'),done=x=>{l.textContent=x;setTimeout(()=>l.textContent='Copy message',2000)};navigator.clipboard?navigator.clipboard.writeText(msg()).then(()=>done('Copied!'),()=>done('Copy failed')):done('Copy not supported')});
const td=new Date();td.setMinutes(td.getMinutes()-td.getTimezoneOffset());E.date.min=td.toISOString().slice(0,10);
const q=new URLSearchParams(location.search).get('occasion');if(SL[q]){const r=f.querySelector('input[name=occasion][value="'+SL[q]+'"]');if(r)r.checked=true}
nx.firstChild.textContent='Next: '+NM[1];paint();bar.style.setProperty('--p',(100/N)+'%')})();
