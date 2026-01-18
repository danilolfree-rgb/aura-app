<!----- Component AnimBackIndex ----->

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

// Criamos uma referência para o elemento canvas
const canvasRef = ref(null);
let animationId = null;

onMounted(() => {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        const numberOfParticles = (canvas.width * canvas.height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
        initCanvas();
        createParticles();
    };

    window.addEventListener('resize', handleResize);

    // Inicialização
    initCanvas();
    createParticles();
    animate();

    // Limpeza quando o componente for destruído.
    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
    });
});
</script>

<!-- Base to component-->
<template>
    <div class="canvas-container">
        <canvas class="anim-back" ref="canvasRef"></canvas>
        <div class="overlay-glow"></div>
    </div>
</template>

<!-- Style to canva -->
<style lang="scss" scoped>
.canvas-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: #020617;
}

.overlay-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(2, 6, 23, 0.8) 100%);
    pointer-events: none;
    backdrop-filter: blur(1.5px);
}
</style>