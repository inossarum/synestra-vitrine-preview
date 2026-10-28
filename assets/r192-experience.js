/* R192 shared scroll storytelling. No external dependencies, no analytics, no background GPU. */
(() => {
  'use strict';
  const root=document.documentElement;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const main=document.querySelector('main');
  if(!main)return;
  const progress=document.createElement('div');
  progress.className='r192-progress';progress.setAttribute('aria-hidden','true');
  const bar=document.createElement('span');progress.appendChild(bar);
  document.body.appendChild(progress);
  const marker=document.createElement('div');
  marker.className='r192-chapter-marker';marker.setAttribute('aria-hidden','true');
  const markerNumber=document.createElement('span');
  const markerName=document.createElement('small');
  marker.append(markerNumber,markerName);document.body.appendChild(marker);
  const chaptersByScroll=[...main.querySelectorAll(':scope > section[id]')];
  const titleForSection={plateforme:'ÉCOSYSTÈME',approche:'MÉTHODE',siteforge:'CRÉATION',
    confiance:'CONFIANCE',questions:'QUESTIONS',exemples:'EXEMPLES',
    installation:'INSTALLATION'};
  let scrollRequested=false;
  const updateProgress=()=>{
    scrollRequested=false;
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const ratio=Math.max(0,Math.min(1,window.scrollY/max));
    root.style.setProperty('--r192-progress',(ratio*100).toFixed(2)+'%');
    let active=null,idx=0;
    for(let i=0;i<chaptersByScroll.length;i++){
      if(chaptersByScroll[i].getBoundingClientRect().top<window.innerHeight*.49){
        active=chaptersByScroll[i];idx=i;
      }
    }
    marker.classList.toggle('is-active',Boolean(active)&&window.scrollY>550);
    if(active){
      markerNumber.textContent=String(idx+1).padStart(2,'0');
      markerName.textContent=titleForSection[active.id]||active.id.toUpperCase().slice(0,15);
    }
  };
  const onScroll=()=>{if(scrollRequested)return;scrollRequested=true;requestAnimationFrame(updateProgress);};
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});
  onScroll();
  const select=':scope > section, :scope > aside';
  const chapters=[...main.querySelectorAll(select)]
    .filter(el=>el.getBoundingClientRect().height>0);
  const staggered=[...main.querySelectorAll('.r192-product-rail a, .product-grid > *, .grid > .tile, .process > article')];
  const targets=[...new Set([...chapters,...staggered])].filter(el=>!el.closest('[hidden]'));
  const supportsObserver='IntersectionObserver' in window;
  let observer=null;
  const reveal=(el)=>el.classList.add('is-visible');
  const resetMotion=()=>{
    observer?.disconnect();
    if(reduced.matches||!supportsObserver){
      root.classList.remove('r192-motion-ready');
      targets.forEach(el=>{el.removeAttribute('data-r192-reveal');el.classList.add('is-visible');});
      return;
    }
    targets.forEach((el,i)=>{
      el.setAttribute('data-r192-reveal','');
      if(staggered.includes(el))el.style.setProperty('--r192-delay',Math.min((i%3)*.09,.2)+'s');
      if(el.getBoundingClientRect().top<window.innerHeight*.92)reveal(el);
    });
    observer=new IntersectionObserver(entries=>{
      for(const e of entries){
        if(!e.isIntersecting)continue;
        reveal(e.target);observer.unobserve(e.target);
      }
    },{threshold:0.06,rootMargin:'0px 0px -5% 0px'});
    for(const el of targets)if(!el.classList.contains('is-visible'))observer.observe(el);
    root.classList.add('r192-motion-ready');
  };
  resetMotion();
  reduced.addEventListener('change',resetMotion);
  // Progress and reveal are the only scroll behaviors. Existing WebGL remains authoritative.
})();