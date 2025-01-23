import openai from "@/app/lib/openai";
import { uploadToCloudinary } from "@/app/lib/uploadToCloudinary";
import { promptExtractTicketDetails } from "@/utils/prompt";
import { toolsFunc } from "@/utils/tools";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt, image } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { message: "Prompt is required" },
      { status: 400 }
    );
  }

  if (!image) {
    return NextResponse.json({ message: "Image is required" }, { status: 400 });
  }

//   const imageUrl = await uploadToCloudinary(image);
  const imageUrl = image;

  const messages = [
    {
      role: "system",
      content: [
        {
          type: "text",
          text: promptExtractTicketDetails,
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "JSON",
        },
        {
          type: "image_url",
          image_url: {
            url: imageUrl,
          },
        },
      ],
    },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      response_format: {
        type: "json_object",
      },
    //   tools: toolsFunc,
    });

    // console.log(completion);

    const responseMessage = completion.choices[0]?.message;
    // console.log(responseMessage)
    if (!responseMessage || !responseMessage.content) {
      return NextResponse.json(
        { error: "Invalid response from OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: responseMessage.content });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
