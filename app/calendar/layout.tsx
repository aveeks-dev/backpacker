import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly calendar",
  description:
    "Pick University of Michigan sections on a weekly calendar, block off work and practice, check credits and conflicts, and export your Winter 2027 classes to Google, Apple, or Outlook calendar.",
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
