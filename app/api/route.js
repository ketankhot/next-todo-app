import { connectionDB } from "@/lib/config/db";
import TodoModel from "@/lib/model/TodoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectionDB();
};

LoadDB();

export async function GET(request) {
  const todos = await TodoModel.find({});
  return NextResponse.json({
    todos: todos,
  });
}
export async function POST(request) {
  const { title, description } = await request.json();
  // To Create the Database Entry
  await TodoModel.create({
    title,
    description,
  });

  return NextResponse.json({
    message: "Todo Created!",
  });
}
export async function DELETE(request) {
  // To Delete the Todo
  const mongoID = await request.nextUrl.searchParams.get("mongoID");
  await TodoModel.findByIdAndDelete(mongoID);
  return NextResponse.json({
    message: "Todo Deleted!",
  });
}
export async function PUT(request) {
  // To Delete the Todo
  const mongoID = await request.nextUrl.searchParams.get("mongoID");
  await TodoModel.findByIdAndUpdate(mongoID, {
    $set: {
      isCompleted: true,
    },
  });
  return NextResponse.json({
    message: "Todo Completed!",
  });
}
