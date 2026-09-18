export function initClientsCarousel() {
  const track = document.getElementById('clientsTrack');
  if (!track) return;

  const items = Array.from(track.querySelectorAll('.client-item'));

  items.forEach((item) => track.appendChild(item.cloneNode(true)));

  track.querySelectorAll('.client-item').forEach((item) => {
    const ico = item.querySelector('.client-ico');
    if (!ico) return;
    const slug = ico.dataset.slug;
    if (!slug) return;

    const exts = ['.png', '.svg', '.webp', '.jpg', '.jpeg', '.ico'];
    let i = 0;
    function next() {
      if (i >= exts.length) return;
      const src = slug + exts[i++];
      const test = new Image();
      test.onload = () => {
        const real = document.createElement('img');
        real.src = src;
        real.alt = '';
        real.loading = 'lazy';
        real.className = 'client-logo-in';
        ico.appendChild(real);
      };
      test.onerror = () => next();
      test.src = src;
    }
    next();
  });
}