/* Only layout and navigation presentation: existing exercise handlers are retained. */
(()=>{
 const td=document.body.dataset.freshTd;
 const bike='<circle cx="12" cy="27" r="9"/><circle cx="47" cy="27" r="9"/><path d="m12 27 12-20 10 20H12l9-15h20l6 15M20 6h10M38 5h6l3 22"/>';
 const festival='<path d="M9 33V16l19-9v22M9 24l19-9"/><ellipse cx="5" cy="34" rx="5" ry="4"/><ellipse cx="24" cy="30" rx="5" ry="4"/><path d="m40 9 2-6 2 6 6 2-6 2-2 6-2-6-6-2zM41 29h12M47 23v12"/>';
 const header=document.createElement('header');header.className='fresh-header';
 header.innerHTML=`<a class="fresh-brand" href="${td==='1'?'#accueil':'./'}"><svg viewBox="0 0 60 42" aria-hidden="true">${td==='1'?festival:bike}</svg>${td==='1'?'déclic festival':'seconde roue'}</a><span class="fresh-tagline">Le labo des données</span><nav aria-label="Navigation générale"><a href="../index.html">Les TD</a><a href="${td==='1'?'#contexte':'#mission'}">${td==='1'?'Le cas festival':'Le cas vélo'}</a><a class="fresh-cta" href="${td==='1'?'#contexte':'#documents'}">${td==='1'?'Découvrir la mission':'Documents du dossier'} ↗</a></nav>`;
 document.querySelector('.topbar,.masthead').replaceWith(header);
 const tabs=document.createElement('nav');tabs.className='course-tabs';tabs.setAttribute('aria-label','Parties du module');tabs.innerHTML=[['1','Comprendre'],['2','Explorer'],['3','Mesurer']].map(([n,l])=>`<a href="../td${n}/index.html" ${n===td?'aria-current="page"':''}>TD${n} · ${l}</a>`).join('');
 if(td==='1'){
  document.querySelector('#activity').prepend(tabs);
  document.querySelector('.sidebar').insertAdjacentHTML('afterbegin','<div class="fresh-label">Votre parcours</div>');
 }else{
  const shell=document.querySelector('#workspace'),main=document.querySelector('#main'),hero=document.querySelector('.landing-hero');
  const content=document.createElement('div');content.className='fresh-content';shell.append(content);content.append(tabs,hero,main);hero.classList.add('fresh-hero');
  document.querySelector('.analysis-label').textContent='Votre parcours';
  document.querySelector('.analysis-sidebar').insertAdjacentHTML('beforeend','<div class="fresh-side-links"><a href="#mission">Lire la mission</a><a href="#documents">Toutes les ressources</a></div>');
  const initialTitle=document.querySelector('#hero-title').innerHTML,initialIntro=document.querySelector('.landing-copy>p').textContent;
  const decorate=()=>{
   const top=main.querySelector('.section-top');
   document.querySelector('#hero-title').innerHTML=top?.querySelector('h1')?.innerHTML||initialTitle;
   document.querySelector('.landing-copy>p').textContent=top?.querySelector('.intro')?.textContent||initialIntro;
   if(top){top.hidden=true;document.querySelector('.module-label').textContent=top.querySelector('.eyebrow')?.textContent||'TD 2 · ÉTUDES ET DATA';}
   else document.querySelector('.module-label').textContent='TD 2 · ÉTUDES ET DATA';
   const guide=main.querySelector('.work-guide');
   if(guide){const details=document.createElement('details');details.className='fresh-guide';details.innerHTML='<summary>Votre mission et les pièces à mobiliser <span>Lire les consignes ↗</span></summary>';guide.before(details);details.append(guide);}
   const nav=document.querySelector('#sections');
   referenceNavigation.forEach(([id,label],i)=>{
    let a=nav.querySelector(`[href="#${id}"]`);
    if(!a){a=document.createElement('a');a.href='#'+id;nav.append(a);}
    a.innerHTML=`<span class="nav-icon">${String(i+1).padStart(2,'0')}</span>${label}`;
   });
   const questions=main.querySelector(':scope > .questions');
   if(questions){
    const wrap=document.createElement('div');wrap.className='fresh-investigation';
    const left=document.createElement('div');left.className='fresh-data';
    const blocks=[...main.children].filter(e=>e.matches('.tool-tabs,.platform,.documents'));
    if(blocks.length){blocks[0].before(wrap);wrap.append(left,questions);blocks.forEach(e=>left.append(e));}
   }
  };
  const previousRender=render;render=function(){previousRender();decorate();};decorate();
 }
})();
