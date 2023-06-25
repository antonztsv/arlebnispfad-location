AFRAME.registerComponent("distance-scale", {
  schema: {
    minScale: { type: "number", default: 5 },
    maxScale: { type: "number", default: 50 },
    minDistance: { type: "number", default: 20 },
    maxDistance: { type: "number", default: 100 },
  },
  init: function () {
    console.log("init distance-scale");
    this.tick = AFRAME.utils.throttleTick(this.tick, 5000, this);
  },

  tick: function () {
    const camera = document.querySelector("a-camera");
    const distance = this.el.object3D.position.distanceTo(camera.object3D.position);

    const scale = this.calculateScale(distance);
    this.el.object3D.scale.set(scale, scale, scale);
  },

  calculateScale: function (distance) {
    const { minScale, maxScale, minDistance, maxDistance } = this.data;

    if (distance <= minDistance) {
      return minScale;
    } else if (distance >= maxDistance) {
      return maxScale;
    }

    const t = (distance - minDistance) / (maxDistance - minDistance);
    return minScale + t * (maxScale - minScale);
  },
});
