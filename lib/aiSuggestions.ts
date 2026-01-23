import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAISuggestions(idea: {
  title: string;
  briefDescription: string;
  problemItSolves: string;
  pricingModel: string;
  pricingDetails: string;
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `
You're an expert product validator. Based on the following idea, generate 3 actionable suggestions to improve the idea, focusing on:
- Target audience clarity
- Problem validation
- Pricing and monetization
- Market differentiation

Idea Title: ${idea.title}
Brief Description: ${idea.briefDescription}
Problem It Solves: ${idea.problemItSolves}
Pricing Model: ${idea.pricingModel}
Pricing Details: ${idea.pricingDetails}

Respond in a numbered list format like:
1. Suggestion one
2. Suggestion two
3. Suggestion three
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  // Split by numbered list
  const suggestions = text
    .split(/\d\.\s+/)
    .filter((s) => s.trim().length > 0)
    .map((s) => s.trim());

  return suggestions.length > 0
    ? suggestions
    : [
        'Clarify your target audience for better focus.',
        'Validate the problem with potential users before scaling.',
        'Consider alternative pricing models for adoption.',
      ];
}
