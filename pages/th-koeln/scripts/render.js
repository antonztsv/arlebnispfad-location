window.onload = async () => {
  const places = await loadPlaces();

  return renderPlaces(places);
};

const loadPlaces = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();

  return data.features;
};

const renderPlaces = (places) => {
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

    // create waypoint
    const waypoint = document.createElement("a-entity");
    waypoint.setAttribute("gps-projected-entity-place", `latitude: ${latitude}; longitude: ${longitude};`);
    waypoint.setAttribute("gltf-model", `#waypoint`);
    waypoint.setAttribute("scale", "5 5 5");
    waypoint.setAttribute("data-audio", audio);
    waypoint.setAttribute("data-description", description);
    waypoint.setAttribute("data-title", name);
    waypoint.setAttribute("sound", `src: #${audio}; refDistance: 10000;`);
    waypoint.setAttribute("clicker", "");
    waypoint.classList.add("clickable");

    // create plane
    const plane = document.createElement("a-entity");
    plane.setAttribute("geometry", "primitive: plane; width: 1; height: 0.2;");
    plane.setAttribute("material", "color: #000; opacity: 0.2;");
    plane.setAttribute("scale", "5 5 5");
    plane.setAttribute("position", "0 5 0");
    plane.setAttribute("look-at", "[gps-projected-camera]");
    plane.setAttribute("data-audio", audio);
    plane.setAttribute("data-description", description);
    plane.setAttribute("data-title", name);
    plane.setAttribute("clicker", "");
    plane.classList.add("clickable");

    // create text
    const text = document.createElement("a-text");
    text.setAttribute("value", name);
    text.setAttribute("align", "center");
    text.setAttribute("position", "0 0 0.1");
    text.setAttribute("color", "#fff");
    text.setAttribute("data-audio", audio);
    text.setAttribute("data-description", description);
    text.setAttribute("data-title", name);

    // wait for text to load to calculate and set optimal plane width
    text.addEventListener("loaded", () => {
      const { data } = text.components.text;
      const totalWidth = data.value.length * (data.width / data.wrapCount);

      plane.setAttribute("geometry", { width: totalWidth + 0.2 });
    });

    // add text to plane
    plane.appendChild(text);

    // add plane to waypoint
    waypoint.appendChild(plane);

    // emit event when waypoint is loaded
    waypoint.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded", { detail: { component: this.el } }));
    });

    // add audio to assets
    assets.appendChild(audioEl);

    // add waypoint to scene
    scene.appendChild(waypoint);
  });
};
