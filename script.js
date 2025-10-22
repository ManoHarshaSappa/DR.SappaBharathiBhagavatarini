// Elements
const tabs   = document.querySelectorAll('.dock-btn');
const panes  = document.querySelectorAll('[role="tabpanel"]');
const dock   = document.getElementById('dock');
const label  = document.getElementById('tabLabel');

const menu     = document.getElementById('mobileMenu');
const menuBtn  = document.getElementById('menuToggle');

let menuTimer = null;
let labelTimer = null;

/* Switch visible panel and set active button */
function showPanel(id, btn){
  tabs.forEach(b=>{
    const on = b === btn;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  panes.forEach(p=>{ p.hidden = (p.id !== id); });
}

/* Show the name label under the given button */
function showNameUnder(btn, ms=2500){
  // where is the button relative to the dock?
  const dockRect = dock.getBoundingClientRect();
  const r = btn.getBoundingClientRect();
  const centerX = (r.left + r.width/2) - dockRect.left + dock.scrollLeft;

  label.textContent = btn.dataset.title || '';
  label.style.left = `${centerX}px`;
  label.classList.add('show');

  clearTimeout(labelTimer);
  labelTimer = setTimeout(()=>label.classList.remove('show'), ms);
}
function hideName(){ label.classList.remove('show'); }

/* Menu handlers */
function openMenu(){
  menu.classList.add('open');
  menuBtn.classList.add('open');
  menuBtn.setAttribute('aria-expanded','true');
  clearTimeout(menuTimer);
  menuTimer = setTimeout(closeMenu, 10000);
}
function closeMenu(){
  menu.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
  clearTimeout(menuTimer); menuTimer = null;
}
menuBtn.addEventListener('click', ()=> menu.classList.contains('open') ? closeMenu() : openMenu());
menu.addEventListener('pointerdown', ()=>{
  if (menu.classList.contains('open')) {
    clearTimeout(menuTimer);
    menuTimer = setTimeout(closeMenu, 10000);
  }
});

/* Dock interactions */
tabs.forEach(btn=>{
  // hover/focus -> show label
  btn.addEventListener('mouseenter', ()=>showNameUnder(btn));
  btn.addEventListener('focus', ()=>showNameUnder(btn));
  btn.addEventListener('mouseleave', hideName);
  btn.addEventListener('blur', hideName);

  // click -> switch panel + show label
  btn.addEventListener('click', ()=>{
    showPanel(btn.dataset.panel, btn);
    showNameUnder(btn);
  });

  // keyboard
  btn.addEventListener('keydown', e=>{
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showPanel(btn.dataset.panel, btn);
      showNameUnder(btn);
    }
  });
});

/* Menu items click -> switch panel + close */
menu.querySelectorAll('li').forEach(li=>{
  li.addEventListener('click', ()=>{
    const id  = li.dataset.panel;
    const btn = document.querySelector(`.dock-btn[data-panel="${id}"]`);
    if (btn) {
      showPanel(id, btn);
      showNameUnder(btn);
    }
    closeMenu();
  });
});

/* Default: Home active + show its label briefly */
const first = document.querySelector('.dock-btn.active') || tabs[0];
showPanel(first.dataset.panel || 'panel-home', first);
showNameUnder(first, 1200);





/* competed of above part *//* competed of above part *//* competed of above part *//* competed of above part *//* competed of above part */// Subtabs: sliding indicator, ARIA, panel switching// Enhance all .subtabs navs: sliding indicator + ARIA + panel switching
document.querySelectorAll('.subtabs').forEach((nav) => {
  // Create the shared indicator (no HTML change)
  const indicator = document.createElement('span');
  indicator.className = 'subtab-indicator';
  nav.appendChild(indicator);

  const buttons = [...nav.querySelectorAll('.subtab-btn')];
  const group = nav.nextElementSibling; // expects the .subpanel-group right after the nav

  const setIndicator = (btn) => {
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const left = (btnRect.left - navRect.left) + nav.scrollLeft;
    indicator.style.width = `${btnRect.width}px`;
    indicator.style.transform = `translateX(${left}px)`;
  };

  const activate = (btn) => {
    buttons.forEach(b => {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });

    // Toggle panels by id (only if you have them)
    if (group && btn.dataset.subpanel){
      group.querySelectorAll('.subpanel')
           .forEach(p => p.hidden = (p.id !== btn.dataset.subpanel));
    }
    setIndicator(btn);
  };

  // Init with the current active (or first)
  const current = nav.querySelector('.subtab-btn.active') || buttons[0];
  activate(current);

  // Click
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.subtab-btn');
    if (!btn || !nav.contains(btn)) return;
    activate(btn);
  });

  // Keyboard (Left/Right/Home/End)
  nav.addEventListener('keydown', (e) => {
    const i = buttons.findIndex(b => b.classList.contains('active'));
    if (!['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) return;
    e.preventDefault();
    let j = i;
    if (e.key === 'ArrowRight') j = (i+1) % buttons.length;
    if (e.key === 'ArrowLeft')  j = (i-1+buttons.length) % buttons.length;
    if (e.key === 'Home')       j = 0;
    if (e.key === 'End')        j = buttons.length - 1;
    activate(buttons[j]);
    buttons[j].focus();
  });

  // Keep indicator aligned
  const sync = () => {
    const active = nav.querySelector('.subtab-btn.active');
    if (active) setIndicator(active);
  };
  window.addEventListener('resize', sync, { passive:true });
  nav.addEventListener('scroll', sync, { passive:true });
});






// Language toggle buttons - english telugu english telugu english telugu english telugu 
// Language toggle functionality
const btnEN = document.getElementById('btn-en');
const btnTE = document.getElementById('btn-te');
const langEN = document.getElementById('lang-en');
const langTE = document.getElementById('lang-te');

btnEN.addEventListener('click', () => {
  btnEN.classList.add('active');
  btnTE.classList.remove('active');
  langEN.style.display = 'block';
  langTE.style.display = 'none';
});

btnTE.addEventListener('click', () => {
  btnTE.classList.add('active');
  btnEN.classList.remove('active');
  langTE.style.display = 'block';
  langEN.style.display = 'none';
});






/* === Auto-scroll to the top of the (sub)section just opened === */

/* Figure out fixed-header offset from your CSS vars */
function _getStickyOffset() {
  const cs   = getComputedStyle(document.documentElement);
  const top  = parseFloat(cs.getPropertyValue('--topbar-h')) || 0;
  const gap  = parseFloat(cs.getPropertyValue('--content-gap')) || 0;
  return top + gap + 6; // a tiny breathing room
}

/* Smoothly scroll an element to the top of the viewport (minus offset) */
function _scrollToTopOf(el) {
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - _getStickyOffset();
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}

/* 1) Patch your existing showPanel() so every top tab switch scrolls */
if (typeof showPanel === 'function') {
  const _origShowPanel = showPanel;
  showPanel = function(id, btn) {
    _origShowPanel(id, btn);
    const pane = document.getElementById(id);
    _scrollToTopOf(pane);
  };
}

/* 2) When any subtab is clicked, scroll to the active subpanel (or its group) */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.subtab-btn');
  if (!btn) return;

  // after your existing subtab code toggles, scroll the right thing
  setTimeout(() => {
    const group = btn.closest('.subtabs')?.nextElementSibling; // .subpanel-group
    const target = btn.dataset.subpanel
      ? group?.querySelector('#' + btn.dataset.subpanel)
      : group;
    _scrollToTopOf(target || group);
  }, 0);
});

/* 3) Language toggle also jumps to the top of the visible language block */
document.getElementById('btn-en')?.addEventListener('click', () => {
  const pane = document.getElementById('lang-en');
  setTimeout(() => _scrollToTopOf(pane), 0);
});
document.getElementById('btn-te')?.addEventListener('click', () => {
  const pane = document.getElementById('lang-te');
  setTimeout(() => _scrollToTopOf(pane), 0);
});


// Mobile-friendly auto-scroll for tabs & subtabs (works without HTML changes)
(function () {
  const css = getComputedStyle(document.documentElement);
  const offset = () => (parseFloat(css.getPropertyValue('--topbar-h')) || 0)
                        + (parseFloat(css.getPropertyValue('--content-gap')) || 0)
                        + 6;

  function jump(el){
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset();
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // Top tabs
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.dock-btn');
    if (!tab) return;
    // let your existing handlers run first
    requestAnimationFrame(() => {
      const pane = document.getElementById(tab.dataset.panel);
      jump(pane);
    });
  }, true);

  // Subtabs / subsections
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.subtab-btn');
    if (!btn) return;
    requestAnimationFrame(() => {
      const group  = btn.closest('.subtabs')?.nextElementSibling; // .subpanel-group
      const target = btn.dataset.subpanel ? group?.querySelector('#' + btn.dataset.subpanel) : group;
      jump(target || group);
    });
  }, true);
})();
