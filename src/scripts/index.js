
/*
Profile photo animation
*/

const portrait = document.getElementById('portrait');
gsap.from(portrait, {
    duration: 1,
    scrollTrigger: {
        scrub: 1,
        end: '+=500',
        trigger: portrait
    },
    y: "50%"
});

/*
cr.codes title animation
 */
SplitType.create('#codes-title');
gsap.from('.char', {
    duration: 0.5,  
    stagger: 0.1,
    scale: 1.3,
    opacity: 0,
    ease: 'power2'
});

/*
Starting page rectangle generation
*/

// Rect generation
const GRID_COLS = 5;
const GRID_ROWS = 5;
const INTERCEPT_GEN_PROB = 0.7;
const MAX_GEN_ATTEMPTS = 5;
const RECT_SIZE = 48;
// Hover settings
const DIST_THRESHOLD = 100;
// Movement settings
const MAX_RADIUS = 30;
const MOVE_PXL = 5;
const MOVERECT_INTERVAL_MS = 100;
// Get title container
const titleContainer = document.getElementById('title-container');

// Get points container
const pointsContainer = document.getElementById('points-container');

// Array containing rotation animations
let rotationAnimations;
let moveAnimations;
// Array containing rects in DOM
let animationRects;
let animationRectsOrigins;

function generateAnimatedRectangles() {
    const pointsContainerBbox = pointsContainer.getBoundingClientRect();


    // Calculate width of cells
    const cellWidth = pointsContainerBbox.width / (GRID_COLS + 1);
    const cellHeight = pointsContainerBbox.height / (GRID_ROWS + 1);
    animationRectsOrigins = [];
    animationRects = [];
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const x = (col + 1) * cellWidth;
            const y = (row + 1) * cellHeight;
            if (interceptsTitleContainer(x, y) || Math.random() >= INTERCEPT_GEN_PROB) {
                continue;
            }
            let genAttempt = 0;
            while (genAttempt <= MAX_GEN_ATTEMPTS) {
                genAttempt++;
                const xMin = x - cellWidth / (2 * genAttempt);
                const xMax = x + cellWidth / (2 * genAttempt);
                const yMin = y - cellHeight / (2 * genAttempt);
                const yMax = y + cellHeight / (2 * genAttempt);
                const xRand = intBetweenInterval(xMin, xMax) - RECT_SIZE / 2;
                const yRand = intBetweenInterval(yMin, yMax) - RECT_SIZE / 2;

                if (interceptsTitleContainer(xRand, yRand)) {
                    continue;
                }

                const rect = document.createElement('div');
                rect.className = 'anim-rect';

                rect.style.left = `${xRand}px`;
                rect.style.top = `${yRand}px`;

                pointsContainer.appendChild(rect);
                animationRects.push(rect);
                animationRectsOrigins.push([xRand, yRand]);
                break
            }
        }
    }

    // Init animations
    initAnimations();
    // Spawn rects with little opacity scale animation
    moveAnimations = [];
    gsap.from('.anim-rect', {
        duration: 0.5,
        opacity: 0,
        scale: 0,
        ease: 'power2',
        stagger: 0.0
    })

}

function interceptsTitleContainer(x, y) {
    const titleContainerBbox = titleContainer.getBoundingClientRect();
    const pointsContainerBbox = pointsContainer.getBoundingClientRect();
    return interceptsElem(x, y,
        titleContainerBbox.x,
        titleContainerBbox.y + Math.abs(pointsContainerBbox.y), // st. y is now >= 0
        titleContainerBbox.right,
        titleContainerBbox.bottom + Math.abs(pointsContainerBbox.y) // st. y is now >= 0
    );
}

// Checks if (px, py) is in area (x1, y2) (x2, y2)
function interceptsElem(px, py, x1, y1, x2, y2) {
    return (
        (x1 <= px && px <= x2) &&
        (y1 <= py && py <= y2)
    );
}

function eucDist(x, y) {
 return Math.sqrt(Math.pow(x, 2), Math.pow(y, 2));
}

function intBetweenInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

generateAnimatedRectangles()

function initAnimations() {
    rotationAnimations = [];
    animationRects.forEach(rect => {
        let rotationAnimation = gsap.to(rect, {
            duration: 5,
            ease: 'none',
            rotation: 360,
            repeat: -1
        });
        rotationAnimations.push(rotationAnimation);
    });
}

// Modifies animated rects on mouse movement if clientX/Y is in pointsContainerBbox
var last_mouse_x;
var last_mouse_y;
window.addEventListener('mousemove', (e) => {
    const newX = e.clientX;
    last_mouse_x = newX;
    const newY = e.clientY;
    last_mouse_y = newY;
    const pointsContainerBbox = pointsContainer.getBoundingClientRect();
    if (document.querySelectorAll('.anim-rect').length == 0 || !interceptsElem(newX, newY, pointsContainerBbox.x, pointsContainerBbox.y, pointsContainerBbox.right, pointsContainerBbox.bottom)) {
        return;
    }
    let dists = [];
    let distMax = 0;
    let distMin = Infinity;

    let centerDists = [];
    for (let i = 0; i < animationRects.length; i++) {
        const rectBbox = animationRects[i].getBoundingClientRect();
        const xDiff = newX - rectBbox.x;
        const yDiff = newY - rectBbox.y;
        const dist = eucDist(xDiff, yDiff);
        distMax = Math.max(distMax, dist);
        distMin = Math.min(distMin, dist);
        dists.push(dist);
    }
    for (let i = 0; i < rotationAnimations.length; i++) {
        const scaler = 1 - ((dists[i] - distMin) / (distMax - distMin));
        gsap.to(rotationAnimations[i], {
            timeScale: scaler > 0.1 ? scaler * 5 : 0.1
        });
        gsap.to(animationRects[i], {
            opacity: Math.max(scaler, 0.05),
            duration: 2,
            ease: 'none'
        });
        gsap.to(animationRects[i], {
            scale: Math.max(0.2 + scaler, 1),
            duration: 5,
            ease: 'power2'
        });
    }
});

function respawnRects() {
    gsap.to('.anim-rect', {
        duration: 0.5,
        opacity: 0,
        scale: 0,
        onComplete: () => {
            document.querySelectorAll('.anim-rect').forEach(rect => rect.remove());
            generateAnimatedRectangles();
        }
    });
}

var timeout_id;
window.addEventListener('resize', () => {
    clearTimeout(timeout_id);
    timeout_id = setTimeout(respawnRects, 1000);
});

function moveRects() {
    
    if (last_mouse_x !== undefined && last_mouse_y !== undefined) {
        animationRects.forEach(rect => {
            const rect_bbox = rect.getBoundingClientRect();
            let directionVec = [last_mouse_x-rect_bbox.x,last_mouse_y-rect_bbox.y];
            const dist = eucDist(directionVec[0], directionVec[1]);
            directionVec = directionVec.map(e => e/dist);
        });
    }
}

setInterval(moveRects, MOVERECT_INTERVAL_MS);