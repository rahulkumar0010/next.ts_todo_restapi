// import connectDB from "@/lib/connect-db";
// import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import TodoModel from "@/models/Todo";
import { Todo, mongoUrl } from "@/types";

type ResponseData = {
  message: string;
};

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json({ message: "Hello from Next.js!" });
// }

// connectDB();
let client: any;

let MONGO_URI: mongoUrl = `${process.env.MONGO_URI}`;

export async function GET(request: NextRequest) {
  try {
    client = await mongoose.connect(MONGO_URI);
    const origin = request.headers.get("origin");

    const todos: Todo[] = await TodoModel.find({});

    // const todos: Todo[] = await res.json()

    return new NextResponse(
      JSON.stringify({ data: todos, message: "Todos fetched successfully!" }),
      {
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    client = await mongoose.connect(MONGO_URI);
    const origin = request.headers.get("origin");

    const data = await request.json();

    const { title, status, completed } = data;

    const todo = await TodoModel.create({
      title,
      status,
      ...(completed ? { completed } : {}),
    });

    return new NextResponse(
      JSON.stringify({ data: todo, message: "Todo created successfully!" }),
      {
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    client = await mongoose.connect(MONGO_URI);
    const origin = request.headers.get("origin");

    const data = await request.json();

    const { id, title, status, completed } = data;

    const todo = await TodoModel.findByIdAndUpdate(
      id,
      {
        title,
        status,
        ...(completed ? { completed } : {}),
      },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({ data: todo, message: "Todo updated successfully!" }),
      {
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
