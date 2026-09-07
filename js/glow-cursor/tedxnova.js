const container = document.createElement("div");
container.className = "glow-cursor";

const canvas = document.createElement("canvas");
canvas.className = "glow-cursor__canvas";

container.appendChild(canvas);
document.body.appendChild(container);

const ctx = canvas.getContext("2d", {
    alpha: true
});

if (!ctx) {
    console.warn("[GlowCursor] Canvas unavailable");
} else {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const points = [];
    const POINT_COUNT = 28;

    let mouseX = width / 2;
    let mouseY = height / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    let active = false;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        points.length = 0;

        for (let i = 0; i < POINT_COUNT; i++) {
            points.push({
                x: mouseX,
                y: mouseY
            });
        }
    }

    window.addEventListener("resize", resize);

    window.addEventListener("pointermove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        active = true;
    });

    function update() {
        currentX += (mouseX - currentX) * 0.20;
        currentY += (mouseY - currentY) * 0.20;

        points[0].x = currentX;
        points[0].y = currentY;

        for (let i = 1; i < POINT_COUNT; i++) {
            const previous = points[i - 1];
            const point = points[i];

            const follow =
                0.32 - (i / POINT_COUNT) * 0.12;

            point.x +=
                (previous.x - point.x) * follow;

            point.y +=
                (previous.y - point.y) * follow;
        }
    }

    function drawGlow(x, y, radius, alpha) {

        const gradient = ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            radius
        );

        gradient.addColorStop(
            0,
            `rgba(244,242,238,${alpha})`
        );

        gradient.addColorStop(
            0.20,
            `rgba(57,197,47,${alpha * 0.65})`
        );

        gradient.addColorStop(
            0.50,
            `rgba(229,9,32,${alpha * 0.22})`
        );

        gradient.addColorStop(
            1,
            "rgba(229,9,32,0)"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    function render(time) {

        update();

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        if (active) {

            /*
             * Soft trail.
             */
            for (
                let i = POINT_COUNT - 1;
                i >= 0;
                i--
            ) {

                const point = points[i];

                const age =
                    i / (POINT_COUNT - 1);

                const radius =
                    26 + age * 34;

                const alpha =
                    Math.pow(1 - age, 2.4) * 0.20;

                drawGlow(
                    point.x,
                    point.y,
                    radius,
                    alpha
                );
            }

            /*
             * Connecting filament.
             */
            ctx.beginPath();

            ctx.moveTo(
                points[0].x,
                points[0].y
            );

            for (
                let i = 1;
                i < POINT_COUNT;
                i++
            ) {

                ctx.lineTo(
                    points[i].x,
                    points[i].y
                );
            }

            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            const lineGradient =
                ctx.createLinearGradient(
                    points[0].x,
                    points[0].y,
                    points[POINT_COUNT - 1].x,
                    points[POINT_COUNT - 1].y
                );

            lineGradient.addColorStop(
                0,
                "rgba(244,242,238,0.68)"
            );

            lineGradient.addColorStop(
                0.30,
                "rgba(57,197,47,0.34)"
            );

            lineGradient.addColorStop(
                0.65,
                "rgba(229,9,32,0.24)"
            );

            lineGradient.addColorStop(
                1,
                "rgba(229,9,32,0)"
            );

            ctx.strokeStyle = lineGradient;
            ctx.stroke();

            /*
             * Main halo.
             */
            const pulse =
                1 +
                Math.sin(time * 0.004) * 0.035;

            drawGlow(
                currentX,
                currentY,
                30 * pulse,
                0.52
            );

            /*
             * Sharp white center.
             */
            ctx.beginPath();

            ctx.arc(
                currentX,
                currentY,
                4,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(255,255,255,0.95)";

            ctx.fill();
        }

        requestAnimationFrame(render);
    }

    resize();
    requestAnimationFrame(render);
}