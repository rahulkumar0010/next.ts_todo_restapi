import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const path = searchParams.get("path") || "/";
  const result = { path, revalidated: true };

  try {
    revalidatePath(path);
  } catch (err) {
    result.revalidated = false;
    console.log(err);
  } finally {
    return NextResponse.json(result);
  }
}
