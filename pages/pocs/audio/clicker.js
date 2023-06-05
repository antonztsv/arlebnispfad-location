AFRAME.registerComponent("clicker", {
  init: function () {
    const container = document.querySelector(".container");
    const player = container.querySelector(".player");
    const title = container.querySelector("h1");
    const description = container.querySelector("p");

    this.el.addEventListener("click", (e) => {
      // console.log("clicker clicked!"); // DEBUG

      player.dataset.audioSource = this.el.dataset.audio;

      // title.innerText = this.el.getAttribute("value");
      title.innerText = this.el.dataset.title;
      description.innerText = this.el.dataset.description;

      container.classList.remove("hidden");
    });
  },
});
