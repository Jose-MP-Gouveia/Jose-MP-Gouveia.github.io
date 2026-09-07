const container = document.createElement("div");
container.className = "glow-cursor";

const canvas = document.createElement("canvas");
canvas.className = "glow-cursor__canvas";

container.appendChild(canvas);
document.body.appendChild(container);

const ctx = canvas.getContext("2d", { alpha: true });

if (!ctx) {
    console.warn("[WalliD GlowCursor] Canvas unavailable");
} else {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const POINT_COUNT = 30;
    const points = [];

    let mouseX = width / 2;
    let mouseY = height / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let active = false;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        points.length = 0;

        for (let i = 0; i < POINT_COUNT; i++) {
            points.push({
                x: cursorX,
                y: cursorY
            });
        }
    }

    window.addEventListener("resize", resize);

    window.addEventListener("pointermove", event => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        active = true;
    });

    function update() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        points[0].x = cursorX;
        points[0].y = cursorY;

        for (let i = 1; i < POINT_COUNT; i++) {
            const previous = points[i - 1];
            const point = points[i];
            const follow = 0.31 - (i / POINT_COUNT) * 0.11;

            point.x += (previous.x - point.x) * follow;
            point.y += (previous.y - point.y) * follow;
        }
    }

    function glow(x, y, radius, alpha) {
        const g = ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            radius
        );

        g.addColorStop(
            0,
            `rgba(255,255,255,${alpha})`
        );

        g.addColorStop(
            0.18,
            `rgba(57,197,47,${alpha * 0.58})`
        );

        g.addColorStop(
            0.45,
            `rgba(57,197,47,${alpha * 0.28})`
        );

        g.addColorStop(
            0.72,
            `rgba(112,64,232,${alpha * 0.14})`
        );

        g.addColorStop(
            1,
            "rgba(112,64,232,0)"
        );

        ctx.fillStyle = g;

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

            for (
                let i = POINT_COUNT - 1;
                i >= 0;
                i--
            ) {
                const p = points[i];

                const age =
                    i / (POINT_COUNT - 1);

                const radius =
                    20 + age * 35;

                const alpha =
                    Math.pow(
                        1 - age,
                        2.35
                    ) * 0.17;

                glow(
                    p.x,
                    p.y,
                    radius,
                    alpha
                );
            }

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

            ctx.lineWidth = 4.5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            const tail =
                points[POINT_COUNT - 1];

            const gradient =
                ctx.createLinearGradient(
                    points[0].x,
                    points[0].y,
                    tail.x,
                    tail.y
                );

            gradient.addColorStop(
                0,
                "rgba(255,255,255,.72)"
            );

            gradient.addColorStop(
                0.25,
                "rgba(57,197,47,.42)"
            );

            gradient.addColorStop(
                0.50,
                "rgba(57,197,47,.30)"
            );

            gradient.addColorStop(
                0.72,
                "rgba(112,64,232,.28)"
            );

            gradient.addColorStop(
                1,
                "rgba(112,64,232,0)"
            );

            ctx.strokeStyle = gradient;
            ctx.stroke();

            const pulse =
                1 +
                Math.sin(time * 0.004) *
                0.035;

            glow(
                cursorX,
                cursorY,
                28 * pulse,
                0.48
            );

            ctx.beginPath();

            ctx.arc(
                cursorX,
                cursorY,
                3.7,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(255,255,255,.96)";

            ctx.fill();
        }

        requestAnimationFrame(render);
    }

    resize();
    requestAnimationFrame(render);
}