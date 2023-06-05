AFRAME.registerComponent("clicker", {
  init: function () {
    this.el.addEventListener("click", (e) => {
      alert("Box clicked!");
    });
  },
});
