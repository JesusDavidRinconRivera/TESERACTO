export function initWhatsAppWidget() {
  const widget = document.getElementById('waWidget');
  if (!widget) return;

  const toggle = document.getElementById('waToggle');
  const close = document.getElementById('waClose');
  const chat = document.getElementById('waChat');
  const form = document.getElementById('waForm');
  const input = document.getElementById('waInput');

  const PHONE = '573203269673';
  const saved = localStorage.getItem('wa_unread');
  if (saved === '1') {
    toggle.classList.add('has-badge');
  }

  function open() {
    chat.classList.add('is-open');
    chat.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    setTimeout(() => input.focus(), 120);
  }

  function closeChat() {
    chat.classList.remove('is-open');
    chat.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      closeChat();
    } else {
      open();
    }
  });

  close.addEventListener('click', closeChat);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeChat();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const url = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener');
    try {
      localStorage.setItem('wa_message', text);
    } catch (err) {}
    input.value = '';
    closeChat();
  });

  const body = document.getElementById('waChatBody');
  const savedMsg = (function () {
    try {
      return localStorage.getItem('wa_message') || '';
    } catch (err) {
      return '';
    }
  })();
  if (savedMsg && body) {
    const bubble = document.createElement('div');
    bubble.className = 'wa-bubble wa-out';
    bubble.textContent = savedMsg;
    body.appendChild(bubble);
  }
}