import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My plan",
  description:
    "Pick your University of Michigan courses and see every conflict-free Winter 2027 schedule, ranked by your preferences.",
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
