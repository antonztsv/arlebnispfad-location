AFRAME.registerComponent("clicker", {
  init: function () {
    const container = document.querySelector(".container");
    const player = container.querySelector(".player");
    const title = container.querySelector("h1");
    const description = container.querySelector("p");

    this.el.addEventListener("click", (e) => {
      // console.log("clicker clicked!"); // DEBUG

      player.dataset.audioSource = this.el.dataset.audio;
      title.innerText = this.el.dataset.title;
      description.innerText = this.el.dataset.description;

      // const audioEl = document.querySelector(`#${this.el.dataset.audio}`);
      // const { duration } = audioEl;
      // const progress = container.querySelector(".progress");
      // progress.innerText = `0:00 - ${Math.round(duration)}`;

      container.classList.remove("hidden");
    });
  },
});
