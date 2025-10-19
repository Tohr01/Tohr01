gsap.registerPlugin(ScrollTrigger);

const skillsSection = document.getElementById("skills-sec");

/*
Down arrow button on title page onclick animation
 */

const downArrowBtn = document.getElementById("down-arrow-btn");
downArrowBtn.addEventListener("click", () => {
    gsap.to(window, {
        duration: 2,
        scrollTo: skillsSection,
        ease: "power4.out",
    });
});

/*
Profile photo animation
*/

const portrait = document.getElementById("portrait");
gsap.from(portrait, {
    duration: 1.5,
    y: "80%",
    ease: "power4.out",
});

/*
 * Social icons animation
 */
gsap.from("#social-icon", {
    duration: 1,
    scale: 1.5,
    opacity: 0,
    ease: "power4.out",
    stagger: 0.2,
});

/*
Bg-dots scroll hide
*/
const bgDots = document.getElementById("bg-dots");
gsap.to(bgDots, {
    duration: 1,
    scrollTrigger: {
        scrub: 1,
        end: "+=500",
        trigger: skillsSection,
    },
    opacity: 0,
});

gsap.from(".cover-animate", {
    scale: 1.3,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    ease: "power4.out",
});

gsap.utils.toArray(".headline-animation").forEach((el) => {
    gsap.from(el, {
        opacity: 0,
        y: "30%",
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
            once: true,
            trigger: el,
            start: "top 80%",
        },
    });
});
