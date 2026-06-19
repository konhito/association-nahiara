"use client";
import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Download,
  Mail,
  MessageCircle,
  ArrowRight,
  X,
  MapPin,
  Phone,
  Building2,
  Users,
  Heart,
  Sparkles,
  Award,
  Shield,
  ChevronDown,
  Flower2,
  Leaf,
  Youtube,
} from "lucide-react";
import {
  useTranslation,
  locales,
  defaultLocale,
  changeLanguage,
} from "../lib/useTranslation";
import { detectLocationFromIP } from "../lib/geolocation";

const GLSLHills = dynamic(() => import("./components/GLSLHills"), {
  ssr: false,
});

// Country to locale mapping
const countryToLocale = {
  // English-speaking countries
  US: "en",
  GB: "en",
  AU: "en",
  NZ: "en",
  CA: "en",
  IE: "en",
  // Spanish-speaking countries
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  PE: "es",
  VE: "es",
  CL: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  BO: "es",
  DO: "es",
  HN: "es",
  PY: "es",
  SV: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  UY: "es",
  PR: "es",
  // French-speaking countries
  FR: "fr",
  BE: "fr",
  CH: "fr",
  LU: "fr",
  MC: "fr",
  SN: "fr",
  CI: "fr",
  ML: "fr",
  BF: "fr",
  NE: "fr",
  TG: "fr",
  BJ: "fr",
  GA: "fr",
  CG: "fr",
  CD: "fr",
  MG: "fr",
  CM: "fr",
  DJ: "fr",
  KM: "fr",
  MU: "fr",
  SC: "fr",
  HT: "fr",
  RW: "fr",
  BI: "fr",
  // German-speaking countries
  DE: "de",
  AT: "de",
  LI: "de",

  // Italian-speaking countries
  IT: "it",
  SM: "it",
  VA: "it",
  // Chinese-speaking regions
  CN: "zh",
  TW: "zh",
  HK: "zh",
  MO: "zh",
  SG: "zh",
};

// Global flag to prevent multiple 3D logo instances
let logoInstanceCount = 0;

// ─── 3D Logo Component (UNCHANGED) ───
function Logo3D() {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const animationRef = useRef();
  const isLoadedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Prevent multiple initializations
    if (isLoadedRef.current || logoInstanceCount > 0) return;

    const load3DLogo = async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } =
          await import("three/examples/jsm/loaders/GLTFLoader.js");

        if (!canvasRef.current || isLoadedRef.current || logoInstanceCount > 0)
          return;
        isLoadedRef.current = true;
        logoInstanceCount++;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = null; // Transparent background

        const camera = new THREE.PerspectiveCamera(
          60,
          canvasRef.current.clientWidth / canvasRef.current.clientHeight,
          0.1,
          1000,
        );

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setSize(
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight,
        );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        canvasRef.current.appendChild(renderer.domElement);

        // Balanced Lighting Setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // Bright pink light
        const fillLight = new THREE.DirectionalLight(0xff6b9d, 2.0);
        fillLight.position.set(-5, 5, -5);
        scene.add(fillLight);

        // Bright purple light
        const accentLight = new THREE.DirectionalLight(0x9d4edd, 1.5);
        accentLight.position.set(0, -5, 5);
        scene.add(accentLight);

        // Bright blue light
        const rimLight = new THREE.DirectionalLight(0x4dabf7, 1.5);
        rimLight.position.set(5, 0, -5);
        scene.add(rimLight);

        // Multiple point lights for extra brightness
        const pointLight1 = new THREE.PointLight(0xff6b9d, 2.0, 15);
        pointLight1.position.set(0, 0, 3);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 10);
        pointLight2.position.set(0, 0, -2);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0x9d4edd, 1.5, 12);
        pointLight3.position.set(3, 3, 0);
        scene.add(pointLight3);

        // Load 3D logo
        const loader = new GLTFLoader();
        loader.load(
          "/logo.glb",
          (gltf) => {
            const logo = gltf.scene;

            // Center and scale the logo
            logo.updateMatrixWorld(true);
            const box = new THREE.Box3().setFromObject(logo);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const desiredSize = 2.2;

            logo.position.sub(center);

            const logoGroup = new THREE.Group();
            logoGroup.add(logo);

            const scale = desiredSize / maxDim;
            logoGroup.scale.setScalar(scale);

            // Enhance materials
            logo.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                if (child.material) {
                  child.material.metalness = 0.1;
                  child.material.roughness = 0.3;
                  child.material.envMapIntensity = 1.0;
                  if (child.material.color) {
                    child.material.color.multiplyScalar(1.5);
                  }
                  child.material.needsUpdate = true;
                }
              }
            });

            scene.add(logoGroup);

            // Position camera
            const fov = camera.fov * (Math.PI / 180);
            const distance = ((desiredSize * 0.5) / Math.tan(fov / 2)) * 1.3;
            camera.position.set(0, 0, distance);
            camera.lookAt(0, 0, 0);

            sceneRef.current = scene;
            rendererRef.current = renderer;

            setIsLoading(false);

            // Animation loop
            const animate = () => {
              animationRef.current = requestAnimationFrame(animate);
              logoGroup.rotation.y += 0.01;
              renderer.render(scene, camera);
            };
            animate();
          },
          (progress) => {
            const percentComplete = (progress.loaded / progress.total) * 100;
            setLoadingProgress(percentComplete);
          },
          (error) => {
            console.error("Error loading 3D logo:", error);
            setIsLoading(false);
          },
        );

        // Handle resize
        const handleResize = () => {
          if (!canvasRef.current) return;
          const width = canvasRef.current.clientWidth;
          const height = canvasRef.current.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
          if (canvasRef.current && renderer.domElement) {
            try {
              canvasRef.current.removeChild(renderer.domElement);
            } catch (e) {
              console.log("Canvas already cleaned up");
            }
          }
          isLoadedRef.current = false;
          logoInstanceCount = 0;
        };
      } catch (error) {
        console.error("Error loading Three.js:", error);
      }
    };

    load3DLogo();
  }, []);

  return (
    <div className="w-48 h-48 mx-auto relative" style={{ minHeight: "192px" }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

// ─── Language Switcher Component ───
function LanguageSwitcher({ currentLocale }) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
  ];

  const currentLang =
    languages.find((l) => l.code === currentLocale) || languages[0];

  return (
    <div className="relative z-[100]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm font-medium transition-all duration-300 hover:shadow-md"
        style={{ color: "var(--foreground)" }}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 glass rounded-xl shadow-xl overflow-hidden min-w-[180px] border border-white/20">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-200 text-sm ${
                lang.code === currentLocale
                  ? "bg-white/60 font-semibold"
                  : "hover:bg-white/40"
              }`}
              style={{ color: "var(--foreground)" }}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Intersection Observer Hook for scroll animations ───
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "-40px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Section Header Component (DrCode-style) ───
function SectionHeader({ eyebrow, title, subtitle, align = "center" }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal mb-14 md:mb-20 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {eyebrow && <p className="type-eyebrow mb-3 sm:mb-4">{eyebrow}</p>}
      <h2 className="type-section-title mb-4 text-[var(--foreground)]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`type-body-lg mx-auto text-[var(--muted-foreground)] ${align === "center" ? "text-center" : ""}`}
        >
          {subtitle}
        </p>
      )}
      <div className="section-divider mt-6" />
    </div>
  );
}

// ─── Navbar Component ───
function Navbar({ scrolled, onContactClick, locale, t }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      id: "story",
      label: t("landing.navStory"),
      type: "anchor",
    },
    {
      id: "journey",
      label: t("landing.navExperience"),
      type: "anchor",
    },
    {
      id: "community",
      label: t("landing.navCommunity"),
      type: "route",
      href: "/galeria-dibujos",
    },
    {
      id: "academic-alliances",
      label: t("landing.navAlliances"),
      type: "route",
      href: "/alianzas-academicas-e-institucionales",
    },
    {
      id: "archive",
      label: t("landing.navArchive"),
      type: "route",
      href: "/archive",
    },
    {
      id: "contact",
      label: t("landing.navContact"),
      type: "anchor",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "navbar-glass shadow-[0_1px_0_rgba(15,29,21,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3">
          {/* Logo / Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 min-h-[44px] rounded-lg focus:outline-none"
          >
            <img
              src="/NahiaraLogo.svg"
              alt="Nahiara Logo"
              className="w-7 h-7 object-contain"
            />
            <span
              style={{
                fontFamily: "Outfit, Inter, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.1rem, 0.8vw + 0.95rem, 1.4rem)",
                letterSpacing: "-0.03em",
                color: "var(--foreground)",
              }}
            >
              IADF
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.type === "route" ? link.href : `#${link.id}`}
                className="text-[0.9375rem] font-medium text-[var(--muted-foreground)] transition-colors duration-200 hover:text-[var(--foreground)] py-1"
                style={{ letterSpacing: "-0.01em" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-[var(--muted)]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            <button
              onClick={onContactClick}
              className="hidden md:inline-flex btn-primary"
            >
              {t("landing.contactUs")}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden navbar-glass border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.type === "route" ? link.href : `#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-[var(--foreground)] font-medium transition-colors hover:bg-[var(--muted)]"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  onContactClick();
                  setMobileOpen(false);
                }}
                className="mt-2 btn-primary w-full"
              >
                {t("landing.contactUs")}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Landing Content Component ───
function LandingContent() {
  const { t, locale, isLoading } = useTranslation();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [localeReady, setLocaleReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Contact info
  const contactInfo = {
    email: "partnerships@asociacionnahiara.org",
    phone: "+34 625 50 18 67",
    location: "FLOR_∞ - 28.1235° N, 15.4363° W\nGran Canaria",
  };

  // Mount animation
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detect for navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-detect language from IP on initial load
  useEffect(() => {
    const detectAndSetLocale = async () => {
      try {
        // Check if manual locale is already set
        const manualCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("LOCALE_MANUAL="));

        if (manualCookie) {
          // Respect manual selection
          setLocaleReady(true);
          return;
        }

        // Clear any existing locale cookie for fresh detection
        document.cookie = "NEXT_LOCALE=;path=/;max-age=0;samesite=lax";

        // Detect location from IP
        const location = await detectLocationFromIP();

        if (location && location.country) {
          const detectedLocale =
            countryToLocale[location.country] || defaultLocale;

          // Set the locale cookie
          document.cookie = `NEXT_LOCALE=${detectedLocale};path=/;max-age=${60 * 60 * 24};samesite=lax`;
        }
      } catch (error) {
        console.error("Error detecting locale:", error);
      } finally {
        setLocaleReady(true);
      }
    };

    detectAndSetLocale();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && showContactModal) {
        setShowContactModal(false);
      }
    };

    if (showContactModal) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [showContactModal]);

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject = encodeURIComponent(
        contactForm.subject || t("landing.contactUs"),
      );
      const body = encodeURIComponent(
        `${t("landing.name")}: ${contactForm.name}\n` +
          `${t("landing.email")}: ${contactForm.email}\n\n` +
          `${t("landing.message")}: ${contactForm.message}`,
      );

      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowContactModal(false);
      }, 2000);

      setContactForm({ name: "", email: "", message: "", subject: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading || !localeReady) {
    return <LandingLoading />;
  }

  const handlePressKitDownload = () => {
    const pressKitContent = `
# ${t("landing.heroTitle")} - Press Kit
## ${t("landing.heroSubtitle")}

### Project Overview
${t("landing.description")}

### Contact
Email: ${contactInfo.email}
WhatsApp: ${contactInfo.phone}
Location: ${contactInfo.location}

### Vision
${t("landing.visionText")}
    `;

    const blob = new Blob([pressKitContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AquaMundi_PressKit_${locale.toUpperCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Entrance animation helper
  const entrance = (index = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${240 + index * 100}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${240 + index * 100}ms`,
  });

  return (
    <>
      <main
        className="min-h-screen relative"
        style={{
          fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
        role="main"
      >
        {/* ─── Navbar ─── */}
        <Navbar
          scrolled={scrolled}
          onContactClick={() => setShowContactModal(true)}
          locale={locale}
          t={t}
        />


        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION — Full-screen, DrCode-style with 3D logo
        ═══════════════════════════════════════════════════════════════ */}
        <header
          className="hero-banner relative flex w-full flex-col items-center justify-center overflow-hidden"
          role="banner"
        >
          {/* Animated 3D background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.85]">
            <GLSLHills cameraZ={125} speed={0.4} planeSize={256} />
          </div>

          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 grid-pattern"
            aria-hidden="true"
          />

          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0 radial-glow-top"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="hero-content pointer-events-none relative z-10 space-y-6 px-6 text-center max-w-4xl mx-auto">
            {/* 3D Logo */}
            <figure
              className="mb-2 flex justify-center"
              style={entrance(0)}
              aria-label="Association Logo"
            >
              <Logo3D key="main-logo" />
            </figure>

            {/* Eyebrow */}
            <p className="type-eyebrow" style={entrance(1)}>
              {locale === "es"
                ? "Defensa Internacional de las Flores"
                : "International Flower Defense"}
            </p>

            {/* Main Heading */}
            <h1
              className="type-display text-[var(--foreground)]"
              style={entrance(2)}
            >
              <span className="block italic text-[0.72em] font-light leading-[1.1] text-[var(--muted-foreground)]">
                {t("landing.heroTitle")}
              </span>
              <span
                className="font-semibold gradient-text-nature"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                {t("landing.heroSubtitle")}
              </span>
            </h1>

            {/* Lede */}
            <p
              className="type-body-lg mx-auto text-[var(--muted-foreground)]"
              style={entrance(3)}
            >
              {t("landing.heroTagline")}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto pt-4"
              style={entrance(4)}
            >
              <Link href="http://aquamundi.org/" className="btn-primary">
                {t("landing.explore3DArchive")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/reloj-dia-de-todos-los-polinizadores"
                className="btn-secondary hero-event-cta"
                aria-label="Open Dia de Todos los Polinizadores clock"
              >
                <span className="hero-event-cta__icon" aria-hidden="true">
                  <Flower2 className="w-4 h-4" />
                </span>
                <span className="hero-event-cta__text">
                  Dia de Todos los Polinizadores
                </span>
              </Link>
              <button
                onClick={() => setShowContactModal(true)}
                className="btn-secondary"
              >
                {t("landing.contactUs")}
              </button>
            </div>
            <a
              href="https://www.scientix.eu/news-events/events/event?id=110402"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto mx-auto mt-4 inline-flex max-w-xl items-center justify-center text-center text-sm font-medium leading-6 text-[var(--muted-foreground)] underline decoration-[#d6b56d] underline-offset-4 transition hover:text-[var(--foreground)]"
              style={entrance(5)}
            >
              {t("landing.scientixListingLink")}
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
            style={entrance(6)}
          >
            <ChevronDown className="w-6 h-6 text-[var(--muted-foreground)]" />
          </div>
        </header>

        <section
          id="story"
          className="relative py-24 md:py-32 px-6 bg-[#f8f5f0]"
          aria-labelledby="story-heading"
        >
          {/* Subtle ornate borders */}
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1a3a2f]/30 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-px bg-[#1a3a2f]/10"
            aria-hidden="true"
          />

          <div className="relative max-w-4xl mx-auto">
            <header className="mb-16 md:mb-24 text-center">
              <Leaf
                className="w-6 h-6 text-[#9b7b3d] mx-auto mb-6 opacity-60"
                strokeWidth={1}
              />
              <span className="block text-sm uppercase tracking-[0.2em] text-[#9b7b3d] mb-4 font-medium">
                {t("landing.aboutLabel")}
              </span>
              <h2
                id="story-heading"
                className="text-4xl md:text-6xl font-normal text-[#1a3a2f] leading-tight"
                style={{
                  fontFamily:
                    'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                {t("landing.aboutTitle")}
              </h2>
              <p className="text-xl md:text-2xl text-[#2d4f40] mt-6">
                {t("landing.aboutSubtitle")}
              </p>
            </header>
            <div className="md:px-12 relative">
              <p
                className="text-lg md:text-2xl text-[#2d4f40] leading-loose mb-10"
                style={{
                  fontFamily:
                    'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                {t("landing.aboutBody1")}
              </p>
              <p
                className="text-lg md:text-2xl text-[#2d4f40] leading-loose mb-10"
                style={{
                  fontFamily:
                    'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                {t("landing.aboutBody2")}
              </p>
              <p
                className="text-lg md:text-2xl text-[#2d4f40] leading-loose"
                style={{
                  fontFamily:
                    'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                {t("landing.aboutBody3")}
              </p>
            </div>
          </div>
        </section>

        <section
          id="journey"
          className="relative py-24 md:py-32 px-6 bg-[#f4ebd9] border-b border-[#1a3a2f]/10"
          aria-labelledby="journey-heading"
        >
          <div className="relative max-w-6xl mx-auto">
            <header className="mb-20 text-center md:text-left">
              <span className="block text-sm uppercase tracking-[0.2em] text-[#9b7b3d] mb-4 font-medium">
                {t("landing.projectsLabel")}
              </span>
              <h2
                id="journey-heading"
                className="text-4xl md:text-5xl text-[#1a3a2f]"
                style={{
                  fontFamily:
                    'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                {t("landing.projectsTitle")}
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {[
                {
                  label: t("landing.project3Label"),
                  title: t("landing.project3Title"),
                  description: t("landing.project3Description"),
                  cta: t("landing.project3Cta"),
                  href: "https://www.aquamundi.org/",
                },
                {
                  label: t("landing.project5Label"),
                  title: t("landing.project5Title"),
                  description: t("landing.project5Description"),
                  cta: t("landing.project5Cta"),
                  href: "/evento-dibuja-flor",
                },
                {
                  label: t("landing.project1Label"),
                  title: t("landing.project1Title"),
                  description: t("landing.project1Description"),
                  cta: t("landing.project1Cta"),
                  href: "https://www.aquamundi.org/shop",
                },
                {
                  label: t("landing.project2Label"),
                  title: t("landing.project2Title"),
                  description: t("landing.project2Description"),
                  cta: t("landing.project2Cta"),
                  href: "https://aquamundi.org/game",
                },
                {
                  label: t("landing.project4Label"),
                  title: t("landing.project4Title"),
                  description: t("landing.project4Description"),
                  cta: t("landing.project4Cta"),
                  href: "/galeria-dibujos",
                },
                {
                  label:
                    locale === "es" ? "EVENTO CULTURAL" : "CULTURAL EVENT",
                  title: "Sant Jordi 2026",
                  description:
                    locale === "es"
                      ? "Encuentro de literatura, rosas y comunidad en Barcelona, con galeria del evento y espacio de prensa de la Asociacion Nahiara."
                      : "A Barcelona gathering for literature, roses, and community, with event photography and a press area from Nahiara Association.",
                  cta: locale === "es" ? "Ver Sant Jordi ->" : "View Sant Jordi ->",
                  href: "/sant-jordi-2026",
                },
              ].map((project) => (
                <article
                  key={project.title}
                  className="border border-[#1a3a2f]/15 bg-[#f8f5f0] p-8 md:p-10 flex flex-col justify-between min-h-[280px]"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#9b7b3d] mb-4 font-semibold">
                      {project.label}
                    </p>
                    <h3
                      className="text-2xl md:text-3xl text-[#1a3a2f] mb-4"
                      style={{
                        fontFamily:
                          'Georgia, Cambria, "Times New Roman", Times, serif',
                      }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[#3b5e4d] leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-8">
                    {project.href.startsWith("http") ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm uppercase tracking-[0.12em] font-semibold text-[#1a3a2f] hover:text-[#9b7b3d] transition-colors"
                      >
                        {project.cta}
                      </a>
                    ) : (
                      <Link
                        href={project.href}
                        className="inline-flex items-center text-sm uppercase tracking-[0.12em] font-semibold text-[#1a3a2f] hover:text-[#9b7b3d] transition-colors"
                      >
                        {project.cta}
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 border-b border-[#1a3a2f]/20 divide-y md:divide-y-0 md:divide-x divide-[#1a3a2f]/20">
              <Link
                href="/press"
                className="block p-8 hover:bg-[#1a3a2f]/5 transition-colors group"
              >
                <span className="block text-xs uppercase tracking-widest text-[#9b7b3d] mb-4">
                  {locale === "es" ? "Prensa" : "Press"}
                </span>
                <h3
                  className="text-2xl text-[#1a3a2f] mb-6"
                  style={{
                    fontFamily:
                      'Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  {t("landing.pressRoom")}
                </h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-[#3b5e4d] group-hover:text-[#1a3a2f]">
                  {locale === "es" ? "Abrir" : "Open"}{" "}
                  <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/eventos/frankfurt-buchmesse-2025"
                className="block p-8 hover:bg-[#1a3a2f]/5 transition-colors group"
              >
                <span className="block text-xs uppercase tracking-widest text-[#9b7b3d] mb-4">
                  {{
                    es: "Evento",
                    en: "Event",
                    de: "Ereignis",
                    fr: "Événement",
                  }[locale] || "Event"}
                </span>
                <h3
                  className="text-2xl text-[#1a3a2f] mb-6"
                  style={{
                    fontFamily:
                      'Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  Frankfurter Buchmesse
                </h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-[#3b5e4d] group-hover:text-[#1a3a2f]">
                  {{ es: "Oct 2025", en: "Oct 2025" }[locale] || "Oct 2025"}{" "}
                  <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/eventos/estambul-istanbul-book-fair-2025"
                className="block p-8 hover:bg-[#1a3a2f]/5 transition-colors group"
              >
                <span className="block text-xs uppercase tracking-widest text-[#9b7b3d] mb-4">
                  {{
                    es: "Evento",
                    en: "Event",
                    de: "Ereignis",
                    fr: "Événement",
                  }[locale] || "Event"}
                </span>
                <h3
                  className="text-2xl text-[#1a3a2f] mb-6"
                  style={{
                    fontFamily:
                      'Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  Feria de Estambul
                </h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-[#3b5e4d] group-hover:text-[#1a3a2f]">
                  {{ es: "Dec 2025", en: "Dec 2025" }[locale] || "Dec 2025"}{" "}
                  <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/territories"
                className="block p-8 hover:bg-[#1a3a2f]/5 transition-colors group"
              >
                <span className="block text-xs uppercase tracking-widest text-[#9b7b3d] mb-4">
                  {locale === "es" ? "Territorios" : "ITC"}
                </span>
                <h3
                  className="text-2xl text-[#1a3a2f] mb-6"
                  style={{
                    fontFamily:
                      'Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  {t("landing.territoriesTitle")}
                </h3>
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-[#3b5e4d] group-hover:text-[#1a3a2f]">
                  {locale === "es" ? "Explorar" : "Explore"}{" "}
                  <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative py-24 md:py-32 px-6 bg-[#f8f5f0]"
        >
          <div className="relative max-w-4xl mx-auto text-center">
            <Flower2
              className="w-8 h-8 text-[#9b7b3d] mx-auto mb-10 opacity-80"
              strokeWidth={1.5}
            />
            <h2
              className="text-3xl md:text-5xl text-[#1a3a2f] mb-6 leading-tight"
              style={{
                fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              }}
            >
              {t("landing.shareExperience")}
            </h2>
            <p
              className="text-lg md:text-xl text-[#3b5e4d] mb-16 max-w-2xl mx-auto"
              style={{
                fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              }}
            >
              {t("landing.shareText")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 md:mb-32">
              <button
                onClick={() => setShowContactModal(true)}
                className="px-8 py-4 bg-[#1a3a2f] text-[#f8f5f0] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#0f241d] transition-colors rounded-none"
              >
                {t("landing.getInTouch")}
              </button>
              <button
                onClick={handlePressKitDownload}
                className="px-8 py-4 bg-transparent border border-[#1a3a2f] text-[#1a3a2f] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#1a3a2f]/5 transition-colors rounded-none"
              >
                {t("landing.downloadResources")}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-left border-t border-[#1a3a2f]/20 pt-16">
              <div>
                <h4 className="text-[#9b7b3d] text-xs uppercase tracking-[0.2em] font-bold mb-4">
                  Email
                </h4>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[#1a3a2f] text-sm hover:text-[#9b7b3d] transition-colors underline decoration-[#1a3a2f]/20 underline-offset-4"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div>
                <h4 className="text-[#9b7b3d] text-xs uppercase tracking-[0.2em] font-bold mb-4">
                  WhatsApp
                </h4>
                <a
                  href={`https://wa.me/${contactInfo.phone.replace(/\s+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a3a2f] text-sm hover:text-[#9b7b3d] transition-colors underline decoration-[#1a3a2f]/20 underline-offset-4"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div>
                <h4 className="text-[#9b7b3d] text-xs uppercase tracking-[0.2em] font-bold mb-4">
                  {t("landing.pressLocation")}
                </h4>
                <p className="text-[#1a3a2f] text-sm whitespace-pre-line leading-relaxed">
                  {contactInfo.location}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FOOTER — DrCode-style minimal
        ═══════════════════════════════════════════════════════════════ */}
        <footer
          className="relative py-12 px-6 bg-[var(--ink)] text-white"
          role="contentinfo"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
            }}
          />
          <div className="relative max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start gap-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/NahiaraLogo.svg"
                    alt="Nahiara Logo"
                    className="w-6 h-6 object-contain"
                  />
                  <span
                    className="font-bold text-lg tracking-tight"
                    style={{ fontFamily: "Outfit, Inter, sans-serif" }}
                  >
                    IADF
                  </span>
                </div>
                <p className="text-white/50 text-sm max-w-xs text-center md:text-left">
                  {locale === "es"
                    ? "Asociación Internacional para la Defensa de las Flores. Donde la humanidad florece, la naturaleza renace."
                    : "International Association for the Defense of Flowers. Where humanity blooms, nature is reborn."}
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-5">
                <LanguageSwitcher currentLocale={locale} />

                {/* Social Media */}
                <div className="flex flex-col items-center md:items-end gap-1.5">
                  <div className="flex items-center gap-4">
                    {/* TikTok */}
                    <a
                      href="https://www.tiktok.com/@proveneya_and_nahiara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                    {/* X / Twitter */}
                    <a
                      href="https://x.com/NahiaraOfficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/proveneya-and-nahiara/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    {/* YouTube */}
                    <a
                      href="https://www.youtube.com/@Proveneya_and_Nahiara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                    {/* Pinterest */}
                    <a
                      href="https://es.pinterest.com/proveneyaandnahiara/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.614 0 12.017 0z" />
                      </svg>
                    </a>
                    {/* Instagram */}
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors"
                      title="URL pendiente - confirmar"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                  <span className="text-xs text-white/30 italic">
                    Próximamente contenido / Content coming soon
                  </span>
                </div>

                <div className="flex gap-6 text-sm text-white/40 mt-1">
                  <Link
                    href="/press"
                    className="hover:text-white/80 transition-colors"
                  >
                    {locale === "es" ? "Prensa" : "Press"}
                  </Link>
                  <Link
                    href="/territories"
                    className="hover:text-white/80 transition-colors"
                  >
                    {locale === "es" ? "Territorios" : "Territories"}
                  </Link>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-white/80 transition-colors"
                  >
                    {locale === "es" ? "Contacto" : "Contact"}
                  </a>
                </div>
                <p className="text-white/30 text-xs">
                  © {new Date().getFullYear()} International Association for the
                  Defense of Flowers
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ═══ Contact Modal ═══ */}
      {showContactModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowContactModal(false);
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative glass rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in border border-white/30">
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h3
                className="text-xl font-bold text-[var(--foreground)]"
                style={{ fontFamily: "Outfit, Inter, sans-serif" }}
              >
                {t("landing.getInTouch")}
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1.5 hover:bg-[var(--muted)] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-[var(--muted-foreground)] mb-6 text-center text-sm">
                {t("landing.responseTime")}
              </p>

              <form onSubmit={handleContactSubmit} className="mb-6">
                <h4
                  className="font-semibold text-[var(--foreground)] mb-4 text-center text-sm type-label"
                  style={{ textTransform: "none", letterSpacing: "0" }}
                >
                  {t("landing.sendMessage")}
                </h4>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
                    >
                      {t("landing.name")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] bg-white transition-all duration-200 text-sm"
                      placeholder={t("landing.yourName")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
                    >
                      {t("landing.email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] bg-white transition-all duration-200 text-sm"
                      placeholder={t("landing.yourEmail")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
                    >
                      {t("landing.subject")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          subject: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] bg-white transition-all duration-200 text-sm"
                      placeholder={t("landing.whatIsThisAbout")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
                    >
                      {t("landing.message")} *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] bg-white transition-all duration-200 resize-none text-sm"
                      placeholder={t("landing.tellUsAbout")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary rounded-lg"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    {isSubmitting
                      ? t("landing.openingEmail")
                      : t("landing.sendMessageBtn")}
                  </button>
                </div>
              </form>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border)]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-[var(--muted-foreground)] rounded">
                    {t("landing.or")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center p-4 glass-card rounded-xl group"
                >
                  <div className="w-11 h-11 bg-[var(--brand)]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Mail className="w-5 h-5 text-[var(--brand)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)] text-sm">
                      {t("landing.sendEmail")}
                    </h4>
                    <p
                      className="text-xs text-[var(--muted-foreground)] notranslate"
                      translate="no"
                    >
                      {contactInfo.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${contactInfo.phone.replace(/\s+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 glass-card rounded-xl group"
                >
                  <div className="w-11 h-11 bg-[var(--brand)]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <MessageCircle className="w-5 h-5 text-[var(--brand)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)] text-sm">
                      {t("landing.whatsapp")}
                    </h4>
                    <p
                      className="text-xs text-[var(--muted-foreground)] notranslate"
                      translate="no"
                    >
                      {contactInfo.phone}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative glass rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-scale-in">
            <div className="w-16 h-16 bg-[var(--brand)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[var(--brand)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              {t("landing.emailOpened")}
            </h3>
            <p className="text-[var(--muted-foreground)] text-sm">
              {t("landing.emailOpenedText")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Scroll Reveal Wrapper ───
function RevealWrap({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-30px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

// ─── Sub-components ───

function StoryCard({ children }) {
  return (
    <RevealWrap className="glass-card rounded-2xl p-8 sm:p-10 md:p-12 animate-border-glow">
      {children}
    </RevealWrap>
  );
}

function BentoCard({ children, className = "", featured = false }) {
  return (
    <RevealWrap
      className={`glass-card rounded-2xl p-7 md:p-8 relative overflow-hidden ${featured ? "border-[var(--brand)]/15" : ""} ${className}`}
    >
      {featured && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            background:
              "linear-gradient(135deg, var(--brand), transparent 60%)",
          }}
        />
      )}
      {children}
    </RevealWrap>
  );
}

function FeatureCard({ icon: Icon, label, desc, color }) {
  return (
    <RevealWrap className="glass-card rounded-2xl p-6 text-center group">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `color-mix(in srgb, ${color} 10%, transparent)` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <h3 className="type-card-title text-[var(--foreground)] mb-2 text-base">
        {label}
      </h3>
      <p className="text-sm text-[var(--muted-foreground)]">{desc}</p>
    </RevealWrap>
  );
}

function BannerCard({ children }) {
  return (
    <RevealWrap className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[var(--border)] bg-white/80 backdrop-blur-sm px-8 py-10 text-center shadow-[0_20px_60px_-40px_rgba(34,133,90,0.16)] md:px-12 md:py-12">
      <div
        className="absolute inset-0 rounded-2xl animate-border-glow pointer-events-none"
        style={{ border: "1.5px solid rgba(34,133,90,0.2)" }}
      />
      <div className="relative z-[1]">{children}</div>
    </RevealWrap>
  );
}

function ContactCard({ icon: Icon, title, value, href, external, color }) {
  const inner = (
    <RevealWrap className="glass-card rounded-2xl p-6 text-center group cursor-pointer">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `color-mix(in srgb, ${color} 10%, transparent)` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <h3 className="font-semibold text-[var(--foreground)] mb-1.5 text-sm">
        {title}
      </h3>
      <p
        className="text-[var(--muted-foreground)] text-sm notranslate leading-relaxed"
        translate="no"
        style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
      >
        {value}
      </p>
    </RevealWrap>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function PressCard({ locale }) {
  return (
    <RevealWrap>
      <Link
        href="/press"
        className="group relative block overflow-hidden rounded-2xl border border-[var(--border)] shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--ink)] via-gray-800 to-gray-900 z-10 transition-opacity group-hover:opacity-95" />
        <div className="relative z-20 p-10 sm:p-14 text-white">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform duration-500">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
          <h3 className="type-subhead text-white mb-3">
            {locale === "es" ? "Sala de Prensa" : "Press Room"}
          </h3>
          <p className="text-white/70 font-medium mb-6 max-w-md">
            {locale === "es"
              ? "Entrevista en Con Acento Planeta y contenidos"
              : "Con Acento Planeta interview and contents"}
          </p>
          <span className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
            {locale === "es" ? "Abrir Sala" : "Open Room"}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </RevealWrap>
  );
}

// Loading fallback component
function LandingLoading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <div className="text-center">
        <div
          className="w-12 h-12 border-3 border-[var(--border)] border-t-[var(--brand)] rounded-full animate-spin mx-auto mb-5"
          style={{ borderWidth: "3px" }}
        ></div>
        <h2
          className="text-lg font-semibold text-[var(--foreground)] mb-1"
          style={{ fontFamily: "Outfit, Inter, sans-serif" }}
        >
          Loading...
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          Please wait while we prepare your experience.
        </p>
      </div>
    </div>
  );
}

// Main export
export default function Home() {
  return (
    <Suspense fallback={<LandingLoading />}>
      <LandingContent />
    </Suspense>
  );
}
