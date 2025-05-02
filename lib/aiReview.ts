import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIReview(idea: {
  title: string;
  briefDescription: string;
  problemItSolves: string;
  pricingModel: string;
  pricingDetails: string;
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });

  const prompt = `
You're an expert product validator. Based on the following idea, write a short review (2-4 sentences), answer in a sentence whether or not you would recommend the idea poster to keep going with the idea, and provide a star rating from 1 to 5.

Idea Title: ${idea.title}
Brief Description: ${idea.briefDescription}
Problem It Solves: ${idea.problemItSolves}
Pricing Model: ${idea.pricingModel}
Pricing Details: ${idea.pricingDetails}

Respond in the format:
Rating: <number>
Feedback: <your thoughts>
Pursue: <your thoughts>

`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const ratingMatch = text.match(/Rating:\s*(\d)/);
  const feedbackMatch = text.match(/Feedback:\s*([\s\S]+)/);
  const pursueMatch = text.match(/Pursue:\s*([\s\S]+)/);

  return {
    rating: ratingMatch ? Number(ratingMatch[1]) : 4,
    feedback: feedbackMatch
      ? feedbackMatch[1].trim()
      : 'Insightful idea with good potential.',
    pursue: pursueMatch ? pursueMatch[1].trim() : 'Consider pursuing further.',
  };
}
