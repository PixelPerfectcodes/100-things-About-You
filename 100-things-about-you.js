"use strict";

const statements = [
  "You make *ordinary moments* feel important.",
  "Your *presence* changes the atmosphere.",
  "You notice the *little things*.",
  "You have a way of making people feel *seen*.",
  "Your strength doesn't always need to be *loud*.",
  "Some people are remembered *without trying*.",
  "Rooms feel *warmer* after you walk in.",
  "You listen as though *every word* matters.",
  "Silence feels *comfortable* when you are there.",
  "You carry calm into *noisy places*.",
  "People *exhale* a little around you.",
  "You remember the details everyone assumed *nobody noticed*.",
  "Your laugh *rearranges* a room.",
  "You are *gentle* without ever being fragile.",
  "You say *thank you* like you mean it.",
  "You make *effort* look effortless.",
  "You ask the *second question*, the one that matters.",
  "Your *kindness* has no audience.",
  "You turn *strangers* into familiar faces.",
  "You leave places a little *better* than you found them.",
  "You are *unmistakably* yourself.",
  "Your *honesty* is soft, but never vague.",
  "You hold *space* for people without announcing it.",
  "You *forgive* with a grace most people never learn.",
  "Your *patience* is a quiet kind of generosity.",
  "You know when to *speak*, and when to simply stay.",
  "You make *difficult days* feel survivable.",
  "Your *curiosity* keeps the world interesting.",
  "You find *beauty* in places others walk past.",
  "You *show up*, and that changes everything.",
  "You are *steady* when others are shaking.",
  "Your *courage* rarely announces itself.",
  "You *believe in people* before they have proof.",
  "Your warmth is *never forced*.",
  "You are comfortable with *who you are becoming*.",
  "Your *quiet moments* say more than most speeches.",
  "You make simple plans feel like *occasions*.",
  "You *care* in specific, thoughtful ways.",
  "You notice *how people feel*, not only what they say.",
  "Your *consistency* is a gift to everyone near you.",
  "You *disagree* gracefully.",
  "You *celebrate* other people's wins without keeping score.",
  "You are proof that *gentle people* endure.",
  "You give *credit* freely and take responsibility honestly.",
  "People *trust* you faster than they realize.",
  "Your *voice* sounds like reassurance.",
  "You make *waiting* feel shorter.",
  "Your *style* belongs entirely to you.",
  "You do small favors so naturally that *nobody can repay them*.",
  "You remember *birthdays, names*, and the stories behind them.",
  "You have a *talent for timing*, and know when to lighten the mood.",
  "You turn *awkward* into easy.",
  "You make people feel *at home* almost anywhere.",
  "Your *humor* includes everyone.",
  "You carry *quietly* what would break others.",
  "You are *brave* in ways nobody applauds.",
  "You make good ideas feel *safe to say aloud*.",
  "You *encourage* without ever condescending.",
  "You *stay kind* when it would be easier not to.",
  "Your *standards* are high, and your grace is higher.",
  "You notice who is *standing alone*.",
  "You can *change a mood* with a single sentence.",
  "People *borrow* your courage without ever telling you.",
  "You make *sincerity* look elegant.",
  "Your *influence* is felt long after you leave.",
  "You teach by *example*, never by lecture.",
  "You make *mistakes* feel human, not final.",
  "You *inspire* people to try without pressuring them.",
  "Your *words* stay with people for years.",
  "You are the reason *someone* kept going.",
  "You turn *ordinary places* into memories.",
  "You *listen* between the lines.",
  "You are *gracious* in small moments, which is where it counts.",
  "You treat *everyone* as though they matter, because to you they do.",
  "Your *intuition* arrives quietly, then proves itself.",
  "You are *soft* and unshakable at the same time.",
  "You are *growing* in ways you don't always see.",
  "You have a presence that *cannot be imitated*.",
  "You are only *easy to miss* if no one is paying attention.",
  "You make *time* feel generous.",
  "You *make room* at your table, and in your story.",
  "You show people how to be *gentler* with themselves.",
  "You have *depth* that reveals itself slowly.",
  "Your *loyalty* is quiet, and it never wavers.",
  "You can be *serious* without being distant.",
  "You are *thoughtful* in ways that never ask for thanks.",
  "You treat a *conversation* like something precious.",
  "You make good days *better* and heavy days lighter.",
  "Your *smile* has never felt like an obligation.",
  "You *understand* more than you say.",
  "You leave people feeling *capable*.",
  "You make *belonging* feel simple.",
  "You shape the people around you, *gently and for good*.",
  "You are remembered in *details*: a phrase, a gesture, a tone.",
  "You *matter* in ways that never fit into one sentence.",
  "People *notice* when you are missing, and feel it when you return.",
  "You are the kind of person *people hope to become*.",
  "You *deserve* the same care you give so freely.",
  "The world is *quietly better* because you are in it.",
  "And these are *only a hundred* of the countless reasons."
];

const W = 1200;
const H = 800;
const SPEED = 2.25;
const colors = {
  ivory: "#f4eddd",
  champagne: "#cdbd9c",
  gold: "#c9a356",
  bright: "#eccb80",
  amber: "#ffb252"
};
const rowSpecs = [
  { y: 126, family: "sans", size: 14, italic: false, speed: -26, color: colors.champagne, key: colors.gold, alpha: 0.60, count: 15 },
  { y: 160, family: "serif", size: 22, italic: true, speed: 34, color: colors.champagne, key: colors.bright, alpha: 0.72, count: 14 },
  { y: 206, family: "serif", size: 30, italic: false, speed: -20, color: colors.ivory, key: colors.bright, alpha: 0.90, count: 12, big: true },
  { y: 582, family: "sans", size: 16, italic: false, speed: 30, color: colors.champagne, key: colors.gold, alpha: 0.65, count: 14 },
  { y: 624, family: "serif", size: 24, italic: true, speed: -42, color: colors.ivory, key: colors.bright, alpha: 0.72, count: 14 },
  { y: 676, family: "serif", size: 32, italic: false, speed: 22, color: colors.ivory, key: colors.bright, alpha: 0.92, count: 12, big: true },
  { y: 724, family: "sans", size: 15, italic: false, speed: -34, color: colors.champagne, key: colors.gold, alpha: 0.60, count: 19 }
];

const canvas = document.querySelector("#scene");
const ctx = canvas.getContext("2d");
const pauseButton = document.querySelector("#pause");

let pixelRatio = 1;
let simTime = 0;
let lastFrame = 0;
let phase = -0.6;
let duration = 5;
let currentIndex = -1;
let statementCount = 0;
let progressShown = 0;
let paused = false;
let rows = [];
let trails = [];
let motes = [];
const revealTimes = new Map();

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function smoothstep(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - clamp(value), 3);
}

function plain(text) {
  return text.replaceAll("*", "");
}

function parseWords(text) {
  const words = [];
  text.split("*").forEach((part, index) => {
    const keyword = index % 2 === 1;
    (part.match(/\S+/g) || []).forEach(word => words.push({ text: word, keyword }));
  });
  return words;
}

function fontFor(spec, keyword = false) {
  const family = spec.family === "serif" ? 'Georgia, "Times New Roman", serif' : '"Segoe UI", Arial, sans-serif';
  return `${spec.italic ? "italic " : ""}${keyword ? "700 " : ""}${spec.size}px ${family}`;
}

function measureWords(words, spec) {
  let width = 0;
  const space = spec.size * 0.3;
  words.forEach((word, index) => {
    ctx.font = fontFor(spec, word.keyword);
    width += ctx.measureText(word.text).width + (index ? space : 0);
  });
  return width;
}

function drawWords(words, x, y, spec, alpha = 1) {
  let cursor = x;
  const space = spec.size * 0.3;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.textBaseline = "middle";
  words.forEach((word, index) => {
    if (index) cursor += space;
    ctx.font = fontFor(spec, word.keyword);
    ctx.fillStyle = word.keyword ? spec.key : spec.color;
    ctx.fillText(word.text, cursor, y);
    cursor += ctx.measureText(word.text).width;
  });
  ctx.restore();
}

function seededRandom(seed) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function makeRows() {
  const random = seededRandom(11);
  const order = statements.map((text, index) => ({ index, length: plain(text).length }))
    .sort((a, b) => a.length - b.length);
  const bigCount = rowSpecs.filter(spec => spec.big).reduce((sum, spec) => sum + spec.count, 0);
  const bigPool = order.slice(0, bigCount).map(item => item.index);
  const rest = order.slice(bigCount).map(item => item.index);
  const shuffle = values => {
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
  };
  shuffle(bigPool);
  shuffle(rest);
  let bigIndex = 0;
  let restIndex = 0;

  rows = rowSpecs.map(spec => {
    const indices = spec.big
      ? bigPool.slice(bigIndex, bigIndex += spec.count)
      : rest.slice(restIndex, restIndex += spec.count);
    const items = indices.map(index => {
      const words = parseWords(statements[index]);
      return { index, words, width: measureWords(words, spec), flashAt: null };
    });
    const maxWidth = Math.max(...items.map(item => item.width));
    let gap = 64 + spec.size * 2.4;
    const total = items.reduce((sum, item) => sum + item.width + gap, 0);
    const minimum = W + 2 * maxWidth + 120;
    if (total < minimum) gap += (minimum - total) / items.length;
    let baseX = 0;
    items.forEach(item => {
      item.baseX = baseX;
      baseX += item.width + gap;
    });
    return {
      spec,
      items,
      maxWidth,
      length: baseX,
      scroll: random() * baseX,
      bandHeight: spec.size * 1.8
    };
  });
}

function makeAtmosphere() {
  const random = seededRandom(47);
  trails = [139, 181, 244, 555, 600, 647, 705, 745].map(y => {
    const length = 180 + random() * 240;
    const speed = (random() < 0.5 ? -1 : 1) * (110 + random() * 220);
    return { y, length, speed, x: random() * (W + length) - length, peak: 0.4 + random() * 0.45 };
  });
  motes = Array.from({ length: 44 }, () => ({
    x: random() * W,
    y: 20 + random() * (H - 40),
    vx: (4 + random() * 12) * (random() < 0.25 ? -1 : 1),
    sway: 2 + random() * 7,
    swaySpeed: 0.2 + random() * 0.2,
    phase: random() * Math.PI * 2,
    twinkle: 0.4 + random(),
    alpha: 0.1 + random() * 0.24,
    radius: random() < 0.68 ? 1 : 2
  }));
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * pixelRatio);
  canvas.height = Math.round(rect.height * pixelRatio);
  ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
  makeRows();
}

function wrapWords(words, spec, maxWidth) {
  const lines = [];
  let line = [];
  let width = 0;
  const space = spec.size * 0.3;
  words.forEach(word => {
    ctx.font = fontFor(spec, word.keyword);
    const wordWidth = ctx.measureText(word.text).width;
    const nextWidth = width + (line.length ? space : 0) + wordWidth;
    if (line.length && nextWidth > maxWidth) {
      lines.push(line);
      line = [word];
      width = wordWidth;
    } else {
      line.push(word);
      width = nextWidth;
    }
  });
  if (line.length) lines.push(line);
  return lines;
}

function startFeature(index) {
  currentIndex = index % statements.length;
  if (!revealTimes.has(currentIndex)) revealTimes.set(currentIndex, simTime);
  statementCount = Math.min(index + 1, statements.length);
  const length = plain(statements[currentIndex]).length;
  duration = clamp(3.8 + 0.034 * length, 4.6, 6.4);
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, "#080c1a");
  gradient.addColorStop(1, "#020309");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  const lift = ctx.createRadialGradient(W / 2, 410, 20, W / 2, 410, 590);
  lift.addColorStop(0, "rgba(12, 22, 43, 0.54)");
  lift.addColorStop(1, "rgba(2, 3, 9, 0)");
  ctx.fillStyle = lift;
  ctx.fillRect(0, 0, W, H);
}

function drawRulesAndGlow() {
  const pulse = 0.78 + 0.22 * Math.sin(simTime * 0.55);
  const glow = ctx.createRadialGradient(W / 2, 410, 0, W / 2, 410, 410);
  glow.addColorStop(0, `rgba(255, 170, 70, ${0.08 * pulse})`);
  glow.addColorStop(1, "rgba(255, 170, 70, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 230, W, 360);

  ctx.save();
  ctx.globalAlpha = 0.65;
  const rule = ctx.createLinearGradient(220, 0, 980, 0);
  rule.addColorStop(0, "rgba(201, 163, 86, 0)");
  rule.addColorStop(0.5, colors.gold);
  rule.addColorStop(1, "rgba(201, 163, 86, 0)");
  ctx.fillStyle = rule;
  ctx.fillRect(220, 262, 760, 1);
  ctx.fillRect(220, 540, 760, 1);
  ctx.restore();
}

function drawTrails() {
  trails.forEach(trail => {
    const direction = Math.sign(trail.speed);
    trail.x += trail.speed * frameDelta;
    if (direction > 0 && trail.x > W + 40) trail.x = -trail.length - Math.random() * 700;
    if (direction < 0 && trail.x < -trail.length - 40) trail.x = W + Math.random() * 700;
    const gradient = ctx.createLinearGradient(trail.x, 0, trail.x + trail.length, 0);
    gradient.addColorStop(0, "rgba(255, 178, 82, 0)");
    gradient.addColorStop(0.5, `rgba(255, 178, 82, ${trail.peak * 0.55})`);
    gradient.addColorStop(1, "rgba(255, 178, 82, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(trail.x, trail.y, trail.length, 2);
  });
}

function drawRows() {
  rows.forEach(row => {
    const { spec } = row;
    row.scroll += spec.speed * frameDelta;
    const top = spec.y - row.bandHeight / 2;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, top, W, row.bandHeight);
    ctx.clip();
    row.items.forEach(item => {
      let x = (item.baseX + row.scroll) % row.length - row.maxWidth;
      if (x > W || x + item.width < 0) return;
      const revealed = item.index < statementCount;
      const revealTime = revealed ? Math.max(0, simTime - (revealTimes.get(item.index) ?? simTime)) : 0;
      const lit = revealed ? smoothstep(revealTime / 1.8) : 0;
      const center = x + item.width / 2;
      const sweepX = (simTime * 150) % (W + 2 * 460 + 500) - 460;
      if (revealed && item.flashAt === null && center > 260 && center < 940) item.flashAt = simTime;
      const flash = item.flashAt === null ? 0 : Math.pow(Math.max(0, 1 - (simTime - item.flashAt) / 3.2), 2);
      const boost = Math.exp(-Math.pow((center - sweepX) / 190, 2)) * lit;
      const edge = smoothstep((Math.min(center, W - center) - 28) / 212);
      const alpha = spec.alpha * (0.13 + (1 - 0.13) * lit) * (1 + 0.35 * boost) * edge;
      drawWords(item.words, x, spec.y, {
        ...spec,
        key: colors.bright
      }, alpha);
      const hotAlpha = Math.max(boost * 0.7, flash * 0.9) * lit;
      if (hotAlpha > 0.02) {
        drawWords(item.words, x, spec.y, {
          ...spec,
          color: colors.bright,
          key: colors.bright
        }, hotAlpha * Math.min(1, spec.alpha + 0.2));
      }
    });
    ctx.restore();
  });
}

function drawFeature() {
  if (currentIndex < 0) return;
  const fadeIn = easeOutCubic(phase / 1.2);
  const fadeOut = smoothstep((duration - phase) / 1);
  const alpha = Math.min(fadeIn, fadeOut);
  if (alpha <= 0.003) return;

  const words = parseWords(statements[currentIndex]);
  let size = 50;
  let spec;
  let lines;
  for (; size >= 34; size -= 4) {
    spec = { family: "serif", size, italic: false, color: colors.ivory, key: colors.bright };
    lines = wrapWords(words, spec, 880);
    if (lines.length <= 3) break;
  }
  const lineHeight = size * 1.16;
  const scale = phase < 1.6 ? 0.94 + 0.06 * easeOutCubic(phase / 1.6) : 1;
  const centerY = 410 + (1 - fadeIn) * 10 - (1 - fadeOut) * 8;
  const top = centerY - ((lines.length - 1) * lineHeight) / 2;

  ctx.save();
  ctx.globalAlpha = alpha * 0.25;
  ctx.shadowColor = colors.amber;
  ctx.shadowBlur = 34;
  lines.forEach((line, lineIndex) => {
    const width = measureWords(line, spec);
    drawWords(line, (W - width) / 2, top + lineIndex * lineHeight, spec, 1);
  });
  ctx.restore();

  ctx.save();
  ctx.translate(W / 2, centerY);
  ctx.scale(scale, scale);
  lines.forEach((line, lineIndex) => {
    const width = measureWords(line, spec);
    drawWords(line, -width / 2, top + lineIndex * lineHeight - centerY, spec, alpha);
  });
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 15px 'Segoe UI', Arial, sans-serif";
  ctx.fillStyle = colors.bright;
  ctx.fillText(String(currentIndex + 1).padStart(3, "0"), W / 2, 292);
  ctx.strokeStyle = `rgba(201, 163, 86, ${alpha * 0.7})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 105, 292);
  ctx.lineTo(W / 2 - 35, 292);
  ctx.moveTo(W / 2 + 35, 292);
  ctx.lineTo(W / 2 + 105, 292);
  ctx.stroke();
  ctx.restore();
}

function drawSweep() {
  const sweepX = (simTime * 150) % (W + 2 * 460 + 500) - 460;
  const gradient = ctx.createLinearGradient(sweepX - 230, 0, sweepX + 230, 0);
  gradient.addColorStop(0, "rgba(30, 20, 7, 0)");
  gradient.addColorStop(0.5, "rgba(30, 20, 7, 0.42)");
  gradient.addColorStop(1, "rgba(30, 20, 7, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(sweepX - 230, 0, 460, H);
}

function drawDust() {
  motes.forEach(mote => {
    mote.x += mote.vx * frameDelta;
    if (mote.x > W + 10) mote.x = -10;
    if (mote.x < -10) mote.x = W + 10;
    const y = mote.y + Math.sin(simTime * mote.swaySpeed + mote.phase) * mote.sway;
    const twinkle = 0.55 + 0.45 * Math.sin(simTime * mote.twinkle + mote.phase);
    ctx.fillStyle = `rgba(255, 222, 170, ${mote.alpha * twinkle})`;
    ctx.beginPath();
    ctx.arc(mote.x, y, mote.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawTitle() {
  const title = "100 THINGS ABOUT YOU";
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "42px Georgia, 'Times New Roman', serif";
  ctx.shadowColor = colors.amber;
  ctx.shadowBlur = 18;
  ctx.fillStyle = "rgba(255, 178, 82, 0.4)";
  ctx.fillText(title, W / 2, 56);
  ctx.shadowBlur = 0;
  ctx.fillStyle = colors.ivory;
  ctx.fillText(title, W / 2, 56);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.72;
  const rule = ctx.createLinearGradient(360, 0, 840, 0);
  rule.addColorStop(0, "rgba(201, 163, 86, 0)");
  rule.addColorStop(0.5, colors.gold);
  rule.addColorStop(1, "rgba(201, 163, 86, 0)");
  ctx.fillStyle = rule;
  ctx.fillRect(360, 98, 480, 1);
  ctx.restore();
}

function drawProgress() {
  const left = 60;
  const right = W - 60;
  const y = 784;
  const target = statementCount / statements.length;
  progressShown += (target - progressShown) * Math.min(1, frameDelta * 2.5);
  ctx.strokeStyle = "#242632";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.lineTo(right, y);
  ctx.stroke();
  for (let i = 0; i <= 10; i++) {
    const x = left + (right - left) * i / 10;
    ctx.strokeStyle = "#2e303e";
    ctx.beginPath();
    ctx.moveTo(x, y - 3);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  const fillX = left + (right - left) * progressShown;
  if (fillX > left + 1) {
    ctx.strokeStyle = colors.gold;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(fillX, y);
    ctx.stroke();
    const head = ctx.createRadialGradient(fillX, y, 0, fillX, y, 20);
    head.addColorStop(0, "rgba(255, 178, 82, 0.55)");
    head.addColorStop(1, "rgba(255, 178, 82, 0)");
    ctx.fillStyle = head;
    ctx.fillRect(fillX - 20, y - 12, 40, 24);
  }
  ctx.textBaseline = "alphabetic";
  ctx.font = "700 13px 'Segoe UI', Arial, sans-serif";
  ctx.fillStyle = "rgba(205, 189, 156, 0.8)";
  ctx.fillText("STATEMENTS APPEARED", left, y - 12);
  ctx.textAlign = "right";
  ctx.fillStyle = colors.bright;
  ctx.fillText(`${String(statementCount).padStart(3, "0")} / 100`, right, y - 12);
  ctx.textAlign = "left";
}

function drawGrain() {
  ctx.save();
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    ctx.fillStyle = Math.random() > 0.5 ? "#a8a8a8" : "#111111";
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.restore();
}

function draw() {
  drawBackground();
  drawRulesAndGlow();
  drawTrails();
  drawRows();
  drawFeature();
  drawSweep();
  drawDust();
  drawTitle();
  drawProgress();
  drawGrain();
  const intro = clamp(simTime / 2.4);
  if (intro < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${1 - smoothstep(intro)})`;
    ctx.fillRect(0, 0, W, H);
  }
}

let frameDelta = 0;

function animate(timestamp) {
  if (!lastFrame) lastFrame = timestamp;
  const elapsed = Math.min((timestamp - lastFrame) / 1000, 0.1);
  lastFrame = timestamp;
  frameDelta = paused ? 0 : elapsed * SPEED;

  if (!paused) {
    simTime += frameDelta;
    phase += frameDelta;
    if (currentIndex < 0 && phase >= 0) {
      startFeature(0);
    } else if (currentIndex >= 0) {
      while (phase >= duration) {
        phase -= duration;
        startFeature(currentIndex + 1);
      }
    }
  }

  draw();
  requestAnimationFrame(animate);
}

pauseButton.addEventListener("click", () => {
  paused = !paused;
  pauseButton.textContent = paused ? "Resume" : "Pause";
  pauseButton.setAttribute("aria-pressed", String(paused));
});

document.querySelector("#restart").addEventListener("click", () => {
  simTime = 0;
  phase = -2.6;
  duration = 5;
  currentIndex = -1;
  statementCount = 0;
  progressShown = 0;
  revealTimes.clear();
  paused = false;
  pauseButton.textContent = "Pause";
  pauseButton.setAttribute("aria-pressed", "false");
  makeAtmosphere();
});

window.addEventListener("resize", resize);
resize();
makeAtmosphere();
requestAnimationFrame(animate);
