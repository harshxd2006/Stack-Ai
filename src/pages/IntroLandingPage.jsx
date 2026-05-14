import React, { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion } from 'framer-motion';

const CARDS = [
  { name: 'ChatGPT', desc: 'Advanced conversational reasoning and intelligence.', color: 'bg-emerald-500/10 border-emerald-500/30', rotate: 'rotate-6' },
  { name: 'Midjourney', desc: 'Stunning generative art and visual exploration.', color: 'bg-purple-500/10 border-purple-500/30', rotate: '-rotate-3' },
  { name: 'Cursor', desc: 'The AI code editor built for modern developers.', color: 'bg-blue-500/10 border-blue-500/30', rotate: 'rotate-2' },
  { name: 'Claude', desc: 'Next-generation AI assistant with large context.', color: 'bg-orange-500/10 border-orange-500/30', rotate: '-rotate-6' },
  { name: 'Runway', desc: 'Next-generation video creation and editing.', color: 'bg-pink-500/10 border-pink-500/30', rotate: 'rotate-3' }
];

function HoloCube({ mousePos }) {
  const rotX = (mousePos.y - 50) * 0.14;
  const rotY = (mousePos.x - 50) * 0.18;
  return (
    <div style={{
      position: "absolute", left: "68%", top: "50%",
      transform: "translate(-50%, -50%) scale(1.3)",
      width: 500, height: 500,
      perspective: 1100, zIndex: 0, pointerEvents: "none",
    }}>
      {/* Outer glow rings */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: "absolute",
          inset: i * 22,
          borderRadius: "28%",
          border: `1px solid rgba(108,99,255,${0.14 - i * 0.04})`,
          animation: `ringRotate ${7 + i * 2.5}s linear ${i * 0.6}s infinite`,
        }} />
      ))}
      {/* Cube wrapper */}
      <div style={{
        position: "absolute", inset: 64,
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: "transform 0.12s ease-out",
        animation: "cubeRotate 14s ease-in-out infinite",
      }}>
        {/* FRONT — dark with stacked bar logo */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(150deg,#1c1b2e 0%,#0f0e1b 60%,#08080f 100%)",
          borderRadius: 28, border: "1px solid rgba(255,255,255,0.1)",
          transform: "translateZ(186px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-start" }}>
            {[{ w: 72, c: "#6C63FF" }, { w: 54, c: "#00D4AA" }, { w: 36, c: "#8B5CF6" }].map((b, i) => (
              <div key={i} style={{
                width: b.w, height: 9, borderRadius: 5, background: b.c,
                boxShadow: `0 0 18px ${b.c}90, 0 0 36px ${b.c}40`,
                animation: `barGlow ${2 + i * 0.35}s ease-in-out ${i * 0.12}s infinite alternate`,
              }} />
            ))}
          </div>
          {/* subtle surface highlight */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 28,
            background: "radial-gradient(circle at 28% 28%, rgba(108,99,255,0.1) 0%, transparent 55%)",
          }} />
        </div>
        {/* TOP */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg,#1a1829,#0f0e1a)",
          borderRadius: 28, border: "1px solid rgba(255,255,255,0.09)",
          transform: "rotateX(90deg) translateZ(186px)",
        }} />
        {/* RIGHT — rainbow holographic */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 28,
          transform: "rotateY(90deg) translateZ(186px)", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: 28,
            background: "linear-gradient(180deg,#ff0080,#ff4500,#ffaa00,#ffe000,#00ff88,#00eeff,#0088ff,#7700ff,#ff0080,#ff4500)",
            animation: "rainbowShift 4s linear infinite", opacity: 0.92,
          }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", borderRadius: 28 }} />
        </div>
        {/* LEFT — cooler rainbow */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 28,
          transform: "rotateY(-90deg) translateZ(186px)", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: 28,
            background: "linear-gradient(200deg,#0088ff,#00ffee,#00ff88,#7700ff,#ff0080,#0088ff)",
            animation: "rainbowShift 5.5s linear 1.2s infinite reverse", opacity: 0.75,
          }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)", borderRadius: 28 }} />
        </div>
        {/* BOTTOM — rainbow */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 28,
          transform: "rotateX(-90deg) translateZ(186px)", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: 28,
            background: "linear-gradient(90deg,#ffaa00,#ffe000,#00ff88,#0088ff,#7700ff)",
            animation: "rainbowShift 6s linear 2s infinite", opacity: 0.65,
          }} />
        </div>
        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0, background: "#06060e", borderRadius: 28,
          transform: "rotateY(180deg) translateZ(186px)",
        }} />
      </div>

      {/* Ground glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "20%", right: "20%", height: 50,
        background: "radial-gradient(ellipse, rgba(108,99,255,0.28) 0%, transparent 70%)",
        filter: "blur(18px)",
        animation: "glowPulse 3s ease-in-out infinite",
      }} />

      {/* Floating particles */}
      {[...Array(14)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: i % 3 === 0 ? 4 : 2, height: i % 3 === 0 ? 4 : 2,
          borderRadius: "50%",
          background: ["#6C63FF", "#00D4AA", "#FF6B9D", "#8B5CF6", "#FFD966", "#06B6D4", "#FF7B3D", "#22C55E"][i % 8],
          left: `${8 + (i * 6.5) % 84}%`,
          top: `${4 + (i * 9) % 92}%`,
          animation: `particleFloat ${3 + i * 0.35}s ease-in-out ${i * 0.28}s infinite`,
          boxShadow: `0 0 6px ${["#6C63FF", "#00D4AA", "#FF6B9D"][i % 3]}`,
        }} />
      ))}
    </div>
  );
}

export default function IntroLandingPage({ onComplete }) {
  const [redirecting, setRedirecting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const finishIntro = () => {
    if (redirecting) return;
    setRedirecting(true);
    localStorage.setItem('intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 800); // Wait for fade out
  };

  useEffect(() => {
    const onMouse = (e) => setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  return (
    <ReactLenis root>
      <style>{`
        @keyframes cubeRotate{
          0%  {transform:rotateX(8deg) rotateY(-18deg);}
          25% {transform:rotateX(13deg) rotateY(6deg);}
          50% {transform:rotateX(5deg) rotateY(22deg);}
          75% {transform:rotateX(11deg) rotateY(2deg);}
          100%{transform:rotateX(8deg) rotateY(-18deg);}
        }
        @keyframes rainbowShift{
          0%  {filter:hue-rotate(0deg) brightness(1);}
          50% {filter:hue-rotate(180deg) brightness(1.25);}
          100%{filter:hue-rotate(360deg) brightness(1);}
        }
        @keyframes barGlow{
          from{opacity:0.65;box-shadow:0 0 8px currentColor;}
          to  {opacity:1;box-shadow:0 0 28px currentColor,0 0 55px currentColor;}
        }
        @keyframes ringRotate{
          from{transform:rotate(0deg);}
          to  {transform:rotate(360deg);}
        }
        @keyframes particleFloat{
          0%,100%{transform:translateY(0) translateX(0) scale(1);opacity:0.35;}
          33%{transform:translateY(-22px) translateX(10px) scale(1.6);opacity:1;}
          66%{transform:translateY(10px) translateX(-8px) scale(0.75);opacity:0.5;}
        }
        @keyframes glowPulse{
          0%,100%{opacity:0.45;transform:scaleX(1);}
          50%{opacity:1;transform:scaleX(1.25);}
        }
      `}</style>
      <motion.main
        initial={{ opacity: 1 }}
        animate={{ opacity: redirecting ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#0A0A0F] font-syne min-h-screen text-white selection:bg-accent/30"
      >
        <div className="wrapper relative z-10">
          <section className="h-screen w-full grid place-content-center sticky top-0 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

            <HoloCube mousePos={mousePos} />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] mx-auto px-6 md:px-12 pointer-events-none">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col items-start text-left pointer-events-auto"
              >
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_#00D4AA]"></span>
                  <span className="text-xs text-white/60 font-medium tracking-wide"></span>
                </div>

                <h1 className="text-[clamp(48px,6vw,90px)] font-extrabold tracking-[-0.04em] text-[#F0F0FF] drop-shadow-2xl font-syne leading-[1.05] mb-6">
                  Start with a<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00D4AA]">
                    free
                  </span>{" "}stack.
                </h1>

                <h2 className="text-xl md:text-2xl text-gray-400 max-w-md font-sans font-light leading-relaxed">
                  The ultimate AI tools directory. Discover, review, and save.
                </h2>

                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-start mt-16 text-accent font-medium tracking-widest uppercase text-sm"
                >
                  <span>Scroll down to enter</span>
                  <svg className="w-5 h-5 mt-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>

        <section className="w-full relative z-20">
          <div className="flex flex-col md:flex-row justify-between px-6 md:px-16 max-w-7xl mx-auto">
            <div className="grid gap-4 w-full md:w-1/2 relative pb-32">
              {CARDS.map((card, idx) => (
                <figure key={idx} className="sticky top-0 h-screen grid place-content-center">
                  <article className={`backdrop-blur-2xl border h-72 w-full max-w-md rounded-3xl p-8 grid place-content-center gap-6 shadow-[0_0_50px_rgba(108,99,255,0.05)] transition-transform hover:scale-105 cursor-default ${card.color} ${card.rotate}`}>
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 mb-2">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold font-syne text-white mb-3">{card.name}</h1>
                      <p className="text-gray-300 font-sans text-lg leading-relaxed">{card.desc}</p>
                    </div>
                  </article>
                </figure>
              ))}
            </div>

            <div className="sticky top-0 h-screen grid place-content-center w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="text-left md:pl-16"
              >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 font-syne">
                  Welcome to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-400 to-teal">
                    Stack AI
                  </span>
                </h1>
                <p className="text-xl text-gray-400 mb-10 max-w-md font-sans">
                  The ultimate directory to discover, review, and save the best artificial intelligence tools on the web.
                </p>
                <button
                  onClick={finishIntro}
                  className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all hover:scale-105 backdrop-blur-md overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-teal/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    Enter Directory
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sentinel to auto-redirect when scrolled to very bottom */}
        <motion.div
          onViewportEnter={finishIntro}
          viewport={{ once: true, amount: 0.1 }}
          className="h-20"
        />
      </motion.main>
    </ReactLenis>
  );
}
