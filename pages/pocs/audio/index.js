window.onload = async () => {
  const places = await staticLoadPlaces();
  return renderPlaces(places);
};

async function staticLoadPlaces() {
  const res = await fetch("/data.json");
  const data = await res.json();

  return data.features;
}

function renderPlaces(places) {
  const scene = document.querySelector("a-scene");
  const assets = document.querySelector("a-assets");

  places.forEach((place) => {
    const {
      geometry: {
        coordinates: [longitude, latitude],
      },
      properties: { name, audio, description },
    } = place;

    // add audio to assets
    const audioEl = document.createElement("audio");
    audioEl.setAttribute("id", audio);
    audioEl.setAttribute("src", `./assets/audio/${audio}.mp3`);
    audioEl.setAttribute("preload", "auto");

    // add place as text
    const text = document.createElement("a-text");
    text.setAttribute("gps-projected-entity-place", `latitude: ${latitude}; longitude: ${longitude};`);
    text.setAttribute("value", name);
    text.setAttribute("scale", "50 50 50");
    text.setAttribute("position", "0 10 0");
    text.setAttribute("align", "center");
    text.setAttribute("look-at", "[gps-projected-camera]");
    text.setAttribute("clicker", "");
    text.setAttribute("data-audio", audio);
    text.setAttribute("data-description", description);
    text.setAttribute("data-title", name);
    text.setAttribute("sound", `src: #${audio}; refDistance: 10000;`);
    text.classList.add("clickable");

    text.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded", { detail: { component: this.el } }));
    });

    assets.appendChild(audioEl);
    scene.appendChild(text);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initAudioControls();

  // back button
  const back = document.querySelector(".back");
  back.addEventListener("click", (e) => {
    window.location.href = "/";
  });

  // card close button
  const close = document.querySelector(".close");
  close.addEventListener("click", (e) => {
    stopAllAudio();

    const card = document.querySelector(".card");
    card.classList.add("hidden");

    const title = document.querySelector("h1");
    title.textContent = "";

    const description = document.querySelector(".description");
    description.classList.remove("collapsed");
    description.textContent = "";

    const player = document.querySelector(".player");
    player.dataset.audioSource = "";
  });

  // card description toggle
  const description = document.querySelector(".description");
  description.addEventListener("click", (e) => {
    description.classList.toggle("collapsed");
  });
});

const initAudioControls = () => {
  const player = document.querySelector(".player");

  player.addEventListener("click", (e) => {
    const audioSrc = player.dataset.audioSource;
    const audio = document.querySelector(`[data-audio="${audioSrc}"]`);

    if (e.target.matches(".play")) {
      audio.components.sound.playSound();

      e.target.classList.add("hidden");
      e.target.nextElementSibling.classList.remove("hidden");

      audio.addEventListener("sound-ended", stopAllAudio);
    } else if (e.target.matches(".pause")) {
      audio.components.sound.pauseSound();

      e.target.classList.add("hidden");
      e.target.previousElementSibling.classList.remove("hidden");

      audio.removeEventListener("sound-ended", stopAllAudio);
    } else if (e.target.matches(".stop")) {
      audio.components.sound.stopSound();

      e.target.classList.add("hidden");
      e.target.previousElementSibling.classList.remove("hidden");
    }
  });
};

const stopAllAudio = () => {
  const allAudio = document.querySelectorAll("[sound]");

  allAudio.forEach((audio) => {
    audio.components.sound.stopSound();
  });

  const play = document.querySelector(".play");
  const pause = document.querySelector(".pause");

  pause.classList.add("hidden");
  play.classList.remove("hidden");
};
