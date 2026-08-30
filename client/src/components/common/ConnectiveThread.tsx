import React from 'react';
import { GraduationCap, Building2, Sparkles, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

interface ConnectiveThreadProps {
  variant?: 'hero' | 'compact' | 'interactive';
  activeStep?: number;
  onSelectNode?: (node: 'academia' | 'industry' | 'student') => void;
}

export const ConnectiveThread: React.FC<ConnectiveThreadProps> = ({
  variant = 'hero',
  activeStep = 0,
  onSelectNode
}) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-paper-border shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-signal/15 text-signal flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-ink">Academia</span>
        </div>

        {/* Animated Connecting Gradient Line */}
        <div className="flex-1 mx-3 h-1 bg-paper-border relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-signal via-momentum to-ember animate-flow"></div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-momentum/15 text-momentum flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-ink">Industry</span>
        </div>

        {/* Animated Connecting Gradient Line */}
        <div className="flex-1 mx-3 h-1 bg-paper-border relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-momentum via-ember to-signal animate-flow"></div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-ember/15 text-ember flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-ink">Student</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full py-8 px-4">
      {/* Background SVG Connective Thread Canvas */}
      <svg
        className="w-full h-48 md:h-56 overflow-visible"
        viewBox="0 0 900 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sigThreadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#0EA5A0" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          <linearGradient id="returnThreadGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#0EA5A0" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Forward Flow Curve: Academia -> Industry -> Student */}
        <path
          d="M 150 110 C 300 40, 450 40, 600 110"
          stroke="url(#sigThreadGrad)"
          strokeWidth="3.5"
          strokeDasharray="8 6"
          className="animate-flow"
        />

        {/* Closed-Loop Return Curve: Student Credit -> Academia TPO */}
        <path
          d="M 600 110 C 450 180, 300 180, 150 110"
          stroke="url(#returnThreadGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className="animate-flow opacity-70"
        />

        {/* Pulsing Loop Core Badge */}
        <g transform="translate(375, 90)">
          <rect
            width="150"
            height="40"
            rx="20"
            fill="#161B22"
            stroke="url(#sigThreadGrad)"
            strokeWidth="1.5"
          />
          <text
            x="75"
            y="24"
            fill="#FFFFFF"
            fontSize="11"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="bold"
            textAnchor="middle"
          >
            ⚡ CLOSED FEEDBACK LOOP
          </text>
        </g>
      </svg>

      {/* Tripartite Interactive Nodes Container Overlay */}
      <div className="absolute inset-0 max-w-5xl mx-auto px-4 flex items-center justify-between pointer-events-none">
        
        {/* Node 1: Academia (TPO) */}
        <div
          onClick={() => onSelectNode && onSelectNode('academia')}
          className="pointer-events-auto w-48 sm:w-56 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-signal/30 shadow-glass hover:shadow-glow-indigo hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-signal/15 text-signal flex items-center justify-center font-bold group-hover:bg-signal group-hover:text-white transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-signal uppercase tracking-wider">Node 01</span>
              <h4 className="font-display font-bold text-sm text-ink leading-tight">Academia (TPO)</h4>
            </div>
          </div>
          <p className="text-[11px] text-ink-muted leading-snug">
            Uploads syllabus & auto-awards accredited credits via 1-click sign-off.
          </p>
          <div className="mt-2.5 pt-2 border-t border-paper-border flex items-center justify-between text-[10px] font-mono text-signal font-semibold">
            <span>Syllabus Parsing</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Node 2: Industry (Recruiter) */}
        <div
          onClick={() => onSelectNode && onSelectNode('industry')}
          className="pointer-events-auto w-48 sm:w-56 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-momentum/30 shadow-glass hover:shadow-glow-teal hover:-translate-y-1 transition-all cursor-pointer group mt-0"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-momentum/15 text-momentum flex items-center justify-center font-bold group-hover:bg-momentum group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-momentum uppercase tracking-wider">Node 02</span>
              <h4 className="font-display font-bold text-sm text-ink leading-tight">Industry Recruiter</h4>
            </div>
          </div>
          <p className="text-[11px] text-ink-muted leading-snug">
            Posts skill-vectors & hires verified candidates without retraining.
          </p>
          <div className="mt-2.5 pt-2 border-t border-paper-border flex items-center justify-between text-[10px] font-mono text-momentum font-semibold">
            <span>Skill Vector Posts</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Node 3: Student */}
        <div
          onClick={() => onSelectNode && onSelectNode('student')}
          className="pointer-events-auto w-48 sm:w-56 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-ember/30 shadow-glass hover:shadow-glow-ember hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-ember/15 text-ember flex items-center justify-center font-bold group-hover:bg-ember group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-ember uppercase tracking-wider">Node 03</span>
              <h4 className="font-display font-bold text-sm text-ink leading-tight">Student Workspace</h4>
            </div>
          </div>
          <p className="text-[11px] text-ink-muted leading-snug">
            Resolves exact delta gaps via verified micro-challenges & earns credits.
          </p>
          <div className="mt-2.5 pt-2 border-t border-paper-border flex items-center justify-between text-[10px] font-mono text-ember font-semibold">
            <span>Delta Gap Gauge</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
};
