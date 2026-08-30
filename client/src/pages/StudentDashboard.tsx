import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  BookOpen,
  Github,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Star,
  GitBranch,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SkillDeltaGauge } from '../components/common/SkillDeltaGauge';
import { CodeSandboxModal } from '../components/common/CodeSandboxModal';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { JobRequirement, MicroChallenge, Student, AcademicCredit } from '../types';

export const StudentDashboard: React.FC = () => {
  const { studentProfile, addNotification } = useAuth();
  const [requirements, setRequirements] = useState<JobRequirement[]>([]);
  const [selectedReqId, setSelectedReqId] = useState<string>('req-1');
  const [skillGapData, setSkillGapData] = useState<any>(null);
  const [challenges, setChallenges] = useState<MicroChallenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<MicroChallenge | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [credits, setCredits] = useState<AcademicCredit[]>([]);
  const [githubSyncing, setGithubSyncing] = useState(false);
  const [profile, setProfile] = useState<Student | null>(null);

  // Load initial data
  useEffect(() => {
    loadData();
  }, [studentProfile]);

  const loadData = async () => {
    const studentId = studentProfile?.id || 'std-1';
    
    // Fetch profile
    const profileRes = await api.getStudentProfile(studentId);
    if (profileRes?.student) {
      setProfile(profileRes.student);
      setCredits(profileRes.credits || []);
    }

    // Fetch requirements
    const reqRes = await api.getRequirements();
    if (reqRes && reqRes.length > 0) {
      setRequirements(reqRes);
      setSelectedReqId(reqRes[0].id);
      fetchDelta(studentId, reqRes[0].id);
    }

    // Fetch micro-challenges
    const chRes = await api.getChallenges();
    if (chRes) {
      setChallenges(chRes);
    }
  };

  const fetchDelta = async (studentId: string, reqId: string) => {
    const delta = await api.getSkillGap(studentId, reqId);
    if (delta) {
      setSkillGapData(delta);
    }
  };

  const handleRequirementChange = (reqId: string) => {
    setSelectedReqId(reqId);
    if (profile) {
      fetchDelta(profile.id, reqId);
    }
  };

  const handleLaunchSandbox = (challenge: MicroChallenge) => {
    setSelectedChallenge(challenge);
    setIsSandboxOpen(true);
  };

  const handleGithubSync = async () => {
    if (!profile) return;
    setGithubSyncing(true);
    const res = await api.syncGithub(profile.id, profile.githubUsername || 'aaravpatel-dev');
    setTimeout(() => {
      setGithubSyncing(false);
      if (res && res.verifiedSkillScore) {
        setProfile(prev => prev ? { ...prev, verifiedSkillScore: res.verifiedSkillScore } : null);
        addNotification({
          title: 'GitHub Repositories Corroborated',
          message: 'Analyzed commits & codebases. Verified Skill Score increased to ' + res.verifiedSkillScore + '%.',
          type: 'challenge',
          roleTarget: 'student'
        });
      }
    }, 1000);
  };

  const selectedRequirement = requirements.find(r => r.id === selectedReqId) || requirements[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Student Welcome & Top Metrics Strip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Student Avatar"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-ember/30 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-2xl text-ink">
                {profile?.name || 'Aarav Patel'}
              </h1>
              <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-ember/10 text-ember border border-ember/25">
                B.Tech CSE '26
              </span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5">
              {profile?.collegeName || 'IIT Bombay'} · Roll No: 220050042 · CGPA: <strong className="text-ink">{profile?.cgpa || 8.92}</strong>
            </p>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-3 bg-paper rounded-2xl border border-paper-border text-center min-w-[120px]">
            <div className="text-[10px] font-mono text-ink-muted uppercase font-semibold">Verified Score</div>
            <div className="font-mono font-extrabold text-xl text-ember mt-0.5">
              {profile?.verifiedSkillScore || 84}/100
            </div>
          </div>

          <div className="px-4 py-3 bg-paper rounded-2xl border border-paper-border text-center min-w-[120px]">
            <div className="text-[10px] font-mono text-ink-muted uppercase font-semibold">Academic Credits</div>
            <div className="font-mono font-extrabold text-xl text-signal mt-0.5">
              {profile?.totalCreditsEarned || 18} / {profile?.targetCredits || 24}
            </div>
          </div>

          <div className="px-4 py-3 bg-paper rounded-2xl border border-paper-border text-center min-w-[120px]">
            <div className="text-[10px] font-mono text-ink-muted uppercase font-semibold">Challenges Solved</div>
            <div className="font-mono font-extrabold text-xl text-momentum mt-0.5">
              {profile?.completedChallengesCount || 6} Badges
            </div>
          </div>
        </div>
      </div>

      {/* Target Requirement Selector Bar */}
      <div className="bg-white rounded-2xl p-4 border border-paper-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-momentum" />
          <span className="text-xs font-bold text-ink">Select Target Industry Requirement to Map Delta:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {requirements.map(req => (
            <button
              key={req.id}
              onClick={() => handleRequirementChange(req.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedReqId === req.id
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-paper text-ink-muted hover:text-ink hover:bg-paper-darker border border-paper-border'
              }`}
            >
              <span>{req.companyName}</span>
              <span className="text-[10px] opacity-70">({req.title.slice(0, 16)}...)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live AI Skill Delta Radial Gauge Component */}
      {skillGapData && (
        <SkillDeltaGauge
          matchPercent={skillGapData.matchPercent}
          matchedSkills={skillGapData.matchedSkills}
          missingSkills={skillGapData.missingSkills}
          requirementTitle={skillGapData.requirementTitle}
          companyName={skillGapData.companyName}
          recommendedChallenges={skillGapData.recommendedChallenges}
          onLaunchChallenge={handleLaunchSandbox}
        />
      )}

      {/* Two-Column Grid: Guided Micro-Challenges + GitHub Proof-of-Work */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Guided Micro-Upskilling Challenges */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                <Code2 className="w-5 h-5 text-ember" />
                Guided Micro-Challenges to Close Industry Gaps
              </h2>
              <p className="text-xs text-ink-muted">
                Each verified challenge upgrades your Verified Skill Score & ranks you higher in recruiter queues.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-ember/10 text-ember rounded-md">
              {challenges.length} Available
            </span>
          </div>

          <div className="space-y-3">
            {challenges.map(ch => (
              <div
                key={ch.id}
                className="bg-white rounded-2xl p-5 border border-paper-border shadow-sm hover:shadow-glass hover:border-ember/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-signal/10 text-signal border border-signal/20">
                      {ch.skillTarget}
                    </span>
                    <span className="text-[11px] font-mono text-ink-muted">
                      ⏱ {ch.durationMinutes} min · {ch.difficulty}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-ink">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                    {ch.description}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-paper-border/60">
                  <span className="text-xs font-mono font-bold text-momentum">
                    +{ch.points} XP Verified
                  </span>
                  <button
                    onClick={() => handleLaunchSandbox(ch)}
                    className="px-3.5 py-1.5 bg-ink hover:bg-ember text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Solve in Sandbox</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Proof-of-Work & Verified Portfolio */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* GitHub Proof-of-Work Panel */}
          <div className="bg-white rounded-3xl p-6 border border-paper-border shadow-glass space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-paper-border">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-ink" />
                <h3 className="font-display font-bold text-sm text-ink">Proof-of-Work Corroboration</h3>
              </div>
              <button
                onClick={handleGithubSync}
                disabled={githubSyncing}
                className="px-2.5 py-1 rounded-lg bg-paper border border-paper-border hover:bg-white text-[11px] font-semibold text-ink flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${githubSyncing ? 'animate-spin' : ''}`} />
                <span>{githubSyncing ? 'Syncing...' : 'Re-Sync'}</span>
              </button>
            </div>

            <p className="text-xs text-ink-muted leading-relaxed">
              GitHub repository codebase and commit history analyzed to corroborate self-claimed skills with real commit data.
            </p>

            <div className="space-y-3">
              {(profile?.githubRepos || []).map(repo => (
                <div key={repo.id} className="p-3.5 bg-paper rounded-2xl border border-paper-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-signal flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5" />
                      {repo.name}
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {repo.stars} stars
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted leading-snug">
                    {repo.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {repo.detectedSkills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white text-ink text-[10px] font-mono font-semibold rounded border border-paper-border">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Credit Transcript (NEP-2020) */}
          <div className="bg-white rounded-3xl p-6 border border-paper-border shadow-glass space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-paper-border">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-signal" />
                <h3 className="font-display font-bold text-sm text-ink">Academic Degree Credits</h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-signal/10 text-signal">
                NEP 2020 Validated
              </span>
            </div>

            <div className="space-y-3">
              {credits.map(crd => (
                <div key={crd.id} className="p-3.5 bg-paper rounded-2xl border border-paper-border space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ink">{crd.companyName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      crd.status === 'approved'
                        ? 'bg-momentum/15 text-momentum'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {crd.status === 'approved' ? '✔ Credits Awarded' : '⏳ Awaiting TPO Sign-Off'}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    Role: {crd.internshipRole} · <strong className="text-ink">{crd.creditsRequested} Credits</strong>
                  </p>
                  <p className="text-[11px] text-ink-muted italic border-t border-paper-border/60 pt-1.5">
                    Mentor rating: {crd.mentorRating}/5 — "{crd.mentorFeedback}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Embedded Interactive Code Sandbox Modal */}
      <CodeSandboxModal
        challenge={selectedChallenge}
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        onSuccess={() => {
          if (profile && selectedChallenge) {
            setProfile({
              ...profile,
              verifiedSkillScore: Math.min(99, profile.verifiedSkillScore + 3),
              completedChallengesCount: profile.completedChallengesCount + 1
            });
            fetchDelta(profile.id, selectedReqId);
          }
        }}
      />

    </div>
  );
};
