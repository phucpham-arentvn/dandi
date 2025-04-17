import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import ky from "ky";

// Validate API key against Supabase
async function validateApiKey(apiKey: string) {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .eq("key", apiKey)
      .single();

    if (error || !data) {
      return { valid: false, error: "Invalid API key" };
    }

    return { valid: true, data };
  } catch (error) {
    console.error("Error validating API key:", error);
    return { valid: false, error: "Error validating API key" };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get API key from header
    const apiKey = request.headers.get("x-api-key");
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 401 }
      );
    }

    // Validate API key
    const { valid, error, data: keyData } = await validateApiKey(apiKey);
    if (!valid) {
      return NextResponse.json(
        { error: error || "Invalid API key" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { githubUrl } = body;

    if (!githubUrl) {
      return NextResponse.json(
        { error: "githubUrl is required" },
        { status: 400 }
      );
    }

    // Call external API
    try {
      const response = await ky
        .post("https://dandi-chi.vercel.app/api/github-summarizer", {
          json: { githubUrl },
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 seconds timeout
        })
        .json();

      // Update API key usage in Supabase
      await supabase
        .from("api_keys")
        .update({
          usage: (keyData.usage || 0) + 1,
          last_used: new Date().toISOString(),
        })
        .eq("key", apiKey);

      return NextResponse.json(response);
    } catch (error) {
      console.error("Error calling external API:", error);
      return NextResponse.json(
        { error: "Error processing GitHub repository" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
