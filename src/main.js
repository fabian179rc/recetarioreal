import './style.css';

(function () {
  var hero = document.querySelector('.hero');
  var statsBar = document.querySelector('.stats-bar');
  var stickyBar = document.getElementById('stickyCta');
  var floatCard = document.getElementById('floatT');
  var nameEl = document.getElementById('floatTName');
  var progressBar = document.getElementById('floatTBar');
  var closeBtn = document.getElementById('floatTClose');
  if (!floatCard || !stickyBar) return;

  var buyers = ["Carolina compró la guía", "Gonzalo compró la guía", "Elena compró la guía"];
  var i = 0, dismissed = false, cycleTimer = null, testimonialVisible = false;

  // only show the floating testimonial once the visitor has scrolled well past
  // the stats bar — never while it's still in view, avoids overlapping it
  function floatThreshold() {
    var ref = statsBar || hero;
    if (!ref) return 500;
    var rect = ref.getBoundingClientRect();
    return rect.bottom + window.scrollY;
  }

  function cycle() {
    if (dismissed || !testimonialVisible) return;
    nameEl.textContent = buyers[i % buyers.length];
    i++;
    floatCard.classList.remove('visible');
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    requestAnimationFrame(function () {
      floatCard.classList.add('visible');
      requestAnimationFrame(function () { progressBar.style.transition = ''; });
    });
    cycleTimer = setTimeout(function () {
      floatCard.classList.remove('visible');
      cycleTimer = setTimeout(cycle, 1200);
    }, 6000);
  }

  function onScroll() {
    if (hero) stickyBar.classList.toggle('visible', window.scrollY > hero.offsetHeight);

    if (dismissed) return;
    var past = window.scrollY > floatThreshold();
    if (past && !testimonialVisible) {
      testimonialVisible = true;
      cycle();
    } else if (!past && testimonialVisible) {
      testimonialVisible = false;
      clearTimeout(cycleTimer);
      floatCard.classList.remove('visible');
    }
  }

  closeBtn.addEventListener('click', function () {
    dismissed = true;
    clearTimeout(cycleTimer);
    floatCard.classList.remove('visible');
  });

  window.addEventListener('scroll', onScroll, { passive: true });
})();
