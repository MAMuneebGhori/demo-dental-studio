import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Check if OPENAI_API_KEY is configured
    if (!process.env.OPENAI_API_KEY) {
      // Return a simulated streaming response if no API key is provided
      // For a real production app, you might want to return a 500 error instead.
      const simulatedResponse = "SIMULATED AI RESPONSE: Based on the clinical notes provided, the recommended treatment plan includes: 1. Caries excavation on tooth #14. 2. Direct composite restoration (MOD). 3. Post-operative bitewing radiograph to confirm marginal adaptation. Patient should return for a follow-up in 6 months.";
      
      return new NextResponse(
        new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            const words = simulatedResponse.split(' ');
            for (const word of words) {
              controller.enqueue(encoder.encode(word + ' '));
              await new Promise((resolve) => setTimeout(resolve, 50));
            }
            controller.close();
          },
        }),
        {
          headers: {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked',
          },
        }
      );
    }

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: 'You are an advanced dental AI assistant. Analyze the clinical notes and generate a professional, concise treatment plan and simulation notes for the dentist.',
      prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI Simulation Error", error);
    return new Response("Error generating simulation.", { status: 500 });
  }
}
