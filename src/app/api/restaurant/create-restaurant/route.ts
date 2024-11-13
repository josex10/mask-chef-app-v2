import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const environment = process.env.MASK_CHEF_ENV;
    if (environment !== "development") {
      return NextResponse.json(
        { error: "not in development environment" },
        { status: 500 }
      );
    }

    // CREATE INTCOMES TYPES
    // CREATE EXPENSES TYPES
  } catch (error) {
    return NextResponse.error();
  }
}
