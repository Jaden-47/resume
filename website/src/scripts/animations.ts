import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.name-liu', { y: 60, opacity: 0, duration: 0.9 })
    .from('.name-zhen', { y: 60, opacity: 0, duration: 0.9 }, '-=0.6')
    .from('.hero-ghost', { x: -20, opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-issue', { opacity: 0, duration: 0.5 }, '-=0.6')
    .from('.hero-role', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from('.hero-companies span', { opacity: 0, y: 10, stagger: 0.1, duration: 0.4 }, '-=0.3');
}

export function initScrollAnimations() {
  // Journey: draw line on scroll
  const journeyLine = document.querySelector<SVGLineElement>('.journey-line');
  if (journeyLine) {
    const length = journeyLine.getTotalLength?.() ?? 600;
    gsap.set(journeyLine, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(journeyLine, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: '#section-02', start: 'top 70%' },
    });
  }

  // Journey nodes stagger in
  gsap.from('.journey-node', {
    scale: 0, opacity: 0, stagger: 0.2, duration: 0.5,
    scrollTrigger: { trigger: '#section-02', start: 'top 60%' },
  });

  // Experience text stagger
  gsap.from('.exp-desc', {
    opacity: 0, y: 20, stagger: 0.15, duration: 0.6,
    scrollTrigger: { trigger: '#section-03', start: 'top 70%' },
  });

  // Project cards slide in from different angles
  const cards = document.querySelectorAll<HTMLElement>('.project-card');
  const angles = [{ x: -80, y: -40, r: -5 }, { x: 80, y: -60, r: 5 }, { x: 0, y: 60, r: -3 }];
  cards.forEach((card, i) => {
    if (angles[i]) {
      gsap.from(card, {
        x: angles[i].x, y: angles[i].y, rotation: angles[i].r, opacity: 0, duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '#section-04', start: 'top 70%' },
      });
    }
  });

  // Skills constellation twinkle in
  gsap.from('.skill-node', {
    scale: 0, opacity: 0, stagger: { amount: 1, from: 'random' }, duration: 0.4,
    scrollTrigger: { trigger: '#section-05', start: 'top 70%' },
  });

  // Skills connection lines draw
  document.querySelectorAll<SVGLineElement>('.skill-line').forEach((line) => {
    const length = line.getTotalLength?.() ?? 100;
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(line, {
      strokeDashoffset: 0, duration: 0.8,
      scrollTrigger: { trigger: '#section-05', start: 'top 60%' },
    });
  });

  // Blog columns slide up staggered
  gsap.from('.blog-column', {
    opacity: 0, y: 40, stagger: 0.15, duration: 0.7,
    scrollTrigger: { trigger: '#section-06', start: 'top 70%' },
  });

  // Contact text word reveal
  gsap.from('.contact-word', {
    opacity: 0, y: 30, stagger: 0.1, duration: 0.6,
    scrollTrigger: { trigger: '#section-07', start: 'top 70%' },
  });

  gsap.from('.contact-link', {
    opacity: 0, x: -20, stagger: 0.1, duration: 0.5,
    scrollTrigger: { trigger: '#section-07', start: 'top 60%' },
  });
}
