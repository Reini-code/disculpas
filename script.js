'use strict';

// Puedes modificar los textos aquí. Cada objeto es una pantalla de la carta.
const pages = [
  {
    "label": "ANTES DE EMPEZAR",
    "title": "Hay algo que quiero decirte.",
    "body": "No hice esta carta para cambiar tu decisión ni para pedirte una respuesta. Solo quería encontrar una forma bonita de decirte algo que me cuesta poner en palabras: perdón."
  },
  {
    "label": "01 · LO QUE RECONOZCO",
    "title": "Perdón por ser tan desesperado.",
    "body": "Durante estos dos meses me ganó la impaciencia. Quería saber qué iba a pasar entre nosotros y, por querer resolverlo todo, terminé apresurando conversaciones, momentos e incluso tu respuesta. Perdón por haberte presionado."
  },
  {
    "label": "02 · LO QUE ME DOLÍA",
    "title": "El silencio también me dolía.",
    "body": "La falta de comunicación entre nosotros me frustraba mucho. No saber qué pensabas, qué sentías o qué iba a suceder me hacía sufrir. Y, en lugar de saber manejar esa incertidumbre, insistí más de lo que debía."
  },
  {
    "label": "03 · LO QUE ESTÁBAMOS VIVIENDO",
    "title": "Los dos estábamos sufriendo.",
    "body": "Sé que tú estabas pasando por cosas difíciles en tu casa. Yo también estaba sufriendo con lo que sucedía entre nosotros, pero dejé que mi frustración y mi miedo se convirtieran en presión para ti. Lamento no haber sabido manejarlo mejor."
  },
  {
    "label": "04 · TU RESPUESTA",
    "title": "Te apresuré cuando no debía.",
    "body": "Desde hace dos meses quise obtener una respuesta, incluso cuando tú todavía estabas tratando de resolver tus propias cosas. Ahora entiendo que insistir tanto no ayudó. Perdón por hacerte sentir que debías decidir algo solo porque yo ya no soportaba esperar."
  },
  {
    "label": "05 · SIN EXCUSAS",
    "title": "Mi dolor no es una excusa.",
    "body": "Lo que sentí fue real, y la falta de comunicación me lastimó. Pero no te lo digo para culparte ni para justificarme. Soy responsable de la forma en que reaccioné y de las veces que te presioné. Por eso quiero pedirte perdón de corazón."
  },
  {
    "label": "06 · LO QUE ME QUEDA",
    "title": "Gracias por los momentos bonitos.",
    "body": "Aunque todo haya sido raro, complicado y a veces doloroso, también hubo momentos muy bonitos contigo. No me arrepiento de haberlos vivido. Los guardo con muchísimo cariño y siempre voy a agradecerte haberlos compartido conmigo."
  },
  {
    "label": "07 · LO QUE TOCA ACEPTAR",
    "title": "Me duele pensar que terminó.",
    "body": "Ojalá pudiéramos seguir compartiendo momentos así. Pero hoy parece que esto terminó definitivamente, y aunque me duele muchísimo, tengo que aceptar lo que sucedió y respetar tu decisión."
  },
  {
    "label": "08 · SI ALGÚN DÍA...",
    "title": "Si la vida nos da otra oportunidad...",
    "body": "Si algún día, cuando hayas podido arreglar las cosas que estás viviendo en casa, todavía deseas volver a intentarlo conmigo, quiero que sepas que prometo esperarte, incluso si pasan más de mil días. Esto que siento por ti no creo poder quitármelo en mucho tiempo. No te pido que me prometas nada ni que respondas esta carta."
  },
  {
    "label": "09 · DE CORAZÓN",
    "title": "Solo quería que lo supieras.",
    "body": "Mientras tanto, voy a intentar no causarte problemas ni ponerte en situaciones incómodas en la escuela. Gracias por lo que vivimos, por los recuerdos y por esos momentos que fueron nuestros. Perdón por haber sido tan desesperado. Te lo digo con todo mi corazón."
  }
];

const $ = (s) => document.querySelector(s);
const message = $('#cardMessage');
const title = $('#letterTitle');
const chapter = $('#chapter');
const body = $('#letterBody');
const next = $('#nextBtn');
const prev = $('#prevBtn');
const card = $('#letterCard');
const dots = $('#stepDots');
const counter = $('#pageCounter');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let current = 0;
let changing = false;

function buildDots() {
  pages.forEach((_, i) => {
    const el = document.createElement('button');
    el.className = 'step-dot';
    el.type = 'button';
    el.setAttribute('aria-label', `Ir a la parte ${i + 1} de ${pages.length}`);
    el.addEventListener('click', () => showPage(i));
    dots.appendChild(el);
  });
}

function render() {
  const p = pages[current];
  chapter.textContent = p.label;
  title.textContent = p.title;
  body.textContent = p.body;
  prev.disabled = current === 0;
  next.innerHTML = current === pages.length - 1
    ? 'Volver al inicio <span class="button-arrow" aria-hidden="true">↻</span>'
    : current === 0
      ? 'Abrir carta <span class="button-arrow" aria-hidden="true">→</span>'
      : 'Continuar <span class="button-arrow" aria-hidden="true">→</span>';
  dots.querySelectorAll('.step-dot').forEach((dot, i) => {
    dot.classList.toggle('done', i < current);
    if (i === current) dot.setAttribute('aria-current', 'step');
    else dot.removeAttribute('aria-current');
  });
  counter.innerHTML = `${String(current + 1).padStart(2, '0')} <span>/ ${String(pages.length).padStart(2, '0')}</span>`;
}

function showPage(index) {
  if (changing || index < 0 || index >= pages.length || index === current) return;
  changing = true;
  if (reduceMotion) {
    current = index;
    render();
    changing = false;
    return;
  }
  message.classList.remove('enter');
  message.classList.add('exit');
  setTimeout(() => {
    current = index;
    render();
    message.classList.remove('exit');
    message.classList.add('enter');
    setTimeout(() => { message.classList.remove('enter'); changing = false; }, 740);
  }, 235);
}

function advance() { showPage(current === pages.length - 1 ? 0 : current + 1); }
next.addEventListener('click', advance);
prev.addEventListener('click', () => showPage(current - 1));
card.addEventListener('click', (event) => {
  if (event.target.closest('button')) return;
  if (current < pages.length - 1) advance();
});
card.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target === card) {
    event.preventDefault();
    advance();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.target.matches('button, input, textarea')) return;
  if (event.key === 'ArrowRight') showPage(Math.min(pages.length - 1, current + 1));
  if (event.key === 'ArrowLeft') showPage(Math.max(0, current - 1));
});

// Estrellas suaves en canvas; son puramente decorativas y no registran actividad.
(function starfield() {
  const canvas = $('#stars');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let stars = [];
  let w = 0, h = 0, dpr = 1;
  let rafId;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(250, Math.floor(w * h / 4700));
    stars = Array.from({length: count}, (_, i) => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.1 + (i % 19 === 0 ? 1.15 : .15),
      phase: Math.random() * 6.28, speed: .0004 + Math.random() * .001,
      opacity: Math.random() * .5 + .20
    }));
  }
  function draw(ms) {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(s => {
      const shimmer = reduceMotion ? .7 : .64 + .36 * Math.sin(ms * s.speed + s.phase);
      ctx.beginPath();
      ctx.fillStyle = `rgba(236,220,255,${Math.max(0.05, s.opacity * shimmer)})`;
      ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
      ctx.fill();
    });
    if (!reduceMotion) rafId = requestAnimationFrame(draw);
  }
  resize();
  draw(0);
  let pendingResize = false;
  window.addEventListener('resize', () => {
    if (pendingResize) return;
    pendingResize = true;
    requestAnimationFrame(() => { pendingResize = false; resize(); if (reduceMotion) draw(0); });
  });
  window.addEventListener('pagehide', () => { if (rafId) cancelAnimationFrame(rafId); });
})();

buildDots();
render();
