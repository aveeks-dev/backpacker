import Link from "next/link";
import type { Metadata } from "next";
import { getAllCourses, getDepartmentAverages, getDepartments } from "@/lib/courses";
import { getDeptName, getSchoolForDepartment } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Subjects",
  description:
    "Every subject at the University of Michigan — course counts, average workload, and grade outcomes, with study resources for each.",
};

export default function SubjectsPage() {
  const departments = getDepartments();
  const averages = getDepartmentAverages();
  const totalCourses = getAllCourses().length;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Subjects</h1>
        <span className="text-sm text-slate-500">
          {departments.length} subjects · {totalCourses.toLocaleString()} courses
        </span>
      </div>
      <p className="mb-6 max-w-2xl text-sm text-slate-600">
        Every subject in the U-M catalog. Open one for study resources,
        advising links, and its most popular courses.
      </p>

      <div className="overflow-x-auto rounded-md border border-slate-200">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3 font-medium">Subject</th>
              <th className="px-4 py-3 font-medium">School / college</th>
              <th className="px-4 py-3 text-right font-medium">Courses</th>
              <th className="px-4 py-3 text-right font-medium">Avg hrs/wk</th>
              <th className="px-4 py-3 text-right font-medium">Avg GPA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {departments.map((dept) => {
              const avg = averages[dept];
              const school = getSchoolForDepartment(dept);
              return (
                <tr key={dept} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/subjects/${dept}`} className="block group">
                      <span className="font-mono text-xs font-semibold text-slate-700">
                        {dept}
                      </span>
                      <span className="ml-2 font-medium text-michigan group-hover:underline">
                        {getDeptName(dept)}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{school?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {avg?.count.toLocaleString() ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {avg ? avg.workload.toFixed(1) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {avg && avg.meanGpa > 0 ? avg.meanGpa.toFixed(2) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
