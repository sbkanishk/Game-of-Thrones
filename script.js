/* =========================================================
   Houses of Westeros — script.js
   Renders all content from data.js, powers search,
   kinship tracer, and sidebar navigation.
   ========================================================= */

// ── SVG SIGILS ──────────────────────────────────────────
const SIGILS = {
  stark: `<svg class="sigil-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="24" fill="none" stroke="#5a7a8a" stroke-width="1.4"/>
    <path d="M26 12 C23 18 16 20 16 28 C16 34 20 38 26 38 C32 38 36 34 36 28 C36 20 29 18 26 12Z" fill="#5a7a8a" opacity="0.8"/>
    <path d="M18 33 L13 40 M34 33 L39 40" stroke="#5a7a8a" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,
  targaryen: `<svg class="sigil-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="24" fill="none" stroke="#9c1f2e" stroke-width="1.4"/>
    <path d="M26 12 L18 28 L26 24 L34 28 Z" fill="#9c1f2e" opacity="0.9"/>
    <path d="M26 24 L20 36 M26 24 L32 36 M26 24 L26 36" stroke="#9c1f2e" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,
  lannister: `<svg class="sigil-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="24" fill="none" stroke="#b8860b" stroke-width="1.4"/>
    <ellipse cx="26" cy="22" rx="7" ry="8" fill="#b8860b" opacity="0.85"/>
    <path d="M13 40 C15 32 20 28 26 28 C32 28 37 32 39 40" stroke="#b8860b" stroke-width="1.6" fill="none"/>
    <path d="M19 18 C19 14 33 14 33 18" stroke="#b8860b" stroke-width="1.2" fill="none"/>
  </svg>`,
  baratheon: `<svg class="sigil-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="24" fill="none" stroke="#a06820" stroke-width="1.4"/>
    <path d="M26 12 L30 21 L40 19 L33 27 L38 37 L28 33 L26 42 L24 33 L14 37 L19 27 L12 19 L22 21 Z" fill="#a06820" opacity="0.8"/>
  </svg>`,
  tyrell: `<svg class="sigil-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="24" fill="none" stroke="#4a7a28" stroke-width="1.4"/>
    <circle cx="26" cy="26" r="5" fill="#4a7a28"/>
    <path d="M26 14 C26 14 22 18 22 22 C22 24 24 26 26 26" stroke="#4a7a28" stroke-width="1.5" fill="none"/>
    <path d="M26 14 C26 14 30 18 30 22 C30 24 28 26 26 26" stroke="#4a7a28" stroke-width="1.5" fill="none"/>
    <path d="M14 26 C14 26 18 22 22 22 C24 22 26 24 26 26" stroke="#4a7a28" stroke-width="1.5" fill="none"/>
    <path d="M38 26 C38 26 34 22 30 22 C28 22 26 24 26 26" stroke="#4a7a28" stroke-width="1.5" fill="none"/>
    <path d="M26 26 C26 26 22 30 22 34 C22 36 24 38 26 38" stroke="#4a7a28" stroke-width="1.5" fill="none"/>
    <path d="M26 26 C26 26 30 30 30 34 C30 36 28 38 26 38" stroke="#4a7a28" stroke-width="1.5" fill="none"/>
    <path d="M18 18 C18 18 22 20 22 22" stroke="#4a7a28" stroke-width="1.3" fill="none"/>
    <path d="M34 18 C34 18 30 20 30 22" stroke="#4a7a28" stroke-width="1.3" fill="none"/>
  </svg>`,
  martell: `<svg class="sigil-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="24" fill="none" stroke="#b85a18" stroke-width="1.4"/>
    <circle cx="26" cy="26" r="9" fill="none" stroke="#b85a18" stroke-width="2"/>
    <line x1="26" y1="14" x2="26" y2="38" stroke="#b85a18" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="14" y1="26" x2="38" y2="26" stroke="#b85a18" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,
  greyjoy: `<svg class="sigil-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="24" fill="none" stroke="#3a6068" stroke-width="1.4"/>
    <path d="M26 12 C32 16 36 22 36 28 C36 34 32 38 26 38 C20 38 16 34 16 28 C16 22 20 16 26 12Z" fill="none" stroke="#3a6068" stroke-width="1.6"/>
    <path d="M18 26 C18 22 22 19 26 19" stroke="#3a6068" stroke-width="1.3" fill="none"/>
    <path d="M15 32 C12 29 11 25 12 22" stroke="#3a6068" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <path d="M37 32 C40 29 41 25 40 22" stroke="#3a6068" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <path d="M21 38 C18 40 15 40 13 38" stroke="#3a6068" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <path d="M31 38 C34 40 37 40 39 38" stroke="#3a6068" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <path d="M26 38 L26 42" stroke="#3a6068" stroke-width="1.3" stroke-linecap="round"/>
  </svg>`,
  arryn: `<svg class="sigil-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="24" fill="none" stroke="#3a6090" stroke-width="1.4"/>
    <path d="M14 36 L26 12 L38 36 Z" fill="none" stroke="#3a6090" stroke-width="1.8"/>
    <path d="M26 12 L26 26" stroke="#3a6090" stroke-width="1.4"/>
    <circle cx="26" cy="10" r="3" fill="#3a6090"/>
  </svg>`,
};

// ── HOUSE COLOR MAP ──────────────────────────────────────
const HOUSE_COLOR = {};
HOUSES.forEach(h => { HOUSE_COLOR[h.id] = h.color; });

// ── BUILD INDEX MAP ──────────────────────────────────────
const PERSON_MAP = {};
PEOPLE.forEach(p => { PERSON_MAP[p.id] = p; });

// ── SIDEBAR NAV ──────────────────────────────────────────
function buildSidebarNav() {
  const nav = document.getElementById('sidebar-nav');
  const refDiv = nav.querySelector('[style]') || null;

  HOUSES.forEach(house => {
    const a = document.createElement('a');
    a.href = `#house-${house.id}`;
    a.className = 'nav-link';
    a.dataset.section = `house-${house.id}`;
    a.innerHTML = `
      <span class="nav-dot" style="background:${house.color}"></span>
      ${house.label}
    `;
    a.addEventListener('click', () => {
      if (window.innerWidth <= 700) closeSidebar();
    });
    nav.insertBefore(a, refDiv || nav.firstChild);
  });
}

// ── HERO SIGIL GRID ──────────────────────────────────────
function buildHeroSigils() {
  const grid = document.getElementById('hero-sigils');
  HOUSES.forEach(house => {
    const btn = document.createElement('button');
    btn.className = 'sigil-btn';
    btn.style.borderColor = `${house.color}50`;
    btn.innerHTML = `
      ${SIGILS[house.id] || ''}
      <span class="sigil-name">${house.label}</span>
    `;
    btn.addEventListener('click', () => {
      document.getElementById(`house-${house.id}`)?.scrollIntoView({ behavior: 'smooth' });
    });
    grid.appendChild(btn);
  });
}

// ── PERSON CARD ──────────────────────────────────────────
function createPersonCard(personId) {
  const p = PERSON_MAP[personId];
  if (!p) return null;

  const card = document.createElement('div');
  card.className = 'person-card';
  card.setAttribute('tabindex', '0');
  card.dataset.personId = personId;

  const houseColor = HOUSE_COLOR[p.house] || '#888';
  const sigil = SIGILS[p.house] || '';

  card.style.setProperty('--house-color', houseColor);
  card.style.borderTopColor = houseColor;
  card.style.borderTopWidth = '3px';

  card.innerHTML = `
    ${p.secret ? '<span class="pc-secret">secret</span>' : ''}
    <div class="pc-sigil">${sigil}</div>
    <div class="pc-name">${p.name}</div>
    <div class="pc-role">${p.role}</div>
    <div class="pc-expand">tap to read more ↓</div>
    <div class="pc-bio">${p.bio}</div>
  `;

  // toggle expand
  const toggle = () => {
    card.classList.toggle('open');
  };
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    if (activeKinId) {
      clearKinship();
      return;
    }
    toggle();
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });

  // long-press or right-click → kinship trace
  let pressTimer;
  card.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    pressTimer = setTimeout(() => { e.preventDefault(); activateKinship(personId); }, 500);
  });
  card.addEventListener('mouseup', () => clearTimeout(pressTimer));
  card.addEventListener('mouseleave', () => clearTimeout(pressTimer));
  card.addEventListener('touchstart', () => { pressTimer = setTimeout(() => activateKinship(personId), 500); }, { passive: true });
  card.addEventListener('touchend', () => clearTimeout(pressTimer));

  return card;
}

// ── BUILD HOUSE SECTION ──────────────────────────────────
function buildHouseSection(house) {
  const members = PEOPLE.filter(p => p.house === house.id);
  if (!members.length) return;

  const section = document.createElement('section');
  section.className = 'content-section';
  section.id = `house-${house.id}`;
  section.style.scrollMarginTop = '24px';

  // section header
  section.innerHTML = `
    <div class="section-head">
      <div class="section-eyebrow">House ${house.label}</div>
      <div class="house-meta">
        <div class="house-sigil-lg">${SIGILS[house.id] || ''}</div>
        <div>
          <h2 class="section-title" style="margin-bottom:4px">House ${house.label}</h2>
          <div class="house-words">${house.words}</div>
          <div class="house-seat">Seat: ${house.seat} · ${house.region}</div>
        </div>
      </div>
    </div>
  `;

  const content = document.createElement('div');

  // Identify generations: find roots (people whose parents are not in this house)
  // We'll do a simple multi-gen layout: find parents in-house vs not
  const houseIds = new Set(members.map(m => m.id));

  // Find marriages: pairs that share children and are in this house or adjacent
  const rendered = new Set();
  const generations = buildGenerations(members, houseIds);

  generations.forEach((gen, gi) => {
    if (!gen.length) return;

    const label = document.createElement('div');
    label.className = 'tree-label';
    label.textContent = gi === 0 ? 'Founding generation' :
                        gi === 1 ? 'Second generation' :
                        gi === 2 ? 'Third generation' : `Generation ${gi + 1}`;
    content.appendChild(label);

    const row = document.createElement('div');
    row.className = 'generation';

    // Group into marriage pairs + singles
    const pairs = findMarriagePairs(gen, houseIds);
    const renderedInPairs = new Set();

    pairs.forEach(pair => {
      const wrap = document.createElement('div');
      wrap.className = 'marriage-pair';

      const c1 = createPersonCard(pair[0]);
      const badge = document.createElement('div');
      badge.className = 'marriage-badge';
      badge.textContent = 'wed';
      const c2 = createPersonCard(pair[1]);

      if (c1) { wrap.appendChild(c1); renderedInPairs.add(pair[0]); }
      wrap.appendChild(badge);
      if (c2) { wrap.appendChild(c2); renderedInPairs.add(pair[1]); }
      row.appendChild(wrap);
    });

    gen.forEach(id => {
      if (!renderedInPairs.has(id)) {
        const c = createPersonCard(id);
        if (c) row.appendChild(c);
      }
    });

    content.appendChild(row);
  });

  // Reveal callouts — secret parentage
  const secrets = members.filter(m => m.secret);
  if (secrets.length) {
    const callout = document.createElement('div');
    callout.className = 'reveal-callout';
    callout.innerHTML = `<span class="reveal-icon">🔒</span><strong>Secret parentage in this house:</strong> ${
      secrets.map(m => `<strong>${m.name}</strong>`).join(', ')
    } ${secrets.length === 1 ? 'has' : 'have'} a parentage reveal marked on their card — tap the card, then long-press to trace their kin across the page.`;
    content.appendChild(callout);
  }

  section.appendChild(content);
  return section;
}

// Determine generation order: BFS from roots
function buildGenerations(members, houseIds) {
  const memberIds = new Set(members.map(m => m.id));

  // roots: those whose parents are NOT in this house
  const roots = members.filter(m =>
    !m.parents || !m.parents.some(pid => memberIds.has(pid))
  ).map(m => m.id);

  const generations = [];
  const placed = new Set();
  let current = roots.filter(id => !placed.has(id));

  while (current.length > 0) {
    generations.push([...current]);
    current.forEach(id => placed.add(id));

    // Next gen: children of current gen that are in this house
    const next = [];
    current.forEach(id => {
      const person = PERSON_MAP[id];
      if (person?.children) {
        person.children.forEach(cid => {
          if (memberIds.has(cid) && !placed.has(cid) && !next.includes(cid)) {
            next.push(cid);
          }
        });
      }
    });
    current = next;
  }

  // any unplaced (cross-house children etc)
  const unplaced = members.filter(m => !placed.has(m.id)).map(m => m.id);
  if (unplaced.length) generations.push(unplaced);

  return generations;
}

// Find married couples within a generation
function findMarriagePairs(gen, houseIds) {
  const pairs = [];
  const used = new Set();

  gen.forEach(id => {
    if (used.has(id)) return;
    const p = PERSON_MAP[id];
    if (!p?.spouses) return;
    p.spouses.forEach(sid => {
      if (gen.includes(sid) && !used.has(sid)) {
        pairs.push([id, sid]);
        used.add(id);
        used.add(sid);
      }
    });
  });

  return pairs;
}

// ── THRONE SEQUENCE ──────────────────────────────────────
function buildThroneSequence() {
  const container = document.getElementById('throne-sequence');

  THRONE_SEQUENCE.forEach((step, i) => {
    const color = HOUSE_COLOR[step.house] || '#888';
    const el = document.createElement('div');
    el.className = 'throne-step';
    el.innerHTML = `
      <div class="ts-dot" style="border-color:${color};color:${color}">${i + 1}</div>
      <div class="ts-body">
        <div class="ts-name">${step.name}</div>
        <div class="ts-note">${step.note}</div>
      </div>
    `;
    container.appendChild(el);
  });
}

// ── GLOSSARY ─────────────────────────────────────────────
function buildGlossary() {
  const container = document.getElementById('glossary-content');

  GLOSSARY.forEach(cat => {
    const catEl = document.createElement('div');
    catEl.className = 'gloss-category';
    catEl.textContent = cat.category;
    container.appendChild(catEl);

    const grid = document.createElement('div');
    grid.className = 'gloss-grid';

    cat.terms.forEach(t => {
      const el = document.createElement('div');
      el.className = 'gloss-term';
      el.setAttribute('tabindex', '0');
      el.innerHTML = `
        <div class="gt-header">
          <span class="gt-term">${t.term}</span>
          <span class="gt-plain">${t.plain}</span>
        </div>
        <div class="gt-meaning">${t.meaning}</div>
        <div class="gt-expand">tap for example ↓</div>
        <div class="gt-context">${t.context}</div>
      `;
      const toggle = () => el.classList.toggle('open');
      el.addEventListener('click', toggle);
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }});
      grid.appendChild(el);
    });

    container.appendChild(grid);
  });
}

// ── SEARCH ───────────────────────────────────────────────
let searchTimeout;
function initSearch() {
  const input = document.getElementById('search');
  const results = document.getElementById('search-results');

  input.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (!q) { results.hidden = true; return; }

      const matches = PEOPLE.filter(p =>
        p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)
      ).slice(0, 8);

      results.innerHTML = '';
      if (!matches.length) {
        results.innerHTML = '<div class="search-empty">No characters found</div>';
      } else {
        matches.forEach(p => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.setAttribute('tabindex', '0');
          const house = HOUSES.find(h => h.id === p.house);
          item.innerHTML = `
            <div class="sri-name">${p.name}</div>
            <div class="sri-house" style="color:${HOUSE_COLOR[p.house] || '#888'}">${house?.label || ''} · ${p.role}</div>
          `;
          const go = () => {
            results.hidden = true;
            input.value = '';
            // scroll to person's card
            const card = document.querySelector(`[data-person-id="${p.id}"]`);
            if (card) {
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => {
                card.classList.add('open');
                card.style.boxShadow = '0 0 0 3px #b8860b55';
                setTimeout(() => card.style.boxShadow = '', 2000);
              }, 600);
            } else {
              // scroll to section
              document.getElementById(`house-${p.house}`)?.scrollIntoView({ behavior: 'smooth' });
            }
            if (window.innerWidth <= 700) closeSidebar();
          };
          item.addEventListener('click', go);
          item.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
          results.appendChild(item);
        });
      }
      results.hidden = false;
    }, 180);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) results.hidden = true;
  });
}

// ── KINSHIP TRACER ───────────────────────────────────────
let activeKinId = null;

function activateKinship(personId) {
  activeKinId = personId;
  const p = PERSON_MAP[personId];
  if (!p) return;

  const kin = new Set();
  kin.add(personId);
  (p.parents || []).forEach(id => kin.add(id));
  (p.spouses || []).forEach(id => kin.add(id));
  (p.children || []).forEach(id => kin.add(id));

  // also add children's other parents (co-parents)
  (p.children || []).forEach(cid => {
    const child = PERSON_MAP[cid];
    if (child) (child.parents || []).forEach(pid => kin.add(pid));
  });

  document.querySelectorAll('.person-card').forEach(card => {
    const cid = card.dataset.personId;
    if (kin.has(cid)) {
      card.classList.add('kin-highlight');
      card.classList.remove('kin-dim');
    } else {
      card.classList.add('kin-dim');
      card.classList.remove('kin-highlight');
    }
  });

  // show panel
  const panel = document.getElementById('kin-panel');
  panel.querySelector('.kin-panel-name').textContent = p.name;

  const relLines = [];
  if (p.parents?.length) {
    const pnames = p.parents.map(id => PERSON_MAP[id]?.name || id).filter(Boolean);
    relLines.push(`<div class="kin-rel"><strong>Parents:</strong> ${pnames.join(', ')}</div>`);
  }
  if (p.spouses?.length) {
    const snames = p.spouses.map(id => PERSON_MAP[id]?.name || id).filter(Boolean);
    relLines.push(`<div class="kin-rel"><strong>Spouse:</strong> ${snames.join(', ')}</div>`);
  }
  if (p.children?.length) {
    const cnames = p.children.map(id => PERSON_MAP[id]?.name || id).filter(Boolean);
    relLines.push(`<div class="kin-rel"><strong>Children:</strong> ${cnames.join(', ')}</div>`);
  }
  panel.querySelector('.kin-rels').innerHTML = relLines.join('');
  panel.classList.add('visible');
}

function clearKinship() {
  activeKinId = null;
  document.querySelectorAll('.person-card').forEach(card => {
    card.classList.remove('kin-highlight', 'kin-dim');
  });
  document.getElementById('kin-panel').classList.remove('visible');
}

// ── MOBILE SIDEBAR ───────────────────────────────────────
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
  document.body.style.overflow = '';
}

// ── ACTIVE NAV on scroll ─────────────────────────────────
function initScrollSpy() {
  const sections = document.querySelectorAll('.content-section[id]');
  const links = document.querySelectorAll('.nav-link[data-section]');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => obs.observe(s));
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Build nav
  buildSidebarNav();

  // Build hero sigils
  buildHeroSigils();

  // Build house sections
  const houseSections = document.getElementById('house-sections');
  HOUSES.forEach(house => {
    const section = buildHouseSection(house);
    if (section) houseSections.appendChild(section);
  });

  // Build throne + glossary
  buildThroneSequence();
  buildGlossary();

  // Search
  initSearch();

  // Scroll spy
  initScrollSpy();

  // Mobile menu
  document.getElementById('menu-btn').addEventListener('click', openSidebar);
  document.getElementById('sidebar-close').addEventListener('click', closeSidebar);
  document.getElementById('overlay').addEventListener('click', closeSidebar);

  // Kinship panel
  const kinPanelHtml = `
    <div id="kin-panel" class="kin-panel">
      <button class="kin-panel-close" aria-label="Close">✕</button>
      <div class="kin-panel-name"></div>
      <div class="kin-rels"></div>
      <div style="font-size:11px;opacity:0.45;margin-top:10px;font-style:italic">Long-press any card to trace kin</div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', kinPanelHtml);
  document.getElementById('kin-panel').querySelector('.kin-panel-close').addEventListener('click', clearKinship);

  // Click away to clear kinship
  document.addEventListener('click', e => {
    if (activeKinId && !e.target.closest('.person-card') && !e.target.closest('#kin-panel')) {
      clearKinship();
    }
  });

  // Keyboard escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      clearKinship();
      closeSidebar();
      document.getElementById('search-results').hidden = true;
    }
  });
});
