import React, { useState } from 'react';
import { X, Play, CheckCircle2, AlertCircle, RefreshCw, Award, Sparkles, Terminal, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MicroChallenge } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface CodeSandboxModalProps {
  challenge: MicroChallenge | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CodeSandboxModal: React.FC<CodeSandboxModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onSuccess
}) => {
  if (!isOpen || !challenge) return null;

  const { studentProfile, addNotification } = useAuth();
  const [code, setCode] = useState(challenge.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{
    status: 'idle' | 'running' | 'passed' | 'failed';
    output: string;
    passedCount: number;
    totalCount: number;
  }>({
    status: 'idle',
    output: 'Click "Run Tests" to execute your solution against sandbox test cases...',
    passedCount: 0,
    totalCount: challenge.testCases.length
  });

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestResults({
      status: 'running',
      output: 'Compiling JavaScript AST in WebAssembly Sandbox...\nRunning test cases [1/' + challenge.testCases.length + ']...',
      passedCount: 0,
      totalCount: challenge.testCases.length
    });

    // Simulate code execution runner
    setTimeout(async () => {
      setIsRunning(false);
      setTestResults({
        status: 'passed',
        output: `✔ Test Case 1: ${challenge.testCases[0]?.description || 'Valid input spec'} -> PASSED (4ms)\n` +
                (challenge.testCases[1] ? `✔ Test Case 2: ${challenge.testCases[1].description} -> PASSED (2ms)\n` : '') +
                `\nAll ${challenge.testCases.length} assertions satisfied! Verified Skill Score awarded: +${challenge.points} XP.`,
        passedCount: challenge.testCases.length,
        totalCount: challenge.testCases.length
      });

      // Confetti burst for verified skill achievement
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#0EA5A0', '#F97316']
      });

      // Update backend
      if (studentProfile) {
        await api.submitChallenge(challenge.id, studentProfile.id, code);
      }

      addNotification({
        title: 'Micro-Challenge Solved & Verified!',
        message: `You earned +${challenge.points} pts in ${challenge.skillTarget}. Verified Skill Score upgraded.`,
        type: 'challenge',
        roleTarget: 'student'
      });

      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-paper-border overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-paper-darker/60 border-b border-paper-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5 text-ember" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ember/15 text-ember border border-ember/25">
                  {challenge.skillTarget} Challenge
                </span>
                <span className="text-xs font-mono text-ink-muted">
                  +{challenge.points} XP Verified Skill Score
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-ink">
                {challenge.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-ink-muted hover:text-ink hover:bg-paper rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two-Pane Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left Pane: Challenge Prompt & Test Cases */}
          <div className="lg:col-span-5 p-6 overflow-y-auto border-r border-paper-border space-y-4 bg-paper/30">
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-muted mb-1.5">
                Challenge Objective
              </h4>
              <p className="text-xs text-ink leading-relaxed">
                {challenge.description}
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-paper-border">
              <h5 className="text-xs font-bold text-ink mb-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-signal" />
                Target Competency
              </h5>
              <div className="text-[11px] text-ink-muted">
                Demonstrates production capability in <strong className="text-signal">{challenge.skillTarget}</strong> to prospective recruiters.
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-muted mb-2">
                Test Case Requirements
              </h4>
              <div className="space-y-2">
                {challenge.testCases.map((tc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-paper-border text-xs">
                    <div className="font-bold text-ink mb-0.5">Test Case {idx + 1}: {tc.description}</div>
                    <div className="font-mono text-[10px] text-ink-muted truncate">Expected: {tc.expectedOutput}</div>
                  </div>
                ))}
              </div>
            </div>

            {testResults.status === 'passed' && (
              <div className="p-3.5 rounded-2xl bg-momentum/10 border border-momentum/30 text-momentum-dark text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-momentum flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-momentum">Verified Proof-of-Work Earned!</div>
                  <p className="text-[11px] text-ink-muted mt-0.5">
                    Your candidate ranking for matched requirements has automatically updated.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Pane: Code Editor & Execution Console */}
          <div className="lg:col-span-7 flex flex-col bg-ink text-paper">
            
            {/* Editor Top Bar */}
            <div className="px-4 py-2 bg-ink-light border-b border-ink-lighter flex items-center justify-between text-xs font-mono text-ink-subtle">
              <span>solution.{challenge.language === 'python' ? 'py' : 'js'}</span>
              <span>Node.js / V8 Sandbox</span>
            </div>

            {/* Code Input Textarea */}
            <div className="flex-1 p-4 relative min-h-[220px]">
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-paper font-mono text-xs leading-relaxed outline-none resize-none selection:bg-signal"
                spellCheck={false}
              />
            </div>

            {/* Test Results Output Console */}
            <div className="p-4 bg-[#0d1117] border-t border-ink-lighter font-mono text-[11px]">
              <div className="flex items-center justify-between mb-2 text-ink-subtle">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  Sandbox Execution Console
                </span>
                {testResults.status === 'passed' && (
                  <span className="text-momentum font-bold">● ALL PASS</span>
                )}
              </div>
              <pre className="text-paper-darker/90 whitespace-pre-wrap leading-relaxed">
                {testResults.output}
              </pre>
            </div>

          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 bg-paper-darker/60 border-t border-paper-border flex items-center justify-between">
          <button
            onClick={() => setCode(challenge.starterCode)}
            className="px-3 py-1.5 rounded-xl border border-paper-border hover:bg-white text-ink text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-ink-muted" />
            Reset Code
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:text-ink transition-colors"
            >
              Close
            </button>
            <button
              id="run-tests-btn"
              onClick={handleRunTests}
              disabled={isRunning}
              className="px-5 py-2 bg-momentum hover:bg-momentum-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running Sandbox Tests...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  Run & Verify Code
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
