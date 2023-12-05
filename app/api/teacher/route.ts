import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;
    const response = await db.teacher.create({
      data: {
        userId,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
