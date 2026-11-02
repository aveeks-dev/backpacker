import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My degree",
  description:
    "Choose your University of Michigan major, mark what you've taken, and see what's left, what to take next, and a four-year layout.",
};

export default function DegreeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
