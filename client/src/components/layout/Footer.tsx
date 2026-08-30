import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-paper-border bg-paper-card/80 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center text-white font-mono font-bold text-xs">
                S|B
              </div>
              <span className="font-display font-bold text-lg text-ink">SkillBridge</span>
              <span className="text-xs font-mono px-2 py-0.5 bg-signal/10 text-signal rounded">SIH26044 MVP</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed max-w-md">
              A tripartite ecosystem aligning University Syllabi with dynamic Industry Requirements via AI Skill-Delta Mapping, Verified Micro-Challenges, and Automated 1-Click Academic Credit Approvals.
            </p>
            <div className="flex items-center gap-4 mt-4 text-xs text-ink-muted">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-momentum" /> AICTE / UGC Compliant</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-signal" /> NEP 2020 Credit Framework</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-ink mb-3 uppercase tracking-wider">Platform Portals</h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>
                <Link to="/student" className="hover:text-ember flex items-center gap-1.5 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-ember" /> Student Workspace
                </Link>
              </li>
              <li>
                <Link to="/tpo" className="hover:text-signal flex items-center gap-1.5 transition-colors">
                  <GraduationCap className="w-3.5 h-3.5 text-signal" /> TPO Academia Portal
                </Link>
              </li>
              <li>
                <Link to="/recruiter" className="hover:text-momentum flex items-center gap-1.5 transition-colors">
                  <Building2 className="w-3.5 h-3.5 text-momentum" /> Industry Recruiter Desk
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-ink flex items-center gap-1.5 transition-colors">
                  Closed-Loop Feedback Flow
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-ink mb-3 uppercase tracking-wider">Tripartite Nodes</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-signal/5 border border-signal/15">
                <span className="font-bold text-signal">Academia (TPOs):</span> Upload syllabus, track batch readiness, 1-click credit sign-off.
              </div>
              <div className="p-2.5 rounded-xl bg-momentum/5 border border-momentum/15">
                <span className="font-bold text-momentum">Industry (Recruiters):</span> Post skill-vectors, hire verified talent, submit evaluations.
              </div>
              <div className="p-2.5 rounded-xl bg-ember/5 border border-ember/15">
                <span className="font-bold text-ember">Students:</span> Measure delta gauge, solve micro-challenges, earn credit.
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-paper-border flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
          <div>
            Built for Smart India Hackathon — Problem Statement <span className="font-mono font-semibold text-ink">SIH26044</span>
          </div>
          <div className="font-mono">
            Status: <span className="text-momentum font-bold">● Closed-Loop API Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
