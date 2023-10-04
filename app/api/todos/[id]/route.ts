import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import TodoModel from "@/models/Todo";
import { Params, mongoUrl } from "@/types";

let client: any;
let MONGO_URI: mongoUrl = `${process.env.MONGO_URI}`;

export async function PUT(request: NextRequest, { params: { id } }: Params) {
  try {
    client = await mongoose.connect(MONGO_URI);
    const origin = request.headers.get("origin");

    const data = await request.json();

    const { title, status, completed } = data;

    const todo = await TodoModel.findByIdAndUpdate(
      id,
      {
        title,
        status,
        completed,
      },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({ data: todo, message: "Todos updated successfully" }),
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
export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  try {
    client = await mongoose.connect(MONGO_URI);
    const origin = request.headers.get("origin");

    const todo = await TodoModel.findByIdAndDelete(id);

    return new NextResponse(
      JSON.stringify({ data: todo, message: "Todos deleted successfully" }),
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
