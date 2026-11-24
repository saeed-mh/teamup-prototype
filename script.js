// Show one screen at a time. The address ends with the screen, e.g. index.html#s01
function show(id) {
  const target = document.getElementById(id);
  if (!target) return; // that screen is not made yet
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('on', s === target));
  location.hash = id;
  // Tab bar: visible only on screens with data-tab, with that tab highlighted
  const tabs = document.getElementById('tabs');
  tabs.classList.toggle('on', 'tab' in target.dataset);
  tabs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.name === target.dataset.tab));
}
// Any element with data-go="sXX" opens that screen
document.addEventListener('click', e => {
  const el = e.target.closest('[data-go]');
  if (el) show(el.dataset.go);

  // Chips turn on and off
  const chip = e.target.closest('.chip:not(.add)');
  if (chip) {
    chip.classList.toggle('on');
    document.getElementById('selected').textContent = document.querySelectorAll('#s06 .chip.on').length + ' selected';
  }

  // Visibility pills switch between Public and Only me
  const pill = e.target.closest('.pill');
  if (pill) pill.classList.toggle('private');

  // Sign up: only university emails may continue, others see the error screen
  const check = e.target.closest('[data-check]');
  if (check) {
    const email = document.getElementById(check.dataset.check).value.trim();
    if (email.toLowerCase().endsWith('@stud.fh-campus.de')) return show('s04');
    document.getElementById('email2').value = email;
    show('s03');
  }
});
window.addEventListener('hashchange', () => show(location.hash.slice(1)));

// Shrink the phone on small windows so it always fits
function fit() {
  document.getElementById('phone').style.zoom = Math.min(1, innerHeight / 844, innerWidth / 390);
}
window.addEventListener('resize', fit);
fit();
show(document.getElementById(location.hash.slice(1)) ? location.hash.slice(1) : 's01');
