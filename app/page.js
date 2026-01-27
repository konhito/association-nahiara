"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { Download, Mail, MessageCircle, Globe, BookOpen, ArrowRight, X, MapPin, Phone, Building2, Users, Heart, Sparkles, Award, Shield } from "lucide-react";
import { useTranslation, locales, defaultLocale, changeLanguage } from "../lib/useTranslation";
import { detectLocationFromIP } from "../lib/geolocation";

// Country to locale mapping
const countryToLocale = {
  // English-speaking countries
  'US': 'en', 'GB': 'en', 'AU': 'en', 'NZ': 'en', 'CA': 'en', 'IE': 'en',
  // Spanish-speaking countries
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es', 'VE': 'es',
  'CL': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es',
  'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 'CR': 'es', 'PA': 'es',
  'UY': 'es', 'PR': 'es',
  // French-speaking countries
  'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'LU': 'fr', 'MC': 'fr',
  'SN': 'fr', 'CI': 'fr', 'ML': 'fr', 'BF': 'fr', 'NE': 'fr',
  'TG': 'fr', 'BJ': 'fr', 'GA': 'fr', 'CG': 'fr', 'CD': 'fr',
  'MG': 'fr', 'CM': 'fr', 'DJ': 'fr', 'KM': 'fr', 'MU': 'fr',
  'SC': 'fr', 'HT': 'fr', 'RW': 'fr', 'BI': 'fr',
  // German-speaking countries
  'DE': 'de', 'AT': 'de', 'LI': 'de',
  // Chinese-speaking regions
  'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'MO': 'zh', 'SG': 'zh',
};

// Global flag to prevent multiple 3D logo instances
let logoInstanceCount = 0;

// 3D Logo Component
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
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");

        if (!canvasRef.current || isLoadedRef.current || logoInstanceCount > 0) return;
        isLoadedRef.current = true;
        logoInstanceCount++;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = null; // Transparent background

        const camera = new THREE.PerspectiveCamera(
          60,
          canvasRef.current.clientWidth / canvasRef.current.clientHeight,
          0.1,
          1000
        );

        const renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true 
        });
        renderer.setSize(
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
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
            const distance = (desiredSize * 0.5) / Math.tan(fov / 2) * 1.3;
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
          }
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
    <div className="w-48 h-48 mx-auto relative" style={{ minHeight: '192px' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      <div 
        ref={canvasRef} 
        className={`w-full h-full transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}

// Language Switcher Component
function LanguageSwitcher({ currentLocale }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const currentLang = languages.find(l => l.code === currentLocale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-100 transition-colors ${
                lang.code === currentLocale ? 'bg-white text-slate-700' : 'text-slate-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Landing Content Component
function LandingContent() {
  const { t, locale, isLoading } = useTranslation();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [localeReady, setLocaleReady] = useState(false);

  // Contact info
  const contactInfo = {
    email: "partnerships@asociacionnahiara.org",
    phone: "+34 625 50 18 67",
    location: "FLOR_∞ - 28.1235° N, 15.4363° W - Gran Canaria"
  };

  // Auto-detect language from IP on initial load
  useEffect(() => {
    const detectAndSetLocale = async () => {
      try {
        // Check if manual locale is already set
        const manualCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('LOCALE_MANUAL='));
        
        if (manualCookie) {
          // Respect manual selection
          setLocaleReady(true);
          return;
        }

        // Clear any existing locale cookie for fresh detection
        document.cookie = 'NEXT_LOCALE=;path=/;max-age=0;samesite=lax';

        // Detect location from IP
        const location = await detectLocationFromIP();
        
        if (location && location.country) {
          const detectedLocale = countryToLocale[location.country] || defaultLocale;
          
          // Set the locale cookie
          document.cookie = `NEXT_LOCALE=${detectedLocale};path=/;max-age=${60 * 60 * 24};samesite=lax`;
        }
      } catch (error) {
        console.error('Error detecting locale:', error);
      } finally {
        setLocaleReady(true);
      }
    };

    detectAndSetLocale();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showContactModal) {
        setShowContactModal(false);
      }
    };

    if (showContactModal) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showContactModal]);

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const subject = encodeURIComponent(contactForm.subject || t('landing.contactUs'));
      const body = encodeURIComponent(
        `${t('landing.name')}: ${contactForm.name}\n` +
        `${t('landing.email')}: ${contactForm.email}\n\n` +
        `${t('landing.message')}: ${contactForm.message}`
      );
      
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
      
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowContactModal(false);
      }, 2000);
      
      setContactForm({ name: '', email: '', message: '', subject: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
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
# ${t('landing.heroTitle')} - Press Kit
## ${t('landing.heroSubtitle')}

### Project Overview
${t('landing.description')}

### Contact
Email: ${contactInfo.email}
WhatsApp: ${contactInfo.phone}
Location: ${contactInfo.location}

### Vision
${t('landing.visionText')}
    `;
    
    const blob = new Blob([pressKitContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AquaMundi_PressKit_${locale.toUpperCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <main className="min-h-screen bg-white text-slate-900 relative" style={{ fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }} role="main">
        {/* Organic Background Pattern - decorative */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-10 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Header / Hero Section */}
        <header className="relative py-16 px-4 bg-white overflow-hidden" role="banner">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center">
              <figure className="mb-6 flex justify-center animate-fade-in" aria-label="Association Logo">
                <Logo3D key="main-logo" />
              </figure>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight animate-slide-in" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                {t('landing.heroTitle')}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-700 mb-4 font-medium animate-fade-in" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em' }} role="doc-subtitle">
                {t('landing.heroSubtitle')}
              </p>
              <p className="text-base sm:text-lg text-slate-700 mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-in" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontWeight: '400', fontStyle: 'italic' }}>
                {t('landing.heroTagline')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-scale-in">
                <a
                  href="https://www.aquamundi.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all duration-200 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em' }}
                >
                  {t('landing.explore3DArchive')}
                </a>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="px-6 py-3 border-2 border-slate-700 text-slate-700 font-semibold rounded-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em' }}
                >
                  {t('landing.contactUs')}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Book Story Section */}
        <article className="py-12 px-4 bg-white" aria-labelledby="story-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 id="story-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                {t('landing.storyBehindBook')}
              </h2>
              <div className="w-16 h-1 bg-slate-700 mx-auto" aria-hidden="true"></div>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-lg">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center max-w-3xl mx-auto mb-6" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', lineHeight: '1.7' }}>
                {t('landing.storyText')}
              </p>
              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="inline-flex items-center px-4 py-2 bg-white text-slate-700 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-shadow duration-200" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                    <Sparkles className="w-3 h-3 mr-1.5 text-slate-600" />
                    {t('landing.literarySaga')}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-white text-slate-700 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-shadow duration-200" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                    <Globe className="w-3 h-3 mr-1.5 text-slate-600" />
                    {t('landing.globalImpact')}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-white text-slate-700 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-shadow duration-200" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                    <Heart className="w-3 h-3 mr-1.5 text-indigo-600" />
                    {t('landing.flowers195')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Digital Experience Section */}
        <section className="py-12 px-4 bg-white" aria-labelledby="journey-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 id="journey-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                {t('landing.continueJourney')}
              </h2>
              <div className="w-16 h-1 bg-slate-700 mx-auto" aria-hidden="true"></div>
              <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                {t('landing.journeyText')}
              </p>
            </div>
            
            <div className="space-y-6">
              {/* 3D Archive */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Globe className="w-7 h-7 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em' }}>
                      {t('landing.interactive3DArchive')}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', lineHeight: '1.6' }}>
                      {t('landing.archiveDesc2')}
                    </p>
                    <a
                      href="https://www.aquamundi.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 text-white text-sm font-medium rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all duration-200 shadow-md hover:shadow-lg"
                      style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em', fontWeight: '600' }}
                    >
                      {t('landing.startExploring')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <BookOpen className="w-7 h-7 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em' }}>
                      {t('landing.completeSaga')}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', lineHeight: '1.6' }}>
                      {t('landing.sagaDesc')}
                    </p>
                    <button
                      onClick={() => setShowContactModal(true)}
                      className="inline-flex items-center px-5 py-2.5 border-2 border-slate-700 text-slate-700 text-sm font-medium rounded-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                      style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em', fontWeight: '600' }}
                    >
                      {t('landing.learnMore')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                {t('landing.joinGlobalCommunity')}
              </h2>
              <div className="w-24 h-1 bg-green-500 mx-auto"></div>
            </div>
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xl">
              <p className="text-lg text-slate-700 leading-relaxed text-center max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', lineHeight: '1.7' }}>
                {t('landing.communityText')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="inline-flex items-center px-5 py-2.5 bg-white text-slate-700 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  {t('landing.globalCommunity')}
                </span>
                <span className="inline-flex items-center px-5 py-2.5 bg-white text-slate-700 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                  <Award className="w-4 h-4 mr-2 text-slate-600" />
                  {t('landing.educationalImpact')}
                </span>
                <span className="inline-flex items-center px-5 py-2.5 bg-white text-slate-700 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                  <Shield className="w-4 h-4 mr-2 text-slate-600" />
                  {t('landing.conservationFocus')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Share Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('landing.shareExperience')}
            </h2>
            <div className="w-24 h-1 bg-slate-700 mx-auto mb-8"></div>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', lineHeight: '1.7' }}>
              {t('landing.shareText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContactModal(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-medium rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                {t('landing.getInTouch')}
              </button>
              <button
                onClick={handlePressKitDownload}
                className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                <Download className="mr-2 w-5 h-5" />
                {t('landing.downloadResources')}
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                {t('landing.getInTouch')}
              </h2>
              <div className="w-24 h-1 bg-green-500 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Email</h3>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate-600 hover:text-slate-700 transition-colors text-sm notranslate inline-block"
                  translate="no"
                >
                  {contactInfo.email}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-8 h-8 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>WhatsApp</h3>
                <a 
                  href={`https://wa.me/${contactInfo.phone.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-700 transition-colors text-sm notranslate inline-block"
                  translate="no"
                >
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Location</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {contactInfo.location}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Language Switcher */}
        <footer className="relative py-12 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-700 overflow-hidden" role="contentinfo">
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(51, 65, 85, 0.1) 10px, rgba(51, 65, 85, 0.1) 20px)'
            }}></div>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start">
                <p className="text-gray-300 text-sm mb-2">
                  © {new Date().getFullYear()} International Association for the Defense of Flowers
                </p>
                <p className="text-gray-400 text-xs">
                  All rights reserved.
                </p>
              </div>
              <nav aria-label="Language selection">
                <LanguageSwitcher currentLocale={locale} />
              </nav>
            </div>
          </div>
        </footer>
      </main>

        {/* Contact Modal */}
        {showContactModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowContactModal(false);
              }
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-200 animate-scale-in">
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
                <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                  {t('landing.getInTouch')}
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <p className="text-slate-600 mb-6 text-center">
                  {t('landing.responseTime')}
                </p>

                <form onSubmit={handleContactSubmit} className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4 text-center">
                    {t('landing.sendMessage')}
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        {t('landing.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder={t('landing.yourName')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('landing.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder={t('landing.yourEmail')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('landing.subject')}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder={t('landing.whatIsThisAbout')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('landing.message')} *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder={t('landing.tellUsAbout')}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting 
                        ? t('landing.openingEmail')
                        : t('landing.sendMessageBtn')
                      }
                    </button>
                  </div>
                </form>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">
                      {t('landing.or')}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center p-4 bg-white border border-slate-200 rounded-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md group"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                      <Mail className="w-6 h-6 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {t('landing.sendEmail')}
                      </h4>
                      <p className="text-sm text-slate-600 notranslate" translate="no">{contactInfo.email}</p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${contactInfo.phone.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white border border-slate-200 rounded-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md group"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                      <MessageCircle className="w-6 h-6 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {t('landing.whatsapp')}
                      </h4>
                      <p className="text-sm text-slate-600 notranslate" translate="no">{contactInfo.phone}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t('landing.emailOpened')}
              </h3>
              <p className="text-slate-600 text-sm">
                {t('landing.emailOpenedText')}
              </p>
            </div>
          </div>
        )}
    </>
  );
}

// Loading fallback component
function LandingLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-slate-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
          Loading...
        </h2>
        <p className="text-slate-600">Please wait while we prepare your experience.</p>
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
