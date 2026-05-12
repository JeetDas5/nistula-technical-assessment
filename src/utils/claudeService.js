import Anthropic from "@anthropic-ai/sdk";

if (!process.env.CLAUDE_API_KEY) {
  throw new Error("CLAUDE_API_KEY environment variable not set");
}

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export const generateReply = async (messageData) => {
  const prompt = `
You are a hospitality support assistant for Nistula Villas.

Property Context:
${propertyContext}

Guest Message:
${messageData.message_text}

Query Type:
${messageData.query_type}

Write a professional and concise reply.
`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.content[0].text;
};
