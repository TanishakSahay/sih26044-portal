import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  Target,
  FileCheck2,
  Award,
  Layers,
  BarChart3,
  Cpu
} from 'lucide-react';
import { ConnectiveThread } from '../components/common/ConnectiveThread';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { switchRoleDemo } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleRoleSelect = (role: 'student' | 'tpo' | 'recruiter') => {
    switchRoleDemo(role);
    if (role === 'student') navigate('/student');
    else if (role === 'tpo') navigate('/tpo');
    else if (role === 'recruiter') navigate('/recruiter');
  };

  const closedLoopSteps = [
    {
      step: '01',
      title: 'Industry Posts Skill Vector',
      actor: 'Industry Recruiter',
      color: 'text-momentum',
      bg: 'bg-momentum/10 border-momentum/30',
      description: 'Recruiter posts structured requirements as multi-dimensional skill vectors rather than static text job descriptions.'
    },
    {
      step: '02',
      title: 'AI Compares Against University Syllabus',
      actor: 'AI Skill-Delta Engine',
      color: 'text-signal',
      bg: 'bg-signal/10 border-signal/30',
      description: 'NLP models parse university curriculum course-by-course and quantify exact gaps between taught topics and real-time market demands.'
    },
    {
      step: '03',
      title: 'Student Receives Missing-Skill Roadmap',
      actor: 'Student Workspace',
      color: 'text-ember',
      bg: 'bg-ember/10 border-ember/30',
      description: 'Student views their live Skill Delta Radial Gauge and gets targeted micro-challenges tailored to close the exact requirement gap.'
    },
    {
      step: '04',
      title: 'Student Completes Verified Micro-Challenge',
      actor: 'Proof-of-Work Sandbox',
      color: 'text-momentum',
      bg: 'bg-momentum/10 border-momentum/30',
      description: 'Hands-on code execution runs against unit tests, upgrading the student Verified Skill Score and ranking them atop recruiter pipelines.'
    },
    {
      step: '05',
      title: 'Recruiter Hires + TPO Auto-Awards Credit',
      actor: 'Academia & Industry Sign-Off',
      color: 'text-signal',
      bg: 'bg-signal/10 border-signal/30',
      description: 'Corporate mentor submits weekly performance milestones, feeding the TPO 1-Click approval queue for official NEP-2020 degree credits.'
    }
  ];

  const comparisonData = [
    {
      platform: 'LinkedIn / Naukri',
      strength: 'Massive job board volume & passive sourcing',
      gap: 'Zero syllabus integration; relies on unverified self-reported resumes; no academic credit loop'
    },
    {
      platform: 'AICTE / NATS Portal',
      strength: 'Official government compliance & mandate',
      gap: 'Static database; no real-time industry skill-delta mapping; manual paper approval paperwork'
    },
    {
      platform: 'Campus Portals (Superset)',
      strength: 'On-campus placement drive coordination',
      gap: 'Static CGPA filters; no proof-of-work sandboxes; cannot recommend micro-upskilling roadmaps'
    },
    {
      platform: 'Hackathon Sites (Unstop / HackerRank)',
      strength: 'Competitive coding tests & contests',
      gap: 'Disconnected from university curriculum & degree credits; high noise ratio for campus TPOs'
    },
    {
      platform: 'SkillBridge (SIH26044)',
      strength: 'Closed-loop tripartite platform: Syllabus AI Delta + Verified Proof-of-Work + 1-Click NEP Credits',
      gap: 'Complete unified solution across Academia, Industry, and Students',
      isHero: true
    }
  ];

  return (
    <div className="space-y-24">
      
      {/* SECTION 1: HERO (Thesis-First + Connective Thread Signature Motif) */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Soft Ambient Mesh Background Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-signal/15 via-momentum/15 to-ember/15 blur-[90px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Badge Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-paper-border shadow-sm text-xs font-mono font-semibold text-ink">
            <span className="w-2 h-2 rounded-full bg-momentum animate-pulse"></span>
            <span>Smart India Hackathon SIH26044 MVP</span>
            <span className="text-ink-muted">·</span>
            <span className="text-signal">NEP 2020 Tripartite Architecture</span>
          </div>

          {/* Headline stating core thesis */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.1]">
              Bridging the Syllabus Gap with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal via-momentum to-ember">
                Closed-Loop Tripartite Skill Mapping
              </span>
            </h1>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto">
              Colleges update syllabi every 4 years. Industry shifts every 4 months. SkillBridge unifies <strong className="text-ink">Academia, Industry, and Students</strong> into a single automated feedback loop.
            </p>
          </div>

          {/* Primary & Secondary Dual CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              id="hero-student-cta"
              onClick={() => handleRoleSelect('student')}
              className="px-6 py-3.5 rounded-2xl bg-ink text-white font-display font-bold text-sm hover:bg-ink-light shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-ember group-hover:rotate-12 transition-transform" />
              <span>See Your Skill Gap (Student)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-recruiter-cta"
              onClick={() => handleRoleSelect('recruiter')}
              className="px-6 py-3.5 rounded-2xl bg-white text-ink font-display font-bold text-sm border border-paper-border hover:border-momentum/40 shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
            >
              <Building2 className="w-4 h-4 text-momentum" />
              <span>Post a Skill-Vector (Recruiter)</span>
            </button>

            <button
              id="hero-tpo-cta"
              onClick={() => handleRoleSelect('tpo')}
              className="px-6 py-3.5 rounded-2xl bg-signal/10 text-signal font-display font-bold text-sm border border-signal/20 hover:bg-signal hover:text-white transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>TPO Analytics & Credits</span>
            </button>
          </div>

          {/* Signature Element: Animated Connective Thread Visual Motif */}
          <div className="pt-6">
            <ConnectiveThread
              variant="hero"
              onSelectNode={(node) => {
                if (node === 'academia') handleRoleSelect('tpo');
                if (node === 'industry') handleRoleSelect('recruiter');
                if (node === 'student') handleRoleSelect('student');
              }}
            />
          </div>

        </div>
      </section>

      {/* SECTION 2: HOW THE CLOSED LOOP WORKS (5-Step Scroll Flow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-signal">
            The Closed-Loop Feedback Flow
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">
            How One Action Synchronizes All Three Roles
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Unlike fragmented platforms where data ends up in dead-end spreadsheets, an action by one role automatically triggers actions for the other two.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {closedLoopSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl bg-white border border-paper-border shadow-sm flex flex-col justify-between hover:shadow-glass hover:-translate-y-1 transition-all ${
                activeStep === idx ? 'ring-2 ring-signal shadow-glass' : ''
              }`}
              onMouseEnter={() => setActiveStep(idx)}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-extrabold text-2xl text-ink-muted/50">{step.step}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${step.bg} ${step.color}`}>
                    {step.actor}
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm text-ink mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-paper-border/60 flex items-center gap-1.5 text-[11px] font-semibold text-signal">
                <CheckCircle2 className="w-3.5 h-3.5 text-signal" />
                <span>Synchronized in Real-Time</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: COMPARISON MATRIX ("Why this, not LinkedIn / AICTE") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-paper-border shadow-glass">
          
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-momentum">
              Competitive Differentiation
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
              Why Existing Solutions Leave the Problem Unsolved
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Existing ed-tech and placement portals solve isolated fragments. SkillBridge is the only end-to-end closed loop.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-paper-border text-xs font-mono uppercase tracking-wider text-ink-muted">
                  <th className="py-3.5 px-4">Platform</th>
                  <th className="py-3.5 px-4">What It Does Well</th>
                  <th className="py-3.5 px-4">The Critical Unsolved Gap</th>
                  <th className="py-3.5 px-4 text-center">Loop Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border text-xs">
                {comparisonData.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      item.isHero ? 'bg-signal/5 font-semibold text-ink' : 'hover:bg-paper/50'
                    }`}
                  >
                    <td className="py-4 px-4 font-bold font-display text-sm">
                      {item.platform}
                      {item.isHero && (
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-signal text-white rounded">
                          OUR PLATFORM
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-ink-muted leading-relaxed">
                      {item.strength}
                    </td>
                    <td className="py-4 px-4 text-ink-muted leading-relaxed">
                      {item.isHero ? (
                        <span className="text-momentum font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-momentum" />
                          Zero Gap: Tripartite Feedback Loop Fully Active
                        </span>
                      ) : (
                        <span className="text-ink-muted flex items-start gap-1.5">
                          <XCircle className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
                          {item.gap}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.isHero ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-momentum/15 text-momentum font-mono font-bold text-[10px]">
                          ● Closed Loop
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-paper-border text-ink-muted font-mono text-[10px]">
                          Fragmented
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* SECTION 4: ROLE VALUE STRIP (3 Cards Opening into Live Dashboards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-ember">
            Tripartite Role Architecture
          </span>
          <h2 className="font-display font-bold text-3xl text-ink">
            Explore the Dedicated Portals
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted">
            Jump into any of the three role-specific desks to see live data and workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Student Workspace */}
          <div className="bg-white rounded-3xl p-7 border border-paper-border shadow-glass hover:border-ember/40 hover:shadow-glow-ember transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-ember/15 text-ember flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-ember uppercase tracking-wider mb-1">Student Role</div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">Student Workspace</h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Interactive radial skill-delta gauge, micro-challenge sandbox with unit test runner, verified GitHub proof-of-work, and academic credit transcripts.
              </p>
              <ul className="space-y-2 text-xs text-ink">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-ember" /> AI Skill-Delta Radial Gauge</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-ember" /> Micro-Upskilling Sandbox</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-ember" /> Corroborated GitHub Badges</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleSelect('student')}
              className="mt-6 w-full py-2.5 rounded-xl bg-ink text-white font-bold text-xs hover:bg-ember transition-colors flex items-center justify-center gap-2"
            >
              <span>Open Student Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Academia TPO */}
          <div className="bg-white rounded-3xl p-7 border border-paper-border shadow-glass hover:border-signal/40 hover:shadow-glow-indigo transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-signal/15 text-signal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-signal uppercase tracking-wider mb-1">Academia Role</div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">TPO Placement Desk</h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Curriculum PDF parser with extracted competency tags, batch skill readiness analytics, 1-Click credit approval queue, and capstone sponsorship board.
              </p>
              <ul className="space-y-2 text-xs text-ink">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-signal" /> Syllabus PDF Entity Parser</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-signal" /> Batch Readiness Distribution</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-signal" /> 1-Click NEP-2020 Credit Sign-Off</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleSelect('tpo')}
              className="mt-6 w-full py-2.5 rounded-xl bg-ink text-white font-bold text-xs hover:bg-signal transition-colors flex items-center justify-center gap-2"
            >
              <span>Open TPO Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Industry Recruiter */}
          <div className="bg-white rounded-3xl p-7 border border-paper-border shadow-glass hover:border-momentum/40 hover:shadow-glow-teal transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-momentum/15 text-momentum flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-momentum uppercase tracking-wider mb-1">Industry Role</div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">Industry Hiring Desk</h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Structured skill-vector job posting, candidates ranked by Verified Skill Score instead of resume claims, weekly intern evaluation widget, and pipeline tracking.
              </p>
              <ul className="space-y-2 text-xs text-ink">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-momentum" /> Skill-Vector Requirement Form</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-momentum" /> Verified Skill Score Rankings</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-momentum" /> Weekly Mentor Evaluation Widget</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleSelect('recruiter')}
              className="mt-6 w-full py-2.5 rounded-xl bg-ink text-white font-bold text-xs hover:bg-momentum transition-colors flex items-center justify-center gap-2"
            >
              <span>Open Recruiter Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
