// lib/aiSuggestions.ts
export const generateAISuggestions = async ({
  title,
  problem,
  pricing,
}: {
  title: string;
  problem: string;
  pricing: string;
}) => {
  // Replace this with a real AI call (e.g., OpenAI / Gemini)
  return [
    `Consider clarifying the target audience for "${title}"`,
    `Add examples of real-world usage for "${problem}"`,
    `Evaluate alternative pricing models to "${pricing}" for better adoption`,
  ];
};
