import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/api-keys - Get all API keys for the current user
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Error fetching API keys:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/api-keys - Create a new API key
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, permissions } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("api_keys")
      .insert([
        {
          name,
          permissions,
          key: `dk_${generateRandomString(32)}`,
          active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("Error creating API key:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH /api/api-keys - Update an API key
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, active, permissions } = body;

    if (!id) {
      return NextResponse.json(
        { error: "API key ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("api_keys")
      .update({ name, active, permissions })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Error updating API key:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/api-keys - Delete an API key
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "API key ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("api_keys").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "API key deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting API key:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Helper function to generate random string for API keys
function generateRandomString(length: number): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
