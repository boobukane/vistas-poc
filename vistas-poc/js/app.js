(function () {
  // Mobile menu
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('main-nav');
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });

  // Sub-tabs (Inbound / Outbound)
  document.querySelectorAll('[data-subtabs]').forEach(function (box) {
    var tabs = [].slice.call(box.querySelectorAll('[role=tab]'));
    function show(name, focus) {
      tabs.forEach(function (t) {
        var on = t.dataset.tab === name;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
        if (on && focus) t.focus();
      });
      history.replaceState(null, '', '#' + name);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t.dataset.tab); });
      t.addEventListener('keydown', function (e) {
        var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (j !== null) show(tabs[(j + tabs.length) % tabs.length].dataset.tab, true);
      });
    });
    var h = location.hash.slice(1);
    show(tabs.some(function (t) { return t.dataset.tab === h; }) ? h : tabs[0].dataset.tab);
  });

  // MoU boxes
  var grid = document.getElementById('mou-grid');
  var empty = document.getElementById('mou-empty');
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function render(q) {
    q = (q || '').toLowerCase();
    var items = window.PARTNERS.filter(function (p) { return (p[0] + ' ' + p[1]).toLowerCase().indexOf(q) !== -1; });
    grid.innerHTML = items.map(function (p) {
      return '<div class="box"><h4>' + esc(p[0]) + '</h4><p>' + esc(p[1]) + '</p></div>';
    }).join('');
    empty.hidden = items.length > 0;
  }
  if (grid) {
    render('');
    document.getElementById('mou-filter').addEventListener('input', function (e) { render(e.target.value); });
  }

  // Form buttons in inbound and outbound sections
  var btns =
    '<a class="btn" href="assets/forms/Inbound-Student-Application-Form.pdf" target="_blank" rel="noopener">Application Form</a>' +
    '<a class="btn" href="assets/forms/Learning-Agreement.pdf" target="_blank" rel="noopener">Learning Agreement</a>' +
    '<button type="button" class="btn alt" data-open-hostel>Hostel Form</button>' +
    '<span class="dl">Download originals: <a href="assets/forms/Inbound-Student-Application-Form.doc" download>Application Form (.doc)</a> · <a href="assets/forms/Learning-Agreement.doc" download>Learning Agreement (.doc)</a></span>';
  document.querySelectorAll('[data-forms]').forEach(function (el) { el.innerHTML = btns; });

  // Hostel dialog (simulated, no network, no storage)
  var dlg = document.getElementById('hostel-dialog');
  if (!dlg) return;
  var form = document.getElementById('hostel-form');
  var done = document.getElementById('hostel-done');
  var err = document.getElementById('form-error');
  var opener = null;
  function closeDlg() { dlg.close(); if (opener) opener.focus(); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-open-hostel]');
    if (!b) return;
    opener = b; form.reset(); form.hidden = false; done.hidden = true; err.hidden = true;
    dlg.showModal();
  });
  document.getElementById('hostel-cancel').addEventListener('click', closeDlg);
  document.getElementById('hostel-close').addEventListener('click', closeDlg);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = [];
    form.querySelectorAll('[required]').forEach(function (f) {
      var ok = f.value.trim() !== '' && f.checkValidity();
      f.classList.toggle('invalid', !ok);
      if (!ok) bad.push(f);
    });
    var ci = form.checkin.value, co = form.checkout.value;
    if (!bad.length && co < ci) { form.checkout.classList.add('invalid'); bad.push(form.checkout); err.textContent = 'Check-out must be on or after check-in.'; }
    else if (bad.length) err.textContent = 'Please complete the highlighted required fields.';
    if (bad.length) { err.hidden = false; bad[0].focus(); return; }
    err.hidden = true; form.hidden = true; done.hidden = false;
  });
})();
