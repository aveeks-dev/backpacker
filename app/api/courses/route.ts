import type { NextRequest } from "next/server";
import { getCoursesById, searchCourses, toSummary } from "@/lib/courses";

// GET /api/courses?ids=eecs-281,math-215   -> full courses with sections
// GET /api/courses?q=eecs 28&offered=1     -> up to 8 search summaries
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const ids = params.get("ids");
  if (ids !== null) {
    const list = Array.from(new Set(ids.split(",").map((s) => s.trim()).filter(Boolean))).slice(0, 12);
    return Response.json({ courses: getCoursesById(list) });
  }

  const q = params.get("q") ?? "";
  const results = searchCourses(q, { offeredOnly: params.get("offered") === "1" });
  return Response.json({ courses: results.map(toSummary) });
}
