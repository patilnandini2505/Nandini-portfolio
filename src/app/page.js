"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function RevealWrapper({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-[30px]");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-[30px] transition-all duration-[800ms] cubic-bezier(0.5, 0, 0, 1) motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none ${className}`}
    >
      {children}
    </div>
  );
}

function ParallaxImage({ src, alt, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.pageYOffset;
        const speed = 0.1;
        const yPos = -(scrolled * speed);
        ref.current.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      <Image src={src} alt={alt} width={800} height={1000} className="w-full h-full object-cover" />
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 bg-transparent ${scrolled || mobileMenuOpen
          ? "py-4 shadow-md backdrop-blur-[4px]"
          : "py-8"
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center relative">

          {/* Logo & Tagline Area */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-6 relative z-20">
            <div className="font-heading text-2xl font-bold uppercase tracking-[4px] text-[var(--color-brand-primary)]">
              Nandini.
            </div>
            <div className="hidden md:block w-[1px] h-6 bg-black/30"></div>
            <div className="font-body text-[10px] md:text-xs uppercase tracking-[3px] text-[var(--color-brand-secondary)]">
              AIML Engineer
            </div>

          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-20 p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className={`block h-[1px] bg-black transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`}></span>
              <span className={`block h-[1px] bg-black transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`block h-[1px] bg-black transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-5'}`}></span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-wrap justify-center gap-8 text-xs uppercase tracking-[2px] font-body text-[var(--color-brand-primary)]">
            {["About", "Archive", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group overflow-hidden"
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  {item}
                </span>
                <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[var(--color-brand-secondary)]">
                  {item}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-brand-secondary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[var(--color-brand-bg)]/95 backdrop-blur-md border-b border-black/20 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col items-center py-8 gap-6 text-sm uppercase tracking-[3px] font-body text-[var(--color-brand-primary)]">
            {["About", "Archive", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={`mobile-${item}`}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--color-brand-secondary)] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-8">
        {/* Editorial Magazine Cover Hero */}
        <section className="min-h-screen pt-40 pb-0 flex flex-col md:flex-row relative">

          <div className="w-full md:w-3/5 flex flex-col justify-center relative z-10">
            {/* Staggered Line Reveal Headline */}
            <h1 className="font-heading text-[clamp(4rem,9vw,9rem)] leading-[0.85] tracking-tight text-[var(--color-brand-secondary)] uppercase mix-blend-multiply relative z-10 hover:scale-[1.02] origin-left transition-transform duration-500 ease-out">
              <RevealWrapper className="delay-[100ms] block">
                <span className="block text-4xl md:text-[5rem] mb-2 md:mb-6 font-normal text-[var(--color-brand-primary)] tracking-[2px]">Engineer</span>
              </RevealWrapper>
              <RevealWrapper className="delay-[300ms] block">
                <span className="block italic">in the</span>
              </RevealWrapper>
              <RevealWrapper className="delay-[500ms] block">
                <span className="block font-bold">making.</span>
              </RevealWrapper>
            </h1>

            <RevealWrapper className="delay-[700ms] mt-12 max-w-xl">
              <div className="border-l-2 border-[var(--color-brand-accent-dark)] pl-6">
                <h2 className="text-3xl font-heading font-bold mb-3 text-[var(--color-brand-primary)] tracking-[1px] hover:scale-[1.02] origin-left transition-transform duration-500 ease-out">Nandini</h2>
                <p className="text-lg text-[var(--color-brand-primary)]/80 leading-relaxed font-body mt-4 hover:scale-[1.01] origin-left transition-transform duration-500 ease-out">
                  Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning, passionate about creativity, technology, product thinking and user-focused solutions.
                </p>
              </div>
            </RevealWrapper>

            <RevealWrapper className="delay-[900ms] mt-12 flex flex-wrap items-center gap-6">
              <a href="#projects" className="bg-[var(--color-brand-primary)] text-white px-8 py-4 uppercase tracking-[2px] text-xs font-bold hover:bg-[var(--color-brand-secondary)] transition-all shadow-[6px_6px_0_var(--color-brand-accent)] hover:shadow-xl hover:scale-[1.03] duration-500 ease-out">
                Resume
              </a>
              <a href="#contact" className="border border-[var(--color-brand-primary)] bg-[var(--color-brand-bg)] px-8 py-4 uppercase tracking-[2px] text-xs font-bold hover:bg-[var(--color-brand-accent)] transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-xl">
                Let's Connect
              </a>
            </RevealWrapper>
          </div>

          <div className="w-full md:w-2/5 mt-0 md:mt-8 flex justify-center items-start relative">
            <RevealWrapper className="delay-[600ms] relative w-[90%] md:w-full h-[50vh] md:h-[70vh] max-h-[800px]">
              {/* Image Placeholder */}
              <ParallaxImage
                src="/92e8f4f3-cbaa-41f3-8cf7-e7109fa836c8.png"
                alt="Nandini portrait"
                className="absolute inset-0 w-full h-full object-contain transform rotate-2 hover:scale-[1.05] transition-transform duration-500 ease-out"
              />


              {/* Top Left Star */}
              <svg className="absolute top-4 left-4 md:top-12 md:left-16 w-12 h-12 text-[var(--color-brand-secondary)] opacity-90 animate-[spin_15s_linear_infinite_reverse] z-20 drop-shadow-sm" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
              </svg>

              {/* Extra Decorative Star */}
              <svg className="absolute bottom-12 -left-4 md:-left-8 w-16 h-16 text-[var(--color-brand-primary)] opacity-80 animate-[spin_20s_linear_infinite] z-20 drop-shadow-sm" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
              </svg>

              {/* Star shape SVG */}
              <svg className="absolute top-10 -right-8 md:-right-12 w-20 h-20 text-[var(--color-brand-accent-dark)] animate-[spin_20s_linear_infinite] z-20" viewBox="0 0 100 100">
                <path fill="currentColor" d="M50 0L57.5 42.5L100 50L57.5 57.5L50 100L42.5 57.5L0 50L42.5 42.5L50 0Z" />
              </svg>
            </RevealWrapper>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="pt-[100px] pb-[40px] relative overflow-hidden">
          <RevealWrapper>
            <div className="flex flex-col md:flex-row gap-16 relative">

              {/* Large Vertical Word */}
              <div className="hidden lg:flex items-center justify-center absolute -left-12 top-0 bottom-0 pointer-events-none opacity-[0.03]">
                <span className="font-heading text-[15rem] leading-none uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>CURIOUS</span>
              </div>

              {/* Main Content */}
              <div className="w-full relative z-10">
                <h2 className="font-heading text-[clamp(2rem,3vw,3rem)] text-[var(--color-brand-secondary)] italic leading-[0.9] mb-6 lowercase mix-blend-multiply hover:scale-[1.02] origin-left transition-transform duration-500 ease-out">
                  about <span className="text-[var(--color-brand-secondary)] italic">me</span>
                </h2>

                <div className="border-t border-[var(--color-brand-primary)] pt-6 relative">
                  <p className="text-xl md:text-2xl font-medium text-[var(--color-brand-primary)] leading-relaxed font-body hover:scale-[1.01] origin-left transition-transform duration-500 ease-out">
                    I'm Nandini — a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning. I enjoy working where technology meets creativity, with interests in product management, branding, marketing, UI/UX design and business strategy.
                  </p>


                </div>
              </div>



            </div>
          </RevealWrapper>
        </section>

        {/* Archive Section */}
        <section id="archive" className="pt-[40px] pb-[50px]">
          <RevealWrapper>
            <h2 className="font-heading text-[clamp(2rem,3vw,3rem)] text-[var(--color-brand-secondary)] italic mb-16 border-b border-black/20 pb-4 lowercase hover:scale-[1.02] origin-left transition-transform duration-500 ease-out">
              The Archive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-16">
              
              <div className="flex flex-col gap-16">
                <article className="border border-[var(--color-brand-primary)] p-8 bg-[var(--color-brand-accent)] relative shadow-[10px_10px_0_var(--color-brand-secondary)] hover:scale-[1.02] hover:shadow-[15px_15px_0_var(--color-brand-secondary)] transition-all duration-500 ease-out">
                  <div className="flex justify-between text-sm uppercase tracking-[1px] mb-8 border-b border-black/20 pb-2">
                    <span>Recent</span>
                    <span>Bengaluru, Karnataka</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-4xl mb-2">
                      Software Development Intern
                    </h3>
                    <h4 className="italic text-[var(--color-brand-secondary)] mb-8 text-xl">
                      Zikrabyte Solutions
                    </h4>
                    <p className="text-lg font-body leading-relaxed mb-4">
                      Building and contributing to real-world web applications across <strong>frontend and backend development</strong>. During my internship, I have worked on projects including <strong>AgTech Ware</strong>, a shipment-tracking platform, <strong>The Simply Better</strong>, a business website, and <strong>SmartEd Labs</strong>, an English-learning platform.
                    </p>
                    <p className="text-lg font-body leading-relaxed">
                      My experience spans <strong>React.js, MERN stack development, frontend engineering, backend development, API integration, and responsive web development</strong>, giving me hands-on exposure to the complete web development lifecycle.
                    </p>
                  </div>
                </article>

                <article className="border border-[var(--color-brand-primary)] p-8 bg-white relative hover:scale-[1.02] hover:shadow-[10px_10px_0_var(--color-brand-secondary)] transition-all duration-500 ease-out">
                  <div className="flex justify-between text-sm uppercase tracking-[1px] mb-8 border-b border-black/20 pb-2">
                    <span>April 2025 – July 2025</span>
                    <span>Bengaluru, Karnataka</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-4xl mb-2">
                      Website Testing & Product Intern
                    </h3>
                    <h4 className="italic text-[var(--color-brand-secondary)] mb-8 text-xl">
                      CoSurj
                    </h4>
                    <ul className="list-square pl-6 space-y-2 text-lg">
                      <li>
                        Conducted website testing to identify UI/UX issues,
                        functional bugs, and usability improvements across web
                        applications.
                      </li>
                      <li>
                        Collaborated with the team to improve website performance
                        and enhance the overall user experience.
                      </li>
                      <li>
                        Contributed creative branding ideas, campaign concepts,
                        and feature naming to support product development.
                      </li>
                      <li>
                        Provided detailed feedback and recommendations to improve
                        website functionality, accessibility, and design
                        consistency.
                      </li>
                    </ul>
                  </div>
                </article>
              </div>

              <div className="flex flex-col gap-8">
                <article className="border border-black/20 p-8 bg-white hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out">
                  <div className="text-sm uppercase tracking-[1px] mb-6 border-b border-black/20 pb-2">
                    2023 – 2027
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl mb-2">
                      B.E. in Computer Science Engineering (AI & ML)
                    </h3>
                    <h4 className="italic text-[var(--color-brand-secondary)] mb-4">
                      RNS Institute of Technology (VTU)
                    </h4>
                    <p className="font-medium">CGPA: 8.00/10</p>
                  </div>
                </article>

                <article className="border border-black/20 p-8 bg-white hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out">
                  <div className="text-sm uppercase tracking-[1px] mb-6 border-b border-black/20 pb-2">
                    2020 – 2023
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl mb-2">
                      Pre-University Course (PCMB)
                    </h3>
                    <h4 className="italic text-[var(--color-brand-secondary)] mb-4">
                      SGN PU College
                    </h4>
                    <p className="font-medium">Percentage: 86%</p>
                  </div>
                </article>

                <article className="border border-black/20 p-8 bg-white hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out">
                  <div className="text-sm uppercase tracking-[1px] mb-6 border-b border-black/20 pb-2">
                    2018 – 2020
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl mb-2">
                      Secondary Education
                    </h3>
                    <h4 className="italic text-[var(--color-brand-secondary)] mb-4">
                      Guru Nanak Public School
                    </h4>
                    <p className="font-medium">Percentage: 70%</p>
                  </div>
                </article>
              </div>

            </div>
          </RevealWrapper>
        </section>

        {/* Publications Section */}
        <section id="publications" className="pt-[50px] pb-[50px]">
          <RevealWrapper>
            <h2 className="font-heading text-[clamp(2rem,3vw,3rem)] text-[var(--color-brand-secondary)] italic mb-16 border-b border-black/20 pb-4 lowercase hover:scale-[1.02] origin-left transition-transform duration-500 ease-out">
              Publications
            </h2>
            <div className="flex flex-col gap-16 relative w-full max-w-[1000px] mx-auto mt-12 mb-12">

              {/* Outer Wrapper for absolute elements */}
              <div className="relative w-full">



                {/* Main Card (Tilted slightly) */}
                <article className="border border-black/20 p-8 md:p-12 bg-[#F9F7F5] shadow-[12px_12px_0_var(--color-brand-secondary)] relative z-20 -rotate-1 mx-4 md:mx-0 hover:scale-[1.02] hover:-rotate-0 hover:shadow-[18px_18px_0_var(--color-brand-secondary)] transition-all duration-500 ease-out">

                  {/* Paperclip */}
                  <svg className="absolute -top-6 left-12 w-8 h-16 text-black/30 rotate-[15deg] drop-shadow-sm z-30" viewBox="0 0 24 50">
                    <path d="M12,45 C17,45 20,41 20,35 L20,15 C20,8 15,4 10,4 C5,4 0,8 0,15 L0,38 C0,42 3,45 6,45 C9,45 12,42 12,38 L12,15 C12,12 10,10 8,10 C6,10 4,12 4,15 L4,32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  {/* Stamp */}
                  <div className="absolute top-12 -right-4 md:right-8 z-30 opacity-0 transition-opacity duration-500 delay-700 [.opacity-100_&]:opacity-90 pointer-events-none">
                    <div className="border-[3px] border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] px-4 py-2 rotate-[12deg] rounded-sm font-heading font-bold text-xl md:text-2xl text-center shadow-sm mix-blend-multiply drop-shadow-sm">
                      IEEE<br />PUBLISHED
                    </div>
                  </div>

                  {/* Research Label */}
                  <div className="mb-8 opacity-0 transition-opacity duration-500 delay-300 [.opacity-100_&]:opacity-100">
                    <div className="inline-block relative">
                      <span className="font-mono text-[10px] md:text-[13px] tracking-[0.15em] font-semibold uppercase text-[var(--color-brand-secondary)] block pb-1">
                        RESEARCH / COMPUTER VISION / ENVIRONMENTAL AI
                      </span>
                      <span className="absolute -bottom-1 left-0 h-[4px] bg-[var(--color-brand-accent)] opacity-70 w-[102%] -translate-x-[1%] origin-left scale-x-0 transition-transform duration-500 delay-[600ms] ease-out [.opacity-100_&]:scale-x-100 rounded-full -rotate-[1deg]"></span>
                    </div>
                  </div>

                  <div className="text-[10px] md:text-xs tracking-widest font-mono text-black/50 mb-8 border-b border-black/10 pb-6 uppercase font-bold">
                    IEEE PUBLICATION
                  </div>

                  <div className="font-heading font-bold text-[var(--color-brand-secondary)] text-3xl mb-4">
                    IEEE
                  </div>



                  <h3 className="font-heading text-4xl md:text-5xl leading-[1.1] mb-8 text-[var(--color-brand-primary)] max-w-full md:max-w-[85%]">
                    Deep Learning Approach to Detecting Floating Plastics in Riverine Systems
                  </h3>

                  <p className="text-base md:text-lg text-[var(--color-brand-primary)] leading-relaxed font-body mb-12 max-w-full md:max-w-[90%]">
                    Published a research paper exploring a deep learning and computer vision-based approach for detecting floating plastic waste in riverine systems. The work focuses on real-time object detection and tracking to identify plastic waste from video data, with the aim of supporting automated environmental monitoring and improving the efficiency of plastic waste detection.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/10 pt-8 mt-auto">
                    {/* Abstract */}
                    <div>
                      <h4 className="font-mono text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase text-[var(--color-brand-secondary)] mb-4">Abstract</h4>
                      <p className="text-xs md:text-sm text-black/70 leading-relaxed font-body">
                        Published a research paper exploring a deep learning and computer vision-based approach for detecting floating plastic waste in riverine systems. The work focuses on real-time object detection and tracking to identify plastic waste from video data, with the aim of supporting automated environmental monitoring and improving the efficiency of plastic waste detection.
                      </p>
                    </div>
                    {/* Paper Details */}
                    <div className="border-t md:border-t-0 md:border-l border-black/10 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
                      <div>
                        <h4 className="font-mono text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase text-[var(--color-brand-secondary)] mb-4">Paper Details</h4>

                        <div className="mb-4">
                          <span className="block text-[9px] md:text-[10px] uppercase font-mono tracking-widest text-black/50 mb-1">Field</span>
                          <span className="block text-xs md:text-sm font-mono text-[var(--color-brand-primary)]">Computer Vision / Deep Learning</span>
                        </div>

                        <div className="mb-4">
                          <span className="block text-[9px] md:text-[10px] uppercase font-mono tracking-widest text-black/50 mb-1">Status</span>
                          <span className="block text-xs md:text-sm font-mono text-[var(--color-brand-primary)]">PUBLISHED</span>
                        </div>

                        <div>
                          <span className="block text-[9px] md:text-[10px] uppercase font-mono tracking-widest text-black/50 mb-1">Type</span>
                          <span className="block text-xs md:text-sm font-mono text-[var(--color-brand-primary)]">IEEE RESEARCH PAPER</span>
                        </div>
                      </div>

                      <div className="mt-8 text-right">
                        <a href="#" className="inline-block font-mono text-[10px] md:text-[11px] font-bold tracking-[0.1em] text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-accent-dark)] transition-colors border-b-2 border-transparent hover:border-[var(--color-brand-accent-dark)] pb-1 uppercase">
                          View Publication ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </article>




              </div>
            </div>
          </RevealWrapper>
        </section>

        {/* Projects Section */}
        <section id="projects" className="pt-[50px] pb-[50px]">
          <RevealWrapper>
            <h2 className="font-heading text-[clamp(2rem,3vw,3rem)] text-[var(--color-brand-secondary)] italic mb-16 border-b border-black/20 pb-4 lowercase hover:scale-[1.02] origin-left transition-transform duration-500 ease-out">
              Projects
            </h2>
            <div className="flex flex-col gap-32">

              <article className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative">
                <div className="order-2 md:order-1 relative group w-full border border-[var(--color-brand-primary)] bg-[#F9F7F5] flex flex-col gap-4 p-4 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out shadow-[8px_8px_0_var(--color-brand-secondary)]">
                  <div className="relative w-full rounded overflow-hidden border border-black/10">
                    <Image
                      src="/waste_1items_94%25_20251113_111400.jpg"
                      alt="Plastic waste detection wide view"
                      width={800}
                      height={450}
                      className="w-full h-auto object-contain filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 ease-out"
                    />
                  </div>
                  <div className="relative w-full rounded overflow-hidden border border-black/10">
                    <Image
                      src="/waste_2items_86%25_20251113_110323.jpg"
                      alt="Plastic waste detection close view"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 ease-out"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="font-heading text-4xl lg:text-5xl leading-tight mb-8 text-[var(--color-brand-secondary)]">
                    Deep Learning Approach to Detecting Floating Plastics in
                    Riverine Systems
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-lg">
                    <li>
                      Developed an AI-powered solution to detect floating
                      plastic waste in rivers through real-time video analysis.
                    </li>
                    <li>
                      Integrated object detection, object tracking, and
                      automated email alerts for efficient environmental
                      monitoring.
                    </li>
                    <li>
                      Improved the accuracy and speed of plastic waste detection
                      while reducing the need for manual monitoring.
                    </li>
                  </ul>

                </div>
              </article>

              <article className="bg-white p-12 border border-black/20 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out">
                <div>
                  <h3 className="font-heading text-4xl lg:text-5xl leading-tight mb-8 text-[var(--color-brand-secondary)]">
                    LLM-Based Research Paper Knowledge Graph Explorer
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-lg">
                    <li>
                      Designed an AI-powered platform to simplify research paper
                      exploration using Large Language Models (LLMs).
                    </li>
                    <li>
                      Developed an interactive knowledge graph to visualize
                      relationships between papers, authors, and research
                      topics.
                    </li>
                    <li>
                      Enhanced literature reviews by making research discovery
                      faster and more organized.
                    </li>
                  </ul>
                </div>
              </article>

            </div>
          </RevealWrapper>
        </section>

        {/* Skills Section */}
        <section id="skills" className="pt-[50px] pb-32">
          <RevealWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">

              <div className="hover:scale-[1.03] transition-transform duration-500 ease-out">
                <h3 className="font-heading text-3xl mb-4 text-[var(--color-brand-secondary)] border-b border-black/20 pb-2">
                  Technical
                </h3>
                <p className="text-lg">Python, Java, SQL, C programming, Next.js, JavaScript, etc.</p>
              </div>

              <div className="hover:scale-[1.03] transition-transform duration-500 ease-out">
                <h3 className="font-heading text-3xl mb-4 text-[var(--color-brand-secondary)] border-b border-black/20 pb-2">
                  Professional
                </h3>
                <p className="text-lg">
                  Canva, Figma, Branding, Communication, Teamwork
                </p>
              </div>

              <div className="hover:scale-[1.03] transition-transform duration-500 ease-out">
                <h3 className="font-heading text-3xl mb-4 text-[var(--color-brand-secondary)] border-b border-black/20 pb-2">
                  Languages
                </h3>
                <p className="text-lg">English, Kannada, Hindi</p>
              </div>

            </div>
          </RevealWrapper>
        </section>
      </main>

      <footer id="contact" className="py-32 border-t border-black/20 text-center px-8">
        <h2 className="font-heading text-6xl italic text-[var(--color-brand-secondary)] mb-8 hover:scale-[1.02] transition-transform duration-500 ease-out">
          Let's Connect
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-16 text-sm uppercase tracking-[1px]">
          <a
            href="mailto:patilnandini2505@gmail.com"
            className="hover:text-[var(--color-brand-accent-dark)] transition-colors"
          >
            patilnandini2505@gmail.com
          </a>
          <a
            href="tel:+919980532505"
            className="hover:text-[var(--color-brand-accent-dark)] transition-colors"
          >
            +91 9980532505
          </a>
          <a
            href="https://www.linkedin.com/in/nandini-patil-1b5835347"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-brand-accent-dark)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-sm text-black/60">
          Made with code, curiosity & too many browser tabs.
        </p>
      </footer>
    </>
  );
}
