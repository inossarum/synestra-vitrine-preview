/* Synestra R194: deliberate chapter reveals, story navigation and method progression.
   Consolidated single scroll loop per page; R192 scroll script is not loaded. */
(()=>{
 'use strict';
 const main=document.querySelector('main');
 if(!main)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const chapters=[...main.querySelectorAll('.r194-chapter')];
 const sections=chapters.length?chapters:[...main.querySelectorAll('.section,.product-example,.callout,.r194-product-principle')];
 const stage=[...main.querySelectorAll('.r194-product,.r194-lab-card,.r194-needs-list article,.r194-trust-stack article,.r194-product-principle,.grid .tile')];
 const progress=document.createElement('div');progress.className='r192-progress';progress.setAttribute('aria-hidden','true');
 const progressBar=document.createElement('span');progress.appendChild(progressBar);document.body.appendChild(progress);
 const setProgress=()=>{
   const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
   document.documentElement.style.setProperty('--r192-progress',(100*Math.min(1,Math.max(0,scrollY/max))).toFixed(2)+'%');
 };
 const steps=[...main.querySelectorAll('[data-r194-step]')];
 const counter=document.querySelector('.r194-method-counter b');
 const track=document.querySelector('.r194-track-fill');
 let revealObserver,stepObserver;
 // Visible content is the DOM default: motion is enhancement, never a dependency.
 function setMotion(){
  revealObserver?.disconnect();stepObserver?.disconnect();
  if(reduce.matches||!('IntersectionObserver' in window)){
   document.documentElement.classList.remove('r194-enabled');
   [...sections,...stage].forEach(el=>{el.classList.add('r194-visible');el.removeAttribute('data-r194-view');el.removeAttribute('data-r194-stagger')});
   steps.forEach(el=>el.classList.remove('is-current'));
   return;
  }
  sections.forEach(s=>{s.setAttribute('data-r194-view','');if(s.getBoundingClientRect().top<innerHeight*.94)s.classList.add('r194-visible')});
  stage.forEach((s,i)=>{s.setAttribute('data-r194-stagger','');if(s.getBoundingClientRect().top<innerHeight*.94)s.classList.add('r194-visible');s.style.setProperty('--r194-delay',Math.min((i%3)*.11,.3)+'s')});
  revealObserver=new IntersectionObserver((entries)=>{
    for(const entry of entries){
      if(entry.isIntersecting){entry.target.classList.add('r194-visible');revealObserver.unobserve(entry.target)}
    }
  },{threshold:.06,rootMargin:'0px 0px -8% 0px'});
  [...sections,...stage].forEach(s=>{if(!s.classList.contains('r194-visible'))revealObserver.observe(s)});
  if(steps.length){
    stepObserver=new IntersectionObserver((entries)=>{
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        const id=Number(entry.target.dataset.r194Step);
        steps.forEach(s=>s.classList.toggle('is-current',s===entry.target));
        if(counter)counter.textContent=String(id).padStart(2,'0');
        if(track)track.style.width=(id/steps.length*100)+'%';
      }
    },{rootMargin:'-30% 0px -40% 0px',threshold:0});
    steps.forEach(s=>stepObserver.observe(s));
  }
  document.documentElement.classList.add('r194-enabled');
 }
 setMotion();reduce.addEventListener('change',setMotion);
 // A chapter rail is navigational and keyboard accessible, not a decorative HUD.
 if(chapters.length){
  const nav=document.createElement('nav');nav.className='r194-rail';
  nav.setAttribute('aria-label','Parcours du Studio');
  const titles={vision:'Vision',systeme:'Capacités',siteforge:'Laboratoire',
   approche:'Méthode',exemples:'Besoins',confiance:'Confiance',questions:'Questions','acces-pilote':'Pilote'};
  for(const c of chapters){
    if(!c.id)continue;
    const link=document.createElement('a');
    link.href='#'+c.id;link.setAttribute('aria-label',titles[c.id]||c.id);
    link.textContent=String(nav.children.length+1).padStart(2,'0');
    nav.appendChild(link);
  }
  document.body.appendChild(nav);
  const links=[...nav.querySelectorAll('a')];
  let queued=false;
  const update=()=>{
    queued=false;setProgress();let current=0;
    for(let i=0;i<chapters.length;i++){
      const rect=chapters[i].getBoundingClientRect();
      if(rect.top<innerHeight*.5)current=i;
    }
    links.forEach((l,i)=>{l.classList.toggle('active',i===current);if(i===current)l.setAttribute('aria-current','location');else l.removeAttribute('aria-current')});
    nav.classList.toggle('shown',scrollY>innerHeight*.7);
    document.documentElement.style.setProperty('--r194-scene-depth',Math.min(1,scrollY/Math.max(1,innerHeight)).toFixed(3));
  };
  const onScroll=()=>{if(queued)return;queued=true;requestAnimationFrame(update)};
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});
  update();
 }else{
   let queued=false;
   const onScroll=()=>{
     if(queued)return;
     queued=true;
     requestAnimationFrame(()=>{queued=false;setProgress();});
   };
   addEventListener('scroll',onScroll,{passive:true});
   addEventListener('resize',onScroll,{passive:true});
   setProgress();
 }
})();