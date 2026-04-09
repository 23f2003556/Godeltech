/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  ArrowRight, 
  Menu, 
  X, 
  Layers, 
  Zap, 
  Cpu, 
  Box, 
  Activity,
  ChevronRight
} from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
const SpatialVisual = lazy(() => import("./SpatialVisual"));


// --- Components ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Expertise", href: "#expertise" },
    { name: "Success Stories", href: "#results" },
    { name: "Our Story", href: "#story" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 md:px-12 py-4 ${
        isScrolled ? "glass py-3" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">GODEL TECH</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-black/60 hover:text-black transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black/80 transition-all active:scale-95"
          >
            Partner with Us
          </a>
        </nav>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-black text-white px-6 py-4 rounded-xl text-center font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partner with Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.9] tracking-tighter mb-8 text-balance">
              Translating <br/>
              <span className="text-black/20">Geometry</span> <br/>
              into Value.
            </h1>
            <p className="text-xl md:text-2xl text-black/60 leading-relaxed mb-12 max-w-xl text-balance">
              We convert complex spatial technology into measurable business outcomes for founders and leaders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95"
              >
                Start Your POC
                <ArrowRight className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-4 px-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                </div>
                <span className="text-sm font-bold text-black/40">15+ POCs Delivered</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          style={{ y: y1 }}
          className="relative aspect-square lg:aspect-auto lg:h-[800px] flex items-center justify-center"
        >
          <Suspense fallback={<div className="w-full h-full bg-black/5 animate-pulse rounded-full" />}>
            <SpatialVisual />
          </Suspense>
        </motion.div>
      </div>
      
      {/* Background Accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-black/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-black/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

const Metrics = () => {
  const metrics = [
    { label: "Successful POCs", value: "15+" },
    { label: "Turnaround Time", value: "4-8 Weeks" },
    { label: "Compute Reduction", value: "55%" },
    { label: "Manual Work Decrease", value: "80%" },
  ];

  return (
    <section className="px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black text-white rounded-[40px] p-12 md:p-20 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {metrics.map((m, i) => (
            <motion.div 
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <span className="text-4xl md:text-6xl font-black tracking-tighter">{m.value}</span>
              <span className="text-xs md:text-sm font-bold text-white/40 uppercase tracking-widest">{m.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const services = [
    {
      title: "MVP Delivery Across Domains",
      desc: "We turn your ideas into functional MVPs with cross-domain teams & unified delivery.",
      icon: <Box className="w-8 h-8" />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqoTCqjYityHnnf33UyvrEavXueYKTbLJHYu26jPzdAiVM7n76kWlC91Jd4XFocKZQvUMwrJHFi1NhYyC931m15E-h8GBP7wNcmpD3EUwFAc5nLE71oxv7pQW-aYsfH9tSd0NRDdCsRluNHI8W0eXvba1TqLBj2nEQwR529VjMAZgXyUq4lk2Ty0BFzENPrSkkkNgFV8Q6AYoUVBSgRI5u1L3o9v0PRzOLiqC7DEXKoV0JPV7swxUJD0hjuJMG_kmTLFnIjwwwn5Y"
    },
    {
      title: "AI Pipeline Optimization",
      desc: "Streamline spatial data and AI pipelines to minimize bugs and accelerate releases.",
      icon: <Activity className="w-8 h-8" />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuASrddMTx30u2ztgzX7g3un_H_ZXeenfqXh7xrE_w1kBo9Nzp6W1SUXVYrgKr_r0k2uWFr77jSvZbr57N4z11j0Mks_HsbFIfUndMN5eN5-f-VR-q4Kp8YIg9YRmXfPHGXvw4XKfSJB0p08eDUV6t2XEaiCYfFwuAwCFpGMwD1O48lNUgh9InpPBRtM--MFyY0jpXdgIOuCadOW727lRpkjxjIzuZONSohM1JA74tV5pagJLlUnGGNVC6f2ATIc-gmENL7U9Xljyd8"
    },
    {
      title: "Deep Tech Prototyping",
      desc: "Translate ambitious R&D into working prototypes, making breakthrough tech ready for use.",
      icon: <Cpu className="w-8 h-8" />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1E8BXqYkCPP3P9t9mkIPWzfISKgL7-GvaCIvK1n7BdbZbBnkagC6Ds4OVN0DgdsxHTmZh-sQfPvIRuZKiZq8mBc7tObEklG2r9mlBIy7s1puOk4MEChma4qCOrhgGQyqyoostFf2DSvlV7YFWxN6zxPAe4FSQ633VAeMcnd7DsRKU5LEsRy8uNvzVRyKUQxQM6K01sIBOk_zZ36cWal6uQvmUGXr1hnVKo35IhmFJzfsHMtq3QDg6osqH0_g6crRFaDY5_05zwVw"
    }
  ];

  return (
    <section id="expertise" className="px-6 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Our Expertise</h2>
          <p className="text-xl text-black/60 max-w-2xl">
            Specialized solutions for architecture, agritech, and manufacturing, powered by proprietary geometry engines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={s.title}
              whileHover={{ y: -10 }}
              className="bento-card flex flex-col justify-between min-h-[450px]"
            >
              <div>
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-8">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 leading-tight">{s.title}</h3>
                <p className="text-black/60 leading-relaxed mb-8">{s.desc}</p>
              </div>
              <div className="relative h-48 overflow-hidden rounded-2xl bg-black/5 p-4 flex items-center justify-center">
                <img 
                  src={s.img} 
                  alt={s.title} 
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Results = () => {
  const cases = [
    {
      title: "Digitising Farmlands",
      tag: "Agritech",
      stats: "4-8 Week Sprint",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDol40xUGfMdu6EV6tiiQOr26w5lbGGAPUM0HxJjYxDiXrcxa3CY2HudustYGbvYv9N575V3QMA6ZDnYEgMW8dMKw2A8XkkPf1afV26jf43zMB9SreT3py66ZbVVC1dyc166br_ZqBSNVArF8Wz6QL0ADPKyCfC8bYa0TSQ6kZpylOMePBL6f_dK1MFDUZOabxHUfdCaDS9vheC3DrI5S8OXHIxt_0YHXvL9d6mVhXp7c-wQY_W9jy7tVNnLtF5dqjw44WxFJjR1NE"
    },
    {
      title: "3D Asset Creation",
      tag: "Automation",
      stats: "40% Automation ROI",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVk2CdPRiif3oaz5xGQwIxlWxLW8wznlJe1uJLxC4QukL22mVyyaAtH8JCs4RwsbwvFqLsFIsMxS9otmlPXuVGdEmy-7gFfSJ0hd7dB4yiQhP0kU_m4iQGu_X9dxScZmJCC76x3EmDcHMDynhBdHn7lqJINc7cS5kYDLSyRN7EeYzPrdJtqPoXhzlitj6-ry08MHdro_XVM0y22ptWrf4m1P4NTKnkx1DuZJxMZbvxPPuH4GFKn4XmFLKM8hvWAX5xt9z-BmrpyEw"
    },
    {
      title: "Floor Plan AI",
      tag: "Architecture",
      stats: "+25% User Adoption",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0hAQCEfdjNSR2SlNDvHS0YxwtCRLXSiz3lGufZWkiVwnHwAPPEEZz-qv6rFP5dcmJJOhYH__Y6gKEwrc7_O3Fy12LRUIJWzn8fmyU5y_e7wqEvm_hPyzSoYk37FlvDhMZyc3SeboGFawHvP-c0tO_kE7sW_qknkpAfWx6FXbiZmVuE0VWFNkr7qrT2HGCgHSqdYgK21yCTYHgi8-VY3S-ItznN_RKT8RkgIPK-lR8OGY5Z_1bnP0vAiYHQUnOra8o4sWThStovpw"
    }
  ];

  return (
    <section id="results" className="px-6 md:px-12 py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Success Stories</h2>
            <p className="text-xl text-black/60 max-w-xl">
              Real-world impact delivered through technical precision and rapid execution.
            </p>
          </div>
          <button className="flex items-center gap-2 font-bold group">
            View All Case Studies
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div 
              key={c.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[32px] p-8 border border-black/5 group cursor-pointer"
            >
              <div className="aspect-video bg-gray-50 rounded-2xl mb-8 overflow-hidden flex items-center justify-center p-6">
                <img 
                  src={c.img} 
                  alt={c.title} 
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2 block">{c.tag}</span>
              <h3 className="text-2xl font-black mb-4 leading-tight">{c.title}</h3>
              <div className="flex items-center gap-2 text-sm font-bold text-black/60">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                {c.stats}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OurStory = () => {
  const milestones = [
    {
      period: "The Foundation",
      title: "IIT Madras & GE Aerospace",
      desc: "Developed proprietary algorithms for complex curves at IIT Madras, followed by building 3D geometry tools for jet engine airfoils at GE. In aerospace, a 1% error is a catastrophe.",
      takeaway: "Aerospace-Grade Precision: Ensuring unshakeable technical foundations from Day 1.",
      icon: <Layers className="w-6 h-6" />
    },
    {
      period: "The Evolution",
      title: "AI & Model Compression",
      desc: "Bridged the gap for 'stateless' AI models at YNOS and Inspirit IoT. Specialized in making massive, expensive AI lean enough to run anywhere.",
      takeaway: "Lean AI: Transforming DNNs into high-performance, production-ready assets.",
      icon: <Cpu className="w-6 h-6" />
    },
    {
      period: "The Impact",
      title: "PhotoGAUGE ROI",
      desc: "Rebuilt a monolithic, error-prone 3D pipeline from the ground up, proving that deep tech translates directly to bottom-line ROI.",
      takeaway: "55% Compute Reduction & 80% Decrease in Manual Intervention.",
      icon: <Activity className="w-6 h-6" />
    },
    {
      period: "The Partnership",
      title: "Founding CTO Experience",
      desc: "As Founding CTO of Anyo App, managed everything from Kubernetes infrastructure to GTM strategy. Understanding that technical decisions are financial ones.",
      takeaway: "The Partnership Edge: Managing burn rates with algorithmic precision.",
      icon: <Box className="w-6 h-6" />
    }
  ];

  const impactMetrics = [
    { label: "Custom POCs", value: "15+", impact: "Directly enabled founders to secure seed funding and investor buy-in." },
    { label: "Turnaround", value: "4-8 Wks", impact: "Accelerating product-market fit by 3x the industry average." },
    { label: "Product Cycles", value: "30% Faster", impact: "Using pre-built spatial 'primitives' to skip months of R&D." },
    { label: "Workflow Efficiency", value: "45% Up", impact: "Re-engineering legacy pipelines to save operational costs." },
  ];

  return (
    <section id="story" className="px-6 md:px-12 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Intro Narrative */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-black uppercase tracking-widest text-black/40 mb-4 block"
            >
              The Genesis
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
              Solving the <br/>
              <span className="text-black/20">Execution Gap.</span>
            </h2>
            <div className="space-y-6 text-xl text-black/60 leading-relaxed">
              <p>
                In the startup world, "Spatial Intelligence" is often where great ideas go to die because the math is too hard, the talent is too expensive, and the development cycles are too long.
              </p>
              <p>
                Vishwanath Venkat founded Godel Tech to solve this gap, synthesizing a decade of expertise and 60+ global projects into a Technical Co-Founding Engine.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-black/5 rounded-full blur-3xl -z-10" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/5] rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            >
              <img 
                alt="Vishwanath Venkat" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgX-Fr3GKmpVTULGbNdBlhxIjFaDt1vbFGbYFzXndRCbkuoLkJ0cTBc_AamLPLCKqbKyqNRnfOFlBxDPXoPpfcaYS2ODqizPzCw-LVymTiDuhYrjZf_Ia-tJvwlvf7lu7lChp_Kv_Yq4RW1uicQOXdsEeQfPU4GbynBpI6kSeagRGW-mOtSWna_-h5UE_G90PJj52X2ELL7MR-ayULQEnKR7Btx8E97QKePVr7scNJWNKfGrN53GoEgj2kWWJUTMBREvQJHyRZmBo"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-sm font-bold opacity-60 mb-1 uppercase tracking-widest">Founder</p>
                <h3 className="text-3xl font-black tracking-tighter">Vishwanath Venkat</h3>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {milestones.map((m, i) => (
            <motion.div 
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-brand-gray border border-transparent hover:border-black/10 transition-all group"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-6 block">{m.period}</span>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-black group-hover:text-white transition-colors">
                {m.icon}
              </div>
              <h4 className="text-xl font-black mb-4 leading-tight">{m.title}</h4>
              <p className="text-sm text-black/50 leading-relaxed mb-6">{m.desc}</p>
              <div className="pt-6 border-t border-black/5">
                <p className="text-xs font-bold text-black leading-tight italic">"{m.takeaway}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Table Section */}
        <div className="mb-32">
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-12">Impact on Your Business</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {impactMetrics.map((item, i) => (
              <div key={i} className="flex items-center gap-8 p-8 bg-black text-white rounded-3xl">
                <div className="shrink-0">
                  <span className="text-4xl font-black tracking-tighter block">{item.value}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{item.label}</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">Why Leaders Trust Vishwanath</h3>
            <p className="text-xl text-black/60 leading-relaxed mb-8">
              Vishwanath Venkat is the rare partner who can sit in a boardroom to discuss valuation and strategy, then turn around and lead a team to build a custom geometry kernel.
            </p>
            <p className="text-xl text-black/60 leading-relaxed">
              We don't just build software. We de-risk the most technical parts of your business so you can focus on what matters: <span className="text-black font-black">Scaling.</span>
            </p>
          </div>
          <div className="bg-brand-gray p-12 rounded-[40px] border border-black/5">
            <div className="flex gap-4 mb-8">
              {[1,2,3,4,5].map(i => <Zap key={i} className="w-5 h-5 fill-black" />)}
            </div>
            <p className="text-2xl font-bold leading-tight mb-6">"Technical decisions are financial decisions. We manage burn rates with the same precision we use for our algorithms."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black/10" />
              <div>
                <p className="font-black text-sm uppercase tracking-widest">The Partnership Edge</p>
                <p className="text-xs text-black/40">Founding CTO Mindset</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-12 md:p-24 bg-black text-white rounded-[60px] text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-3xl md:text-6xl font-medium leading-[1.1] mb-12 text-balance">
              "Our mission is simple: We provide the deep-tech infrastructure so that visionaries can build the future without hitting a technical ceiling."
            </p>
            <span className="text-xl font-bold text-white/40 uppercase tracking-widest">— Vishwanath Venkat</span>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1E8BXqYkCPP3P9t9mkIPWzfISKgL7-GvaCIvK1n7BdbZbBnkagC6Ds4OVN0DgdsxHTmZh-sQfPvIRuZKiZq8mBc7tObEklG2r9mlBIy7s1puOk4MEChma4qCOrhgGQyqyoostFf2DSvlV7YFWxN6zxPAe4FSQ633VAeMcnd7DsRKU5LEsRy8uNvzVRyKUQxQM6K01sIBOk_zZ36cWal6uQvmUGXr1hnVKo35IhmFJzfsHMtq3QDg6osqH0_g6crRFaDY5_05zwVw" 
              alt="Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="contact" className="px-6 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          whileHover={{ scale: 0.99 }}
          className="bg-black text-white rounded-[60px] p-12 md:p-32 text-center relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 text-balance leading-[0.9]">
              Stop Drafting. <br/>
              Start Engineering.
            </h2>
            <button className="bg-white text-black px-12 py-6 rounded-full font-black text-xl hover:scale-110 transition-transform active:scale-95">
              Partner for your Next Pitch
            </button>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1E8BXqYkCPP3P9t9mkIPWzfISKgL7-GvaCIvK1n7BdbZbBnkagC6Ds4OVN0DgdsxHTmZh-sQfPvIRuZKiZq8mBc7tObEklG2r9mlBIy7s1puOk4MEChma4qCOrhgGQyqyoostFf2DSvlV7YFWxN6zxPAe4FSQ633VAeMcnd7DsRKU5LEsRy8uNvzVRyKUQxQM6K01sIBOk_zZ36cWal6uQvmUGXr1hnVKo35IhmFJzfsHMtq3QDg6osqH0_g6crRFaDY5_05zwVw" 
              alt="Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="px-6 md:px-12 py-12 border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-black tracking-tighter">GODEL TECH</span>
      </div>
      <div className="flex gap-8 text-sm font-medium text-black/40">
        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
        <a href="mailto:info@godeltech.in" className="hover:text-black transition-colors">info@godeltech.in</a>
      </div>
      <p className="text-sm font-medium text-black/20">
        © {new Date().getFullYear()} Godel Tech. All rights reserved.
      </p>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Metrics />
        <Expertise />
        <Results />
        <OurStory />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
