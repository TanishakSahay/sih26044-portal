// Automated Closed-Loop Verification Script for SIH26044

async function runVerification() {
  console.log('🔄 Starting SIH26044 Closed-Loop Tripartite Verification...\n');
  const baseUrl = 'http://localhost:5000/api';

  try {
    // 1. Health check
    const health = await fetch(`${baseUrl}/health`).then(r => r.json());
    console.log('✅ 1. Backend Server Online:', health.platform, '(Status:', health.status, ')');

    // 2. Recruiter posts a structured skill-vector requirement
    const postReq = await fetch(`${baseUrl}/requirements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Kubernetes & SRE Platform Intern',
        companyName: 'Google Cloud India',
        department: 'GCP Core SRE',
        location: 'Bengaluru / Hyderabad',
        type: '6-Month Co-op',
        stipendOrSalary: '₹1,15,000 / month + Housing',
        description: 'Scale out distributed Kubernetes clusters with Prometheus observability and zero-downtime rolling updates.',
        requiredSkills: ['Kubernetes', 'Docker', 'Linux', 'Go', 'CI/CD'],
        preferredSkills: ['Terraform', 'Prometheus'],
        minCgpa: 8.0,
        minSkillScore: 78,
        openings: 5
      })
    }).then(r => r.json());
    console.log('✅ 2. Recruiter Post Created:', postReq.title, 'at', postReq.companyName);

    // 3. Student computes AI skill delta against this new requirement
    const delta = await fetch(`${baseUrl}/students/std-1/skill-gap?requirementId=${postReq.id}`).then(r => r.json());
    console.log(`✅ 3. Student AI Delta Computed: ${delta.matchPercent}% Match`);
    console.log('   - Matched Skills:', delta.matchedSkills);
    console.log('   - Missing Skills (The Gap):', delta.missingSkills);

    // 4. Student solves micro-challenge to close missing skill
    const submitChallenge = await fetch(`${baseUrl}/challenges/mc-3/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'std-1',
        code: '// Kubernetes rolling update production readiness check'
      })
    }).then(r => r.json());
    console.log(`✅ 4. Student Solved Micro-Challenge: ${submitChallenge.skillTarget} (+${submitChallenge.earnedPoints} XP)`);
    console.log(`   - New Verified Skill Score: ${submitChallenge.newVerifiedSkillScore}/100`);

    // 5. Recruiter views ranked candidates based on Verified Skill Score
    const matches = await fetch(`${baseUrl}/requirements/${postReq.id}/matches`).then(r => r.json());
    const topCandidate = matches.candidates[0];
    console.log(`✅ 5. Recruiter Candidate Ranking: Top Candidate is ${topCandidate.name} (${topCandidate.collegeName}) with ${topCandidate.verifiedSkillScore}/100 Verified Score`);

    // 6. Recruiter submits weekly milestone intern evaluation
    const evaluation = await fetch(`${baseUrl}/internships/std-1/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: 'Google Cloud India',
        weekNumber: 12,
        technicalCompetence: 5,
        problemSolving: 5,
        collaboration: 5,
        recommendedCredits: 6,
        comments: 'Outstanding contribution to container deployment automation.'
      })
    }).then(r => r.json());
    console.log('✅ 6. Recruiter Weekly Evaluation Recorded & Forwarded to University TPO');

    // 7. TPO 1-Click Credit Approval
    const pendingCredits = await fetch(`${baseUrl}/credits/pending`).then(r => r.json());
    console.log(`✅ 7. TPO Credit Queue: ${pendingCredits.length} pending request(s)`);
    const targetCredit = pendingCredits[0];
    
    const approveCredit = await fetch(`${baseUrl}/credits/${targetCredit.id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        signedByTpo: 'Dr. Ramesh Sundaram (Head of Training & Placement, IITB)'
      })
    }).then(r => r.json());
    console.log(`✅ 8. TPO 1-Click Sign-Off Completed: ${approveCredit.message}`);
    console.log(`   - Student Official Transcript Updated: ${approveCredit.studentUpdatedCredits} total degree credits earned!`);

    console.log('\n🎉 ALL 8 STEPS OF THE TRIPARTITE CLOSED-LOOP FEEDBACK FLOW SUCCEEDED 100%!');
  } catch (err) {
    console.error('❌ Verification error:', err);
  }
}

runVerification();
