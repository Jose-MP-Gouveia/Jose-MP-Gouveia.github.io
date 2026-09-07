import {
    Mesh,
    Program,
    Renderer,
    Triangle
} from "https://esm.sh/ogl";


/* =========================================
   TEDxNOVA GLOW CURSOR
   ========================================= */

const MAX_POINTS = 48;


/* =========================================
   SHADERS
   ========================================= */

const VERTEX_SHADER = `

attribute vec2 position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}

`;


const FRAGMENT_SHADER = `

precision highp float;

#define MAX_POINTS 48

uniform vec2 uResolution;
uniform vec2 uPoints[MAX_POINTS];

uniform float uPointCount;
uniform float uTime;
uniform float uFade;

uniform vec3 uColor;
uniform vec3 uSecondaryColor;

uniform float uTrailWidth;
uniform float uGlowIntensity;
uniform float uBrightness;

varying vec2 vUv;


/* -----------------------------------------
   Noise
   ----------------------------------------- */

float hash(vec2 p) {

    return fract(
        sin(
            dot(
                p,
                vec2(127.1, 311.7)
            )
        ) * 43758.5453123
    );

}


/* -----------------------------------------
   Main
   ----------------------------------------- */

void main() {

    vec2 pixel =
        gl_FragCoord.xy;


    float denominator =
        max(
            uPointCount - 1.0,
            1.0
        );


    float strongest = 0.0;
    float coreStrength = 0.0;

    vec3 colorSum =
        vec3(0.0);

    float colorWeight =
        0.0;


    for (
        int i = 0;
        i < MAX_POINTS - 1;
        i++
    ) {

        float index =
            float(i);


        float active =
            1.0 -
            step(
                uPointCount - 1.0,
                index
            );


        vec2 start =
            uPoints[i];

        vec2 end =
            uPoints[i + 1];


        vec2 segment =
            end - start;


        vec2 toPixel =
            pixel - start;


        float segmentLength =
            max(
                dot(
                    segment,
                    segment
                ),
                0.0001
            );


        float along =
            clamp(
                dot(
                    toPixel,
                    segment
                ) / segmentLength,
                0.0,
                1.0
            );


        float progress =
            clamp(
                (
                    index +
                    along
                ) / denominator,
                0.0,
                1.0
            );


        /*
         * Trail becomes thinner
         * towards the tail.
         */

        float life =
            pow(
                max(
                    1.0 - progress,
                    0.0
                ),
                0.9
            );


        float width =
            uTrailWidth *
            mix(
                1.0,
                0.18,
                progress
            );


        float distanceToTrail =
            length(
                toPixel -
                segment * along
            );


        float glowRadius =
            width * 3.0;


        float beam =
            min(
                1.0,
                (
                    glowRadius *
                    glowRadius
                ) /
                (
                    distanceToTrail *
                    distanceToTrail +
                    glowRadius *
                    glowRadius
                )
            );


        float core =
            exp(
                -pow(
                    distanceToTrail /
                    max(width, 0.5),
                    2.0
                ) * 2.5
            );


        float intensity =
            (
                core +
                beam *
                uGlowIntensity *
                0.55
            ) *
            life *
            active;


        /*
         * TEDx red gradually becomes white.
         */

        vec3 segmentColor =
            mix(
                uColor,
                uSecondaryColor,
                progress
            );


        strongest =
            max(
                strongest,
                intensity
            );


        coreStrength =
            max(
                coreStrength,
                core *
                life *
                active
            );


        colorSum +=
            segmentColor *
            intensity;


        colorWeight +=
            intensity;

    }


    if (
        strongest < 0.0005
    ) {
        discard;
    }


    vec3 color =
        colorSum /
        max(
            colorWeight,
            0.0001
        );


    /*
     * Hot white centre.
     */

    color =
        mix(
            color,
            vec3(1.0),
            smoothstep(
                0.2,
                0.9,
                coreStrength
            ) * 0.45
        );


    /*
     * Very subtle movement noise.
     */

    float noise =
        hash(
            floor(pixel * 0.25) +
            floor(uTime * 18.0)
        ) *
        0.04;


    float brightness =
        strongest *
        uBrightness;


    brightness *=
        1.0 +
        noise;


    float alpha =
        clamp(
            strongest *
            uFade,
            0.0,
            1.0
        );


    gl_FragColor =
        vec4(
            color *
            brightness,
            alpha
        );

}

`;


/* =========================================
   SETUP
   ========================================= */

const canvas =
    document.createElement("canvas");

canvas.className =
    "glow-cursor__canvas";


const cursorLayer =
    document.createElement("div");

cursorLayer.className =
    "glow-cursor";


cursorLayer.appendChild(
    canvas
);


document.body.appendChild(
    cursorLayer
);


/* =========================================
   WEBGL
   ========================================= */

const renderer =
    new Renderer({

        canvas,

        alpha: true,

        dpr: Math.min(
            window.devicePixelRatio || 1,
            1.5
        )

    });


const gl =
    renderer.gl;


gl.clearColor(
    0,
    0,
    0,
    0
);


/* =========================================
   POINT DATA
   ========================================= */

const pointData =
    new Float32Array(
        MAX_POINTS * 2
    );


const points =
    Array.from(
        {
            length: MAX_POINTS
        },
        () => ({
            x: 0,
            y: 0
        })
    );


const target = {
    x: 0,
    y: 0
};


const head = {
    x: 0,
    y: 0
};


/* =========================================
   PROGRAM
   ========================================= */

const program =
    new Program(
        gl,
        {

            vertex:
                VERTEX_SHADER,

            fragment:
                FRAGMENT_SHADER,

            uniforms: {

                uResolution: {
                    value: [
                        1,
                        1
                    ]
                },

                uPoints: {
                    value:
                        pointData
                },

                uPointCount: {
                    value:
                        MAX_POINTS
                },

                /*
                 * TEDx red.
                 */

                uColor: {
                    value: [
                        0.898,
                        0.035,
                        0.125
                    ]
                },

                /*
                 * White.
                 */

                uSecondaryColor: {
                    value: [
                        1.0,
                        1.0,
                        1.0
                    ]
                },

                uTrailWidth: {
                    value: 6.0
                },

                uGlowIntensity: {
                    value: 1.7
                },

                uBrightness: {
                    value: 1.15
                },

                uTime: {
                    value: 0
                },

                uFade: {
                    value: 0
                }

            },

            transparent: true,

            depthTest: false,

            depthWrite: false

        }
    );


const mesh =
    new Mesh(
        gl,
        {
            geometry:
                new Triangle(gl),

            program
        }
    );


/* =========================================
   STATE
   ========================================= */

let width = 1;
let height = 1;

let initialized =
    false;

let pointerInside =
    false;

let fade = 0;

let lastInputTime =
    performance.now();

let lastFrameTime =
    performance.now();


/* =========================================
   RESIZE
   ========================================= */

function resize() {

    width =
        Math.max(
            window.innerWidth,
            1
        );

    height =
        Math.max(
            window.innerHeight,
            1
        );


    renderer.setSize(
        width,
        height
    );


    program
        .uniforms
        .uResolution
        .value = [
            width,
            height
        ];

}


window.addEventListener(
    "resize",
    resize
);

resize();


/* =========================================
   INITIALIZE TRAIL
   ========================================= */

function initializeTrail(
    x,
    y
) {

    target.x = x;
    target.y = y;

    head.x = x;
    head.y = y;


    for (
        const point
        of points
    ) {

        point.x = x;
        point.y = y;

    }


    initialized = true;

}


/* =========================================
   POINTER
   ========================================= */

window.addEventListener(
    "pointermove",
    event => {

        const x =
            event.clientX;

        /*
         * WebGL coordinates start
         * from the bottom.
         */

        const y =
            height -
            event.clientY;


        if (!initialized) {

            initializeTrail(
                x,
                y
            );

        }


        target.x = x;
        target.y = y;


        pointerInside =
            true;


        lastInputTime =
            performance.now();

    }
);


window.addEventListener(
    "pointerleave",
    () => {

        pointerInside =
            false;

        lastInputTime =
            performance.now();

    }
);


/* =========================================
   RENDER
   ========================================= */

function render(now) {

    const delta =
        Math.min(
            (
                now -
                lastFrameTime
            ) / 16.667,
            3
        );


    lastFrameTime =
        now;


    if (initialized) {

        /*
         * Cursor head.
         */

        head.x +=
            (
                target.x -
                head.x
            ) *
            0.18;


        head.y +=
            (
                target.y -
                head.y
            ) *
            0.18;


        points[0].x =
            head.x;

        points[0].y =
            head.y;


        /*
         * Cursor trail.
         */

        for (
            let i = 1;
            i < MAX_POINTS;
            i++
        ) {

            points[i].x +=
                (
                    points[i - 1].x -
                    points[i].x
                ) *
                0.12;


            points[i].y +=
                (
                    points[i - 1].y -
                    points[i].y
                ) *
                0.12;

        }


        for (
            let i = 0;
            i < MAX_POINTS;
            i++
        ) {

            pointData[i * 2] =
                points[i].x;


            pointData[
                i * 2 + 1
            ] =
                points[i].y;

        }

    }


    /*
     * Fade after inactivity.
     */

    const idleFor =
        now -
        lastInputTime;


    const shouldFade =
        !pointerInside ||
        idleFor > 700;


    const fadeTarget =
        initialized &&
        !shouldFade
            ? 1
            : 0;


    fade +=
        (
            fadeTarget -
            fade
        ) *
        Math.min(
            1,
            delta * 0.09
        );


    program
        .uniforms
        .uPointCount
        .value =
            MAX_POINTS;


    program
        .uniforms
        .uTime
        .value =
            now * 0.001;


    program
        .uniforms
        .uFade
        .value =
            fade;


    renderer.render({
        scene: mesh
    });


    requestAnimationFrame(
        render
    );

}


requestAnimationFrame(
    render
);