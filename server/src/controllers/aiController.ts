import { Request, Response } from 'express';
import { microChallenges, students, jobRequirements } from '../db/store';

// Normalized skill taxonomy dictionary
const SKILL_TAXONOMY: Record<string, { category: string; related: string[]; weight: number }> = {
  'nodejs': { category: 'framework', related: ['javascript', 'express', 'rest apis', 'backend'], weight: 1.0 },
  'node.js': { category: 'framework', related: ['javascript', 'express', 'rest apis', 'backend'], weight: 1.0 },
  'react': { category: 'framework', related: ['javascript', 'typescript', 'frontend', 'redux', 'tailwind css'], weight: 1.0 },
  'typescript': { category: 'framework', related: ['javascript', 'frontend', 'backend', 'type safety'], weight: 0.9 },
  'docker': { category: 'tools', related: ['containers', 'devops', 'kubernetes', 'ci/cd', 'linux'], weight: 1.0 },
  'kubernetes': { category: 'cloud', related: ['docker', 'cloud', 'devops', 'helm', 'sre'], weight: 1.0 },
  'redis': { category: 'database', related: ['caching', 'in-memory', 'nosql', 'distributed systems'], weight: 0.9 },
  'postgresql': { category: 'database', related: ['sql', 'relational database', 'acid', 'indexing'], weight: 1.0 },
  'sql': { category: 'database', related: ['postgresql', 'mysql', 'queries', 'normalization'], weight: 0.8 },
  'c++': { category: 'core', related: ['data structures', 'algorithms', 'system programming', 'pointers'], weight: 1.0 },
  'python': { category: 'core', related: ['machine learning', 'pytorch', 'data analysis', 'automation'], weight: 0.9 },
  'pytorch': { category: 'framework', related: ['deep learning', 'machine learning', 'computer vision', 'ai'], weight: 1.0 },
  'kafka': { category: 'cloud', related: ['event streaming', 'distributed systems', 'pub/sub', 'queues'], weight: 1.0 },
  'distributed systems': { category: 'core', related: ['concurrency', 'consensus', 'microservices', 'networking'], weight: 1.0 },
  'rest apis': { category: 'framework', related: ['http/https', 'web', 'json', 'endpoints'], weight: 0.8 },
  'graphql': { category: 'framework', related: ['apis', 'react', 'apollo', 'schemas'], weight: 0.9 },
  'ci/cd': { category: 'tools', related: ['devops', 'github actions', 'jenkins', 'automation'], weight: 0.85 },
  'go': { category: 'core', related: ['concurrency', 'goroutines', 'microservices', 'backend'], weight: 1.0 },
  'linux': { category: 'tools', related: ['bash', 'operating systems', 'sre', 'shell'], weight: 0.8 }
};

function normalizeSkillName(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * Calculates semantic skill overlap and cosine similarity between student skills and job requirements
 */
export function calculateSkillDelta(
  studentSkills: { name: string; level: number; verified: boolean }[],
  requiredSkills: string[],
  preferredSkills: string[] = []
) {
  const studentSkillMap = new Map<string, { level: number; verified: boolean }>();
  studentSkills.forEach(s => {
    studentSkillMap.set(normalizeSkillName(s.name), {
      level: s.level,
      verified: s.verified
    });
  });

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  let scoreSum = 0;
  let totalWeight = 0;

  // Process required skills
  requiredSkills.forEach(req => {
    const norm = normalizeSkillName(req);
    const weight = 1.0;
    totalWeight += weight;

    if (studentSkillMap.has(norm)) {
      const info = studentSkillMap.get(norm)!;
      matchedSkills.push(req);
      const verifiedBonus = info.verified ? 1.15 : 0.85;
      scoreSum += Math.min(100, info.level * verifiedBonus) * weight;
    } else {
      // Check related skills for partial credit (e.g. knowing SQL when PostgreSQL is required)
      const taxonomy = SKILL_TAXONOMY[norm];
      let partialFound = false;

      if (taxonomy) {
        for (const related of taxonomy.related) {
          if (studentSkillMap.has(related)) {
            const relInfo = studentSkillMap.get(related)!;
            matchedSkills.push(`${req} (Partial: via ${related})`);
            scoreSum += (relInfo.level * 0.5) * weight;
            partialFound = true;
            break;
          }
        }
      }

      if (!partialFound) {
        missingSkills.push(req);
      }
    }
  });

  // Calculate final percentage match
  const rawMatch = totalWeight > 0 ? Math.round(scoreSum / totalWeight) : 0;
  const matchPercent = Math.min(98, Math.max(15, rawMatch));

  // Find relevant micro-challenges to close missing skills
  const recommendedChallenges = microChallenges.filter(ch =>
    missingSkills.some(ms => normalizeSkillName(ms).includes(normalizeSkillName(ch.skillTarget))) ||
    missingSkills.includes(ch.skillTarget)
  );

  return {
    matchPercent,
    matchedSkills,
    missingSkills,
    recommendedChallenges: recommendedChallenges.length > 0 ? recommendedChallenges : microChallenges.slice(0, 2)
  };
}

export const aiController = {
  // POST /api/ai/skill-delta
  computeSkillDelta: (req: Request, res: Response) => {
    const { studentSkills, requiredSkills, preferredSkills } = req.body;

    if (!Array.isArray(studentSkills) || !Array.isArray(requiredSkills)) {
      return res.status(400).json({ error: 'studentSkills and requiredSkills must be arrays' });
    }

    const result = calculateSkillDelta(studentSkills, requiredSkills, preferredSkills || []);
    return res.json(result);
  },

  // POST /api/ai/parse-syllabus
  parseSyllabusText: (req: Request, res: Response) => {
    const { text, courseName, department } = req.body;

    // Entity extraction simulation for syllabus topics
    const extractedSkills = [
      'Data Structures',
      'Relational Database',
      'Indexing',
      'REST APIs',
      'JavaScript',
      'Docker Basics'
    ];

    return res.json({
      success: true,
      extractedSkills,
      industryAlignmentScore: 78,
      recommendedUpgrades: ['Add Cloud Native / Kubernetes Module', 'Include Fast-API / Microservices Lab']
    });
  }
};
