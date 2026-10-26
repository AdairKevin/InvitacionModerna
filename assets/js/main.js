/* Los datos vienen de contenido.json (los carga motor.js en window.INVITACION) */
const DATOS = window.INVITACION;

/* Time: la fecha se cambia en evento.inicio de contenido.json */
const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date(DATOS.evento.inicio).getTime(),
  x = setInterval(function () {
    let now = new Date().getTime(),
      distance = countDown - now;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("dias").innerText = 0;
      document.getElementById("horas").innerText = 0;
      document.getElementById("minutos").innerText = 0;
      document.getElementById("segundos").innerText = 0;
      console.log("¡El tiempo ha terminado!");
      return; // Termina la ejecución de la función
    }

    const dias = Math.floor(distance / day);
    const horas = Math.floor((distance % day) / hour);
    const minutos = Math.floor((distance % hour) / minute);
    const segundos = Math.floor((distance % minute) / second);

    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;

    console.log(dias, horas, minutos, segundos);
  }, second);

if (segundos == 0) {
  (document.getElementById("dias").innerText = "00"),
    (document.getElementById("horas").innerText = "00"),
    (document.getElementById("minutos").innerText = "00"),
    (document.getElementById("segundos").innerText = "00");
}

/* music */
var music = document.getElementById("music");
var isPlaying = false;
music.volume = 0.5;

function togglePlay() {
  if (isPlaying) {
    music.pause();
  } else {
    music.play();
  }
}

music.onplaying = function () {
  isPlaying = true;
  document.getElementById("music-animation").classList.add("on");
};
music.onpause = function () {
  isPlaying = false;
  document.getElementById("music-animation").classList.remove("on");
};

var button = document.getElementById("toggle");

button.addEventListener(
  "click",
  function () {
    if (button.getAttribute("data-text-swap") == button.innerHTML) {
      button.innerHTML = button.getAttribute("data-text-original");
    } else {
      button.setAttribute("data-text-original", button.innerHTML);
      button.innerHTML = button.getAttribute("data-text-swap");
    }
  },
  false
);

/* Calendario: el mes, los días y el botón de Google Calendar se arman con evento.inicio */
(function () {
  const contenedor = document.getElementById("calendarioDias");
  if (!contenedor) return;
  const fecha = new Date(DATOS.evento.inicio);
  const anio = fecha.getFullYear(),
    mes = fecha.getMonth();
  document.getElementById("calendarioMes").textContent = DATOS.calendario.meses[mes] + " " + anio;
  let celdas = "<span></span>\n".repeat(new Date(anio, mes, 1).getDay());
  for (let d = 1, total = new Date(anio, mes + 1, 0).getDate(); d <= total; d++) {
    celdas += (d === fecha.getDate() ? '<span class="active">' + d + "</span>" : "<span>" + d + "</span>") + "\n";
  }
  contenedor.innerHTML = celdas;

  const pad = (n) => String(n).padStart(2, "0");
  const formato = (f) => f.getFullYear() + pad(f.getMonth() + 1) + pad(f.getDate()) + "T" + pad(f.getHours()) + pad(f.getMinutes()) + "00";
  const fin = new Date(fecha.getTime() + DATOS.evento.duracionHoras * hour);
  document.getElementById("calendarioBoton").href =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(DATOS.evento.tituloCalendario) +
    "&dates=" + formato(fecha) + "/" + formato(fin) +
    "&details=" + encodeURIComponent(DATOS.evento.detallesCalendario) +
    "&location=" + encodeURIComponent(DATOS.evento.lugarCalendario);
})();
