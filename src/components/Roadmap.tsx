// components/Roadmap.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, CheckCircle, Rocket, Shield, Bot, Globe } from 'lucide-react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const roadmapPhases = [
  { phase: "Phase 0", title: "Foundation", description: "Branding, Community, Website", icon: <Globe className="w-8 h-8" />, status: "completed", details: "Established brand identity, built community presence, and created comprehensive documentation." },
  { phase: "Phase 1", title: "Intent Blockchain MVP", description: "Token Swaps, PoS Consensus", icon: <CheckCircle className="w-8 h-8" />, status: "in-progress", details: "Core intent-based transaction engine, basic token swapping, and Proof-of-Stake consensus." },
  { phase: "Phase 2", title: "PoU + Multi-VM Support", description: "Proof-of-Utility + EVM/WASM", icon: <Rocket className="w-8 h-8" />, status: "upcoming", details: "Proof-of-Utility consensus upgrade, EVM compatibility, and WASM virtual machine support." },
  { phase: "Phase 3", title: "ZK Privacy Layer", description: "Zero-Knowledge Privacy Implementation", icon: <Shield className="w-8 h-8" />, status: "upcoming", details: "Advanced privacy features using zero-knowledge proofs for confidential transactions." },
  { phase: "Phase 4", title: "Machine Economy", description: "AI Integration + Governance", icon: <Bot className="w-8 h-8" />, status: "future", details: "AI-powered intent optimization, autonomous agents, and decentralized governance system." }
];

const Roadmap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = sectionRef.current;
    if (!canvas || !container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.015);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 1500;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 150;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 20, 20);
    scene.add(light);

    camera.position.z = 30;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', event => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0003;
      stars.rotation.x += 0.0002;
      camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 10 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const items = gsap.utils.toArray('.timeline-item');
    items.forEach((item: any, idx) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 100 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          delay: idx * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.to(item, {
        y: '+=10',
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'sine.inOut',
      });
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-500 to-emerald-400';
      case 'in-progress': return 'from-blue-500 to-cyan-400';
      case 'upcoming': return 'from-purple-500 to-violet-400';
      case 'future': return 'from-gray-500 to-slate-400';
      default: return 'from-gray-500 to-slate-400';
    }
  };

  const getStatusBadge = (status: string) => {
    const mapping = {
      completed: ['bg-green-500/20 text-green-400', 'Completed'],
      'in-progress': ['bg-blue-500/20 text-blue-400', 'In Progress'],
      upcoming: ['bg-purple-500/20 text-purple-400', 'Upcoming'],
      future: ['bg-gray-500/20 text-gray-400', 'Future'],
    } as const;
    const [cls, label] = mapping[status as keyof typeof mapping];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
        {label}
      </span>
    );
  };

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative overflow-hidden py-32 bg-black/50"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full min-h-[100vh] h-full z-0 pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-20">
          <div className="inline-block glass-effect p-3 rounded-xl mb-6">
            <span className="text-purple-400 font-semibold uppercase text-sm tracking-wider">
              Development Roadmap
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 gradient-text">
            Our Journey
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            The path to revolutionizing blockchain interaction through intent‑centric design
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <div className="absolute sm:left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30" />

            {roadmapPhases.map((phase, idx) => (
              <div
                key={idx}
                className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${
                  idx === roadmapPhases.length - 1 ? 'mb-32' : 'mb-16'
                } ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div
                  className={`absolute sm:left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${getStatusColor(
                    phase.status
                  )} z-10 flex items-center justify-center shadow-lg`}
                >
                  {phase.status === 'completed' && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>

                <div
                  className={`glass-effect p-6 sm:p-8 rounded-2xl ml-12 sm:ml-20 md:ml-0 w-full md:w-5/12 relative ${
                    idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 bg-gradient-to-r ${getStatusColor(phase.status)} rounded-xl`}>
                          {phase.icon}
                        </div>
                        <div>
                          <span className="block text-sm font-medium text-gray-400">{phase.phase}</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white">{phase.title}</h3>
                        </div>
                      </div>
                      {getStatusBadge(phase.status)}
                    </div>

                    <p className="text-base sm:text-lg font-medium text-gray-300">{phase.description}</p>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{phase.details}</p>
                  </div>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center relative z-10">
          <div className="glass-effect max-w-2xl mx-auto rounded-2xl p-6 sm:p-8">
            <h3 className="mb-4 text-xl sm:text-2xl font-bold text-white">Be Part of the Journey</h3>
            <p className="mb-6 text-gray-300 text-sm sm:text-base">
              Join our community and help shape the future of intent‑centric blockchain technology.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('waitlist');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glow-button rounded-xl bg-[#111827] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-white font-semibold transition-transform duration-300 hover:scale-105"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
