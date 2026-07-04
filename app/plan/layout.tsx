import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My plan",
  description:
    "Build a conflict-free University of Michigan semester and forecast your GPA from historical grade distributions.",
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
