import React from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Zap, Target } from 'lucide-react';
import { MicroChallenge } from '../../types';

interface SkillDeltaGaugeProps {
  matchPercent: number;
  matchedSkills: string[];
  missingSkills: string[];
  requirementTitle: string;
  companyName: string;
  onLaunchChallenge?: (challenge: MicroChallenge) => void;
  recommendedChallenges?: MicroChallenge[];
}

export const SkillDeltaGauge: React.FC<SkillDeltaGaugeProps> = ({
  matchPercent = 84,
  matchedSkills = [],
  missingSkills = [],
  requirementTitle,
  companyName,
  onLaunchChallenge,
  recommendedChallenges = []
}) => {
  // Calculate SVG circular arc parameters
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchPercent / 100) * circumference;

  // Determine score color theme
  let strokeColor = '#0EA5A0'; // Momentum Teal
  let badgeBg = 'bg-momentum/10 text-momentum border-momentum/20';
  let ratingLabel = 'Strong Fit';

  if (matchPercent < 60) {
    strokeColor = '#F97316'; // Ember
    badgeBg = 'bg-ember/10 text-ember border-ember/20';
    ratingLabel = 'Action Needed';
  } else if (matchPercent < 80) {
    strokeColor = '#4F46E5'; // Signal Indigo
    badgeBg = 'bg-signal/10 text-signal border-signal/20';
    ratingLabel = 'Moderate Fit';
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-paper-border shadow-glass relative overflow-hidden">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-paper-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-muted">
              Live AI Skill Delta Engine
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${badgeBg}`}>
              {ratingLabel}
            </span>
          </div>
          <h3 className="font-display font-bold text-lg text-ink">
            {requirementTitle || 'Fintech Backend Infrastructure Intern'}
          </h3>
          <p className="text-xs text-ink-muted">Company target: <span className="font-semibold text-ink">{companyName || 'Razorpay'}</span></p>
        </div>

        <div className="flex items-center gap-2 bg-paper px-3 py-1.5 rounded-xl border border-paper-border text-xs">
          <Target className="w-4 h-4 text-signal" />
          <span className="font-mono text-ink">Curriculum vs Vector Gap</span>
        </div>
      </div>

      {/* Main Gauge & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
        
        {/* Radial SVG Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background Track Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-paper-darker"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={strokeColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease'
                }}
              />
            </svg>

            {/* Central Score Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono font-extrabold text-4xl text-ink tracking-tight">
                {matchPercent}%
              </span>
              <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider font-semibold mt-0.5">
                Skill Match
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="text-xs text-ink-muted">
              {missingSkills.length === 0 ? (
                <span className="text-momentum font-semibold flex items-center gap-1 justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Industry Ready
                </span>
              ) : (
                <span>Close <strong className="text-ember">{missingSkills.length} missing skills</strong> to reach 98%</span>
              )}
            </p>
          </div>
        </div>

        {/* Matched vs Missing Skills Chips Columns */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Matched Skills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-momentum" />
                Syllabus Verified Competencies ({matchedSkills.length})
              </span>
              <span className="text-[11px] font-mono text-momentum font-semibold">Taught & Corroborated</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-momentum/10 text-momentum-dark text-xs font-semibold rounded-lg border border-momentum/20 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-momentum"></span>
                  {skill}
                </span>
              ))}
              {matchedSkills.length === 0 && (
                <span className="text-xs text-ink-muted italic">No matched skills detected</span>
              )}
            </div>
          </div>

          {/* Missing Skills (The Delta Gap) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-ember" />
                Identified Missing Industry Gaps ({missingSkills.length})
              </span>
              <span className="text-[11px] font-mono text-ember font-semibold">Missing from Standard Syllabus</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-ember/10 text-ember-dark text-xs font-semibold rounded-lg border border-ember/25 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse"></span>
                  {skill}
                </span>
              ))}
              {missingSkills.length === 0 && (
                <span className="text-xs text-momentum font-medium">All required skills fulfilled!</span>
              )}
            </div>
          </div>

          {/* Recommended Action Box */}
          {recommendedChallenges.length > 0 && (
            <div className="p-3.5 bg-paper rounded-2xl border border-paper-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-ember/20 text-ember flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">
                    Micro-Challenge Available: {recommendedChallenges[0].title}
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    Closes the <strong className="text-ink">{recommendedChallenges[0].skillTarget}</strong> gap in ~{recommendedChallenges[0].durationMinutes}m.
                  </div>
                </div>
              </div>

              <button
                onClick={() => onLaunchChallenge && onLaunchChallenge(recommendedChallenges[0])}
                className="px-3.5 py-1.5 bg-ink text-white hover:bg-ink-light rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
              >
                <span>Launch Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
