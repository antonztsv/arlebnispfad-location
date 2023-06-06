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
      properties: { name, audio, description, image },
    } = place;

    // add audio to assets - not working for some reason!
    const audioEl = document.createElement("audio");
    audioEl.setAttribute("id", audio);
    audioEl.setAttribute("src", `./assets/audio/${audio}.mp3`);
    audioEl.setAttribute("preload", "auto");

    // add place as text
    const text = document.createElement("a-text");
    text.setAttribute("gps-projected-entity-place", `latitude: ${latitude}; longitude: ${longitude};`);
    text.setAttribute("value", name);
    text.setAttribute("scale", "50 50 50");
    text.setAttribute("align", "center");
    text.setAttribute("look-at", "[gps-projected-camera]");
    text.setAttribute("clicker", "");
    text.setAttribute("data-audio", audio);
    text.setAttribute("data-description", description);
    text.setAttribute("data-title", name);
    // text.setAttribute("sound", `src: url(./assets/audio/${audio}.mp3); refDistance: 10000;`);
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
    // return to main page
    window.location.href = "/";
  });

  // close button
  const close = document.querySelector(".close");
  close.addEventListener("click", (e) => {
    stopAllAudio();

    const container = document.querySelector(".container");
    container.classList.add("hidden");

    const title = document.querySelector("h1");
    title.innerText = "";

    const description = document.querySelector(".description");
    description.classList.remove("collapsed");
    description.innerText = "";

    const player = document.querySelector(".player");
    player.dataset.audioSource = "";
  });

  // description toggle
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
    let interval = null;

    if (e.target.matches(".play")) {
      audio.components.sound.playSound();

      e.target.classList.add("hidden");
      e.target.nextElementSibling.classList.remove("hidden");

      audio.addEventListener("sound-ended", stopAllAudio);

      // --------------------

      // const duration = audio.components.sound.pool.children[0].source.buffer.duration;
      // console.log(`duration: ${duration}`);

      // const audioEl = document.querySelector(`#${audioSrc}`);
      // const duration2 = audioEl.duration;
      // console.log(`duration2: ${duration2}`);

      // const soundComponent = audio.components.sound;
      // const audioSource = soundComponent.pool.children[0].source;
      // const audioContext = audioSource.context;

      // console.log(soundComponent.pool.children[0].source.buffer.currentTime);

      // setInterval(() => {
      //   const currentTime = audioContext.currentTime - soundComponent.pool.children[0].startTime;
      //   console.log(`currentTime: ${currentTime}`);
      // }, 1000);

      // --------------------
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
