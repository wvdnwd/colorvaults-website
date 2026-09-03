// High-performance canvas confetti celebration effect

export function fireConfetti() {
  if (typeof window ==='undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position ='fixed';
  canvas.style.top ='0';
  canvas.style.left ='0';
  canvas.style.width ='100vw';
  canvas.style.height ='100vh';
  canvas.style.pointerEvents ='none';
  canvas.style.zIndex ='999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = ['#FF3B30','#FF9500','#FFCC00','#34C759','#00C7BE','#007AFF','#AF52DE','#FF2D55','#F59E0B','#EC4899'];
  const particles: Array<{
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    vx: number;
    vy: number;
    rotation: number;
    vRot: number;
    alpha: number;
  }> = [];

  const count = 120;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: width / 2 + (Math.random() - 0.5) * 200,
      y: height / 2 + (Math.random() - 0.5) * 100,
      w: Math.random() * 10 + 6,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 16 - 4,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      alpha: 1,
    });
  }

  const startTime = Date.now();
  const duration = 2800; // 2.8 seconds

  function render() {
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      if (canvas.parentNode) document.body.removeChild(canvas);
      return;
    }

    ctx?.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.vRot;
      p.alpha = Math.max(0, 1 - elapsed / duration);

      ctx!.save();
      ctx!.globalAlpha = p.alpha;
      ctx!.translate(p.x, p.y);
      ctx!.rotate((p.rotation * Math.PI) / 180);
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx!.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}
