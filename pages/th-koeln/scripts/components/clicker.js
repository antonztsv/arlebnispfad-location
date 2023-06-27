AFRAME.registerComponent("clicker", {
  init: function () {
    const cardEl = document.querySelector(".card");
    const playerEl = cardEl.querySelector(".player");
    const titleEl = cardEl.querySelector(".title");
    const descriptionEl = cardEl.querySelector(".description");
    const durationEl = cardEl.querySelector(".duration");

    this.el.addEventListener("click", (e) => {
      // const { latitude, longitude } = this.el.components["gps-projected-entity-place"].data;
      // console.log(latitude, longitude);

      // make sure card is not already visible
      if (!cardEl.classList.contains("hidden")) return;

      // set card content
      playerEl.dataset.audioSource = this.el.dataset.audio;
      titleEl.textContent = this.el.dataset.title;
      descriptionEl.textContent = this.el.dataset.description;

      // set duration
      const audioEl = document.querySelector(`#${this.el.dataset.audio}`);
      const { duration } = audioEl;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      const durationText = `Dauer: ${minutes}:${seconds.toString().padStart(2, "0")}`;
      durationEl.textContent = durationText;

      // show card
      cardEl.classList.remove("hidden");
    });
  },
});
