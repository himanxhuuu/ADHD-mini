import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const dbConnection = await connectToDatabase();
    if (dbConnection) {
      return NextResponse.json({
        ok: true,
        db: process.env.MONGODB_DB || "focusflow",
        status: "connected",
      });
    } else {
      return NextResponse.json({ ok: true, db: "mock", status: "mock_mode" });
    }
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        error: e?.message || "DB connection failed",
        status: "error",
      },
      { status: 500 }
    );
  }
}
