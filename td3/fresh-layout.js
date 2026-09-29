/* Presentation adapter, preserving the existing reports and exercise handlers. */
(()=>{
 const header=document.querySelector('.masthead');
 header.className='fresh-header';
 header.innerHTML='<a class="fresh-brand" href="#mission"><svg viewBox="0 0 60 42" aria-hidden="true"><circle cx="12" cy="27" r="9"/><circle cx="47" cy="27" r="9"/><path d="m12 27 12-20 10 20H12l9-15h20l6 15M20 6h10M38 5h6l3 22"/></svg>seconde roue</a><span class="fresh-tagline">Le labo des données</span><nav aria-label="Navigation générale"><a href="../index.html">Les TD</a><a href="#mission">Le cas vélo</a><a href="#documents">Documents</a><a class="fresh-cta" href="downloads/TD3_donnees_et_documents.zip" download>Télécharger le dossier ↓</a></nav>';
 const shell=document.querySelector('#workspace'),aside=shell.querySelector('aside'),main=document.querySelector('#main'),hero=document.querySelector('.landing-hero');
 shell.classList.add('analysis-workspace');aside.classList.add('analysis-sidebar');
 aside.querySelector('.eyebrow').textContent='Votre parcours';aside.querySelector('.eyebrow').className='analysis-label';
 const content=document.createElement('div');content.className='fresh-content';shell.append(content);
 const tabs=document.createElement('nav');tabs.className='course-tabs';tabs.setAttribute('aria-label','Parties du module');tabs.innerHTML='<a href="../td1/index.html">TD1 · Comprendre</a><a href="../td2/index.html">TD2 · Explorer</a><a href="index.html" aria-current="page">TD3 · Mesurer</a>';
 content.append(tabs,hero,main);hero.classList.add('fresh-hero');
 const originalButtons=hero.querySelector('.hero-buttons').innerHTML,originalIntro=hero.querySelector('.landing-copy>p').textContent;
 const decorate=()=>{
  const s=current();
  document.querySelector('#hero-title').textContent=s?s.title:state.id==='synthese'?'Quel bilan pour la direction ?':state.id==='documents'?'Les pièces de votre enquête':'La campagne a roulé. Quel est le bilan ?';
  hero.querySelector('.landing-copy>p').textContent=s?s.intro:originalIntro;
  hero.querySelector('.module-label').textContent=s?`PARTIE 3 · SECTION ${s.n} · ${s.label}`:'TD 3 · ÉTUDES ET DATA';
  document.querySelectorAll('#sections a>span').forEach(e=>e.classList.add('nav-icon'));
  if(!s){hero.querySelector('.hero-buttons').innerHTML=originalButtons;bindDocs();return;}
  [...main.children].filter(e=>e.matches('.eyebrow,h1,.intro')).forEach(e=>e.hidden=true);
  const note=main.querySelector(':scope>.note');
  if(note){const guide=document.createElement('details');guide.className='fresh-guide';guide.open=true;guide.innerHTML='<summary>Les repères du cours et la méthode <span>Afficher / masquer</span></summary>';note.before(guide);guide.append(note);}
  const start=document.createElement('div');start.className='student-start';start.innerHTML='<p><strong>Pour travailler :</strong> lisez les 3 questions, choisissez le rapport et ses filtres, puis rédigez sur votre document ou tableur. Les informations volontairement absentes sont à signaler, pas à inventer.</p><div><button class="btn" type="button" data-jump-questions>Voir les 3 questions ↓</button><button class="btn" data-doc="M09">Méthode et calculs</button><a class="btn" href="downloads/fiche-reponse.txt" download>Trame de réponse ↓</a></div>';main.prepend(start);
  const questions=main.querySelector(':scope>.questions'),report=main.querySelector('#report'),tools=main.querySelector('.tabs'),docs=main.querySelector('.documents');
  if(report&&questions){const layout=document.createElement('div');layout.className='fresh-investigation';const left=document.createElement('div');left.className='fresh-data';(docs||tools||report).before(layout);layout.append(left,questions);left.append(tools,report);if(docs)left.append(docs);}
  if(s.id==='conversion'){const cross=document.createElement('p');cross.className='cross-reference';cross.innerHTML='Pour distinguer les confirmations de la cohorte et celles du mois civil, consultez aussi le <a href="#leads">dossier 10 : Leads et opportunités</a>, rapport Dates des confirmations.';questions.append(cross);}
  hero.querySelector('.hero-buttons').innerHTML=s.docs.slice(0,2).map(id=>`<button class="discover-company" data-doc="${id}">${id} · ${esc(D.documents.find(d=>d.id===id).titre)}</button>`).join('');
  bindDocs();
 };
 document.addEventListener('click',event=>{const button=event.target.closest('[data-doc]');if(!button)return;const piece=D.documents.find(d=>d.id===button.dataset.doc);if(!piece)return;document.querySelector('#doc-content').innerHTML='<span class="eyebrow">PIÈCE '+esc(piece.id)+' · CAS FICTIF</span><h2>'+esc(piece.titre)+'</h2><p>'+esc(piece.texte)+'</p>';const dialog=document.querySelector('#doc');if(!dialog.open)dialog.showModal();});
 document.addEventListener('click',event=>{if(event.target.closest('[data-jump-questions]')){const target=main.querySelector('.questions');target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({behavior:'smooth',block:'start'});}});
 const oldRender=render;render=function(){oldRender();decorate();};decorate();
})();
