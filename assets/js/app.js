/* ============================================================
   LARPOCRACY — routing, rendu, recherche, quiz, progression
   Aucune dépendance. Le contenu vit dans data/.
   ============================================================ */

const S = {
  domains: [],
  modules: {},      // domainId -> [cards]
  index: [],        // index de recherche à plat
  ready: false
};

const PKEY = 'larpocracy.progress.v1';

/* ---------- Progression ---------- */
const P = {
  load(){
    try { return JSON.parse(localStorage.getItem(PKEY)) || {read:{}, quiz:{}}; }
    catch(e){ return {read:{}, quiz:{}}; }
  },
  save(p){ try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch(e){} },
  markRead(id){ const p = P.load(); p.read[id] = Date.now(); P.save(p); },
  isRead(id){ return !!P.load().read[id]; },
  setQuiz(id, ok, total){
    const p = P.load();
    const prev = p.quiz[id];
    if (!prev || ok > prev.ok) p.quiz[id] = {ok, total};
    P.save(p);
  },
  reset(){ P.save({read:{}, quiz:{}}); }
};

/* ---------- Utilitaires ---------- */
const el = (h) => { const d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstElementChild; };
const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const md  = (s='') => esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>');
const norm = (s='') => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const LVL = {1:'Bases', 2:'Aisance', 3:'Connaisseur'};

/* ---------- Chargement ---------- */
async function boot(){
  try {
    S.domains = await (await fetch('data/domains.json')).json();
  } catch(e){
    document.getElementById('main').innerHTML =
      '<div class="wrap sec"><div class="empty"><p>Impossible de charger les données.</p>' +
      '<p>Le site doit être servi par un serveur HTTP (pas en <code>file://</code>).</p></div></div>';
    return;
  }

  await Promise.all(S.domains.map(async d => {
    if (!d.module) { S.modules[d.id] = []; return; }
    try {
      const m = await (await fetch('data/modules/' + d.id + '.json')).json();
      S.modules[d.id] = m.cards || [];
    } catch(e){ S.modules[d.id] = []; }
  }));

  buildIndex();
  S.ready = true;
  document.getElementById('foot-count').textContent =
    S.index.filter(x => x.kind === 'fiche').length + ' fiches · ' + S.domains.length + ' domaines';
  route();
}

function buildIndex(){
  S.index = [];
  S.domains.forEach(d => {
    S.index.push({kind:'domaine', label:d.title, sub:d.tagline, href:'#/d/'+d.id, hay:norm(d.title+' '+d.tagline+' '+(d.keywords||[]).join(' '))});
    (S.modules[d.id]||[]).forEach(c => {
      const parts = [c.title, c.summary,
        (c.sections||[]).map(s => s.h + ' ' + s.body).join(' '),
        (c.terms||[]).map(t => t.t + ' ' + t.d + ' ' + (t.en||'')).join(' '),
        (c.names||[]).map(n => n.n + ' ' + n.d).join(' ')].join(' ');
      S.index.push({kind:'fiche', label:c.title, sub:d.title, href:'#/f/'+d.id+'/'+c.id, hay:norm(parts)});
      (c.terms||[]).forEach(t => S.index.push({
        kind:'terme', label:t.t, sub:(t.en ? t.en + ' — ' : '') + d.title,
        href:'#/f/'+d.id+'/'+c.id, hay:norm(t.t+' '+t.d+' '+(t.en||''))
      }));
      (c.names||[]).forEach(n => S.index.push({
        kind:'nom', label:n.n, sub:'se dit « ' + n.say +' »',
        href:'#/f/'+d.id+'/'+c.id, hay:norm(n.n+' '+n.d)
      }));
    });
  });
}

function search(q, limit=10){
  const n = norm(q.trim());
  if (n.length < 2) return [];
  const exact = [], partial = [];
  for (const it of S.index){
    const i = it.hay.indexOf(n);
    if (i === -1) continue;
    (norm(it.label).startsWith(n) ? exact : partial).push(it);
    if (exact.length + partial.length > 120) break;
  }
  return exact.concat(partial).slice(0, limit);
}

/* ---------- Routing ---------- */
function route(){
  if (!S.ready) return;
  const h = location.hash.replace(/^#/, '') || '/';
  const p = h.split('/').filter(Boolean);
  const main = document.getElementById('main');
  window.scrollTo(0,0);

  if (p.length === 0)                  main.innerHTML = viewHome();
  else if (p[0] === 'domaines')        main.innerHTML = viewDomains();
  else if (p[0] === 'progression')     main.innerHTML = viewProgress();
  else if (p[0] === 'manifeste')       main.innerHTML = viewManifesto();
  else if (p[0] === 'd' && p[1])       main.innerHTML = viewDomain(p[1]);
  else if (p[0] === 'f' && p[2])     { main.innerHTML = viewCard(p[1], p[2]); wireQuiz(p[1], p[2]); }
  else if (p[0] === 'q')               main.innerHTML = viewSearch(decodeURIComponent(p.slice(1).join('/')));
  else                                 main.innerHTML = notFound();
}

/* ---------- Vues ---------- */
function stats(){
  const fiches = S.domains.reduce((a,d) => a + (S.modules[d.id]||[]).length, 0);
  const opened = S.domains.filter(d => (S.modules[d.id]||[]).length).length;
  return {fiches, opened, domains:S.domains.length,
          topics:S.domains.reduce((a,d)=>a+(d.topics||0),0)};
}

function viewHome(){
  const st = stats();
  return `
  <section class="hero"><div class="wrap">
    <h1>Une porte ne s'ouvre<br>jamais sur un CV.<br><em>Elle s'ouvre sur une conversation.</em></h1>
    <p class="lede">Larpocracy enseigne les codes, le vocabulaire et les références des
    milieux du business, du luxe et du pouvoir. Pour avoir quelque chose à dire — de juste —
    à n'importe qui, dans n'importe quelle pièce.</p>
    <div class="btn-row">
      <a class="btn" href="#/domaines">Explorer les domaines</a>
      <a class="btn btn-2" href="#/manifeste">Le manifeste</a>
    </div>
    <div class="hero-stats">
      <div class="stat"><b>${st.domains}</b><span>Domaines</span></div>
      <div class="stat"><b>${st.topics}</b><span>Sujets cartographiés</span></div>
      <div class="stat"><b>${st.fiches}</b><span>Fiches publiées</span></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">Le principe</p>
      <h2>Dis ça. Pas ça.</h2>
      <p>Le format signature du site : la même idée, formulée par quelqu'un qui sait,
      et par quelqu'un qui essaie. La différence n'est presque jamais le vocabulaire.</p>
    </div>
    <div class="block"><div class="block-b"><div class="vs">
      <div class="yes"><h5>Dis ça</h5><ul>
        <li>« Vous avez du champagne de vigneron ? »</li>
        <li>« Je ne connais pas du tout — racontez-moi. »</li>
        <li>« C'est du Bourgogne ? Le nez est très reconnaissable. »</li>
      </ul></div>
      <div class="no"><h5>Pas ça</h5><ul>
        <li>« Prenez du Dom Pérignon, c'est le meilleur champagne. »</li>
        <li>« Ah oui, bien sûr, j'en ai beaucoup entendu parler. »</li>
        <li>« Ce vin doit valoir dans les 300 €, non ? »</li>
      </ul></div>
    </div></div></div>
  </div></section>

  <section class="sec" style="padding-top:0"><div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">Les domaines</p>
      <h2>De la cave au conseil d'administration</h2>
    </div>
    ${gridDomains(S.domains.slice(0,6))}
    <p style="margin-top:1.6rem"><a class="btn btn-2" href="#/domaines">Voir les ${S.domains.length} domaines</a></p>
  </div></section>`;
}

function gridDomains(list){
  return '<div class="grid grid-3">' + list.map(d => {
    const cards = S.modules[d.id] || [];
    const read = cards.filter(c => P.isRead(c.id)).length;
    const pct = cards.length ? Math.round(read/cards.length*100) : 0;
    return `<a class="dcard" href="#/d/${d.id}">
      <span class="dnum">${String(d.n).padStart(2,'0')}</span>
      <h3>${esc(d.title)}</h3>
      <p>${esc(d.blurb)}</p>
      <div class="dmeta">
        <span>${d.topics} sujets</span>
        <span class="${cards.length ? 'ready' : ''}">${cards.length ? cards.length + (cards.length > 1 ? ' fiches' : ' fiche') : 'à venir'}</span>
      </div>
      ${cards.length ? `<div class="bar"><i style="width:${pct}%"></i></div>` : ''}
    </a>`;
  }).join('') + '</div>';
}

function viewDomains(){
  const st = stats();
  return `<section class="sec"><div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">Sommaire</p>
      <h2>Les ${S.domains.length} domaines</h2>
      <p>${st.topics} sujets cartographiés, ${st.fiches} fiches publiées à ce jour.
      L'inventaire complet est dans
      <a href="https://github.com/amndrd/larpocracy/blob/main/docs/TOPICS.md" style="color:var(--gold)">l'atlas</a>.</p>
    </div>
    ${gridDomains(S.domains)}
  </div></section>`;
}

function viewDomain(id){
  const d = S.domains.find(x => x.id === id);
  if (!d) return notFound();
  const cards = S.modules[id] || [];
  return `<section class="sec"><div class="wrap">
    <p class="crumb"><a href="#/domaines">Domaines</a> › ${esc(d.title)}</p>
    <div class="sec-head">
      <p class="eyebrow">Domaine ${String(d.n).padStart(2,'0')} · ${d.topics} sujets</p>
      <h2>${esc(d.title)}</h2>
      <p>${esc(d.blurb)}</p>
    </div>
    ${cards.length ? '<div class="clist">' + cards.map(c => `
      <a class="crow ${P.isRead(c.id) ? 'done' : ''}" href="#/f/${id}/${c.id}">
        <span class="lvl">${LVL[c.level] || ''}</span>
        <span class="cbody"><h4>${esc(c.title)}</h4><p>${esc(c.summary)}</p></span>
        <span class="cmin">${c.minutes || 5} min</span>
      </a>`).join('') + '</div>'
    : `<div class="empty">
        <p>Ce domaine est cartographié mais pas encore rédigé.</p>
        <p style="font-size:14px">Ses ${d.topics} sujets sont listés dans l'atlas —
        il attend son tour dans la feuille de route.</p>
       </div>`}
  </div></section>`;
}

function viewCard(did, cid){
  const d = S.domains.find(x => x.id === did);
  if (!d) return notFound();
  const cards = S.modules[did] || [];
  const i = cards.findIndex(c => c.id === cid);
  if (i === -1) return notFound();
  const c = cards[i];
  P.markRead(c.id);

  const sections = (c.sections||[]).map(s =>
    `<h2>${esc(s.h)}</h2>` + s.body.split('\n\n').map(par => `<p>${md(par)}</p>`).join('')
  ).join('');

  const terms = (c.terms||[]).length ? `
    <div class="block"><div class="block-h">Lexique</div><div class="block-b">
      <dl class="terms">${c.terms.map(t => `<div>
        <dt>${esc(t.t)}${t.en ? `<small>${esc(t.en)}</small>` : ''}</dt>
        <dd>${md(t.d)}</dd></div>`).join('')}</dl>
    </div></div>` : '';

  const names = (c.names||[]).length ? `
    <div class="block"><div class="block-h">Noms &amp; prononciation</div><div class="block-b">
      <ul class="names">${c.names.map(n => `<li>
        <span><span class="nm">${esc(n.n)}</span><span class="say">« ${esc(n.say)} »</span></span>
        <span class="nd">${md(n.d)}</span></li>`).join('')}</ul>
    </div></div>` : '';

  const vs = (c.sayThis||c.notThis) ? `
    <div class="block"><div class="block-h">Dis ça · Pas ça</div><div class="block-b"><div class="vs">
      <div class="yes"><h5>Dis ça</h5><ul>${(c.sayThis||[]).map(s=>`<li>${md(s)}</li>`).join('')}</ul></div>
      <div class="no"><h5>Pas ça</h5><ul>${(c.notThis||[]).map(s=>`<li>${md(s)}</li>`).join('')}</ul></div>
    </div></div></div>` : '';

  const quiz = (c.quiz||[]).length ? `
    <div class="block" id="quiz"><div class="block-h">Vérification</div><div class="block-b">
      <div class="quiz">${c.quiz.map((q,qi) => `
        <div class="qq" data-q="${qi}">
          <p class="qt">${qi+1}. ${md(q.q)}</p>
          <div class="opts">${q.a.map((a,ai) =>
            `<button type="button" data-a="${ai}">${md(a)}</button>`).join('')}</div>
          <p class="why" hidden>${md(q.why)}</p>
        </div>`).join('')}</div>
    </div></div>` : '';

  const prev = cards[i-1], next = cards[i+1];

  return `<article class="art"><div class="wrap narrow">
    <p class="crumb"><a href="#/domaines">Domaines</a> ›
      <a href="#/d/${did}">${esc(d.title)}</a> ›
      ${LVL[c.level] || ''}</p>
    <h1>${esc(c.title)}</h1>
    <p class="sum">${md(c.summary)}</p>
    ${sections}${terms}${names}${vs}${quiz}
    <nav class="art-nav">
      ${prev ? `<a class="btn btn-2" href="#/f/${did}/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="btn btn-2" href="#/f/${did}/${next.id}">${esc(next.title)} →</a>`
             : `<a class="btn btn-2" href="#/d/${did}">Retour au domaine</a>`}
    </nav>
  </div></article>`;
}

function wireQuiz(did, cid){
  const c = (S.modules[did]||[]).find(x => x.id === cid);
  if (!c || !(c.quiz||[]).length) return;
  let answered = 0, correct = 0;
  document.querySelectorAll('.qq').forEach(box => {
    const qi = +box.dataset.q, q = c.quiz[qi];
    box.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        if (box.dataset.done) return;
        box.dataset.done = '1';
        const pick = +btn.dataset.a;
        if (pick === q.ok) correct++;
        answered++;
        box.querySelectorAll('button').forEach(b => {
          b.disabled = true;
          if (+b.dataset.a === q.ok) b.classList.add('ok');
          else if (+b.dataset.a === pick) b.classList.add('ko');
        });
        box.querySelector('.why').hidden = false;
        if (answered === c.quiz.length) P.setQuiz(c.id, correct, c.quiz.length);
      });
    });
  });
}

function viewProgress(){
  const p = P.load();
  const rows = S.domains.map(d => {
    const cards = S.modules[d.id] || [];
    const read = cards.filter(c => p.read[c.id]).length;
    const q = cards.filter(c => p.quiz[c.id]);
    const qOk = q.reduce((a,c) => a + p.quiz[c.id].ok, 0);
    const qTot = q.reduce((a,c) => a + p.quiz[c.id].total, 0);
    return `<tr>
      <td><a href="#/d/${d.id}">${esc(d.title)}</a></td>
      <td class="n">${cards.length ? read + ' / ' + cards.length : '—'}</td>
      <td class="n">${qTot ? qOk + ' / ' + qTot : '—'}</td>
      <td class="n">${d.topics}</td></tr>`;
  }).join('');
  const totRead = Object.keys(p.read).length;
  const st = stats();
  return `<section class="sec"><div class="wrap narrow">
    <div class="sec-head">
      <p class="eyebrow">Où j'en suis</p>
      <h2>Progression</h2>
      <p>${totRead} fiche${totRead>1?'s':''} lue${totRead>1?'s':''} sur ${st.fiches} publiées.
      Stockée dans ce navigateur uniquement — aucun compte, aucun serveur.</p>
    </div>
    <table class="ptable">
      <thead><tr><th>Domaine</th><th style="text-align:right">Lues</th>
      <th style="text-align:right">Quiz</th><th style="text-align:right">Sujets</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin-top:2rem"><button class="btn btn-2" id="reset"
      style="cursor:pointer;background:none;font-family:inherit">Réinitialiser ma progression</button></p>
  </div></section>`;
}

function viewSearch(q){
  const res = search(q, 60);
  return `<section class="sec"><div class="wrap narrow">
    <div class="sec-head">
      <p class="eyebrow">Recherche</p>
      <h2>« ${esc(q)} »</h2>
      <p>${res.length} résultat${res.length>1?'s':''}.</p>
    </div>
    ${res.length ? '<div class="clist">' + res.map(r => `
      <a class="crow" href="${r.href}">
        <span class="lvl">${r.kind}</span>
        <span class="cbody"><h4>${esc(r.label)}</h4><p>${esc(r.sub||'')}</p></span>
      </a>`).join('') + '</div>'
      : '<div class="empty"><p>Rien pour l\'instant.</p><p style="font-size:14px">Le sujet est peut-être cartographié mais pas encore rédigé.</p></div>'}
  </div></section>`;
}

function viewManifesto(){
  return `<section class="sec"><div class="wrap narrow prose">
    <p class="eyebrow">Manifeste</p>
    <h2 style="font-size:2.2rem">Ce que fait ce site, exactement</h2>

    <p>Les portes professionnelles ne s'ouvrent presque jamais sur un CV. Elles s'ouvrent
    sur une conversation. Et une conversation s'ouvre sur une <em>surface d'accroche</em> :
    le nombre de sujets sur lesquels vous pouvez répondre autre chose que « ah, je ne
    connais pas ».</p>

    <p>Quelqu'un qui peut, dans la même soirée, dire quelque chose de juste sur un Barolo,
    sur la structure d'un LBO, sur pourquoi la Royal Oak a changé l'horlogerie, et sur
    pourquoi on ne tend jamais une carte de visite d'une seule main à Tokyo — cette
    personne inspire confiance. Pas parce qu'elle impressionne : parce qu'elle donne à
    l'autre le sentiment d'être compris.</p>

    <h2>L'inégalité qu'on attaque</h2>
    <p>Ce capital-là se transmet normalement par la famille, l'école, le milieu. Il est
    invisible, jamais enseigné, jamais écrit nulle part. Ceux qui l'ont ne savent même pas
    qu'ils l'ont. Ceux qui ne l'ont pas croient qu'il leur manque « quelque chose » sans
    pouvoir le nommer.</p>
    <p>Larpocracy écrit ce qui n'est jamais écrit.</p>

    <h2>Le nom</h2>
    <p><strong>Larpocracy</strong> — de <em>LARP</em> (live action role play) et
    <em>-cracy</em>, le pouvoir. Le mot dit exactement ce que fait le site, avec
    l'auto-dérision nécessaire pour que ce ne soit pas grotesque. On assume le jeu de rôle
    social : tout le monde le joue. Ceux qui prétendent le contraire sont simplement ceux
    qui en ont appris les règles sans s'en apercevoir.</p>

    <h2>La seule ligne rouge</h2>
    <p>Ce site enseigne la connaissance, les codes et l'aisance. Il n'enseignera jamais la
    fraude : pas de faux diplôme, pas de fausse référence, pas de fausse fortune, pas
    d'usurpation.</p>
    <p>Ce n'est pas seulement une position morale. C'est un calcul. Une erreur de culture
    se rattrape en une phrase : un cépage confondu, un nom mal prononcé, une date approximative.
    Un mensonge vérifiable, lui, ne se rattrape jamais. C'est le seul faux pas qui coûte
    définitivement.</p>

    <blockquote>Apprends pour de vrai. C'est moins cher que de faire semblant.</blockquote>

    <h2>Comment c'est écrit</h2>
    <ul>
      <li><strong>Chaque fiche doit produire une phrase prononçable.</strong> Si après
      lecture vous ne pouvez rien <em>dire</em>, la fiche a échoué.</li>
      <li><strong>Le fait avant le commentaire.</strong> Un chiffre, une date, un nom —
      ou le silence.</li>
      <li><strong>Aucun fait inventé.</strong> Un site qui vous apprendrait à bluffer avec
      de fausses informations vous enverrait vous faire corriger en public.</li>
      <li><strong>Toujours dire ce qui trahit.</strong> Chaque module a son anti-manuel.</li>
      <li><strong>Sobriété.</strong> Le site répète que sous-jouer bat surjouer, parce que
      c'est vrai, et parce que le name-dropping est le marqueur numéro un de l'imposteur.</li>
    </ul>

    <div class="notice">
      <strong>Le site n'admire pas.</strong> Il explique. Les milieux décrits ici ne sont
      ni un panthéon ni une cible : ce sont des milieux avec des règles, et les règles
      s'apprennent.
    </div>

    <h2>Ouvert</h2>
    <p>Tout est public : le code, le contenu, la feuille de route, et jusqu'au journal des
    décisions. <a href="https://github.com/amndrd/larpocracy" style="color:var(--gold)">github.com/amndrd/larpocracy</a></p>
  </div></section>`;
}

function notFound(){
  return `<section class="sec"><div class="wrap narrow"><div class="empty">
    <p style="font-family:var(--serif);font-size:1.4rem">Cette page n'existe pas.</p>
    <p style="font-size:14px">Ce qui, socialement, est toujours rattrapable.</p>
    <p style="margin-top:1.5rem"><a class="btn btn-2" href="#/">Retour à l'accueil</a></p>
  </div></div></section>`;
}

/* ---------- Recherche live ---------- */
const qEl = document.getElementById('q');
const sEl = document.getElementById('suggest');

qEl.addEventListener('input', () => {
  const v = qEl.value;
  if (v.trim().length < 2){ sEl.hidden = true; return; }
  const res = search(v, 8);
  sEl.innerHTML = res.length
    ? res.map(r => `<a href="${r.href}"><span class="sg-k">${esc(r.label)}</span>
        <span class="sg-d">${esc(r.kind)} · ${esc(r.sub||'')}</span></a>`).join('')
    : '<div class="sg-empty">Aucun résultat — le sujet attend peut-être encore d\'être écrit.</div>';
  sEl.hidden = false;
});

qEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && qEl.value.trim().length >= 2){
    sEl.hidden = true;
    location.hash = '#/q/' + encodeURIComponent(qEl.value.trim());
    qEl.blur();
  }
  if (e.key === 'Escape'){ sEl.hidden = true; qEl.blur(); }
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search')) sEl.hidden = true;
  if (e.target.id === 'reset'){
    P.reset();
    route();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== qEl){ e.preventDefault(); qEl.focus(); }
});

window.addEventListener('hashchange', route);
boot();
