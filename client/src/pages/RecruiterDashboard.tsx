import React, { useState, useEffect } from 'react';
import {
  Building2,
  PlusCircle,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Award,
  Star,
  ChevronRight,
  TrendingUp,
  Github,
  Send,
  Layers,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CandidateRanking, JobRequirement, Student } from '../types';

export const RecruiterDashboard: React.FC = () => {
  const { addNotification } = useAuth();
  const [requirements, setRequirements] = useState<JobRequirement[]>([]);
  const [selectedReqId, setSelectedReqId] = useState<string>('req-1');
  const [candidates, setCandidates] = useState<CandidateRanking[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // New Requirement Form State
  const [reqTitle, setReqTitle] = useState('');
  const [reqDept, setReqDept] = useState('Core Engineering & Platform');
  const [reqLocation, setReqLocation] = useState('Bengaluru (Hybrid)');
  const [reqStipend, setReqStipend] = useState('₹75,000 / month + PPO');
  const [reqSkills, setReqSkills] = useState('Node.js, PostgreSQL, Redis, Docker, Distributed Systems');
  const [reqDescription, setReqDescription] = useState('Seeking backend systems engineers with demonstrated proof-of-work in concurrency, caching, and database ACID transactions.');

  // Weekly Intern Evaluation Widget State
  const [evalStudentId, setEvalStudentId] = useState('std-1');
  const [evalWeek, setEvalWeek] = useState(8);
  const [evalTechnical, setEvalTechnical] = useState(5);
  const [evalProblemSolving, setEvalProblemSolving] = useState(5);
  const [evalCollaboration, setEvalCollaboration] = useState(4);
  const [evalCredits, setEvalCredits] = useState(4);
  const [evalComments, setEvalComments] = useState('Aarav delivered exceptional zero-downtime distributed ledger optimizations and passed all code audits.');
  const [evalSubmitted, setEvalSubmitted] = useState(false);

  useEffect(() => {
    loadRecruiterData();
  }, []);

  const loadRecruiterData = async () => {
    const reqRes = await api.getRequirements();
    if (reqRes && reqRes.length > 0) {
      setRequirements(reqRes);
      loadMatches(reqRes[0].id);
    }
  };

  const loadMatches = async (reqId: string) => {
    setSelectedReqId(reqId);
    const matchRes = await api.getRequirementMatches(reqId);
    if (matchRes && matchRes.candidates) {
      setCandidates(matchRes.candidates);
    }
  };

  const handleCreateRequirement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPosting(true);

    const skillsArray = reqSkills.split(',').map(s => s.trim()).filter(Boolean);

    setTimeout(async () => {
      const newReq = await api.createRequirement({
        title: reqTitle || 'Distributed Systems Intern',
        companyName: 'Razorpay',
        department: reqDept,
        location: reqLocation,
        type: 'Internship',
        stipendOrSalary: reqStipend,
        description: reqDescription,
        requiredSkills: skillsArray,
        preferredSkills: ['Kafka', 'Kubernetes'],
        minCgpa: 8.0,
        minSkillScore: 75,
        openings: 4
      });

      setIsPosting(false);
      setShowPostForm(false);
      loadRecruiterData();

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      addNotification({
        title: 'Skill-Vector Requirement Published',
        message: `AI comparison engine matched ${skillsArray.length} skill dimensions against university syllabi.`,
        type: 'match',
        roleTarget: 'recruiter'
      });
    }, 900);
  };

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    setEvalSubmitted(true);

    await api.submitEvaluation(evalStudentId, {
      companyName: 'Razorpay',
      weekNumber: evalWeek,
      technicalCompetence: evalTechnical,
      problemSolving: evalProblemSolving,
      collaboration: evalCollaboration,
      recommendedCredits: evalCredits,
      comments: evalComments,
      evaluatorName: 'Pooja Deshmukh (Lead Technical Partner)'
    });

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#0EA5A0', '#4F46E5', '#F97316']
    });

    addNotification({
      title: 'Intern Evaluation Forwarded to TPO',
      message: `Weekly rating for Aarav Patel submitted. 4 Academic Credits queued for TPO 1-Click approval.`,
      type: 'credit',
      roleTarget: 'recruiter'
    });

    setTimeout(() => setEvalSubmitted(false), 3000);
  };

  const selectedRequirement = requirements.find(r => r.id === selectedReqId) || requirements[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Recruiter Header & Company Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-momentum/15 text-momentum flex items-center justify-center font-bold ring-2 ring-momentum/30 shadow-md">
            <Building2 className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-2xl text-ink">
                Industry Talent & Hiring Desk
              </h1>
              <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-momentum/10 text-momentum border border-momentum/25">
                Razorpay
              </span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5">
              Pooja Deshmukh · Verified Skill-Vector Sourcing & Mentorship Pipeline
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPostForm(!showPostForm)}
          className="px-5 py-3 rounded-2xl bg-ink text-white font-display font-bold text-xs hover:bg-momentum transition-all shadow-md flex items-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-momentum" />
          <span>{showPostForm ? 'Close Form' : 'Post Skill-Vector Requirement'}</span>
        </button>
      </div>

      {/* MODAL / FORM: Post Structured Skill-Vector Requirement */}
      {showPostForm && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-momentum/40 shadow-2xl animate-in fade-in space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-paper-border">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-momentum">
                Structured Skill-Vector Ingestion
              </span>
              <h2 className="font-display font-bold text-lg text-ink">
                Post Requirement with AI Syllabus Alignment
              </h2>
            </div>
            <span className="text-xs font-mono text-ink-muted">Vector-Based Matching</span>
          </div>

          <form onSubmit={handleCreateRequirement} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Infrastructure Intern"
                  value={reqTitle}
                  onChange={e => setReqTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-paper-border text-xs text-ink outline-none focus:border-momentum"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Stipend / Salary Offering</label>
                <input
                  type="text"
                  value={reqStipend}
                  onChange={e => setReqStipend(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-paper-border text-xs text-ink outline-none focus:border-momentum"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                Required Skill Vector Dimensions (Comma separated)
              </label>
              <input
                type="text"
                required
                value={reqSkills}
                onChange={e => setReqSkills(e.target.value)}
                placeholder="e.g. Node.js, PostgreSQL, Redis, Docker, Distributed Systems"
                className="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-paper-border text-xs font-mono text-ink outline-none focus:border-momentum"
              />
              <p className="text-[11px] text-ink-muted mt-1">
                Our AI compares these exact vector dimensions against the college syllabus to compute student delta scores.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Description & Key Deliverables</label>
              <textarea
                rows={3}
                value={reqDescription}
                onChange={e => setReqDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-paper-border text-xs text-ink outline-none focus:border-momentum"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPostForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPosting}
                className="px-6 py-2.5 bg-momentum hover:bg-momentum-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                {isPosting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Calculating Vectors & Indexing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Publish & Run AI Syllabus Match
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Requirement Selector Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-paper-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-momentum" />
          <span className="text-xs font-bold text-ink">Active Industry Openings:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {requirements.map(req => (
            <button
              key={req.id}
              onClick={() => loadMatches(req.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedReqId === req.id
                  ? 'bg-momentum text-white shadow-sm'
                  : 'bg-paper text-ink-muted hover:text-ink hover:bg-paper-darker border border-paper-border'
              }`}
            >
              <span>{req.title}</span>
              <span className="text-[10px] opacity-80">({req.companyName})</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: Candidate Ranking Table (Ranked by Verified Skill Score) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-paper-border">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-momentum" />
              <h2 className="font-display font-bold text-lg text-ink">
                Candidate Ranking by Verified Skill Score & Proof-of-Work
              </h2>
            </div>
            <p className="text-xs text-ink-muted mt-0.5">
              Ranked objectively by completed micro-challenges and GitHub repository corroboration — not unverified resume claims.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-momentum/10 text-momentum rounded">
            {candidates.length} Ranked Candidates
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-paper-border text-[11px] font-mono uppercase tracking-wider text-ink-muted">
                <th className="py-3 px-3">Rank & Candidate</th>
                <th className="py-3 px-3">College & Branch</th>
                <th className="py-3 px-3 text-center">Skill Delta Fit</th>
                <th className="py-3 px-3 text-center">Verified Skill Score</th>
                <th className="py-3 px-3 text-center">Proof-of-Work</th>
                <th className="py-3 px-3 text-right">Hiring Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-border text-xs">
              {candidates.map((cand, idx) => (
                <tr key={cand.studentId} className="hover:bg-paper/60 transition-colors">
                  
                  {/* Candidate Info */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xs text-ink-muted w-4">
                        #{idx + 1}
                      </span>
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-paper-border"
                      />
                      <div>
                        <div className="font-bold text-ink">{cand.name}</div>
                        <div className="text-[10px] font-mono text-ink-muted">CGPA: {cand.cgpa}</div>
                      </div>
                    </div>
                  </td>

                  {/* College */}
                  <td className="py-4 px-3 text-ink-muted">
                    <div className="font-semibold text-ink">{cand.collegeName}</div>
                    <div className="text-[10px]">{cand.department}</div>
                  </td>

                  {/* Delta Match % */}
                  <td className="py-4 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-signal/10 text-signal font-mono font-bold text-xs">
                      {cand.matchPercent}% Match
                    </span>
                  </td>

                  {/* Verified Skill Score (Key Differentiator) */}
                  <td className="py-4 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-momentum/15 text-momentum-dark border border-momentum/30 font-mono font-extrabold text-xs">
                      <Award className="w-3.5 h-3.5 text-momentum" />
                      {cand.verifiedSkillScore}/100
                    </div>
                  </td>

                  {/* Proof-of-Work Badges */}
                  <td className="py-4 px-3 text-center">
                    <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-ink-muted">
                      <span className="flex items-center gap-1">
                        <Github className="w-3.5 h-3.5 text-ink" /> {cand.githubStars} ★
                      </span>
                      <span>·</span>
                      <span className="text-ember font-semibold">
                        {cand.completedChallengesCount} Badges
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => {
                        addNotification({
                          title: `Interview Invite Sent to ${cand.name}`,
                          message: `Invited for ${selectedRequirement.title} based on ${cand.verifiedSkillScore}% Verified Skill Score.`,
                          type: 'match',
                          roleTarget: 'recruiter'
                        });
                        alert(`Interview invitation scheduled for ${cand.name} (${cand.collegeName})!`);
                      }}
                      className="px-3.5 py-1.5 bg-ink hover:bg-momentum text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1"
                    >
                      <span>Fast-Track Hire</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Weekly Intern Evaluation Interface (Feeds TPO Credits) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-glass space-y-6">
        <div className="pb-4 border-b border-paper-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="font-display font-bold text-lg text-ink">
                Weekly Intern Evaluation & Academic Credit Forwarding
              </h2>
            </div>
            <p className="text-xs text-ink-muted mt-0.5">
              Corporate mentors submit milestone evaluations. Once submitted, academic credits automatically route to the University TPO 1-Click approval queue.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 bg-signal/10 text-signal rounded">
            Tripartite Sync Loop
          </span>
        </div>

        <form onSubmit={handleSubmitEvaluation} className="p-6 bg-paper rounded-2xl border border-paper-border space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Active Intern Candidate</label>
              <select
                value={evalStudentId}
                onChange={e => setEvalStudentId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-paper-border text-xs text-ink outline-none"
              >
                <option value="std-1">Aarav Patel (IIT Bombay - B.Tech CSE)</option>
                <option value="std-2">Ananya Iyer (NIT Trichy - B.Tech CSE)</option>
                <option value="std-3">Rohan Sengupta (Anna University - B.Tech IT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Internship Milestone Week</label>
              <input
                type="number"
                min={1}
                max={24}
                value={evalWeek}
                onChange={e => setEvalWeek(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-paper-border text-xs text-ink outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Recommended Academic Credits</label>
              <input
                type="number"
                min={1}
                max={12}
                value={evalCredits}
                onChange={e => setEvalCredits(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-paper-border text-xs font-bold text-signal outline-none"
              />
            </div>
          </div>

          {/* 3 Rating Sliders / Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-white rounded-xl border border-paper-border">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-ink">Technical Competence</span>
                <span className="font-mono font-bold text-momentum">{evalTechnical}/5</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={evalTechnical}
                onChange={e => setEvalTechnical(Number(e.target.value))}
                className="w-full accent-momentum"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-ink">Problem Solving</span>
                <span className="font-mono font-bold text-signal">{evalProblemSolving}/5</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={evalProblemSolving}
                onChange={e => setEvalProblemSolving(Number(e.target.value))}
                className="w-full accent-signal"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-ink">Team Collaboration</span>
                <span className="font-mono font-bold text-ember">{evalCollaboration}/5</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={evalCollaboration}
                onChange={e => setEvalCollaboration(Number(e.target.value))}
                className="w-full accent-ember"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1">Mentor Qualitative Feedback</label>
            <textarea
              rows={2}
              value={evalComments}
              onChange={e => setEvalComments(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-paper-border text-xs text-ink outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {evalSubmitted ? (
              <span className="text-xs font-bold text-momentum flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Evaluation submitted & forwarded to University TPO!
              </span>
            ) : (
              <span className="text-[11px] text-ink-muted">Signs off industry internship verification</span>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 bg-momentum hover:bg-momentum-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              Submit Weekly Evaluation & Forward Credits
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
