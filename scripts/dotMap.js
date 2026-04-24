/* =============================================
   map.js — Dot-map logic
   ============================================= */

/* ── 1. SVG PATH ─────────────────────────────
   The raw "d" attribute from the original SVG.
   This defines the outline of the shape we fill
   with dots.                                   */
const PATH_D = `M 411 560 L 411 664 L 451 664 L 482 695 L 482 739 L 500 757
  L 500 770 L 420 850 L 455 885 L 484 885 L 507 908 L 507 942 L 551 898
  L 551 883 L 608 826 L 608 751 L 674 685 L 731 685 L 746 670 L 762 670
  L 786 646 L 786 616 L 807 595 L 807 555 L 828 534 L 828 452 L 843 437
  L 843 425 L 902 366 L 902 287 L 879 287 L 851 259 L 833 259 L 804 230
  L 742 230 L 729 217 L 711 217 L 701 227 L 671 197 L 653 197 L 636 180
  L 609 180 L 599 170 L 563 170 L 563 159 L 586 136 L 586 126 L 559 126
  L 559 115 L 567 107 L 542 82 L 542 92 L 519 115 L 498 115 L 489 124
  L 478 113 L 446 113 L 435 124 L 416 124 L 405 135 L 378 135 L 353 110
  L 365 98 L 365 58 L 345 58 L 333 70 L 315 70 L 306 79 L 268 79 L 268 132
  L 250 150 L 214 150 L 193 129 L 158 129 L 158 250 L 145 263 L 115 263
  L 105 273 L 78 273 L 78 306 L 63 321 L 63 343 L 100 380 L 133 380
  L 133 404 L 187 404 L 202 389 L 239 389 L 259 409 L 245 423 L 265 443
  L 300 443 L 318 461 L 345 461 L 368 484 L 344 508 L 364 528 L 396 528
  L 411 560 Z`;

/* ── 2. CONFIG ────────────────────────────────
   Tweak these values to change dot density
   and the display scale.                       */
const GRID_STEP  = 20;   /* px between dot sample points (SVG coords)  */
const SCALE      = 0.7; /* shrink factor: 967×1000 → ~677×700 px      */

/* ── 3. BUILD AN OFFSCREEN SVG FOR HIT-TESTING ──
   The browser's isPointInFill() tells us whether
   a coordinate lies inside the path polygon.   */
function buildHitTester() {
  /* Create a hidden <svg> that is never added to the DOM */
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width',  '967');
  svg.setAttribute('height', '1000');
  svg.style.position = 'absolute';
  svg.style.visibility = 'hidden';
  document.body.appendChild(svg);   /* must be in DOM for isPointInFill */

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', PATH_D);
  svg.appendChild(path);

  return { svg, path };
}

/* ── 4. GENERATE DOTS ────────────────────────
   Walk a grid over the SVG bounding box.
   For each grid point that falls inside the
   path, create a <div class="dot">.           */
function generateDots(canvas) {
  const { svg, path } = buildHitTester();
  const pt = svg.createSVGPoint(); /* reusable point for hit-testing */

  /* SVG viewBox extents */
  const viewW = 967;
  const viewH = 1000;

  /* Set the canvas size to match the scaled viewBox */
  canvas.style.width  = (viewW * SCALE) + 'px';
  canvas.style.height = (viewH * SCALE) + 'px';

  const dots = [];

  /* Iterate over every grid cell in SVG coordinates */
  for (let y = 0; y <= viewH; y += GRID_STEP) {
    for (let x = 0; x <= viewW; x += GRID_STEP) {

      /* Test whether this point is inside the shape */
      pt.x = x;
      pt.y = y;
      if (!path.isPointInFill(pt)) continue; /* skip points outside */

      /* Convert SVG coords → scaled screen coords */
      const left = x * SCALE;
      const top  = y * SCALE;

      /* Create the dot element */
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.left = left + 'px';
      dot.style.top  = top  + 'px';

      /* Store the original SVG coordinates as data attributes
         so click handlers can read them                      */
      dot.dataset.svgX = x;
      dot.dataset.svgY = y;

      canvas.appendChild(dot);
      dots.push(dot);
    }
  }

  /* Clean up the offscreen SVG */
  document.body.removeChild(svg);

  return dots;
}

/* ── 5. PLACEHOLDER CLICK HANDLER ───────────
   Replace the body of this function with any
   real logic you need (e.g. open a panel,
   fetch data, highlight a region, etc.).      */
function onDotClick(dot, tooltip) {
  const x = dot.dataset.svgX;
  const y = dot.dataset.svgY;

  /* Briefly apply the .active class for visual feedback */
  dot.classList.add('active');
  setTimeout(() => dot.classList.remove('active'), 600);

  /* Show a tooltip with the dot's coordinates */
  tooltip.textContent = `coords: (${x}, ${y})  — placeholder action`;
  tooltip.dataset.visible = 'true';

  /* Hide the tooltip after 2 s */
  clearTimeout(tooltip._hideTimer);
  tooltip._hideTimer = setTimeout(() => {
    tooltip.dataset.visible = 'false';
  }, 2000);

  /* ── PLACEHOLDER: add your real logic here ── */
  console.log(`Dot clicked at SVG (${x}, ${y})`);
}

/* ── 6. COLOUR CYCLING ON HOVER ──────────────
   Each dot is assigned a subtle hue offset so
   the map looks like it glows from within when
   you sweep the cursor across it.             */
function assignHueVariants(dots) {
  /* Hue palette: cool blues → teals, cycling across the shape */
  const hues = [35, 40, 45, 50, 38, 42];
  dots.forEach((dot, i) => {
    const h = hues[i % hues.length];
    /* Slightly vary the resting colour — keeps it natural */
    dot.style.background = `hsl(150, 55%, ${h}%)`;
  });
}

/* ── 7. INIT ─────────────────────────────────
   Entry point — runs when the DOM is ready.  */
document.addEventListener('DOMContentLoaded', () => {
  const canvas  = document.getElementById('map-canvas');
  const tooltip = document.getElementById('tooltip');

  /* Generate and place all dots */
  const dots = generateDots(canvas);

  /* Apply per-dot colour variants */
  assignHueVariants(dots);

  /* Attach click listener to the canvas (event delegation —
     one listener handles all dots efficiently)             */
  canvas.addEventListener('click', (e) => {
    const dot = e.target.closest('.dot');
    if (dot) onDotClick(dot, tooltip);
  });
});
