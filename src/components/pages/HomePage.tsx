// HPI 1.7-V
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMember } from '@/integrations';
import { 
  Calendar, Users, BarChart3, Shield, Globe, TrendingUp, 
  Activity, Zap, Database, Cpu, Network, AlertTriangle, 
  CheckCircle2, ChevronRight, Settings, Bell, LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Canonical Data Sources (Preserved & Expanded for UI) ---
const featuresData = [
  { icon: Calendar, title: 'Event Management', description: 'Organize and track all academic events with precision and ease', color: 'accent-cyan' },
  { icon: Users, title: 'Student Tracking', description: 'Monitor student engagement and attendance in real-time', color: 'accent-purple' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Deep insights into attendance patterns and performance metrics', color: 'accent-magenta' },
  { icon: Shield, title: 'Secure Platform', description: 'Enterprise-grade security for all your educational data', color: 'accent-cyan' },
  { icon: Globe, title: 'Global Access', description: 'Access your data anywhere, anytime with cloud synchronization', color: 'accent-purple' },
  { icon: TrendingUp, title: 'Performance Insights', description: 'Track trends and identify areas for improvement', color: 'accent-magenta' }
];

const rosterData = [
  { id: 1, name: 'Aaryan Sharma', roll: '2024CS001', status: 'present', img: 'https://static.wixstatic.com/media/2e45bf_cb0a08e06eb54a60b5edc37fdce891ee~mv2.png' },
  { id: 2, name: 'Ananya Gupta', roll: '2024CS002', status: 'absent', img: 'https://static.wixstatic.com/media/2e45bf_1b73065da5fb4926a2fca2e0016f5056~mv2.png' },
  { id: 3, name: 'Ishan Verma', roll: '2024CS003', status: 'present', img: 'https://static.wixstatic.com/media/2e45bf_9432d62ac52848f698ea5c581f299343~mv2.png' },
];

const networkStatus = [
  { label: 'Main Server', status: 'OPERATIONAL', color: 'text-accent-cyan', dot: 'bg-accent-cyan' },
  { label: 'LMS Bridge', status: 'SYNCED', color: 'text-accent-cyan', dot: 'bg-accent-cyan' },
  { label: 'Auth Gateway', status: 'LATENCY', color: 'text-destructive', dot: 'bg-destructive' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useMember();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-paragraph overflow-clip selection:bg-accent-cyan/30 selection:text-accent-cyan">
      <style>
        {`
          .quantum-grid {
            background-size: 40px 40px;
            background-image: 
              linear-gradient(to right, rgba(0, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
            mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          }
          .glow-border {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.1), inset 0 0 20px rgba(0, 255, 255, 0.05);
          }
          .glow-border-destructive {
            box-shadow: 0 0 20px rgba(255, 0, 102, 0.15), inset 0 0 20px rgba(255, 0, 102, 0.05);
          }
          .text-gradient-cyan {
            background: linear-gradient(to right, #00FFFF, #8A2BE2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .circular-progress {
            background: conic-gradient(#00FFFF 88%, rgba(255,255,255,0.1) 0);
            border-radius: 50%;
          }
          .clip-hex {
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          }
        `}
      </style>

      <Header />

      {/* Fixed Background Elements for Depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 quantum-grid" />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-purple/5 blur-[150px]"
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-cyan/5 blur-[150px]"
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 w-full min-h-[95vh] flex items-center pt-20 pb-12">
        <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card-background/80 backdrop-blur-md rounded-full border border-accent-cyan/30 mb-8">
                  <Activity className="w-4 h-4 text-accent-cyan animate-pulse" />
                  <span className="text-accent-cyan text-xs tracking-[0.2em] font-heading font-bold uppercase">System Pulse Active</span>
                </div>
                
                <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-[1.1] tracking-tight">
                  Quantum-Synced <br />
                  <span className="text-gradient-cyan">Academic</span> <br />
                  Engagement.
                </h1>
                
                <p className="font-paragraph text-xl sm:text-2xl text-muted-text mb-10 max-w-2xl leading-relaxed border-l-2 border-accent-cyan/50 pl-6">
                  Real-time governance and critical academic updates. Stay aligned with your educational trajectory through our advanced neural network.
                </p>
                
                <div className="flex flex-wrap gap-6">
                  {!isAuthenticated ? (
                    <>
                      <Link to="/register">
                        <Button className="group relative overflow-hidden bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-heading font-bold px-10 py-7 text-lg rounded-none clip-hex transition-all duration-300 hover:scale-105">
                          <span className="relative z-10 flex items-center gap-2">
                            Initialize Core <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        </Button>
                      </Link>
                      <Link to="/events">
                        <Button variant="outline" className="bg-transparent border-2 border-accent-purple/50 text-foreground hover:bg-accent-purple/10 hover:border-accent-purple font-heading font-bold px-10 py-7 text-lg rounded-none clip-hex transition-all duration-300">
                          View Data Clusters
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard">
                        <Button className="group relative overflow-hidden bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 font-heading font-bold px-10 py-7 text-lg rounded-none clip-hex transition-all duration-300 hover:scale-105">
                          <span className="relative z-10 flex items-center gap-2">
                            Go to Dashboard <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        </Button>
                      </Link>
                      <Link to="/events">
                        <Button variant="outline" className="bg-transparent border-2 border-accent-purple/50 text-foreground hover:bg-accent-purple/10 hover:border-accent-purple font-heading font-bold px-10 py-7 text-lg rounded-none clip-hex transition-all duration-300">
                          Browse Events
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-5 relative h-[600px] hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Abstract Network Image */}
                <div className="relative w-full h-full max-w-[500px] max-h-[500px] animate-[spin_120s_linear_infinite]">
                  <Image
                    src="https://static.wixstatic.com/media/2e45bf_2dd0eb43a5974e4c91e6486935586d27~mv2.png"
                    alt="Neural Network Core"
                    width={800}
                    className="w-full h-full object-contain opacity-80 mix-blend-screen"
                  />
                </div>

                {/* Floating UI Elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[20%] right-[-10%] bg-card-background/90 backdrop-blur-xl border border-accent-cyan/30 p-6 rounded-2xl glow-border"
                >
                  <div className="text-sm font-heading text-muted-text mb-1">Optimal Attendance</div>
                  <div className="text-4xl font-heading font-bold text-accent-cyan">94.2<span className="text-xl text-accent-cyan/60">%</span></div>
                </motion.div>

                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[20%] left-[-5%] bg-card-background/90 backdrop-blur-xl border border-accent-purple/30 p-5 rounded-2xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-purple/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-foreground">12,482</div>
                    <div className="text-xs font-paragraph text-accent-cyan">+5.2% Neural Shift</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE DIVIDER */}
      <div className="w-full border-y border-accent-cyan/10 bg-card-background/50 backdrop-blur-sm overflow-hidden py-4 relative z-10">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center gap-12 w-max"
        >
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-3"><Database className="w-4 h-4 text-accent-cyan" /><span className="font-heading text-sm tracking-widest text-muted-text uppercase">Core Systems Online</span></div>
              <div className="w-1 h-1 rounded-full bg-accent-purple" />
              <div className="flex items-center gap-3"><Network className="w-4 h-4 text-accent-magenta" /><span className="font-heading text-sm tracking-widest text-muted-text uppercase">LMS Bridge Synced</span></div>
              <div className="w-1 h-1 rounded-full bg-accent-cyan" />
              <div className="flex items-center gap-3"><Shield className="w-4 h-4 text-accent-cyan" /><span className="font-heading text-sm tracking-widest text-muted-text uppercase">Auth Gateway Secure</span></div>
              <div className="w-1 h-1 rounded-full bg-accent-purple" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* SECTION 1: FACULTY COMMAND (Interactive Roster) */}
      <section id="faculty" className="relative z-10 w-full py-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-sm tracking-[0.3em] text-accent-purple uppercase mb-4">Faculty Command Center</h2>
              <h3 className="font-heading text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                Mark Attendance <br />with <span className="text-accent-cyan">Precision</span>.
              </h3>
              <p className="font-paragraph text-xl text-muted-text mb-8 leading-relaxed">
                Execute attendance protocols instantly. Our interface detects nodes in your target class and allows for rapid, error-free data commitment to the central sphere.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center mt-1 border border-accent-cyan/30">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground">Target Class Selection</h4>
                    <p className="font-paragraph text-muted-text">Instantly lock onto CS-A (Computer Science) or any assigned module.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center mt-1 border border-accent-purple/30">
                    <Zap className="w-4 h-4 text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground">Rapid Roster Sync</h4>
                    <p className="font-paragraph text-muted-text">Detect all 42 nodes in real-time. Mark all present with a single command.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: UI Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 rounded-[2.5rem] blur-xl z-0" />
              
              <div className="relative z-10 bg-[#0F0F23] border border-accent-cyan/20 rounded-[2rem] p-8 shadow-2xl glow-border">
                {/* Mock Header */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <div>
                    <div className="text-xs font-heading text-accent-cyan tracking-widest uppercase mb-1">Target Class</div>
                    <div className="text-lg font-heading font-bold text-foreground bg-white/5 px-4 py-2 rounded-lg border border-white/10">CS-A (Computer Science)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-heading text-accent-purple tracking-widest uppercase mb-1">Subject Module</div>
                    <div className="text-lg font-heading font-bold text-foreground bg-white/5 px-4 py-2 rounded-lg border border-white/10">Data Structures (DS-301)</div>
                  </div>
                </div>

                {/* Roster List */}
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-foreground">Student Roster</h4>
                    <p className="text-sm text-muted-text">42 nodes detected in CS-A</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-accent-cyan/50 text-accent-cyan hover:bg-accent-cyan/10 text-xs tracking-wider">
                    MARK ALL PRESENT
                  </Button>
                </div>

                <div className="space-y-4 mb-8">
                  {rosterData.map((student) => (
                    <div key={student.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${student.status === 'present' ? 'bg-accent-cyan/5 border-accent-cyan/30' : 'bg-destructive/5 border-destructive/30'}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-card-background">
                          <Image src={student.img} alt={student.name} width={48} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-heading font-bold text-foreground">{student.name}</div>
                          <div className="text-xs text-muted-text font-mono">ROLL: {student.roll}</div>
                        </div>
                      </div>
                      <div className="flex bg-black/40 rounded-lg p-1 border border-white/10">
                        <div className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${student.status === 'present' ? 'bg-accent-cyan text-black shadow-[0_0_10px_rgba(0,255,255,0.5)]' : 'text-muted-text'}`}>P</div>
                        <div className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${student.status === 'absent' ? 'bg-destructive text-white shadow-[0_0_10px_rgba(255,0,102,0.5)]' : 'text-muted-text'}`}>A</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-accent-purple to-accent-cyan text-black font-heading font-bold text-lg py-6 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                  COMMIT DATA TO SPHERE
                </Button>
                <div className="text-center mt-4 text-xs font-mono text-muted-text tracking-widest">
                  STATUS: 38 SYNCED / 4 OFFLINE
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXECUTIVE ANALYTICS (Sticky Scroll Narrative) */}
      <section id="analytics" className="relative z-10 w-full bg-[#08081A] border-y border-white/5">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-5 py-32">
              <div className="sticky top-32">
                <h2 className="font-heading text-sm tracking-[0.3em] text-accent-magenta uppercase mb-4">Executive Analytics Engine</h2>
                <h3 className="font-heading text-5xl font-bold text-foreground mb-6 leading-tight">
                  System Performance <br />Live Stream.
                </h3>
                <p className="font-paragraph text-xl text-muted-text mb-8">
                  Synthesized overview of global institutional health, verified attendance patterns, and automated faculty load balancing for the active cycle.
                </p>
                
                <div className="p-6 bg-card-background/50 border border-accent-magenta/20 rounded-2xl backdrop-blur-sm">
                  <div className="text-sm font-heading text-muted-text uppercase tracking-widest mb-2">Real-Time Performance Metrics</div>
                  <div className="flex items-baseline gap-4">
                    <div className="text-6xl font-heading font-black text-foreground">92.4<span className="text-3xl text-muted-text">%</span></div>
                    <div className="text-accent-cyan font-bold flex items-center"><TrendingUp className="w-4 h-4 mr-1"/> +2.1%</div>
                  </div>
                  <p className="text-sm text-muted-text mt-4">Optimizing your academic journey. Current trajectory places you in the <strong className="text-accent-cyan">Top 5%</strong> of your cohort.</p>
                </div>
              </div>
            </div>

            {/* Scrolling Right Column (Data Visualizations) */}
            <div className="lg:col-span-7 py-32 space-y-8">
              
              {/* Heatmap Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card-background border border-white/10 rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <div>
                    <h4 className="font-heading text-2xl font-bold text-foreground">Spatial Heatmap</h4>
                    <p className="text-sm text-muted-text uppercase tracking-widest">Density by Campus Sector</p>
                  </div>
                  <Activity className="w-6 h-6 text-accent-cyan" />
                </div>
                
                {/* CSS Grid Heatmap */}
                <div className="grid grid-cols-6 gap-2 relative z-10">
                  {[...Array(24)].map((_, i) => {
                    // Generate pseudo-random opacities for the heatmap effect
                    const opacities = [10, 20, 30, 40, 60, 80, 100];
                    const opacity = opacities[Math.floor(Math.random() * opacities.length)];
                    const isHot = opacity > 60;
                    return (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-md transition-all duration-500 hover:scale-110 ${isHot ? 'bg-accent-cyan' : 'bg-accent-cyan/20'}`}
                        style={{ opacity: opacity / 100 }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-muted-text mt-4 font-mono">
                  <span>QUIET</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-accent-cyan/20"></div>
                    <div className="w-3 h-3 rounded-sm bg-accent-cyan/50"></div>
                    <div className="w-3 h-3 rounded-sm bg-accent-cyan"></div>
                  </div>
                  <span>PEAK</span>
                </div>
              </motion.div>

              {/* Abstract Data Image Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card-background border border-white/10 rounded-3xl p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-between"
              >
                <div className="absolute inset-0 opacity-30 mix-blend-screen">
                  <Image 
                    src="https://static.wixstatic.com/media/2e45bf_7187c80ccbcc43238233b37a623d5d75~mv2.png" 
                    alt="Neural Engagement Data" 
                    width={800} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <h4 className="font-heading text-2xl font-bold text-foreground">Neural Engagement</h4>
                  <p className="text-sm text-muted-text uppercase tracking-widest">Sync Submissions Over Temporal Cycles</p>
                </div>
                <div className="relative z-10 flex gap-6 mt-auto pt-32">
                  <div className="flex items-center gap-2 text-sm font-mono"><div className="w-3 h-3 bg-accent-purple rounded-sm"></div> ACTIVE LOGINS</div>
                  <div className="flex items-center gap-2 text-sm font-mono"><div className="w-3 h-3 bg-accent-cyan rounded-sm"></div> ATTENDANCE LOGS</div>
                </div>
              </motion.div>

              {/* Sector Distribution */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card-background border border-white/10 rounded-3xl p-8"
              >
                <h4 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-accent-magenta"/> Sector Distribution</h4>
                <div className="space-y-6">
                  {[
                    { label: 'Tech-Core Engineering', val: '82%', color: 'bg-accent-cyan' },
                    { label: 'Creative Humanities', val: '24%', color: 'bg-accent-purple' },
                    { label: 'Applied Quantum Sciences', val: '12%', color: 'bg-accent-magenta' }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-heading uppercase tracking-wider mb-2">
                        <span className="text-muted-text">{item.label}</span>
                        <span className="text-foreground font-bold">{item.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: item.val }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STUDENT PORTAL (Profile & Warnings) */}
      <section id="student" className="relative z-10 w-full py-32 overflow-hidden">
        {/* Background styling */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0A0A1A] to-background z-0" />
        
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-heading text-sm tracking-[0.3em] text-accent-cyan uppercase mb-4">Personalized Trajectory</h2>
            <h3 className="font-heading text-5xl font-bold text-foreground">Student Metadata Core</h3>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left: Profile Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <div className="bg-card-background border border-white/10 rounded-[2rem] p-8 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-accent-cyan/20 to-transparent" />
                
                <div className="relative z-10 flex flex-col items-center text-center mt-4">
                  <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-accent-cyan to-accent-purple mb-6">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-card-background">
                      <Image 
                        src="https://static.wixstatic.com/media/2e45bf_9432d62ac52848f698ea5c581f299343~mv2.png" 
                        alt="Ethan Sullivan" 
                        width={128} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs font-bold tracking-widest uppercase border border-accent-cyan/20">Active Student</span>
                    <span className="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-bold tracking-widest uppercase border border-accent-purple/20">Semester VII</span>
                  </div>
                  
                  <h4 className="font-heading text-3xl font-bold text-foreground mb-2">Ethan Sullivan</h4>
                  <p className="text-muted-text font-mono text-sm mb-1 flex items-center justify-center gap-2"><Shield className="w-4 h-4"/> ROLL: 2024-CS-042</p>
                  <p className="text-muted-text text-sm mb-8">Computer Science Engineering</p>
                  
                  <div className="w-full grid grid-cols-2 gap-4">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">Export Record</Button>
                    <Button className="bg-accent-cyan text-black hover:bg-accent-cyan/90">Update Bio</Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Middle: Analytics Ring */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-4"
            >
              <div className="bg-card-background border border-white/10 rounded-[2rem] p-8 h-full flex flex-col items-center justify-center text-center">
                <h4 className="font-heading text-xl font-bold text-foreground w-full text-left mb-8">Attendance Analytics</h4>
                
                {/* CSS Circular Progress */}
                <div className="relative w-48 h-48 circular-progress flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                  <div className="absolute inset-2 bg-card-background rounded-full flex items-center justify-center flex-col">
                    <span className="text-4xl font-heading font-bold text-foreground">88%</span>
                  </div>
                </div>
                
                <div className="text-xs font-heading tracking-widest text-muted-text uppercase mb-6">Overall Attendance</div>
                
                <div className="w-full border-t border-white/10 pt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-heading font-bold text-accent-purple mb-1">142</div>
                    <div className="text-xs text-muted-text uppercase tracking-wider">Lectures Attended</div>
                  </div>
                  <div>
                    <div className="text-3xl font-heading font-bold text-destructive mb-1">08</div>
                    <div className="text-xs text-muted-text uppercase tracking-wider">Absence Streak</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: System Pulse / Alerts */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 flex flex-col gap-6"
            >
              {/* Critical Alert Card */}
              <div className="bg-[#1A0A10] border border-destructive/30 rounded-[2rem] p-8 glow-border-destructive relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <AlertTriangle className="w-32 h-32 text-destructive" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-destructive/20 text-destructive text-xs font-bold tracking-widest uppercase rounded-md mb-4">
                    Critical Alert <span className="text-white/50">|</span> 08:30
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-foreground mb-3">Attendance Probation Warning</h4>
                  <p className="text-sm text-muted-text mb-6 leading-relaxed">
                    Your attendance in <strong className="text-white">CS-402: Quantum Algorithms</strong> has dropped below the 75% threshold. Immediate action is required to avoid administrative exclusion.
                  </p>
                  <div className="flex gap-3">
                    <Button className="bg-accent-cyan text-black hover:bg-accent-cyan/90 text-sm px-6">Submit Appeal</Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-sm">Review Policy</Button>
                  </div>
                </div>
              </div>

              {/* Network Status */}
              <div className="bg-card-background border border-white/10 rounded-[2rem] p-8 flex-grow">
                <h4 className="font-heading text-sm tracking-widest text-muted-text uppercase mb-6">Network Status</h4>
                <div className="space-y-4">
                  {networkStatus.map((net, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-foreground">{net.label}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${net.dot} animate-pulse`} />
                        <span className={`text-xs font-mono font-bold ${net.color}`}>{net.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURES GRID (Preserved Data, New Layout) */}
      <section className="relative z-10 w-full py-32 bg-card-background/30 border-t border-white/5">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="font-heading text-sm tracking-[0.3em] text-accent-purple uppercase mb-4">Core Infrastructure</h2>
            <h3 className="font-heading text-5xl font-bold text-foreground">Advanced Capabilities</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card-background border border-white/5 hover:border-accent-cyan/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${feature.color}/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-${feature.color}/10 transition-colors`} />
                
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-6 border border-${feature.color}/20`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                </div>
                <h4 className="font-heading text-2xl font-bold text-foreground mb-3">
                  {feature.title}
                </h4>
                <p className="font-paragraph text-muted-text leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 w-full py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/10 to-transparent z-0" />
        
        <div className="max-w-[80rem] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card-background border border-accent-cyan/30 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden glow-border"
          >
            {/* Decorative background lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,255,255,0.1) 10px, rgba(0,255,255,0.1) 11px)' }} />
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto bg-accent-cyan/10 rounded-full flex items-center justify-center mb-8 border border-accent-cyan/30">
                <Network className="w-10 h-10 text-accent-cyan" />
              </div>
              <h2 className="font-heading text-5xl md:text-6xl font-black text-foreground mb-6">
                Initialize Your <br/><span className="text-gradient-cyan">Sphere</span>
              </h2>
              <p className="font-paragraph text-xl text-muted-text mb-10 max-w-2xl mx-auto">
                Join the network of advanced educational institutions utilizing AttendSphere for seamless, quantum-synced event management.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link to="/events">
                  <Button className="bg-accent-cyan text-black hover:bg-accent-cyan/90 font-heading font-bold px-12 py-8 text-xl rounded-none clip-hex transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.4)]">
                    Browse Events
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-2 border-white/20 text-foreground hover:bg-white/5 font-heading font-bold px-12 py-8 text-xl rounded-none clip-hex transition-colors">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}