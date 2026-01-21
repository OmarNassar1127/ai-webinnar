import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Particle class for managing individual particle state
class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.5; // Slow velocity
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = this.canvasWidth;
    if (this.x > this.canvasWidth) this.x = 0;
    if (this.y < 0) this.y = this.canvasHeight;
    if (this.y > this.canvasHeight) this.y = 0;
  }
}

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  const initParticles = useCallback((width, height) => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(width, height));
    }
    particlesRef.current = particles;
  }, []);

  // Draw particles and connections
  const draw = useCallback((ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;

    // Draw connecting lines between nearby particles
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.lineWidth = 1;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          // Fade line based on distance
          const opacity = (1 - distance / 150) * 0.15;
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    ctx.fillStyle = 'rgba(124, 58, 237, 0.4)';
    for (const particle of particles) {
      particle.update();
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    draw(ctx, canvas.width, canvas.height);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [draw]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });

      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }

      // Reinitialize particles on resize
      initParticles(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [initParticles]);

  // Start animation
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, animate]);

  // Gradient orb configurations
  const orbs = [
    {
      id: 1,
      size: 400,
      initialX: '10%',
      initialY: '20%',
      gradient: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
    },
    {
      id: 2,
      size: 500,
      initialX: '70%',
      initialY: '60%',
      gradient: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 70%)',
    },
    {
      id: 3,
      size: 350,
      initialX: '40%',
      initialY: '80%',
      gradient: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 70%)',
    },
    {
      id: 4,
      size: 450,
      initialX: '85%',
      initialY: '15%',
      gradient: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 70%)',
    },
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {/* Base dark background */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.initialX,
            top: orb.initialY,
            background: orb.gradient,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 20 + orb.id * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Canvas for particles and connections */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Subtle vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2, 6, 23, 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
