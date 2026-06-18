const canvas = document.getElementById("balloonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balloons = [];
const colors = ["#ff4757", "#2ed573", "#1e90ff", "#ffa502", "#9b59b6", "#e84393"];

class Balloon {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.radius = Math.random() * 20 + 25;
        this.speed = Math.random() * 1.5 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.sway = Math.random() * 2;
        this.swaySpeed = Math.random() * 0.02;
        this.time = Math.random() * 100;
    }

    update() {
        this.y -= this.speed;
        this.time += this.swaySpeed;
        this.x += Math.sin(this.time) * 0.5;

        // Reset balloon if it floats off screen
        if (this.y < -this.radius * 2) {
            this.y = canvas.height + this.radius * 2;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius * 0.85, this.radius, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        // Draw string
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.radius);
        ctx.lineTo(this.x + Math.sin(this.time * 2) * 5, this.y + this.radius + 30);
        ctx.strokeStyle = "#c5c6c7";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
}

// Generate initial balloons
for (let i = 0; i < 15; i++) {
    balloons.push(new Balloon());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balloons.forEach(b => {
        b.update();
        b.draw();
    });
    requestAnimationFrame(animate);
}

// Click to pop event
canvas.addEventListener("click", (e) => {
    const clickX = e.clientX;
    const clickY = e.clientY;

    for (let i = balloons.length - 1; i >= 0; i--) {
        const b = balloons[i];
        const dist = Math.sqrt((clickX - b.x) ** 2 + (clickY - b.y) ** 2);
        
        if (dist < b.radius) {
            // Pop matching balloon
            balloons.splice(i, 1);
            // Replace popped balloon
            setTimeout(() => {
                balloons.push(new Balloon());
            }, 1000);
            break;
        }
    }
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
