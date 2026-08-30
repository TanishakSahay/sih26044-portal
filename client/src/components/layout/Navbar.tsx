import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Building2,
  UserCheck,
  Bell,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, switchRoleDemo, notifications, unreadCount, markAllNotificationsRead } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (newRole: 'student' | 'tpo' | 'recruiter') => {
    switchRoleDemo(newRole);
    setShowRoleDropdown(false);
    if (newRole === 'student') navigate('/student');
    else if (newRole === 'tpo') navigate('/tpo');
    else if (newRole === 'recruiter') navigate('/recruiter');
  };

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-paper-border/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo with Tripartite Connective Icon */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center shadow-md relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-tr from-signal via-momentum to-ember opacity-85"></div>
            <div className="relative z-10 flex items-center justify-center text-white font-mono font-bold text-sm tracking-tighter">
              S|B
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-xl tracking-tight text-ink">SkillBridge</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-signal/10 text-signal border border-signal/20 rounded">
                SIH26044
              </span>
            </div>
            <p className="text-[11px] text-ink-muted -mt-1 hidden sm:block">Tripartite Academia · Industry · Student Loop</p>
          </div>
        </Link>

        {/* Central Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-paper-darker/60 p-1 rounded-xl border border-paper-border">
          <Link
            to="/student"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              location.pathname.startsWith('/student')
                ? 'bg-white text-ember shadow-sm font-bold'
                : 'text-ink-muted hover:text-ink hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-ember" />
            Student Workspace
          </Link>

          <Link
            to="/tpo"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              location.pathname.startsWith('/tpo')
                ? 'bg-white text-signal shadow-sm font-bold'
                : 'text-ink-muted hover:text-ink hover:bg-white/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-signal" />
            TPO Academia
          </Link>

          <Link
            to="/recruiter"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              location.pathname.startsWith('/recruiter')
                ? 'bg-white text-momentum shadow-sm font-bold'
                : 'text-ink-muted hover:text-ink hover:bg-white/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-momentum" />
            Industry Hiring
          </Link>
        </nav>

        {/* Right Side: Demo Role Switcher + Notification Bell + User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Quick Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              id="role-switcher-btn"
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-paper-border shadow-sm hover:border-signal/40 transition-all text-xs font-medium"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-ink-muted hidden lg:inline">Active Demo:</span>
                {role === 'student' && (
                  <span className="inline-flex items-center gap-1 text-ember font-bold">
                    <span className="w-2 h-2 rounded-full bg-ember animate-pulse"></span> Student
                  </span>
                )}
                {role === 'tpo' && (
                  <span className="inline-flex items-center gap-1 text-signal font-bold">
                    <span className="w-2 h-2 rounded-full bg-signal animate-pulse"></span> TPO (Academia)
                  </span>
                )}
                {role === 'recruiter' && (
                  <span className="inline-flex items-center gap-1 text-momentum font-bold">
                    <span className="w-2 h-2 rounded-full bg-momentum animate-pulse"></span> Recruiter (Industry)
                  </span>
                )}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-ink-muted" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-paper-border p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 text-[11px] font-semibold text-ink-muted uppercase tracking-wider border-b border-paper-border/60">
                  Switch Active Portal Role
                </div>
                
                <button
                  onClick={() => handleRoleChange('student')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    role === 'student' ? 'bg-ember/10 text-ember font-bold' : 'hover:bg-paper text-ink'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-ember/15 text-ember flex items-center justify-center font-bold">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-ink">Student Workspace</div>
                      <div className="text-[10px] text-ink-muted">Aarav Patel (IIT Bombay)</div>
                    </div>
                  </div>
                  {role === 'student' && <CheckCircle2 className="w-4 h-4 text-ember" />}
                </button>

                <button
                  onClick={() => handleRoleChange('tpo')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    role === 'tpo' ? 'bg-signal/10 text-signal font-bold' : 'hover:bg-paper text-ink'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-signal/15 text-signal flex items-center justify-center font-bold">
                      T
                    </div>
                    <div>
                      <div className="font-semibold text-ink">TPO / Academia Desk</div>
                      <div className="text-[10px] text-ink-muted">Dr. Ramesh Sundaram (TPO Head)</div>
                    </div>
                  </div>
                  {role === 'tpo' && <CheckCircle2 className="w-4 h-4 text-signal" />}
                </button>

                <button
                  onClick={() => handleRoleChange('recruiter')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    role === 'recruiter' ? 'bg-momentum/10 text-momentum font-bold' : 'hover:bg-paper text-ink'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-momentum/15 text-momentum flex items-center justify-center font-bold">
                      R
                    </div>
                    <div>
                      <div className="font-semibold text-ink">Industry Recruiter Desk</div>
                      <div className="text-[10px] text-ink-muted">Pooja Deshmukh (Razorpay)</div>
                    </div>
                  </div>
                  {role === 'recruiter' && <CheckCircle2 className="w-4 h-4 text-momentum" />}
                </button>
              </div>
            )}
          </div>

          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              id="notification-bell-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markAllNotificationsRead();
              }}
              className="relative p-2 rounded-xl bg-white border border-paper-border hover:bg-paper hover:border-signal/30 transition-all text-ink"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ember text-white text-[9px] font-mono font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-paper-border p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-paper-border">
                  <div className="font-display font-bold text-sm text-ink flex items-center gap-2">
                    <Bell className="w-4 h-4 text-signal" />
                    Tripartite Loop Activity
                  </div>
                  <span className="text-[11px] text-ink-muted">Live sync</span>
                </div>

                <div className="divide-y divide-paper-border/60 max-h-72 overflow-y-auto my-1">
                  {notifications.map(n => (
                    <div key={n.id} className="py-2.5 px-2 hover:bg-paper/80 rounded-xl transition-colors">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-signal mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="text-xs font-bold text-ink">{n.title}</div>
                          <div className="text-[11px] text-ink-muted leading-relaxed mt-0.5">{n.message}</div>
                          <div className="text-[10px] font-mono text-ink-subtle mt-1">{n.timestamp}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-paper-border text-center">
                  <span className="text-[11px] text-signal font-semibold">Closed-loop webhook notifications active</span>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-paper-border">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-paper-border shadow-sm"
            />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-ink leading-tight">{user.name}</div>
              <div className="text-[10px] text-ink-muted leading-none capitalize">{user.role}</div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
