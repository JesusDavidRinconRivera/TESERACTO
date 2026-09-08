export function initClientsCarousel() {
  const track = document.getElementById('clientsTrack');
  if (!track) return;

  const items = Array.from(track.querySelectorAll('.client-item'));

  items.forEach((item) => track.appendChild(item.cloneNode(true)));

  track.querySelectorAll('.client-item').forEach((item) => {
    const img = item.querySelector('.client-ico img');
    if (!img) return;
    const name = img.dataset.name || 'Empresa';
    const srcParts = img.src.split('/');
    const file = srcParts.pop().split('.')[0];
    const base = srcParts.join('/');
    const slug = base ? base + '/' + file : file;
    applyLogo(img, name, slug);
  });

  function applyLogo(img, name, slug) {
    const placeholder = makePlaceholder(name);
    img.replaceWith(placeholder);

    const exts = ['.svg', '.png', '.webp', '.jpg', '.jpeg', '.ico'];
    let i = 0;
    function next() {
      if (i >= exts.length) return;
      const test = new Image();
      const src = slug + exts[i++];
      test.onload = () => {
        const real = document.createElement('img');
        real.src = src;
        real.alt = '';
        real.loading = 'lazy';
        placeholder.replaceWith(real);
      };
      test.onerror = () => next();
      test.src = src;
    }
    next();
  }

  function makePlaceholder(name) {
    const c = document.createElement('span');
    c.className = 'client-placeholder';
    c.setAttribute('aria-hidden', 'true');
    c.innerHTML =
      '<svg viewBox="0 0 64 64" fill="none">' +
      '<rect x="6" y="16" width="52" height="34" rx="4" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M26 16v10h12V16M26 26H14a4 4 0 0 0 0 8h8M38 26h12a4 4 0 0 1 0 8h-8M26 30h12v12H26z" fill="currentColor" opacity=".45"/>' +
      '<path d="M16 44c3-3 5 3 8 0s5 3 8 0 5 3 8 0 4 2 8 0" stroke="currentColor" stroke-width="2"/>' +
      '</svg>';
    c.title = name;
    return c;
  }
}