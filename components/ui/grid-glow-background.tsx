'use client';

import React, { useRef, useEffect } from 'react';

interface GridGlowBackgroundProps {
  backgroundColor?: string;
  gridColor?: string;
  gridSize?: number;
  glowColors?: string[];
  glowCount?: number;
  className?: string;
}

/**
 * Animated grid with drifting radial glows on an HTML canvas.
 * Renders only the background layer (absolutely positioned); place content
 * above it with a higher z-index.
 */
export const GridGlowBackground: React.FC<GridGlowBackgroundProps> = ({
  backgroundColor = '#0a0a0f',
  gridColor = 'rgba(255, 255, 255, 0.05)',
  gridSize = 50,
  glowColors = ['#0066ff', '#5B21B6', '#1E67C6'],
  glowCount = 12,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let glows: Glow[] = [];
    let frameId: number;

    class Glow {
      x = 0;
      y = 0;
      targetX = 0;
      targetY = 0;
      radius = 0;
      speed = 0;
      color = '';
      alpha = 0;

      constructor() {
        this.x = Math.floor(Math.random() * (canvas!.width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (canvas!.height / gridSize)) * gridSize;
        this.targetX = this.x;
        this.targetY = this.y;
        this.radius = Math.random() * 90 + 50;
        this.speed = Math.random() * 0.015 + 0.008;
        this.color = glowColors[Math.floor(Math.random() * glowColors.length)];
        this.alpha = 0;
        this.setNewTarget();
      }

      setNewTarget() {
        this.targetX = Math.floor(Math.random() * (canvas!.width / gridSize)) * gridSize;
        this.targetY = Math.floor(Math.random() * (canvas!.height / gridSize)) * gridSize;
      }

      update() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;
        if (Math.abs(this.targetX - this.x) < 1 && Math.abs(this.targetY - this.y) < 1) {
          this.setNewTarget();
        }
        if (this.alpha < 1) this.alpha += 0.01;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      glows = Array.from({ length: glowCount }, () => new Glow());
    };

    const drawGrid = () => {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      if (document.hidden) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      glows.forEach((g) => {
        g.update();
        g.draw();
      });
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, [gridColor, gridSize, glowColors, glowCount]);

  return (
    <div className={className ?? 'absolute inset-0'} style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full opacity-60" />
    </div>
  );
};

export default GridGlowBackground;
