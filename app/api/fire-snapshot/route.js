import { NextResponse } from "next/server";
import { FALLBACK_FIRE_SNAPSHOT } from "../../../lib/fireSnapshot";
import { hasAtlasStorage, readAtlasSnapshot } from "../../../lib/atlasStorage";

export const revalidate = 300;

export async function GET() {
  if (!hasAtlasStorage()) return NextResponse.json(FALLBACK_FIRE_SNAPSHOT);

  try {
    return NextResponse.json(await readAtlasSnapshot(), { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } });
  } catch (error) {
    console.error("Atlas snapshot read failed", error);
    return NextResponse.json(FALLBACK_FIRE_SNAPSHOT);
  }
}
