import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Award,
  Layers,
  BarChart3,
  Users,
  Building2,
  Check,
  X,
  FileCheck,
  Plus,
  RefreshCw
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { AcademicCredit, CapstoneProject, Syllabus, TpoBatchAnalytics } from '../types';

export const TpoDashboard: React.FC = () => {
  const { addNotification } = useAuth();
  const [analytics, setAnalytics] = useState<TpoBatchAnalytics | null>(null);
  const [pendingCredits, setPendingCredits] = useState<AcademicCredit[]>([]);
  const [syllabi, setSyllabi] = useState<Syllabus[]>([]);
  const [capstones, setCapstones] = useState<CapstoneProject[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [newSyllabusDept, setNewSyllabusDept] = useState('Computer Science & Engineering');
  const [newSyllabusBatch, setNewSyllabusBatch] = useState('2024-2028');

  useEffect(() => {
    loadTpoData();
  }, []);

  const loadTpoData = async () => {
    const analyticsRes = await api.getTpoAnalytics('col-1');
    if (analyticsRes) setAnalytics(analyticsRes);

    const creditsRes = await api.getPendingCredits();
    if (creditsRes) setPendingCredits(creditsRes);

    const sylRes = await api.getSyllabi();
    if (sylRes) setSyllabi(sylRes);

    const capRes = await api.getCapstones();
    if (capRes) setCapstones(capRes);
  };

  const handleSyllabusUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadSuccess(false);

    setTimeout(async () => {
      await api.uploadSyllabus({
        department: newSyllabusDept,
        batch: newSyllabusBatch,
        fileName: `${newSyllabusDept.replace(/\s+/g, '_')}_Curriculum_${newSyllabusBatch}.pdf`
      });

      setIsUploading(false);
      setUploadSuccess(true);
      loadTpoData();

      addNotification({
        title: 'Syllabus PDF Parsed by AI Engine',
        message: `Indexed curriculum for ${newSyllabusDept} (${newSyllabusBatch}). Skill vectors updated.`,
        type: 'match',
        roleTarget: 'tpo'
      });
    }, 1200);
  };

  const handle1ClickApproveCredit = async (creditId: string, studentName: string, credits: number) => {
    setApprovingId(creditId);

    setTimeout(async () => {
      await api.approveCredit(creditId, 'Dr. Ramesh Sundaram (TPO Head)');
      setPendingCredits(prev => prev.filter(c => c.id !== creditId));
      setApprovingId(null);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4F46E5', '#0EA5A0']
      });

      addNotification({
        title: 'Academic Credit Auto-Awarded',
        message: `Approved ${credits} credits for ${studentName}. Official transcript updated under NEP-2020.`,
        type: 'credit',
        roleTarget: 'tpo'
      });
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* TPO Header & Institute Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-signal/15 text-signal flex items-center justify-center font-bold ring-2 ring-signal/30 shadow-md">
            <GraduationCap className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-2xl text-ink">
                Training & Placement Officer (TPO) Desk
              </h1>
              <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-signal/10 text-signal border border-signal/25">
                IIT Bombay (IITB)
              </span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5">
              Dr. Ramesh Sundaram · Autonomous Curriculum & Academic Credit Sign-Off Authority
            </p>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-3 bg-paper rounded-2xl border border-paper-border text-center min-w-[120px]">
            <div className="text-[10px] font-mono text-ink-muted uppercase font-semibold">Placement Ready</div>
            <div className="font-mono font-extrabold text-xl text-momentum mt-0.5">
              {analytics?.readyForPlacementPercent || 82}%
            </div>
          </div>

          <div className="px-4 py-3 bg-paper rounded-2xl border border-paper-border text-center min-w-[120px]">
            <div className="text-[10px] font-mono text-ink-muted uppercase font-semibold">Avg Skill Score</div>
            <div className="font-mono font-extrabold text-xl text-signal mt-0.5">
              {analytics?.averageSkillScore || 81}/100
            </div>
          </div>

          <div className="px-4 py-3 bg-paper rounded-2xl border border-paper-border text-center min-w-[120px]">
            <div className="text-[10px] font-mono text-ink-muted uppercase font-semibold">Pending Credits</div>
            <div className="font-mono font-extrabold text-xl text-ember mt-0.5">
              {pendingCredits.length} Requests
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: 1-Click Credit Approval Queue (The Key Tripartite Handshake) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-paper-border">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-signal" />
              <h2 className="font-display font-bold text-lg text-ink">
                1-Click Academic Credit Approval Queue
              </h2>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-ember/15 text-ember">
                {pendingCredits.length} Action Needed
              </span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5">
              Corporate mentors submit weekly verified evaluation reports. TPO reviews ratings and signs off official academic degree credits in one click.
            </p>
          </div>
          <span className="text-[11px] font-mono text-ink-muted">NEP 2020 Framework</span>
        </div>

        {pendingCredits.length === 0 ? (
          <div className="p-8 text-center bg-paper rounded-2xl border border-paper-border">
            <CheckCircle2 className="w-8 h-8 text-momentum mx-auto mb-2" />
            <div className="text-sm font-bold text-ink">All Academic Credit Requests Signed Off!</div>
            <p className="text-xs text-ink-muted mt-1">
              New submissions from corporate mentors will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingCredits.map(crd => (
              <div
                key={crd.id}
                className="p-5 rounded-2xl bg-paper border border-paper-border flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-signal/15 text-signal flex items-center justify-center font-bold text-xs">
                        {crd.studentName.slice(0, 1)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-ink">{crd.studentName}</div>
                        <div className="text-[11px] text-ink-muted">{crd.companyName} · {crd.internshipRole}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-signal">
                        +{crd.creditsRequested} Credits
                      </span>
                      <div className="text-[10px] font-mono text-ink-muted">Requested</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-paper-border space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">Corporate Mentor Evaluation:</span>
                      <span className="font-mono font-bold text-amber-600">★ {crd.mentorRating}/5.0</span>
                    </div>
                    <p className="text-xs text-ink-muted italic leading-relaxed">
                      "{crd.mentorFeedback}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-paper-border/60">
                  <span className="text-[11px] font-mono text-ink-muted">Submitted: {crd.submissionDate}</span>
                  <button
                    onClick={() => handle1ClickApproveCredit(crd.id, crd.studentName, crd.creditsRequested)}
                    disabled={approvingId === crd.id}
                    className="px-4 py-2 bg-signal hover:bg-signal-dark text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                  >
                    {approvingId === crd.id ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Signing Sign-Off...
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        1-Click Sign-Off & Award Credit
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: Batch Analytics Distribution Charts (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (7 cols): Branch Placement Readiness Comparison */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-paper-border">
            <div>
              <h3 className="font-display font-bold text-base text-ink flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-signal" />
                Batch Skill Readiness by Department
              </h3>
              <p className="text-xs text-ink-muted">
                Measures aggregate student verified skill scores vs industry hiring thresholds.
              </p>
            </div>
            <span className="text-xs font-mono text-ink-muted">Batch 2022-2026</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.branchReadiness || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="branch" tick={{ fontSize: 11, fill: '#6E7681' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#6E7681' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#161B22', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="avgReadiness" name="Average Skill Readiness %" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="placedCount" name="Placed / PPO Secured Count" fill="#0EA5A0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right (5 cols): Syllabus Taught vs Industry Demanded (Radar / Skill Distribution) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass space-y-4">
          <div className="pb-3 border-b border-paper-border">
            <h3 className="font-display font-bold text-base text-ink flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-ember" />
              Syllabus vs Industry Demand Gap
            </h3>
            <p className="text-xs text-ink-muted">
              Identifies curricula topics requiring immediate syllabus update or micro-upskilling intervention.
            </p>
          </div>

          <div className="space-y-3">
            {(analytics?.skillDistribution || []).map((sk, idx) => {
              const gap = sk.industryDemanded - sk.syllabusTaught;
              return (
                <div key={idx} className="p-3 bg-paper rounded-2xl border border-paper-border space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-ink">{sk.skillCategory}</span>
                    <span className={`font-mono font-bold text-[10px] px-1.5 py-0.5 rounded ${
                      gap > 30 ? 'bg-ember/15 text-ember' : 'bg-momentum/15 text-momentum'
                    }`}>
                      {gap > 0 ? `-${gap}% Gap` : 'Aligned'}
                    </span>
                  </div>
                  
                  {/* Visual Bar Comparison */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-ink-muted">
                      <span>Curriculum Taught: {sk.syllabusTaught}%</span>
                      <span>Industry Demand: {sk.industryDemanded}%</span>
                    </div>
                    <div className="h-2 w-full bg-paper-border rounded-full overflow-hidden flex">
                      <div className="bg-signal h-full" style={{ width: `${sk.syllabusTaught}%` }}></div>
                      <div className="bg-ember h-full" style={{ width: `${Math.max(0, gap)}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* SECTION 3: Syllabus PDF Parser & Extracted Competencies */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-border">
          <div>
            <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2">
              <Upload className="w-5 h-5 text-signal" />
              Syllabus PDF Uploader & Entity Parser
            </h2>
            <p className="text-xs text-ink-muted">
              Upload university syllabus PDF files to automatically extract course competencies and map them against industry requirements.
            </p>
          </div>
        </div>

        {/* Upload Form Box */}
        <form onSubmit={handleSyllabusUpload} className="p-6 bg-paper rounded-2xl border border-paper-border space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Academic Department</label>
              <input
                type="text"
                value={newSyllabusDept}
                onChange={e => setNewSyllabusDept(e.target.value)}
                className="w-full px-3.5 py-2 bg-white rounded-xl border border-paper-border text-xs text-ink outline-none focus:border-signal"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Target Batch</label>
              <input
                type="text"
                value={newSyllabusBatch}
                onChange={e => setNewSyllabusBatch(e.target.value)}
                className="w-full px-3.5 py-2 bg-white rounded-xl border border-paper-border text-xs text-ink outline-none focus:border-signal"
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-paper-border rounded-xl p-6 text-center bg-white/60">
            <FileText className="w-8 h-8 text-signal mx-auto mb-2 opacity-70" />
            <div className="text-xs font-bold text-ink">Drop University Curriculum PDF or click to browse</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Supports PDF syllabus with AI topic entity tagging</div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {uploadSuccess && (
              <span className="text-xs font-bold text-momentum flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Syllabus parsed & skill vectors vectorized!
              </span>
            )}
            {!uploadSuccess && <span></span>}

            <button
              type="submit"
              disabled={isUploading}
              className="px-5 py-2.5 bg-signal hover:bg-signal-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running AI Parser Pipeline...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Parse Syllabus & Update Vector Index
                </>
              )}
            </button>
          </div>
        </form>

        {/* Existing Parsed Syllabi Topics */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider">
            Active Extracted Curriculum Topics ({syllabi[0]?.topics?.length || 0})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(syllabi[0]?.topics || []).map((t, idx) => (
              <div key={idx} className="p-4 bg-paper rounded-2xl border border-paper-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-signal">
                    {t.courseCode} · Sem {t.semester}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-momentum/15 text-momentum">
                    {t.matchReadinessScore}% Aligned
                  </span>
                </div>
                <div className="font-bold text-xs text-ink">{t.courseName}</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {t.extractedSkills.map((sk, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white text-ink text-[10px] font-mono font-semibold rounded border border-paper-border">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: Corporate Capstone Sponsorship Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-paper-border">
          <div>
            <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2">
              <Building2 className="w-5 h-5 text-momentum" />
              Corporate Sponsored Capstone Projects
            </h2>
            <p className="text-xs text-ink-muted">
              Industry partners sponsor final-year capstone engineering deliverables with financial grants and mentor guidance.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-momentum/10 text-momentum rounded">
            {capstones.length} Active Grants
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capstones.map(cap => (
            <div key={cap.id} className="p-5 bg-paper rounded-2xl border border-paper-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-ink border border-paper-border">
                  {cap.companyName}
                </span>
                <span className="font-mono font-bold text-xs text-momentum">{cap.stipend}</span>
              </div>
              <h3 className="font-display font-bold text-sm text-ink">{cap.title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">{cap.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-paper-border/60 text-xs">
                <span className="text-ink-muted">Teams: {cap.enrolledTeams} / {cap.maxTeams} Enrolled</span>
                <span className="font-mono font-semibold text-signal">Deadline: {cap.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
