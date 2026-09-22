/* ===========================================================================
   TUS RECUERDOS — edita únicamente este array para personalizar el ramo.
   1. Pon tus archivos en la carpeta media (lee media/README.md).
   2. Cambia los mensajes, títulos y rutas de abajo.
   3. Cada objeto = una flor. Copia un objeto para agregar otra; bórralo para quitarla.
      El ramo se acomoda automáticamente. Recomendado: entre 3 y 9 flores (máximo
      visual recomendado: 12). No hace falta tocar HTML ni CSS.
   4. foto: usa "" si todavía no tienes una imagen. Los archivos faltantes muestran
      una tarjeta decorativa, nunca un icono roto. Este regalo contiene solo fotos.
   5. titulo y descripcionFoto son opcionales. Usa \n para saltos en el mensaje.
   Mantén las comillas, las llaves y las comas entre objetos. Sin servidor ni build.
   =========================================================================== */
const flores = [
  {
    titulo: "Un beso y todo está bien",
    foto: "media/foto1-beso.jpg",
    descripcionFoto: "Un beso en tu mejilla mientras cierras los ojos",
    mensaje: "Si pudiera guardar un lugar para volver cuando el día se pone difícil, sería este: cerquita de ti, mi Lorita. Hay besos que duran un segundo y se quedan conmigo todo el día."
  },
  {
    titulo: "En tu equipo, siempre",
    foto: "media/foto2.jpg",
    descripcionFoto: "Los dos sonriendo frente a unas butacas amarillas",
    mensaje: "Me encanta compartir contigo lo que nos emociona. Pero mi parte favorita siempre es mirar a mi lado y encontrarte sonriendo. En la vida, yo quiero estar en tu equipo."
  },
  {
    titulo: "Te volvería a elegir",
    foto: "media/foto3.jpg",
    descripcionFoto: "Tú mirando a la cámara mientras te doy un beso en la mejilla",
    mensaje: "Mi Lorita, entre tantas cosas bonitas que me han pasado, tú sigues siendo mi favorita. Te daría este beso mil veces más, y las mil veces me volvería a hacer feliz estar contigo."
  },
  {
    titulo: "Todas tus versiones",
    foto: "media/foto4.jpg",
    descripcionFoto: "Tu retrato con camiseta azul y la mejilla apoyada en la mano",
    mensaje: "Tu sonrisa, tus gestos y hasta esa carita seria… me encanta conocerte un poquito más cada día. No tienes que hacer nada especial para alegrarme la vida: con ser tú me basta."
  },
  {
    titulo: "Sin prisa, contigo",
    foto: "media/foto5.jpg",
    descripcionFoto: "Los dos sentados juntos en un sofá",
    mensaje: "A veces no necesito un gran plan. Sentarme a tu lado, conversar de cualquier cosa y tenerte cerquita ya me hace feliz. Ojalá la vida nos regale muchos ratitos así, sin mirar el reloj."
  },
  {
    titulo: "Tú tienes mucho que ver",
    foto: "media/foto6.jpg",
    descripcionFoto: "Nuestra selfie: tú mandando un beso y yo sonriendo detrás",
    mensaje: "Veo esta foto y entiendo mi sonrisa: tú tienes mucho que ver con ella. Gracias por las ocurrencias, por el cariño y por convertir una salida cualquiera en un recuerdo que quiero guardar."
  },
  {
    titulo: "Nos quedan tantas fotos",
    foto: "media/foto7.jpg",
    descripcionFoto: "Los dos sonriendo con un fondo de hojas verdes",
    mensaje: "Me encantan nuestros recuerdos, pero me ilusiona todavía más pensar en los que nos faltan, mi Lorita. Más salidas, más abrazos y más fotos en las que se nos note lo bonito que es estar juntos."
  }
];

// La invitación aparece al cerrar la última flor descubierta. Solo cuentan
// flores diferentes, en cualquier orden. Después se puede volver a abrir.
// Puedes cambiar el texto o floresRestantes sin tocar el funcionamiento.
const sorpresa = {
  floresRestantes: 0,
  antesala: "Una sorpresa para mi Lorita",
  dia: "ESTE JUEVES",
  titulo: "Tenemos una cita, tú y yo.",
  mensaje: "Guárdame un ratito este jueves, mi Lorita. Estoy preparando una cita sorpresa para los dos… El plan te lo cuento ese día; por ahora, solo quiero que sepas cuánto me ilusiona verte.",
  posdata: "P. D. Contigo, siempre tengo ganas de un recuerdo más. ♡",
  boton: "Seguir descubriendo"
};

/* A partir de aquí está el funcionamiento del ramo. No necesitas editarlo. */
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const container = $("#flowers");
  const stems = $("#stems");
  const dialog = $("#memory-dialog");
  const surpriseDialog = $("#surprise-dialog");
  const photo = $("#memory-photo");
  const photoPlaceholder = $("#photo-placeholder");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const visited = new Set();
  const buttons = [];
  let currentIndex = -1;
  let hoverTimer;
  let openingTimer;
  let closingTimer;
  let opening = false;
  let closing = false;
  let suppressedHover = null;
  let hoverArmed = true;
  let surprisePending = false;
  let surpriseShown = false;
  let surpriseClosing = false;
  let surpriseClosingTimer;
  const surpriseAfter = Math.max(1, flores.length - sorpresa.floresRestantes);

  // Las posiciones usan el mismo lienzo de 600 × 560 que las hojas y el lazo.
  function getPositions(count) {
    const presets = {
      1: [[300, 201, 212]],
      2: [[225, 190, 175], [377, 225, 175]],
      3: [[299, 132, 168], [202, 265, 173], [381, 272, 174]],
      4: [[298, 114, 151], [180, 218, 157], [411, 223, 157], [291, 303, 158]],
      5: [[239, 121, 148], [385, 156, 148], [137, 249, 143], [433, 296, 148], [279, 279, 174]],
      6: [[287, 106, 145], [165, 185, 147], [410, 186, 148], [138, 315, 143], [396, 316, 150], [270, 266, 164]],
      7: [[297, 105, 148], [169, 156, 149], [424, 177, 150], [116, 284, 148], [476, 303, 147], [328, 261, 165], [214, 318, 154]]
    };
    if (presets[count]) return presets[count];
    // Distribución compacta para cantidades mayores; siempre mantiene un solo ramo.
    const columns = Math.ceil(Math.sqrt(count * 1.3));
    const rows = Math.ceil(count / columns);
    const size = Math.min(137, 470 / columns);
    return Array.from({ length: count }, (_, i) => {
      const row = Math.floor(i / columns);
      const items = Math.min(columns, count - row * columns);
      const col = i % columns;
      return [300 + (col - (items - 1) / 2) * size * .91, 103 + row * (225 / Math.max(1, rows - 1)) + (col % 2) * 15, size];
    });
  }

  function flowerSvg(index) {
    // Cada pétalo es una pieza independiente que se despliega al abrir la flor.
    // IDs únicos permiten que cada botón tenga sus propios degradados locales.
    let petals = "";
    for (let p = 0; p < 12; p++) {
      petals += `<path class="petal" style="--angle:${p * 30}deg;--delay:${p * 12}ms" d="M100 102 C87 88 76 55 83 29 C87 12 98 4 106 13 C123 31 119 67 100 102Z" fill="url(#petal-${index})" stroke="#d09d22" stroke-width=".6"/><path class="petal petal-inner" style="--angle:${p * 30 + 15}deg;--delay:${p * 10}ms" d="M100 102 C87 88 76 55 83 29 C87 12 98 4 106 13 C123 31 119 67 100 102Z" fill="url(#inner-${index})" stroke="#dbac32" stroke-width=".5"/>`;
    }
    let seeds = "";
    for (let s = 0; s < 40; s++) {
      const angle = s * 2.39996;
      const radius = 3.5 * Math.sqrt(s);
      seeds += `<circle cx="${100 + Math.cos(angle) * radius}" cy="${100 + Math.sin(angle) * radius}" r="${s % 3 === 0 ? 1.6 : 1.1}" fill="${s % 2 ? '#a36d1e' : '#f1c656'}" opacity=".65"/>`;
    }
    return `<svg viewBox="0 0 200 200" fill="none" aria-hidden="true"><defs><linearGradient id="petal-${index}" x1="93" y1="18" x2="105" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#ffe67b"/><stop offset=".48" stop-color="#f6cb3c"/><stop offset="1" stop-color="#e5ab20"/></linearGradient><linearGradient id="inner-${index}" x1="94" y1="16" x2="102" y2="103" gradientUnits="userSpaceOnUse"><stop stop-color="#ffe990"/><stop offset=".5" stop-color="#ffdb56"/><stop offset="1" stop-color="#edb126"/></linearGradient><radialGradient id="center-${index}" cx=".35" cy=".3" r=".75"><stop stop-color="#d6a437"/><stop offset=".7" stop-color="#c4912a"/><stop offset="1" stop-color="#b17b20"/></radialGradient></defs>${petals}<g class="flower-center"><circle cx="100" cy="100" r="26" fill="url(#center-${index})" stroke="#dca637" stroke-width="2"/>${seeds}<circle cx="93" cy="90" r="13" fill="#f4cc64" opacity=".13"/></g></svg>`;
  }

  function renderBouquet() {
    const positions = getPositions(flores.length);
    if (!flores.length) {
      $(".bouquet-base").hidden = true;
      $(".bouquet-base").style.display = "none";
      $(".bouquet-tag").hidden = true;
      const empty = document.createElement("p");
      empty.className = "empty-bouquet";
      empty.textContent = "Pronto florecerán nuevos recuerdos.";
      container.append(empty);
      $(".touch-hint").hidden = true;
      $("#progress-label").textContent = "Lo bonito también está por venir";
      return;
    }
    flores.forEach((flor, index) => {
      const [x, y, size] = positions[index];
      const stem = document.createElementNS("http://www.w3.org/2000/svg", "path");
      stem.setAttribute("d", `M${x} ${y} Q${x + (300 - x) * .25} 323 ${302 + index * 3} ${506 - (index % 3) * 6}`);
      stem.setAttribute("stroke", index % 2 ? "#69834d" : "#7c9258");
      stem.setAttribute("stroke-width", "5");
      stems.append(stem);

      const button = document.createElement("button");
      button.className = "flower";
      button.type = "button";
      button.style.cssText = `--x:${x / 6}%;--y:${y / 5.6}%;--size:${size / 6}%;--rotation:${(index * 17) % 28 - 14}deg;--layer:${index + 1}`;
      button.setAttribute("aria-label", `Abrir recuerdo ${index + 1}: ${flor.titulo || "Una flor para ti"}`);
      button.setAttribute("aria-haspopup", "dialog");
      button.innerHTML = `${flowerSvg(index)}<span class="flower-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><span class="flower-visited" aria-hidden="true">✓</span>`;
      button.addEventListener("click", () => openMemory(index));
      const scheduleHover = (event) => {
        if (!hoverArmed || !hoverPointer.matches || event.pointerType === "touch" || dialog.open || surpriseDialog.open || opening || closing || surpriseClosing || suppressedHover === button) return;
        if (hoverTimer) return;
        hoverTimer = setTimeout(() => {
          hoverTimer = null;
          openMemory(index);
        }, 230);
      };
      button.addEventListener("pointerenter", scheduleHover);
      button.addEventListener("pointermove", scheduleHover);
      button.addEventListener("pointerleave", () => {
        clearTimeout(hoverTimer);
        hoverTimer = null;
        if (suppressedHover === button) suppressedHover = null;
      });
      buttons.push(button);
      container.append(button);

      const dot = document.createElement("span");
      dot.className = "progress-dot";
      $("#progress-dots").append(dot);
    });
  }

  function loadPhoto(flor, index) {
    photo.hidden = true;
    photoPlaceholder.hidden = false;
    photo.onload = null;
    photo.onerror = null;
    photo.removeAttribute("src");
    $("#photo-panel").style.removeProperty("--photo-ratio");
    photo.alt = flor.descripcionFoto || flor.titulo || `Nuestro recuerdo ${index + 1}`;
    if (!flor.foto) return;
    photo.onload = () => {
      if (currentIndex !== index) return;
      photo.hidden = false;
      photoPlaceholder.hidden = true;
      $("#photo-panel").style.setProperty("--photo-ratio", `${photo.naturalWidth} / ${photo.naturalHeight}`);
    };
    photo.onerror = () => {
      photo.hidden = true;
      photoPlaceholder.hidden = false;
    };
    photo.src = flor.foto;
  }

  function updateProgress(index) {
    const isNew = !visited.has(index);
    visited.add(index);
    buttons[index].classList.add("is-visited");
    $("#progress-dots").children[index].classList.add("is-visited");
    if (visited.size === flores.length) {
      $("#progress-label").hidden = true;
      $("#replay-surprise").hidden = false;
    } else {
      $("#progress-label").textContent = `${visited.size} de ${flores.length} recuerdos descubiertos`;
    }
    if (isNew && !surpriseShown && visited.size >= surpriseAfter) surprisePending = true;
  }

  function openMemory(index) {
    if (dialog.open || surpriseDialog.open || opening || closing || surpriseClosing) return;
    clearTimeout(hoverTimer);
    hoverTimer = null;
    opening = true;
    currentIndex = index;
    const flor = flores[index];
    buttons[index].classList.add("is-open");
    $("#memory-title").textContent = flor.titulo || "Una flor para ti";
    $("#memory-message").textContent = flor.mensaje || "Hay recuerdos que florecen para siempre.";
    $("#memory-number").textContent = `RECUERDO ${String(index + 1).padStart(2, "0")} / ${String(flores.length).padStart(2, "0")}`;
    loadPhoto(flor, index);
    openingTimer = setTimeout(() => {
      opening = false;
      document.body.classList.add("has-memory");
      dialog.showModal();
      dialog.scrollTop = 0;
      $("#close-memory").focus({ preventScroll: true });
      updateProgress(index);
    }, reducedMotion.matches ? 0 : 180);
  }

  function finishClose() {
    clearTimeout(closingTimer);
    hoverArmed = false;
    dialog.classList.remove("is-closing");
    if (dialog.open) dialog.close();
    document.body.classList.remove("has-memory");
    if (currentIndex >= 0) {
      const button = buttons[currentIndex];
      button.classList.remove("is-open");
      suppressedHover = button;
      button.focus({ preventScroll: true });
    }
    closing = false;
    // La invitación espera a que termine de leer la última foto.
    if (surprisePending && !surpriseShown) openSurprise();
  }

  function openSurprise() {
    if (dialog.open || surpriseDialog.open || opening || closing || surpriseClosing) return;
    clearTimeout(hoverTimer);
    surprisePending = false;
    surpriseShown = true;
    hoverArmed = false;
    $("#surprise-kicker").textContent = sorpresa.antesala;
    $("#surprise-day").textContent = sorpresa.dia;
    $("#surprise-title").textContent = sorpresa.titulo;
    $("#surprise-message").textContent = sorpresa.mensaje;
    $("#surprise-postscript").textContent = sorpresa.posdata;
    $("#continue-bouquet").textContent = sorpresa.boton;
    document.body.classList.add("has-memory");
    surpriseDialog.showModal();
    surpriseDialog.scrollTop = 0;
    $("#continue-bouquet").focus({ preventScroll: true });
  }

  function finishSurpriseClose() {
    clearTimeout(surpriseClosingTimer);
    hoverArmed = false;
    surpriseDialog.classList.remove("is-closing");
    if (surpriseDialog.open) surpriseDialog.close();
    document.body.classList.remove("has-memory");
    surpriseClosing = false;
    if (currentIndex >= 0) {
      suppressedHover = buttons[currentIndex];
      buttons[currentIndex].focus({ preventScroll: true });
    }
  }

  function closeSurprise() {
    if (!surpriseDialog.open || surpriseClosing) return;
    surpriseClosing = true;
    clearTimeout(hoverTimer);
    if (reducedMotion.matches) return finishSurpriseClose();
    surpriseDialog.classList.add("is-closing");
    surpriseClosingTimer = setTimeout(finishSurpriseClose, 130);
  }

  function closeMemory() {
    if (closing || (!dialog.open && !opening)) return;
    clearTimeout(openingTimer);
    clearTimeout(hoverTimer);
    opening = false;
    closing = true;
    if (reducedMotion.matches || !dialog.open) return finishClose();
    dialog.classList.add("is-closing");
    closingTimer = setTimeout(finishClose, 130);
  }

  $("#close-memory").addEventListener("click", closeMemory);
  $("#back-to-bouquet").addEventListener("click", closeMemory);
  $("#close-surprise").addEventListener("click", closeSurprise);
  $("#continue-bouquet").addEventListener("click", closeSurprise);
  $("#replay-surprise").addEventListener("click", openSurprise);
  function bindDismiss(target, dismiss) {
    target.addEventListener("cancel", (event) => { event.preventDefault(); dismiss(); });
    // Solo cerrar si tanto el inicio como el final del clic ocurren en el fondo.
    let backdropPointer = false;
    target.addEventListener("pointerdown", (event) => { backdropPointer = event.target === target; });
    target.addEventListener("click", (event) => { if (backdropPointer && event.target === target) dismiss(); });
  }
  bindDismiss(dialog, closeMemory);
  bindDismiss(surpriseDialog, closeSurprise);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && opening) closeMemory();
  });
  // Al cerrar, el hover se reactiva solo tras un movimiento real del puntero.
  document.addEventListener("pointermove", (event) => {
    if (!dialog.open && !surpriseDialog.open && !opening && !closing && !surpriseClosing && (event.movementX || event.movementY)) hoverArmed = true;
  }, { capture: true, passive: true });
  renderBouquet();
})();
