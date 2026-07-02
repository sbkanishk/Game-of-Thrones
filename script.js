/*  Houses of Westeros — script.js
    Reads data.js globals: HOUSES, PEOPLE, PEOPLE_BY_ID, HOUSES_BY_ID,
    REVEALS, THRONE_ORDER, VOCAB.

    Responsibilities:
    1. Render all DOM from data (house grid, sections, throne line, vocab)
    2. Sidebar toggle (bottom-sheet on mobile, persistent on desktop)
    3. Live search across people, houses, vocab
    4. Expandable character cards + vocab terms
    5. Kinship tracer — click a name, dim everyone not related
    6. Active-nav highlighting via IntersectionObserver
*/
(function () {
  'use strict';

  /* ── State ─────────────────────────────────────────────────── */
  var activePersonId = null;
  var sidebarOpen    = false;

  /* ── Cached elements ────────────────────────────────────────── */
  var E = {};

  /* ── Boot ─────────────────────────────────────────────────────*/
  document.addEventListener('DOMContentLoaded', function () {
    cacheEls();
    renderHouseGrid();
    renderHouseNav();
    renderHouseSections();
    renderThroneLine();
    renderVocab();
    initSidebar();
    initSearch();
    initExpandables();
    initKinshipTracer();
    initNavObserver();
    initScrollNavLinks();
  });

  /* ── Element cache ─────────────────────────────────────────── */
  function cacheEls() {
    E.topbar       = document.getElementById('topbar');
    E.menuBtn      = document.getElementById('menuBtn');
    E.searchBtnMob = document.getElementById('searchBtnMobile');
    E.scrim        = document.getElementById('scrim');
    E.sidebar      = document.getElementById('sidebar');
    E.sidebarClose = document.getElementById('sidebarClose');
    E.searchInput  = document.getElementById('searchInput');
    E.searchClear  = document.getElementById('searchClear');
    E.searchRes    = document.getElementById('searchResults');
    E.houseGrid    = document.getElementById('houseGrid');
    E.houseNav     = document.getElementById('houseNavItems');
    E.houseSec     = document.getElementById('houseSections');
    E.throneList   = document.getElementById('throneList');
    E.vocabContent = document.getElementById('vocabContent');
    E.kinBanner    = document.getElementById('kinBanner');
    E.kinBannerTxt = document.getElementById('kinBannerText');
    E.kinClearBtn  = document.getElementById('kinClearBtn');
  }

  /* ────────────────────────────────────────────────────────────
     SIGILS  (inline SVG per house)
  ──────────────────────────────────────────────────────────── */
  var SIGILS = {
    stark:     '<path d="M26 11c-4 7-11 9-11 18 0 7 5 12 11 12s11-5 11-12c0-9-7-11-11-18z" fill="currentColor" opacity=".85"/><path d="M17 31l-5 7M35 31l5 7" stroke="currentColor" stroke-width="1.5" fill="none"/>',
    targaryen: '<path d="M26 12l13 13-13 17-13-17z" fill="currentColor" opacity=".85"/><path d="M19 22h14M21 28h10" stroke="var(--bg)" stroke-width="1.3"/>',
    lannister: '<circle cx="26" cy="21" r="8" fill="currentColor" opacity=".85"/><path d="M12 40c2-8 8-11 14-11s12 3 14 11" stroke="currentColor" stroke-width="1.9" fill="none"/>',
    baratheon: '<path d="M26 11l5 11 11-2-7 9 7 9-11-2-5 11-5-11-11 2 7-9-7-9 11 2z" fill="currentColor" opacity=".85"/>',
    tyrell:    '<circle cx="26" cy="26" r="7" fill="currentColor" opacity=".85"/><path d="M26 12v8M26 34v8M12 26h8M34 26h8M17 17l5 5M35 17l-5 5M17 35l5-5M35 35l-5-5" stroke="currentColor" stroke-width="1.5"/>',
    martell:   '<circle cx="26" cy="26" r="10" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M26 13v26M13 26h26" stroke="currentColor" stroke-width="2"/>',
    greyjoy:   '<path d="M26 11c7 5 11 11 11 18a11 11 0 0 1-22 0c0-7 4-13 11-18z" fill="currentColor" opacity=".85"/>',
    arryn:     '<path d="M12 36l14-23 14 23z" fill="none" stroke="currentColor" stroke-width="2"/>',
    tully:     '<path d="M26 12c5 6 11 11 11 18a11 11 0 0 1-22 0c0-7 6-12 11-18z" fill="currentColor" opacity=".85"/><path d="M16 36h20" stroke="currentColor" stroke-width="1.6"/>',
  };

  function sigil(houseId, size) {
    size = size || 44;
    var inner = SIGILS[houseId] || '<circle cx="26" cy="26" r="10" fill="currentColor" opacity=".6"/>';
    return '<svg viewBox="0 0 52 52" width="' + size + '" height="' + size + '" aria-hidden="true">' + inner + '</svg>';
  }

  function houseColor(houseId) {
    return 'var(--' + houseId + ', var(--gold))';
  }

  /* ────────────────────────────────────────────────────────────
     DOM HELPERS
  ──────────────────────────────────────────────────────────── */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls)  n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  function personById(id) { return PEOPLE_BY_ID[id]; }
  function personName(id) { var p = personById(id); return p ? p.name : id; }
  function houseById(id)  { return HOUSES_BY_ID[id]; }

  /* ────────────────────────────────────────────────────────────
     RENDER — Overview house grid
  ──────────────────────────────────────────────────────────── */
  function renderHouseGrid() {
    HOUSES.forEach(function (h) {
      var btn = el('button', 'house-chip');
      btn.style.setProperty('--h-color', houseColor(h.id));
      btn.setAttribute('data-target', 'house-' + h.id);
      btn.setAttribute('aria-label', 'Jump to House ' + h.name);
      btn.innerHTML =
        '<span class="h-sigil">' + sigil(h.id, 32) + '</span>' +
        '<span><span class="h-name">' + h.name + '</span>' +
        '<span class="h-seat">' + h.seat + '</span></span>';
      E.houseGrid.appendChild(btn);
    });
  }

  /* ────────────────────────────────────────────────────────────
     RENDER — Sidebar nav house items
  ──────────────────────────────────────────────────────────── */
  function renderHouseNav() {
    HOUSES.forEach(function (h) {
      var btn = el('button', 'nav-item');
      btn.setAttribute('data-target', 'house-' + h.id);
      btn.innerHTML =
        '<span class="nav-house-dot" style="--house-c:' + houseColor(h.id) + '"></span>' +
        '<span>House ' + h.name + '</span>';
      E.houseNav.appendChild(btn);
    });
  }

  /* ────────────────────────────────────────────────────────────
     RENDER — Per-house sections
  ──────────────────────────────────────────────────────────── */
  function renderHouseSections() {
    HOUSES.forEach(function (h) {
      E.houseSec.appendChild(buildHouseSection(h));
    });
  }

  var HOUSE_BLURBS = {
    stark:     'Rulers of the North for thousands of years, and the family the story returns to. Honest to a fault — which kills several of them, and ultimately rewards the ones who adapt.',
    targaryen: 'The dynasty that conquered Westeros with dragons three centuries before the story starts, then lost the throne when the Mad King was overthrown. Their claim to the throne is the engine driving half the plot.',
    lannister: 'The richest house in Westeros. Tywin\'s three children each play the game completely differently — and that contrast carries most of the family\'s story.',
    baratheon: 'Three brothers, three different claims, one throne. Their rivalry drives the early War of the Five Kings, and their bloodline quietly merges into House Lannister by way of a secret.',
    tyrell:    'The wealthiest house after the Lannisters. Margaery marries her way toward the throne twice over; her grandmother Olenna is one of the sharpest minds in the story.',
    martell:   'Rulers of Dorne, the one region the Targaryen conquest never fully subdued. They stay out of the main wars for reasons rooted in an old and personal grievance.',
    greyjoy:   'Lords of the Iron Islands. Theon is raised at Winterfell as Ned Stark\'s ward — really a hostage — and spends his whole story torn between two identities.',
    arryn:     'Catelyn Stark\'s family by her mother\'s side. Lysa Arryn rules the Vale from the Eyrie, a mountain castle near-impossible to take by force.',
    tully:     'Catelyn\'s own house, at Riverrun. Their alliances tie them to both Stark and Arryn, pulling the riverlands into wars that aren\'t entirely theirs.',
  };

  function buildHouseSection(house) {
    var sec = el('section', 'house-section');
    sec.id = 'house-' + house.id;
    sec.style.setProperty('--h-color', houseColor(house.id));

    var inner = el('div', 'house-inner');

    /* Banner */
    var banner = el('div', 'house-banner');
    banner.innerHTML =
      '<span class="house-banner-sigil">' + sigil(house.id, 60) + '</span>' +
      '<div>' +
        '<div class="house-banner-name">House ' + house.name + '</div>' +
        '<div class="house-banner-meta">' +
          '<strong>&ldquo;' + house.words + '&rdquo;</strong> &nbsp;·&nbsp; ' + house.seat + ' &nbsp;·&nbsp; ' + house.region +
        '</div>' +
      '</div>';
    inner.appendChild(banner);

    /* Blurb */
    var blurb = el('p', 'house-blurb', HOUSE_BLURBS[house.id] || '');
    inner.appendChild(blurb);

    /* Tree */
    var members = PEOPLE.filter(function (p) { return p.house === house.id; });
    if (members.length) inner.appendChild(buildTree(members, house));

    /* Reveals */
    REVEALS.forEach(function (r) {
      var fp = personById(r.from);
      if (fp && fp.house === house.id) inner.appendChild(buildReveal(r));
    });

    sec.appendChild(inner);
    return sec;
  }

  /* ── Tree builder ─────────────────────────────────────────── */
  function buildTree(members, house) {
    var tree = el('div', 'tree');

    /* Group by tier */
    var tiers = {};
    members.forEach(function (p) {
      var t = p.tier || 1;
      if (!tiers[t]) tiers[t] = [];
      tiers[t].push(p);
    });

    var tierNums = Object.keys(tiers).map(Number).sort(function (a, b) { return a - b; });
    var tierLabels = { 1: 'Founders / parents', 2: 'Core generation', 3: 'Children & heirs' };

    tierNums.forEach(function (t) {
      /* Label */
      var labelEl = el('div', 'tier-label', tierLabels[t] || 'Generation ' + t);
      tree.appendChild(labelEl);

      var row = el('div', 'tier-row');
      var placed = {};

      tiers[t].forEach(function (p) {
        if (placed[p.id]) return;

        /* Check if this person has a spouse also in the same tier */
        var spouseInTier = null;
        (p.spouses || []).forEach(function (sid) {
          if (!placed[sid] && tiers[t].some(function (q) { return q.id === sid; })) {
            spouseInTier = personById(sid);
          }
        });

        if (spouseInTier) {
          var pair = el('div', 'marriage-pair');
          pair.appendChild(buildCharCard(p, house));
          var wed = el('span', 'wed-mark', 'wed');
          pair.appendChild(wed);
          pair.appendChild(buildCharCard(spouseInTier, house));
          row.appendChild(pair);
          placed[p.id] = true;
          placed[spouseInTier.id] = true;
        } else {
          row.appendChild(buildCharCard(p, house));
          placed[p.id] = true;
        }
      });

      tree.appendChild(row);
    });

    return tree;
  }

  /* ── Character card ──────────────────────────────────────── */
  function buildCharCard(person, house) {
    var houseId = person.house || (house && house.id) || 'stark';
    var card = el('div', 'char-card' + (person.status === 'deceased' ? ' deceased' : ''));
    card.setAttribute('data-expandable', '1');
    card.setAttribute('data-person-card', person.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', person.name);
    card.style.setProperty('--h-color', houseColor(houseId));

    card.innerHTML =
      '<div class="card-sigil">' + sigil(houseId, 44) + '</div>' +
      '<div class="card-name" data-kin-name="' + person.id + '" tabindex="0" role="button" aria-label="Trace kin for ' + person.name + '">' + person.name + '</div>' +
      '<div class="card-title">' + person.title + '</div>' +
      '<span class="card-status ' + (person.status || 'unknown') + '">' + (person.status === 'alive' ? '● Alive' : '† Deceased') + '</span>' +
      '<div class="card-tap-hint">Tap to expand</div>' +
      '<div class="card-note">' + (person.note || '') + '</div>';

    return card;
  }

  /* ── Reveal box ──────────────────────────────────────────── */
  function buildReveal(reveal) {
    var box = el('div', 'reveal');
    var body = reveal.body;

    /* Make named people in the reveal body into clickable kin-links */
    (reveal.links || []).forEach(function (id) {
      var p = personById(id);
      if (!p) return;
      var escaped = p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      body = body.replace(new RegExp(escaped, 'g'),
        '<span class="name-link" data-kin-name="' + id + '" tabindex="0" role="button">' + p.name + '</span>');
    });

    box.innerHTML =
      '<div class="reveal-title">' + reveal.title + '</div>' +
      '<div class="reveal-body">' + body + '</div>';
    return box;
  }

  /* ────────────────────────────────────────────────────────────
     RENDER — Throne succession
  ──────────────────────────────────────────────────────────── */
  function renderThroneLine() {
    THRONE_ORDER.forEach(function (step) {
      var p = personById(step.person);
      if (!p) return;
      var li = el('li');
      li.style.setProperty('--h-dot', houseColor(p.house));
      li.innerHTML =
        '<span class="throne-name" data-kin-name="' + p.id + '" tabindex="0" role="button">' + p.name + '</span>' +
        '<span class="throne-note">' + step.note + '</span>';
      E.throneList.appendChild(li);
    });
  }

  /* ────────────────────────────────────────────────────────────
     RENDER — Vocabulary
  ──────────────────────────────────────────────────────────── */
  function renderVocab() {
    VOCAB.forEach(function (group) {
      var label = el('div', 'vocab-group-label', group.category);
      E.vocabContent.appendChild(label);

      var grid = el('div', 'vocab-grid');
      group.terms.forEach(function (t) {
        var term = el('div', 'vocab-term');
        term.setAttribute('data-expandable-vocab', '1');
        term.setAttribute('tabindex', '0');
        term.innerHTML =
          '<div class="vocab-head">' +
            '<span class="vocab-word">' + t.term + '</span>' +
            '<span class="vocab-say">' + t.say + '</span>' +
          '</div>' +
          '<div class="vocab-meaning">' + t.meaning + '</div>' +
          '<div class="vocab-expand-hint">Tap for more</div>' +
          '<div class="vocab-more">' + t.more + '</div>';
        grid.appendChild(term);
      });
      E.vocabContent.appendChild(grid);
    });
  }

  /* ────────────────────────────────────────────────────────────
     SIDEBAR — Toggle (mobile bottom-sheet / desktop always open)
  ──────────────────────────────────────────────────────────── */
  function isMobile() { return window.innerWidth <= 768; }

  function openSidebar() {
    sidebarOpen = true;
    E.sidebar.classList.add('open');
    E.scrim.classList.add('visible');
    E.menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebarOpen = false;
    E.sidebar.classList.remove('open');
    E.scrim.classList.remove('visible');
    E.menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function initSidebar() {
    E.menuBtn.addEventListener('click', function () {
      sidebarOpen ? closeSidebar() : openSidebar();
    });

    if (E.searchBtnMob) {
      E.searchBtnMob.addEventListener('click', function () {
        openSidebar();
        setTimeout(function () { E.searchInput.focus(); }, 180);
      });
    }

    E.sidebarClose.addEventListener('click', closeSidebar);
    E.scrim.addEventListener('click', closeSidebar);

    /* Close sidebar when a nav item is tapped on mobile */
    E.sidebar.addEventListener('click', function (evt) {
      var item = evt.target.closest('[data-target]');
      if (item && isMobile()) setTimeout(closeSidebar, 120);
    });
  }

  /* ────────────────────────────────────────────────────────────
     SCROLL NAV LINKS (both sidebar and overview grid chips)
  ──────────────────────────────────────────────────────────── */
  function initScrollNavLinks() {
    document.body.addEventListener('click', function (evt) {
      var btn = evt.target.closest('[data-target]');
      if (!btn) return;
      var id = btn.getAttribute('data-target');
      var target = document.getElementById(id);
      if (!target) return;
      var offset = isMobile() ? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h') || '56') : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - offset - 12;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ────────────────────────────────────────────────────────────
     ACTIVE NAV — IntersectionObserver
  ──────────────────────────────────────────────────────────── */
  function initNavObserver() {
    var allNavBtns = Array.from(document.querySelectorAll('.nav-item[data-target]'));
    var allSections = Array.from(document.querySelectorAll('.section, .house-section'));
    if (!allSections.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        allNavBtns.forEach(function (b) { b.classList.remove('active'); });
        var match = allNavBtns.find(function (b) { return b.getAttribute('data-target') === entry.target.id; });
        if (match) match.classList.add('active');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    allSections.forEach(function (s) { obs.observe(s); });
  }

  /* ────────────────────────────────────────────────────────────
     SEARCH
  ──────────────────────────────────────────────────────────── */
  function initSearch() {
    E.searchInput.addEventListener('input', onSearchInput);
    E.searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') clearSearch();
      if (e.key === 'ArrowDown') {
        var first = E.searchRes.querySelector('button');
        if (first) { e.preventDefault(); first.focus(); }
      }
    });
    if (E.searchClear) {
      E.searchClear.addEventListener('click', function () { clearSearch(); E.searchInput.focus(); });
    }
  }

  function clearSearch() {
    E.searchInput.value = '';
    E.searchRes.hidden = true;
    E.searchRes.innerHTML = '';
    if (E.searchClear) E.searchClear.hidden = true;
  }

  function onSearchInput() {
    var q = E.searchInput.value.trim().toLowerCase();
    if (E.searchClear) E.searchClear.hidden = !q;

    if (!q) { E.searchRes.hidden = true; E.searchRes.innerHTML = ''; return; }

    var hits = [];

    PEOPLE.forEach(function (p) {
      if (
        p.name.toLowerCase().indexOf(q) !== -1 ||
        p.title.toLowerCase().indexOf(q) !== -1 ||
        (p.tags || []).some(function (t) { return t.indexOf(q) !== -1; })
      ) {
        hits.push({ type: 'person', id: p.id, name: p.name, sub: houseById(p.house) ? houseById(p.house).name : '' });
      }
    });

    HOUSES.forEach(function (h) {
      if (h.name.toLowerCase().indexOf(q) !== -1 || h.region.toLowerCase().indexOf(q) !== -1) {
        hits.push({ type: 'house', id: 'house-' + h.id, name: 'House ' + h.name, sub: h.seat });
      }
    });

    VOCAB.forEach(function (group) {
      group.terms.forEach(function (t) {
        if (t.term.toLowerCase().indexOf(q) !== -1 || t.meaning.toLowerCase().indexOf(q) !== -1) {
          hits.push({ type: 'vocab', id: 'vocabulary', name: t.term, sub: 'Vocabulary' });
        }
      });
    });

    renderSearchResults(hits.slice(0, 9));
  }

  function renderSearchResults(hits) {
    E.searchRes.innerHTML = '';
    E.searchRes.hidden = false;

    if (!hits.length) {
      E.searchRes.appendChild(el('div', 'search-no-results', 'No matches found'));
      return;
    }

    hits.forEach(function (hit) {
      var btn = el('button', 'search-result-item');
      btn.innerHTML = '<span class="sri-name">' + hit.name + '</span><span class="sri-sub">' + hit.sub + '</span>';
      btn.addEventListener('click', function () {
        if (hit.type === 'person') {
          var p = personById(hit.id);
          var secId = p ? 'house-' + p.house : null;
          if (secId) {
            var sec = document.getElementById(secId);
            if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          setTimeout(function () { activateKinTrace(hit.id); }, 300);
        } else {
          var target = document.getElementById(hit.id);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        clearSearch();
        if (isMobile()) closeSidebar();
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); var next = btn.nextElementSibling; if (next) next.focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); var prev = btn.previousElementSibling; if (prev) prev.focus(); else E.searchInput.focus(); }
      });
      E.searchRes.appendChild(btn);
    });
  }

  /* ────────────────────────────────────────────────────────────
     EXPANDABLES — character cards + vocab terms
  ──────────────────────────────────────────────────────────── */
  function initExpandables() {
    /* Card expand — click on card body (but NOT on the name span, which is kin-trace) */
    document.body.addEventListener('click', function (e) {
      /* Vocab terms */
      var vt = e.target.closest('[data-expandable-vocab]');
      if (vt) { vt.classList.toggle('open'); return; }

      /* Character cards: toggle open, but only if click wasn't on the name */
      var card = e.target.closest('[data-expandable]');
      if (card && !e.target.closest('[data-kin-name]')) {
        card.classList.toggle('open');
      }
    });

    document.body.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var vt = e.target.closest('[data-expandable-vocab]');
      if (vt) { e.preventDefault(); vt.classList.toggle('open'); return; }

      var card = e.target.closest('[data-expandable]');
      if (card && e.target === card) { e.preventDefault(); card.classList.toggle('open'); }
    });
  }

  /* ────────────────────────────────────────────────────────────
     KINSHIP TRACER
  ──────────────────────────────────────────────────────────── */
  function getKin(personId) {
    var p = personById(personId);
    if (!p) return [];
    var kin = new Set();
    (p.parents  || []).forEach(function (id) { kin.add(id); });
    (p.spouses  || []).forEach(function (id) { kin.add(id); });
    /* Children: anyone who lists personId as a parent */
    PEOPLE.forEach(function (q) {
      if ((q.parents || []).indexOf(personId) !== -1) kin.add(q.id);
      if ((q.spouses || []).indexOf(personId) !== -1) kin.add(q.id);
    });
    kin.delete(personId);
    return Array.from(kin);
  }

  function activateKinTrace(personId) {
    var p = personById(personId);
    if (!p) return;
    activePersonId = personId;
    var kin = getKin(personId);

    /* Apply classes to all cards */
    document.querySelectorAll('[data-person-card]').forEach(function (card) {
      var id = card.getAttribute('data-person-card');
      card.classList.remove('kin-self', 'kin-related');
      if (id === personId) card.classList.add('kin-self');
      else if (kin.indexOf(id) !== -1) card.classList.add('kin-related');
    });

    document.body.classList.add('tracing');

    /* Banner */
    var kinNames = kin.map(personName);
    E.kinBannerTxt.innerHTML = kinNames.length
      ? '<strong>' + p.name + '</strong> — kin shown: ' + kinNames.join(', ')
      : '<strong>' + p.name + '</strong> — no direct kin recorded in this ledger';
    E.kinBanner.hidden = false;
  }

  function clearKinTrace() {
    activePersonId = null;
    document.body.classList.remove('tracing');
    document.querySelectorAll('[data-person-card]').forEach(function (card) {
      card.classList.remove('kin-self', 'kin-related');
    });
    E.kinBanner.hidden = true;
  }

  function initKinshipTracer() {
    /* Click on any [data-kin-name] element */
    document.body.addEventListener('click', function (e) {
      var nameEl = e.target.closest('[data-kin-name]');
      if (!nameEl) return;
      e.stopPropagation(); /* Don't bubble to card expand handler */
      var id = nameEl.getAttribute('data-kin-name');
      if (activePersonId === id) clearKinTrace();
      else activateKinTrace(id);
    });

    document.body.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var nameEl = e.target.closest('[data-kin-name]');
      if (!nameEl) return;
      e.preventDefault();
      e.stopPropagation();
      var id = nameEl.getAttribute('data-kin-name');
      if (activePersonId === id) clearKinTrace();
      else activateKinTrace(id);
    });

    /* Clear btn in banner */
    E.kinClearBtn.addEventListener('click', clearKinTrace);

    /* ESC key clears trace */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activePersonId) clearKinTrace();
    });
  }

})();
