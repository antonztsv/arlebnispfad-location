document.addEventListener("DOMContentLoaded", () => {
  initAudioControls();
  initBackButton();
  initCloseButton();
  cardCollapse();
});

const cardCollapse = () => {
  const description = document.querySelector(".description");
  description.addEventListener("click", (e) => {
    description.classList.toggle("collapsed");
  });
};

const initBackButton = () => {
  const back = document.querySelector(".back");
  back.addEventListener("click", (e) => {
    window.history.back();
  });
};

const initCloseButton = () => {
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
};

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
