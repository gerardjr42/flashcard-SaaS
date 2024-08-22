import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard generator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and concise questions for the front of the flashcard.
2. Provide brief, accurate answers for the back of the flashcard.
3. Focus on key concepts, definitions, and important facts.
4. Use simple language to ensure clarity and ease of understanding.
5. Avoid overly complex or lengthy explanations.
6. Include a variety of question types (e.g., multiple choice, fill-in-the-blank, true/false) when appropriate.
7. Ensure that each flashcard covers a single, distinct piece of information.
8. Use proper formatting, capitalization, and punctuation.
9. If applicable, include relevant examples or mnemonics to aid memory retention.
10. Tailor the difficulty level to the user's specified preferences or knowledge level.

Remember, the goal is to facilitate effective learning and retention of information through the use of flashcards.
Return in the following JSON format:
{
  "flashcards": [
    {
      "front": str,
      "back": str
    }
  ]
}
`;

export async function POST(req) {
  const openAI = new OpenAI();
  const data = await req.text();

  const completion = await openAI.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    response_format: { type: "json_object" },
  });

  console.log(completion.choices[0].message.content)

  const flashcards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(flashcards.flashcards);
}
