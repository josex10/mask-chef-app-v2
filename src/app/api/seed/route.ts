import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userForSeed = process.env.MASK_CHEF_APP_USER_FOR_SEED;
    const environment = process.env.NODE_ENV;
    if (!userForSeed)
      return NextResponse.json(
        { error: "not User found for seed process" },
        { status: 500 }
      );
    if (environment !== "development"){
        return NextResponse.json(
            { error: "not in development environment" },
            { status: 500 }
        );
    }

    //GENERATE COUNTRY
    const xata = getXataClient();
    const record = await xata.db.countries.create({
        name: "string",
        short_name: "string",
        language: "string",
        currency_name: "string",
        currency_short_name: "string",
        currency_symbol: "string",
      });

    return NextResponse.json({
      seed: "Hello from Next.js!",
    });
  } catch (error) {
    return NextResponse.error();
  }
}
