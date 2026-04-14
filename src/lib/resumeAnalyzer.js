/**
 * Shared utility for analyzing extracted resume text and mapping it to profile fields.
 */

const ROLE_KEYWORDS = [
  { role: "Frontend Developer", keywords: ["react", "next.js", "tailwind", "frontend", "javascript", "typescript", "css", "html"], skills: ["React", "JavaScript", "Tailwind CSS"] },
  { role: "Backend Developer", keywords: ["node.js", "express", "postgres", "supabase", "backend", "python", "django", "go", "java", "sql"], skills: ["Node.js", "PostgreSQL", "API Design"] },
  { role: "Fullstack Developer", keywords: ["fullstack", "react", "node", "mern", "next.js", "typescript"], skills: ["Fullstack Development", "React", "Node.js"] },
  { role: "Mobile Developer", keywords: ["react native", "flutter", "ios", "android", "mobile", "swift", "kotlin"], skills: ["Mobile Development", "React Native"] },
  { role: "UI/UX Designer", keywords: ["figma", "design", "ui", "ux", "prototyping", "adobe xd", "sketch"], skills: ["UI Design", "Figma", "User Experience"] }
];

export function analyzeResume(fileName, text) {
  const lowercaseText = text.toLowerCase();
  
  // 1. Estimate Experience Level
  let level = "junior";
  if (lowercaseText.includes("senior") || lowercaseText.includes("lead") || lowercaseText.includes("architect")) {
    level = "senior";
  } else if (lowercaseText.includes("mid") || lowercaseText.includes("years") && lowercaseText.match(/[3-6]\+?\s*years/)) {
    level = "mid";
  }

  // 2. Identify Role & Skills
  const keywordMatches = ROLE_KEYWORDS.map(r => ({
    ...r,
    score: r.keywords.filter(k => lowercaseText.includes(k)).length
  }));

  const bestMatch = keywordMatches.reduce((a, b) => a.score > b.score ? a : b, ROLE_KEYWORDS[0]);

  // 3. Extract Possible Name (Highly heuristic)
  // Usually the first line or prominent words. For now, we'll try to find common person-like start.
  let extractedName = null;
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  if (lines.length > 0) {
    // Basic check: if first line is short and has capitalization
    const firstLine = lines[0].trim();
    if (firstLine.length < 30 && /^[A-Z]/.test(firstLine)) {
      extractedName = firstLine;
    }
  }

  // 4. Extract Skills (Merge predefined and found)
  const foundSkills = Array.from(new Set([
    ...bestMatch.skills,
    ...ROLE_KEYWORDS.flatMap(r => r.keywords).filter(k => lowercaseText.includes(k))
  ])).map(s => s.charAt(0).toUpperCase() + s.slice(1)).slice(0, 8);

  const skillPrompt = foundSkills.length > 0 
    ? `with expertise in ${foundSkills.slice(0, 3).join(", ")}` 
    : "with a strong background in software development";

  return {
    full_name: extractedName || fileName.split('.')[0].replace(/[-_]/g, ' '),
    location: "Kathmandu, Nepal",
    bio: `${level.charAt(0).toUpperCase() + level.slice(1)} ${bestMatch.role} ${skillPrompt}. Passionate about building impactful products in Nepal's tech ecosystem.`,
    experience_level: level,
    skills: foundSkills,
    ai_generated: true,
    experience: [
      {
        role: bestMatch.role,
        company: "Previous Company",
        duration: "1-2 Years",
        description: "Contributed to core product development and collaborated with cross-functional teams."
      }
    ]
  };
}
