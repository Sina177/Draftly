import { NextRequest, NextResponse } from "next/server";
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from "@/lib/prompts";


  export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = buffer.toString("base64");


    const anthropic = new Anthropic({
      apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
    });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: file.type as "image/png" | "image/jpeg" | "image/gif" | "image/webp", data: base64 }
          },
          {
            type: 'text',
            text: `Generate HTML code for this UI sketch.`
          }
        ]
      }],
      system: SYSTEM_PROMPT
    });

    const block = response.content[0];
    if (block.type === "text") {
      return NextResponse.json({ message: response.content[0], name: file.name, size: file.size });
    }

    return NextResponse.json({ error: "Unexpected response format" }, { status: 500 });
  }