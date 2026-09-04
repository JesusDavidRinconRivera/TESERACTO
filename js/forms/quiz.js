/* ============================================================
   FORMS — CUESTIONARIO INTERACTIVO DE COTIZACIÓN (6 pasos)
   Carnusel con transición tipo slider + ramificación + envío por correo
============================================================ */

const BRANCHES = {
  ahorrar: {
    label: 'Ahorrar dinero',
    q2: '¿Dónde sientes que pierdes dinero hoy?',
    opts2: [
      'Pagos excesivos por mantenimiento',
      'Fallas frecuentes que detienen la operación',
      'Repuestos por urgencia (sobreprecio)',
      'No sé exactamente dónde',
    ],
    q3: '¿Con qué frecuencia ocurren esos gastos?',
    opts3: ['Semanal', 'Mensual', 'Trimestral', 'No es algo recurrente'],
  },
  ganar: {
    label: 'Ganar dinero',
    q2: '¿Qué evita que ganes más dinero?',
    opts2: [
      'Procesos manuales que ralentizan mi operación',
      'No tengo visibilidad en tiempo real',
      'Pérdida de clientes por demoras en servicio',
      'Mi software es viejo y no me deja crecer',
    ],
    q3: '¿Qué tan urgente es resolverlo?',
    opts3: ['Ya perdimos dinero', 'Este mes', 'Este trimestre', 'Estoy planificando'],
  },
  tiempo: {
    label: 'Ahorrar tiempo',
    q2: '¿Qué te quita más tiempo a tu equipo?',
    opts2: [
      'Coordinar varios proveedores',
      'Repetir tareas manuales',
      'Esperar respuesta a incidencias',
      'Trámites y papeleo administrativo',
    ],
    q3: '¿Cuántas horas semanales estimas que se pierden?',
    opts3: ['1–5 horas', '5–10 horas', '10–20 horas', 'Más de 20 horas'],
  },
};

const state = { branch: null, a2: null, a3: null, meeting: null };

/* ============================================================
   CARRUSEL — lógica de transición tipo slider
============================================================ */

let currentStep = 1;
let totalSteps = 5;
let transitioning = false;

const viewportEl = document.getElementById('quizViewport');
const progressEl = document.getElementById('quizProgress');
const quizEl = document.getElementById('quiz');

function getStepEl(n) {
  return quizEl ? quizEl.querySelector(`.quiz-step[data-step="${n}"]`) : null;
}

/**
 * Limpia clases de transición sobrantes de animaciones previas
 * en todos los paneles (dejándolos en estado de reposo).
 */
function resetTransitions() {
  quizEl.querySelectorAll('.quiz-step').forEach((el) => {
    el.classList.remove('is-from-right', 'is-from-left', 'is-to-right', 'is-to-left');
    el.style.transition = '';
  });
}

function disableTransition(el) {
  el.style.transition = 'none';
}

/**
 * Va al paso n animando tipo slider.
 * - Avanzar: el entrante viene de la derecha, el anterior sale a la izquierda.
 * - Retroceder: el entrante viene de la izquierda, el anterior sale a la derecha.
 */
function goToStep(n) {
  if (transitioning || !quizEl || n < 1 || n > totalSteps || n === currentStep) return;

  const prevEl = getStepEl(currentStep);
  const nextEl = getStepEl(n);
  if (!prevEl || !nextEl) return;

  transitioning = true;
  const forward = n > currentStep;

  // 1) Limpiar clases sobrantes de animaciones previas
  resetTransitions();

  // 2) Panel entrante: posición de entrada SIN transición (absolute, fuera)
  disableTransition(nextEl);
  nextEl.classList.add(forward ? 'is-from-right' : 'is-from-left');

  // 3) Forzar reflow para que el navegador registre esa posición inicial
  void nextEl.offsetWidth;

  // 4) Re-habilitar transición en el entrante
  nextEl.style.transition = '';

  // 5) Panel anterior: clase de salida hacia el lado opuesto
  prevEl.classList.add(forward ? 'is-to-left' : 'is-to-right');

  // 6) Siguiente frame: el entrante anima hacia el centro y toma el flujo;
  //    el anterior sale del flujo (absolute) animando en la otra dirección.
  requestAnimationFrame(() => {
    nextEl.classList.remove(forward ? 'is-from-right' : 'is-from-left');
    nextEl.classList.add('is-active');
    prevEl.classList.remove('is-active');
  });

  // 7) Al terminar la transición (transform), limpiar el panel anterior
  const cleanup = (ev) => {
    if (ev.propertyName !== 'transform') return;
    prevEl.removeEventListener('transitionend', cleanup);
    prevEl.classList.remove('is-to-right', 'is-to-left');
    prevEl.style.transition = '';
    transitioning = false;
    currentStep = n;
    updateProgress();
  };
  prevEl.addEventListener('transitionend', cleanup);

  // Seguro: si transitionend no llega, resolvemos igualmente
  window.setTimeout(() => {
    if (transitioning) {
      prevEl.removeEventListener('transitionend', cleanup);
      prevEl.classList.remove('is-to-right', 'is-to-left');
      prevEl.style.transition = '';
      transitioning = false;
      currentStep = n;
      updateProgress();
    }
  }, 700);
}

function updateProgress() {
  if (!progressEl) return;
  progressEl.querySelectorAll('.pip').forEach((pip) => {
    const s = Number(pip.dataset.step);
    pip.classList.toggle('is-active', s === currentStep);
    pip.classList.toggle('is-done', s < currentStep);
  });
}

/* ============================================================
   RENDER — opciones (delegación de eventos vía data-*)
============================================================ */

function buildOpts(container, texts, key) {
  container.innerHTML = '';
  texts.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'quiz-opt';
    b.dataset[key] = String(i);
    b.dataset.label = t;
    b.textContent = t;
    container.appendChild(b);
  });
}

function setMeetingFromEvent(btn) {
  state.meeting = btn.dataset.label || btn.dataset.value;
}

function setBranchFromEvent(btn) {
  const branch = btn.dataset.branch;
  const meta = BRANCHES[branch];
  if (!meta) return;
  state.branch = meta;
  state.a2 = null;
  state.a3 = null;
  const q2 = document.getElementById('q2');
  const q3 = document.getElementById('q3');
  if (q2) q2.textContent = meta.q2;
  if (q3) q3.textContent = meta.q3;
  buildOpts(document.getElementById('opts2'), meta.opts2, 'a2');
  buildOpts(document.getElementById('opts3'), meta.opts3, 'a3');
}

/* ============================================================
   MENSAJE / RESUMEN
============================================================ */

function buildMessage() {
  const dest = (document.getElementById('contactEmail') || {}).value;
  const meeting = state.meeting ? state.meeting.toLowerCase() : 'por definir';
  const branch = state.branch ? state.branch.label.toLowerCase() : 'una solución';
  const a2 = state.a2 ? state.a2.toLowerCase() : 'detectar el punto de dolor';
  const a3 = state.a3 ? state.a3.toLowerCase() : 'definir prioridades';

  const lines = [
    'Hola equipo de TESERACTO:',
    '',
    `Necesito una cotización para una solución dirigida a ${branch} en mi empresa.`,
    '',
    `El principal punto de atención es: ${a2}.`,
    '',
    `El factor más crítico es: ${a3}.`,
    '',
    `Prefiero reunión ${meeting}.`,
  ];

  if (dest && dest.trim()) {
    lines.push('', `Pueden contactarme en: ${dest.trim()}.`);
  }

  lines.push('', 'Quedo atento a su respuesta.');
  return lines.join('\n');
}

/* ============================================================
   ENVÍO — manda el resumen a /api/contact (Resend)
============================================================ */

function setNote(text, cls) {
  const note = document.getElementById('quizNote');
  if (!note) return;
  note.textContent = text;
  note.className = 'form-note';
  if (cls) note.classList.add(`form-note--${cls}`);
}

function setLoading(on) {
  const btn = document.getElementById('sendMailBtn');
  if (btn) {
    btn.disabled = on;
    btn.classList.toggle('btn--loading', on);
  }
}

async function sendResumen() {
  setNote('Enviando tu solicitud…', 'loading');
  setLoading(true);

  const body = new URLSearchParams({
    correo: (document.getElementById('contactEmail') || {}).value || '',
    mensaje: buildMessage(),
  });

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = await res.json().catch(() => ({ ok: res.ok }));
    setLoading(false);
    if (data.ok) {
      setNote('Solicitud enviada.', 'success');
    } else {
      setNote('Error: por favor contacta a contacto@teseracto.tech', 'error');
    }
  } catch (err) {
    setLoading(false);
    setNote('Error: por favor contacta a contacto@teseracto.tech', 'error');
  }
}

/* ============================================================
   DELEGACIÓN DE EVENTOS (un solo listener en .quiz)
============================================================ */

if (quizEl) {
  quizEl.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.quiz-opt, .quiz-back');
    if (!btn) return;

    // Botón volver -> retrocede un paso
    if (btn.classList.contains('quiz-back')) {
      const parentStep = btn.closest('.quiz-step');
      const backTo = Number(parentStep.dataset.step) - 1;
      if (backTo >= 1) goToStep(backTo);
      return;
    }

    const stepNum = Number(btn.closest('.quiz-step').dataset.step);

    if (btn.hasAttribute('data-branch')) {
      setBranchFromEvent(btn);
      goToStep(2);
    } else if (btn.hasAttribute('data-a2')) {
      state.a2 = btn.dataset.label;
      goToStep(3);
    } else if (btn.hasAttribute('data-a3')) {
      state.a3 = btn.dataset.label;
      goToStep(4);
    } else if (btn.hasAttribute('data-value')) {
      setMeetingFromEvent(btn);
      goToStep(5);
    }
  });
}

/* Envío por correo */
const sendBtn = document.getElementById('sendMailBtn');
if (sendBtn) sendBtn.addEventListener('click', sendResumen);

/* ============================================================
   INICIALIZACIÓN
============================================================ */

function renderBranchButtons() {
  const opts1 = document.getElementById('opts1');
  if (!opts1) return;
  Object.keys(BRANCHES).forEach((key) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'quiz-opt';
    b.dataset.branch = key;
    b.textContent = BRANCHES[key].label;
    opts1.appendChild(b);
  });
}

function buildProgress() {
  if (!progressEl) return;
  progressEl.innerHTML = '';
  for (let i = 1; i <= totalSteps; i++) {
    const pip = document.createElement('span');
    pip.className = 'pip';
    pip.dataset.step = String(i);
    progressEl.appendChild(pip);
  }
}

function addBackButtons() {
  if (!quizEl) return;
  quizEl.querySelectorAll('.quiz-step').forEach((step) => {
    const num = Number(step.dataset.step);
    if (num <= 1) return;
    if (step.querySelector('.quiz-back')) return;
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'quiz-back';
    back.textContent = '← Volver';
    step.appendChild(back);
  });
}

export function initQuiz() {
  if (!quizEl) return;
  buildProgress();
  renderBranchButtons();
  addBackButtons();
  // El panel 1 es el activo por defecto
  getStepEl(1).classList.add('is-active');
  updateProgress();
}