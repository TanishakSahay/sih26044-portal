import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authController } from './controllers/authController';
import { studentController } from './controllers/studentController';
import { requirementController } from './controllers/requirementController';
import { syllabusController } from './controllers/syllabusController';
import { challengeController } from './controllers/challengeController';
import { internshipController } from './controllers/internshipController';
import { creditController } from './controllers/creditController';
import { tpoController } from './controllers/tpoController';
import { aiController } from './controllers/aiController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check & Root
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    version: '1.0.0',
    platform: 'SIH26044 Tripartite SkillBridge API',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Auth Routes
app.post('/api/auth/login', authController.login);
app.post('/api/auth/signup', authController.signup);
app.get('/api/auth/me', authController.getMe);

// Student Routes
app.get('/api/students', studentController.getAllStudents);
app.get('/api/students/:id', studentController.getStudentById);
app.get('/api/students/:id/skill-profile', studentController.getSkillProfile);
app.get('/api/students/:id/skill-gap', studentController.getSkillGap);
app.post('/api/students/:id/sync-github', studentController.syncGithub);

// Recruiter & Requirement Routes
app.get('/api/requirements', requirementController.getAllRequirements);
app.post('/api/requirements', requirementController.createRequirement);
app.get('/api/requirements/:id', requirementController.getRequirementById);
app.get('/api/requirements/:id/matches', requirementController.getMatchesForRequirement);

// Syllabus Routes
app.get('/api/syllabi', syllabusController.getSyllabi);
app.post('/api/syllabi/upload', syllabusController.uploadSyllabus);

// Micro-Challenges & Code Sandbox
app.get('/api/challenges', challengeController.getAllChallenges);
app.get('/api/challenges/recommended', challengeController.getRecommendedChallenges);
app.post('/api/challenges/:id/submit', challengeController.submitChallenge);

// Internship Evaluation & Mentorship
app.get('/api/internships/evaluations', internshipController.getEvaluations);
app.post('/api/internships/:id/evaluate', internshipController.submitEvaluation);

// Academic Credit Approvals (TPO 1-Click Action)
app.get('/api/credits', creditController.getAllCredits);
app.get('/api/credits/pending', creditController.getPendingCredits);
app.post('/api/credits/:id/approve', creditController.approveCredit);
app.post('/api/credits/:id/reject', creditController.rejectCredit);

// TPO Analytics & Capstone Sponsorships
app.get('/api/tpo/capstones', tpoController.getCapstones);
app.post('/api/tpo/capstones', tpoController.createCapstone);
app.get('/api/tpo/:collegeId/analytics', tpoController.getAnalytics);

// AI & NLP Skill Delta Engine
app.post('/api/ai/skill-delta', aiController.computeSkillDelta);
app.post('/api/ai/parse-syllabus', aiController.parseSyllabusText);

// OpenAPI Specification Endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'SIH26044 Tripartite SkillBridge API',
      version: '1.0.0',
      description: 'API for Academia-Industry collaboration for Skill Mapping, Internships and Placement'
    },
    paths: {
      '/api/auth/login': { post: { summary: 'User login' } },
      '/api/students/{id}/skill-gap': { get: { summary: 'Calculate AI skill delta against requirement' } },
      '/api/requirements/{id}/matches': { get: { summary: 'Rank candidates by Verified Skill Score' } },
      '/api/challenges/{id}/submit': { post: { summary: 'Submit micro-challenge code and verify skill' } },
      '/api/credits/{id}/approve': { post: { summary: '1-Click TPO academic credit approval' } }
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 SIH26044 Tripartite SkillBridge API running on http://localhost:${PORT}`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is already in use by another process. Please close any running instance on port ${PORT}.`);
  } else {
    console.error('Server error:', err);
  }
});

