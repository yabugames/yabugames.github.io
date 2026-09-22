/* Yabu Games sitesi — iki sayfanın ortak betiği (hamburger + sayfa içi kaydırma).
   Bağımlılık yok; GitHub Pages doğrudan yayınlar. */
(function () {
  'use strict';

  // ── Hamburger ───────────────────────────────────────────────────────────
  var burger = document.getElementById('burger');
  var menu   = document.getElementById('menu');
  function closeMenu() {
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
    });
  }

  // ── Sayfa içi bağlantılar: ADRESTE # BIRAKMA (22 Eylül, kullanıcı) ──────
  // Menüdeki "Games"e basınca adres yabugames.github.io/#games oluyordu. Bağlantı
  // gerçek <a href="#..."> olarak KALIYOR (JavaScript kapalıysa da çalışsın), ama tıklamada
  // kaydırmayı biz yapıp adresi temizliyoruz. Odak da hedefe taşınır: klavyeyle gezen
  // kullanıcı kaydıktan sonra oradan devam eder.
  function cleanUrl() {
    if (location.hash && history.replaceState) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }
  function goTo(el, smooth) {
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    cleanUrl();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id === '#') return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    closeMenu();
    goTo(el, true);
  });

  // Diğer sayfadan "./#games" ile gelindiyse: kaydır, sonra adresi sadeleştir.
  window.addEventListener('load', function () {
    if (!location.hash) return;
    var el = document.querySelector(location.hash);
    if (el) goTo(el, false); else cleanUrl();
  });
})();
