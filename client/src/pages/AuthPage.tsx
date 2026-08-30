import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, GraduationCap, Building2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
  const { switchRoleDemo } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'student' | 'tpo' | 'recruiter'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInstantDemo = (role: 'student' | 'tpo' | 'recruiter') => {
    switchRoleDemo(role);
    if (role === 'student') navigate('/student');
    else if (role === 'tpo') navigate('/tpo');
    else if (role === 'recruiter') navigate('/recruiter');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInstantDemo(selectedRole);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-paper-border shadow-glass space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-ink text-white font-mono font-bold text-base flex items-center justify-center mx-auto shadow-md">
            S|B
          </div>
          <h1 className="font-display font-bold text-2xl text-ink">SkillBridge Tripartite Access</h1>
          <p className="text-xs text-ink-muted">Sign in to your role-specific dashboard or use instant demo access.</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-paper rounded-2xl border border-paper-border">
          <button
            type="button"
            onClick={() => setSelectedRole('student')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              selectedRole === 'student' ? 'bg-white text-ember shadow-sm' : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('tpo')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              selectedRole === 'tpo' ? 'bg-white text-signal shadow-sm' : 'text-ink-muted hover:text-ink'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>TPO</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('recruiter')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              selectedRole === 'recruiter' ? 'bg-white text-momentum shadow-sm' : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Recruiter</span>
          </button>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink mb-1">Registered Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={
                selectedRole === 'student'
                  ? 'aarav.patel@iitb.ac.in'
                  : selectedRole === 'tpo'
                  ? 'tpo.head@iitb.ac.in'
                  : 'pooja.deshmukh@razorpay.com'
              }
              className="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-paper-border text-xs text-ink outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-paper-border text-xs text-ink outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-ink hover:bg-ink-light text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Sign In to {selectedRole.toUpperCase()} Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Instant Demo One-Click Access Shortcuts */}
        <div className="pt-4 border-t border-paper-border space-y-2.5">
          <div className="text-[10px] font-mono text-center text-ink-muted uppercase font-bold tracking-wider">
            ⚡ 1-Click Instant Demo Portals
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleInstantDemo('student')}
              className="w-full py-2 px-3 rounded-xl bg-ember/10 hover:bg-ember/20 text-ember text-xs font-bold border border-ember/20 flex items-center justify-between transition-colors"
            >
              <span>Demo Student (Aarav Patel - IIT Bombay)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleInstantDemo('tpo')}
              className="w-full py-2 px-3 rounded-xl bg-signal/10 hover:bg-signal/20 text-signal text-xs font-bold border border-signal/20 flex items-center justify-between transition-colors"
            >
              <span>Demo TPO (Dr. Ramesh Sundaram - IITB Head)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleInstantDemo('recruiter')}
              className="w-full py-2 px-3 rounded-xl bg-momentum/10 hover:bg-momentum/20 text-momentum text-xs font-bold border border-momentum/20 flex items-center justify-between transition-colors"
            >
              <span>Demo Recruiter (Pooja Deshmukh - Razorpay)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
