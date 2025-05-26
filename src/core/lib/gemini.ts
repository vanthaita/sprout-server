/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API,
});

const generateContent = async (prompt: string, modelAi: string = 'gemini-1.5-flash'): Promise<string | null> => {
  try {
    console.log('--- Sending Prompt to AI ---');
    console.log(`--- Is using ${modelAi} model ---`);
    const model = modelAi;
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];
    const result = await genAI.models.generateContent({
      model,
      contents
    });
    if (!result || !result.text) {
      console.error('AI Generation Error: No text in response or response blocked.');
      console.error('AI Response Error Details:', result?.promptFeedback);
      if (result?.candidates) {
        console.error('AI Response Candidate Error:', JSON.stringify(result.candidates, null, 2));
      }
      return null;
    }

    let text = result.text;

    console.log('--- Received AI Response ---');

    text = text.trim();

    const startMarkers = [
      '```markdown\n',
      '```markdown ',
      '```json\n',
      '```json ',
      '```text\n',
      '```text ',
      '```\n',
      '``` ',
      '```',
    ];

    for (const marker of startMarkers) {
      if (text.startsWith(marker)) {
        text = text.substring(marker.length).trimStart();
        break;
      }
    }

    const endMarkers = [
      '\n```',
      ' ```',
      '```',
    ];

    for (const marker of endMarkers) {
      if (text.endsWith(marker)) {
        text = text.substring(0, text.length - marker.length).trimEnd();
        break;
      }
    }

    text = text.trim();


    return text;

  } catch (error: any) {
    console.error('AI Generation Error:', error?.message || error);
    if (error.response) {
      console.error('AI Response Error Details:', JSON.stringify(error.response.promptFeedback, null, 2));
      if (error.response.candidates) {
        console.error('AI Response Candidate Error:', JSON.stringify(error.response.candidates, null, 2));
      }
    }
    return null;
  }
}
interface AIResponse {
    score: number;
    analytic: string;
}
export const aiGenerateCvAiAnalitytic = async (
  candidateProfile: any,
  jobInfo: any,
  modelAi: string = 'gemini-1.5-flash'
): Promise<AIResponse | null> => {
  const prompt = `
    Analyze the candidate's profile and match it against the job requirements to provide a comprehensive evaluation. Present results in the exact format specified at the end.

    ### Candidate Profile:
    ${JSON.stringify(candidateProfile, null, 2)}

    ### Job Information:
    ${JSON.stringify(jobInfo, null, 2)}

    ### Analysis Guidelines:
    1. Calculate a matching score (0-100) based on:
      - Skills alignment (${candidateProfile.skills} vs ${jobInfo.requirements})
      - Experience relevance
      - Cultural fit indicators
      - Motivation alignment

    2. Generate detailed analysis in Markdown format covering:
      - **Top 3 Strengths** for this position
      - **Potential Gaps** to address
      - **Experience Evaluation**
      - **Cultural Fit Assessment**
      - **Recommendations** for candidate improvement

    3. Scoring weights:
      - Skills match: 40%
      - Experience: 30%
      - Cultural fit: 20%
      - Motivation: 10%

    ### Required Output Format (strictly follow this JSON structure):
    {
      "score": [calculated score 0-100],
      "analytic": "[markdown formatted analysis]"
    }

    ### Markdown Structure Example:
    \`\`\`markdown
    ## CV Analysis Report
    
    ### Matching Score: {score}/100
    
    #### Top 3 Strengths:
    1. Strength 1 with evidence
    2. Strength 2 with evidence
    3. Strength 3 with evidence
    
    #### Potential Gaps:
    - Gap 1 with improvement suggestions
    - Gap 2 with improvement suggestions
    
    #### Experience Evaluation:
    [Detailed analysis of experience relevance]
    
    #### Cultural Fit:
    [Assessment of company-candidate alignment]
    
    #### Recommendations:
    - Actionable suggestion 1
    - Actionable suggestion 2
    \`\`\`
    `;

    const response = await generateContent(prompt, modelAi);
    try {
      if (response) {
        const parsed = JSON.parse(response);
        if (typeof parsed.score === 'number' && typeof parsed.analytic === 'string') {
          return {
            score: Math.min(100, Math.max(0, parsed.score)),
            analytic: parsed.analytic
          };
        }
      }
      return null;
    } catch (e) {
      console.error('Failed to parse AI response', e);
      return null;
    }
};