// ===== HERO CANVAS: floating shapes =====
(function () {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  const AREA = 4800;

  function resize() {
    canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  resize();
  window.addEventListener('resize', resize);

  const circleR    = Math.sqrt(AREA / Math.PI);
  const squareSide = Math.sqrt(AREA);
  const triSide    = Math.sqrt((4 * AREA) / Math.sqrt(3));

  const shapes = [
    { type: 'circle',   x: 200, y: 160, vx:  0.28, vy:  0.18, angle: 0,   va:  0.002,  alpha: 0.12 },
    { type: 'square',   x: 380, y: 280, vx: -0.22, vy:  0.25, angle: 0.3, va:  0.003,  alpha: 0.10 },
    { type: 'triangle', x: 520, y: 140, vx:  0.18, vy: -0.20, angle: 0,   va:  0.0025, alpha: 0.09 },
    { type: 'circle',   x: 620, y: 350, vx: -0.15, vy:  0.22, angle: 0,   va:  0.001,  alpha: 0.07 },
    { type: 'square',   x: 160, y: 380, vx:  0.20, vy: -0.18, angle: 1.1, va: -0.002,  alpha: 0.08 },
    { type: 'triangle', x: 720, y: 220, vx: -0.24, vy: -0.15, angle: 0.5, va:  0.002,  alpha: 0.06 },
  ];

  function drawCircle(x, y, angle, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = `rgba(26,26,26,${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, circleR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawSquare(x, y, angle, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = `rgba(26,26,26,${alpha})`;
    ctx.lineWidth = 1;
    const h = squareSide / 2;
    ctx.strokeRect(-h, -h, squareSide, squareSide);
    ctx.restore();
  }

  function drawTriangle(x, y, angle, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = `rgba(26,26,26,${alpha})`;
    ctx.lineWidth = 1;
    const h = triSide / Math.sqrt(3);
    ctx.beginPath();
    ctx.moveTo(0, -h * 2 / 3 * Math.sqrt(3));
    ctx.lineTo(-triSide / 2,  h / Math.sqrt(3) * Math.sqrt(3));
    ctx.lineTo( triSide / 2,  h / Math.sqrt(3) * Math.sqrt(3));
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function tick() {
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    shapes.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.angle += s.va;
      const pad = 80;
      if (s.x < -pad)    s.x = W + pad;
      if (s.x > W + pad) s.x = -pad;
      if (s.y < -pad)    s.y = H + pad;
      if (s.y > H + pad) s.y = -pad;

      if (s.type === 'circle')   drawCircle(s.x, s.y, s.angle, s.alpha);
      if (s.type === 'square')   drawSquare(s.x, s.y, s.angle, s.alpha);
      if (s.type === 'triangle') drawTriangle(s.x, s.y, s.angle, s.alpha);
    });

    requestAnimationFrame(tick);
  }
  tick();
})();


// ===== PLAYGROUND: interactive shapes =====
(function () {
  const pg      = document.getElementById('playground');
  const tooltip = document.getElementById('tooltip');
  const AREA    = 6000;

  const circleR    = Math.sqrt(AREA / Math.PI);
  const squareSide = Math.sqrt(AREA);
  const triSide    = Math.sqrt((4 * AREA) / Math.sqrt(3));

  const SHAPES = [
    { type: 'circle',   label: 'CIRCLE — 丸',   x: 22, y: 50, color: '#1a1a1a' },
    { type: 'square',   label: 'SQUARE — 四角',  x: 50, y: 50, color: '#1a1a1a' },
    { type: 'triangle', label: 'TRIANGLE — 三角', x: 78, y: 50, color: '#1a1a1a' },
  ];

  const NS = 'http://www.w3.org/2000/svg';

  SHAPES.forEach((s, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'shape';

    const svgSize = 180;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width',   svgSize);
    svg.setAttribute('height',  svgSize);
    svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);

    const cx = svgSize / 2;
    const cy = svgSize / 2;
    let el;

    if (s.type === 'circle') {
      el = document.createElementNS(NS, 'circle');
      el.setAttribute('cx', cx);
      el.setAttribute('cy', cy);
      el.setAttribute('r',  circleR);
    } else if (s.type === 'square') {
      el = document.createElementNS(NS, 'rect');
      el.setAttribute('x',      cx - squareSide / 2);
      el.setAttribute('y',      cy - squareSide / 2);
      el.setAttribute('width',  squareSide);
      el.setAttribute('height', squareSide);
    } else {
      const h3   = triSide * Math.sqrt(3) / 2;
      const topY = cy - h3 * 2 / 3;
      const botY = cy + h3 / 3;
      el = document.createElementNS(NS, 'polygon');
      el.setAttribute('points', `${cx},${topY} ${cx - triSide / 2},${botY} ${cx + triSide / 2},${botY}`);
    }

    el.setAttribute('fill',         'none');
    el.setAttribute('stroke',       s.color);
    el.setAttribute('stroke-width', '1.5');
    svg.appendChild(el);
    wrapper.appendChild(svg);

    wrapper.style.left    = `calc(${s.x}% - 90px)`;
    wrapper.style.top     = `calc(${s.y}% - 90px)`;
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'translateY(20px)';

    wrapper.addEventListener('mouseenter', function (e) {
      wrapper.style.transform = 'translateY(-8px) scale(1.05)';
      el.setAttribute('fill', 'rgba(26,26,26,0.05)');
      tooltip.textContent   = `${s.label} — Area: ${Math.round(AREA)}px²`;
      tooltip.style.opacity = '1';
      const rect = pg.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left + 16) + 'px';
      tooltip.style.top  = (e.clientY - rect.top  - 32) + 'px';
    });

    wrapper.addEventListener('mousemove', function (e) {
      const rect = pg.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left + 16) + 'px';
      tooltip.style.top  = (e.clientY - rect.top  - 32) + 'px';
    });

    wrapper.addEventListener('mouseleave', function () {
      wrapper.style.transform = 'translateY(0) scale(1)';
      el.setAttribute('fill', 'none');
      tooltip.style.opacity = '0';
    });

    wrapper.addEventListener('click', function () {
      wrapper.style.transition = 'transform 0.15s ease';
      wrapper.style.transform  = 'scale(0.9)';
      setTimeout(() => {
        wrapper.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
        wrapper.style.transform  = 'translateY(-12px) scale(1.08)';
        setTimeout(() => { wrapper.style.transform = 'translateY(0) scale(1)'; }, 400);
      }, 100);
    });

    pg.appendChild(wrapper);

    setTimeout(() => {
      wrapper.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)';
      wrapper.style.opacity    = '1';
      wrapper.style.transform  = 'translateY(0)';
    }, 600 + i * 200);
  });
})();


// ===== DNA CANVAS: animated helix =====
(function () {
  const canvas = document.getElementById('dna-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  resize();
  window.addEventListener('resize', resize);

  let t = 0;
  const COLORS = [
    'rgba(26,26,26,0.7)',
    'rgba(26,26,26,0.35)',
    'rgba(26,26,26,0.18)',
  ];

  function draw() {
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    const cx        = W / 2;
    const amplitude = W * 0.22;
    const freq      = 0.018;
    const speed     = 0.015;

    for (let strand = 0; strand < 3; strand++) {
      const offset = (strand / 3) * Math.PI * 2;
      ctx.beginPath();
      ctx.strokeStyle = COLORS[strand];
      ctx.lineWidth   = strand === 0 ? 1.5 : 1;

      for (let y = 0; y <= H; y += 2) {
        const x = cx + amplitude * Math.sin(freq * y + t + offset);
        y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (strand === 0) {
        for (let y = 20; y <= H; y += 40) {
          const x1 = cx + amplitude * Math.sin(freq * y + t);
          const x2 = cx + amplitude * Math.sin(freq * y + t + Math.PI);
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(26,26,26,0.08)';
          ctx.lineWidth   = 1;
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle  = 'rgba(26,26,26,0.2)';
    ctx.font       = '300 10px "EB Garamond", serif';
    ctx.textAlign  = 'center';
    ctx.fillText('JEANOME', cx, H - 20);

    t += speed;
    requestAnimationFrame(draw);
  }
  draw();
})();


// ===== SCROLL FADE IN =====
function handleFade() {
  document.querySelectorAll('.fadein').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleFade);
window.addEventListener('load',   handleFade);