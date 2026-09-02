import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

import "./section-elements.css";

const testimonialIllustration = new URL("./assets/testimonials-illustration.svg", import.meta.url).href;
const testimonialKeyboard = new URL("./assets/testimonials-keyboard.svg", import.meta.url).href;
const testimonialDots = new URL("./assets/testimonials-dots.svg", import.meta.url).href;

const triggerScrollFrames = [
  new URL("./assets/trigger-scroll-01.webp", import.meta.url).href,
  new URL("./assets/trigger-scroll-02.webp", import.meta.url).href,
  new URL("./assets/trigger-scroll-03.webp", import.meta.url).href,
  new URL("./assets/trigger-scroll-04.webp", import.meta.url).href,
  new URL("./assets/trigger-scroll-05.webp", import.meta.url).href,
];

const TRIGGER_SCROLL_STEPS = [
  { title: "Engineered from the platform up", body: "A skateboard chassis carries the battery, motors, and suspension as one sealed unit, so every panel above it is free to change." },
  { title: "Space built around you", body: "With no transmission tunnel or engine bay to route around, the cabin opens into a flat floor and room for every seat." },
  { title: "A presence that arrives first", body: "Slim matrix lighting and a closed front face signal what's underneath: no grille to feed, no combustion to cool." },
  { title: "One continuous line", body: "The roofline, glasshouse, and beltline resolve into a single silhouette, drawn without the breaks a fuel tank or exhaust would force." },
  { title: "Precision to the smallest detail", body: "Down to the wheel, every surface is finished for a platform designed once and built to carry many bodies." },
] as const;

export type SectionCompositionProps = {
  className?: string;
  style?: CSSProperties;
};

function classNames(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function GlassPill({ children }: { children: ReactNode }) {
  return (
    <span className="section-label">
      <span className="section-label__title">{children}</span>
      <span className="section-label__circle" aria-hidden="true" />
    </span>
  );
}

function SectionButton({ children = "Sign up", className = "", type = "button" }: { children?: ReactNode; className?: string; type?: "button" | "submit" }) {
  return (
    <button className={`section-button ${className}`.trim()} type={type}>
      <span className="section-button__title">{children}</span>
      <span className="section-button__circle" aria-hidden="true" />
    </button>
  );
}

/* the only section composition offered on both grounds, so it is the only one
   that takes a mode; the rest stay on the dark ground they were authored for */
export function DarkGlassButton({ className, style, mode = "dark" }: SectionCompositionProps & { mode?: "light" | "dark" }) {
  return (
    <div className={classNames("section-element section-element--glass-button", className)} data-mode={mode} style={style}>
      <SectionButton />
    </div>
  );
}

export function EditorialIntroSection({ className, style }: SectionCompositionProps) {
  return (
    <section className={classNames("section-element section-element--testimonial-intro", className)} style={style} aria-labelledby="section-testimonial-title">
      <div className="editorial-intro__graphic" aria-hidden="true">
        <img className="editorial-intro__dots" src={testimonialDots} alt="" width="368" height="368" />
        <div className="editorial-intro__device">
          <img src={testimonialIllustration} alt="" width="368" height="368" />
          <img className="editorial-intro__keyboard" src={testimonialKeyboard} alt="" width="148" height="17" />
        </div>
      </div>
      <div className="editorial-intro__copy">
        <GlassPill>Made for momentum</GlassPill>
        <h2 id="section-testimonial-title">Ideas, in motion.</h2>
        <p>A focused interface keeps every action clear and every handoff moving.</p>
      </div>
    </section>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 9.55v4.9c0 1.56 0 2.34-.3 2.94a2.75 2.75 0 0 1-1.21 1.21c-.6.3-1.38.3-2.94.3h-8.1c-1.56 0-2.34 0-2.94-.3a2.75 2.75 0 0 1-1.21-1.21c-.3-.6-.3-1.38-.3-2.94v-4.9c0-1.56 0-2.34.3-2.94A2.75 2.75 0 0 1 5.01 5.4c.6-.3 1.38-.3 2.94-.3h8.1c1.56 0 2.34 0 2.94.3a2.75 2.75 0 0 1 1.21 1.21c.3.6.3 1.38.3 2.94Z" />
      <path d="m3.55 6 6.61 5.14a3 3 0 0 0 3.68 0L20.45 6" fill="none" />
    </svg>
  );
}

export function NewsletterFooterSection({ className, style }: SectionCompositionProps) {
  const [subscribed, setSubscribed] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className={classNames("section-element section-element--newsletter-footer", className)} style={style}>
      <div className="newsletter-footer__row">
        <div className="newsletter-footer__brand">
          <span className="newsletter-footer__mark" aria-label="Section marker"><span>01</span></span>
          <p>A monthly edit of thoughtful interfaces,<br />practical patterns, and new experiments.</p>
        </div>
        <form className={`newsletter-footer__form${subscribed ? " is-success" : ""}`} aria-label="Join the monthly design notes" onSubmit={submit}>
          <EnvelopeIcon />
          <input aria-label="Email address" type="email" placeholder="Email for monthly notes" required />
          <SectionButton className="newsletter-footer__button" type="submit">{subscribed ? "You're subscribed" : "Join the list"}</SectionButton>
          <span className="newsletter-footer__ring" aria-hidden="true" />
        </form>
      </div>
      <div className="newsletter-footer__wordmark" aria-label="Stay curious">STAY CURIOUS</div>
      <div className="newsletter-footer__legal">
        <span>© 2026. Built for thoughtful work.</span>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
}

export function TriggerScrollSection({ className, style }: SectionCompositionProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let raf = 0;
    const readProgress = () => {
      raf = 0;
      const max = frame.scrollHeight - frame.clientHeight;
      const ratio = max > 0 ? frame.scrollTop / max : 0;
      const index = Math.min(TRIGGER_SCROLL_STEPS.length - 1, Math.floor(ratio * TRIGGER_SCROLL_STEPS.length));
      setActive((current) => (current === index ? current : index));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(readProgress);
    };

    frame.addEventListener("scroll", onScroll, { passive: true });
    readProgress();
    return () => {
      frame.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const step = TRIGGER_SCROLL_STEPS[active];
  const stepCount = TRIGGER_SCROLL_STEPS.length;

  return (
    <section className={classNames("section-element section-element--trigger-scroll", className)} style={style} aria-labelledby="section-trigger-scroll-title">
      <p className="trigger-scroll__sr-instructions">Scroll within this panel to step through the reveal.</p>
      <div className="trigger-scroll__frame" ref={frameRef}>
        <div className="trigger-scroll__track" style={{ "--trigger-scroll-steps": stepCount } as CSSProperties}>
          {TRIGGER_SCROLL_STEPS.map((item) => (
            <div key={item.title} className="trigger-scroll__spacer" aria-hidden="true" />
          ))}
          <div className="trigger-scroll__stage">
            <div className="trigger-scroll__images" aria-hidden="true">
              {triggerScrollFrames.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={classNames("trigger-scroll__image", index === active ? "is-active" : undefined)}
                />
              ))}
            </div>
            <div className="trigger-scroll__scrim" aria-hidden="true" />
            <div className="trigger-scroll__progress" role="presentation">
              {TRIGGER_SCROLL_STEPS.map((item, index) => (
                <span key={item.title} className={classNames("trigger-scroll__dot", index === active ? "is-active" : undefined)} />
              ))}
            </div>
            <div className="trigger-scroll__copy">
              <span className="section-label trigger-scroll__label">
                <span className="section-label__title">{`0${active + 1} / 0${stepCount}`}</span>
                <span className="section-label__circle" aria-hidden="true" />
              </span>
              <h2 id="section-trigger-scroll-title">{step.title}</h2>
              <p>{step.body}</p>
            </div>
            <span className={classNames("trigger-scroll__hint", active > 0 ? "is-hidden" : undefined)} aria-hidden="true">
              Scroll to reveal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
