async function init() {
  const cfg = await fetch("dithertone_filter.json").then(r => r.json());
  console.log("DitherTone config loaded", cfg);
  buildUI(cfg);
}

function buildUI(cfg) {
  const root = document.getElementById("controls");
  // Algorithm select
  root.appendChild(makeSelect("Algorithm", "algorithm", cfg.algorithms.map(a => [a.id, a.name]), cfg.defaults.algorithm));
  // Core sliders
  const sliderSpecs = [
    ["blur", "Blur", 0, 30, 0, "px"],
    ["sharpen_strength", "Sharpen", 0, 300, 136, "%"],
    ["sharpen_radius", "Sharpen Radius", 0, 10, 4, "px"],
    ["brightness", "Brightness", -100, 100, 0, "%"],
    ["contrast", "Contrast", -100, 100, 0, "%"],
    ["noise", "Noise", 0, 100, 0, "%"],
    ["denoise", "Denoise", 0, 100, 4, "%"]
  ];
  sliderSpecs.forEach(s=>root.appendChild(makeSlider(...s)));

  // Tri-tone mapping
  const tri = document.createElement("div");
  tri.className="group";
  tri.innerHTML="<h2>Tri‑Tone Mapping</h2>";
  tri.appendChild(makeColor("Highlights", "highlights", cfg.defaults.highlights));
  tri.appendChild(makeColor("Midtones", "midtones", cfg.defaults.midtones));
  tri.appendChild(makeColor("Shadows", "shadows", cfg.defaults.shadows));
  root.appendChild(tri);

  // Render
  document.getElementById("renderBtn").onclick = () => applyDither();
}

function makeSelect(label, key, options, defVal){
  const wrap = document.createElement("div");
  wrap.className="group";
  const h = document.createElement("h2");
  h.textContent = label;
  wrap.appendChild(h);

  const sel = document.createElement("select");
  sel.id = key;
  options.forEach(([val, text]) => {
    const opt = document.createElement("option");
    opt.value = val; opt.textContent = text;
    if(val===defVal) opt.selected=true;
    sel.appendChild(opt);
  });
  wrap.appendChild(sel);
  return wrap;
}

function makeSlider(key, label, min, max, defVal, unit){
  const wrap = document.createElement("div");
  wrap.className="group";
  const l = document.createElement("label");
  l.textContent = label;
  const range = document.createElement("input");
  range.type="range"; range.min=min; range.max=max; range.value=defVal; range.id=key;
  l.appendChild(range);
  wrap.appendChild(l);
  return wrap;
}

function makeColor(label, key, defVal){
  const l = document.createElement("label");
  l.textContent = label;
  const inp = document.createElement("input");
  inp.type="color"; inp.id=key; inp.value = defVal;
  l.appendChild(inp);
  return l;
}

function applyDither(){
  const algo = document.getElementById("algorithm").value;
  const script = `
      var algo = "${algo}";
      alert("DitherTone would run with algorithm "+algo);
  `;
  window.parent.postMessage(script, "*");
}

window.addEventListener("load", init);