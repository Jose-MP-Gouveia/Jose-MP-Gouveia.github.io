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

    /*
     * Cursor aura:
     * WHITE core surrounded by ARCHIVE GREEN.
     */

    function drawCursorAura(x, y, radius, alpha) {
        const gradient = ctx.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(
            0,
            `rgba(247,239,222,${alpha})`
        );

        gradient.addColorStop(
            0.18,
            `rgba(57,197,47,${alpha * 0.70})`
        );

        gradient.addColorStop(
            0.50,
            `rgba(57,197,47,${alpha * 0.25})`
        );

        gradient.addColorStop(
            1,
            "rgba(57,197,47,0)"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    function render(time) {
        update();

        ctx.clearRect(0, 0, width, height);

        if (active) {

            /*
             * TRAILING GLOW
             */

            for (let i = POINT_COUNT - 1; i >= 0; i--) {
                const point = points[i];
                const age = i / (POINT_COUNT - 1);

                const radius = 26 + age * 34;

                const alpha =
                    Math.pow(1 - age, 2.4) * 0.20;

                const gradient = ctx.createRadialGradient(
                    point.x,
                    point.y,
                    0,
                    point.x,
                    point.y,
                    radius
                );

                /*
                 * Cursor → tail:
                 * WHITE → GREEN → ORANGE
                 */

                gradient.addColorStop(
                    0,
                    `rgba(247,239,222,${alpha})`
                );

                gradient.addColorStop(
                    0.25,
                    `rgba(57,197,47,${alpha * 0.55})`
                );

                gradient.addColorStop(
                    0.60,
                    `rgba(232,117,43,${alpha * 0.22})`
                );

                gradient.addColorStop(
                    1,
                    "rgba(232,117,43,0)"
                );

                ctx.fillStyle = gradient;

                ctx.beginPath();
                ctx.arc(
                    point.x,
                    point.y,
                    radius,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }

            /*
             * MAIN TRAIL
             *
             * points[0] = cursor
             * points[last] = tail
             *
             * Therefore the gradient is explicitly:
             *
             * WHITE → GREEN → ORANGE
             */

            ctx.beginPath();

            ctx.moveTo(
                points[0].x,
                points[0].y
            );

            for (let i = 1; i < POINT_COUNT; i++) {
                ctx.lineTo(
                    points[i].x,
                    points[i].y
                );
            }

            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            const cursor = points[0];
            const tail = points[POINT_COUNT - 1];

            const lineGradient = ctx.createLinearGradient(
                cursor.x,
                cursor.y,
                tail.x,
                tail.y
            );

            /*
             * CURSOR
             */

            lineGradient.addColorStop(
                0,
                "rgba(247,239,222,0.72)"
            );

            /*
             * ARCHIVE GREEN
             */

            lineGradient.addColorStop(
                0.25,
                "rgba(57,197,47,0.42)"
            );

            lineGradient.addColorStop(
                0.52,
                "rgba(57,197,47,0.30)"
            );

            /*
             * INNER SHIFT ORANGE
             */

            lineGradient.addColorStop(
                0.72,
                "rgba(232,117,43,0.28)"
            );

            lineGradient.addColorStop(
                1,
                "rgba(232,117,43,0)"
            );

            ctx.strokeStyle = lineGradient;
            ctx.stroke();

            /*
             * GREEN CURSOR AURA
             */

            const pulse =
                1 + Math.sin(time * 0.004) * 0.035;

            drawCursorAura(
                currentX,
                currentY,
                30 * pulse,
                0.52
            );

            /*
             * WHITE CURSOR CORE
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