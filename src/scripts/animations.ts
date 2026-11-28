import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let navAnimated = false;

export function initAnimations() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return;

  // Clean up previous ScrollTriggers on View Transition navigation
  ScrollTrigger.getAll().forEach((st) => st.kill());

  // 1. Initial Navbar entrance (once, since #Nav uses transition:persist)
  if (!navAnimated) {
    navAnimated = true;
    const navEl = document.getElementById('Nav');
    if (navEl) {
      gsap.from(navEl, {
        y: -14,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }
  }

  // 2. Hero staggered entrance + ScrollTrigger parallax
  const heroItems = document.querySelectorAll('[data-hero-item]');
  if (heroItems.length > 0) {
    gsap.from(heroItems, {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    });
  }

  const hero = document.getElementById('Hero');
  const heroImg = document.getElementById('hero-parallax-img');
  const heroContent = document.getElementById('hero-content');

  if (hero && heroImg) {
    gsap.fromTo(
      heroImg,
      { yPercent: 0, scale: 1 },
      {
        yPercent: 8,
        scale: 1.14,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }

  if (hero && heroContent) {
    gsap.fromTo(
      heroContent,
      { y: 0, opacity: 1 },
      {
        y: -28,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }

  // 3. Inner page header entrance
  const pageHeaders = document.querySelectorAll('[data-page-header]');
  pageHeaders.forEach((el) => {
    gsap.from(el.children, {
      y: 22,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    });
  });

  // 4. Staggered groups on scroll
  document.querySelectorAll('[data-gsap-stagger]').forEach((group) => {
    if (group.children.length === 0) return;
    gsap.from(group.children, {
      y: 26,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: group,
        start: 'top 86%',
        once: true,
      },
    });
  });

  // 5. Generic scroll-linked parallax images ([data-parallax-img])
  document.querySelectorAll('[data-parallax-img]').forEach((img) => {
    const container = img.closest('section') || img.parentElement;
    if (!container) return;
    gsap.fromTo(
      img,
      { yPercent: -10, scale: 1.15 },
      {
        yPercent: 10,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });

  // 6. Individual .reveal elements on scroll
  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  ScrollTrigger.refresh();
}
