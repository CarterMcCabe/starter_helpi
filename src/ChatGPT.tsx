import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: JSON.parse(localStorage.getItem("MYKEY") || '""'), dangerouslyAllowBrowser: true });

export async function generateDetailed(detailedAnswers: string[]) {
  const questions = [
    "How do you approach solving complex problems?",
    "How would you describe your communication style in a professional setting?",
    "What type of work environment do you thrive in?",
    "How do you make decisions when faced with multiple options?",
    "If given the opportunity, how would you lead a team?",
    "How do you respond to unexpected changes or challenges in the workplace?",
    "What are your long-term career aspirations?"
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: 'system', content: 'You are generating a list of careers based on quiz results. Always use title case.' },
      { role: 'user', content: `Provide a list of careers utilizing these responses: ${detailedAnswers} to these inquiries: ${questions}. Correspondingly match each question with its respective answer. Present three options, numbered, formatted as follows: job name: indeed.com/q-JOBLINK-jobs.html. Ensure that the job name consists solely of the job title, with hyphens separating words instead of spaces in the JOBLINK segment. Separate the jobs with commas for easy conversion into an array. Exclude any additional information beyond the job title and link.` }
    ],
    temperature: .75,
  });

  const result = completion.choices[0].message.content?.split(",") ?? [];
  if (result === undefined) {
    generateBasic(detailedAnswers);
  }
  if (result[0].length > 200) {
    console.log("Error");
    generateBasic(detailedAnswers);
  }
  const result1 = result[0].split(":");
  const result2 = result[1].split(":");
  const result3 = result[2].split(":");

  // Generate Indeed URLs based on job titles
  const indeedUrls = result.map(title => `https://www.indeed.com/q-${title.replace(/\s+/g, '-')}-jobs.html`);

  return [
    { title: result1[1], url: indeedUrls[0] },
    { title: result2[1], url: indeedUrls[1] },
    { title: result3[1], url: indeedUrls[2] }
  ];
}

export async function generateBasic(basicAnswers: string[]) {
  let questions = [
    "enter our basic questions here"
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: 'system', content: 'You are a Career Assessment quiz results generator. Always use title case.' },
      { role: 'user', content: `Provide a list of careers utilizing these responses: ${basicAnswers} to these inquiries: ${questions}. Correspondingly match each question with its respective answer. Present three options, numbered, formatted as follows: job name: indeed.com/q-JOBLINK-jobs.html. Ensure that the job name consists solely of the job title, with hyphens separating words instead of spaces in the JOBLINK segment. Separate the jobs with commas for easy conversion into an array. Exclude any additional information beyond the job title and link.` }
    ],
    temperature: .75,
  });

  const result = completion.choices[0].message.content?.split(",") ?? [];
  if (result === undefined) {
    generateBasic(basicAnswers);
  }
  if (result[0].length > 200) {
    console.log("Error");
    generateBasic(basicAnswers);
  }
  const result1 = result[0].split(":");
  const result2 = result[1].split(":");
  const result3 = result[2].split(":");

  // Generate Indeed URLs based on job titles
  const indeedUrls = result.map(title => `https://www.indeed.com/q-${title.replace(/\s+/g, '-')}-jobs.html`);

  return [
    { title: result1[1], url: indeedUrls[0] },
    { title: result2[1], url: indeedUrls[1] },
    { title: result3[1], url: indeedUrls[2] }
  ];
}