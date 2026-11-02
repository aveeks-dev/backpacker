import { rateMyProfessorsUrl } from "@/lib/format";

/** Instructor names, each with a clearly labeled Rate My Professors link. */
export function InstructorLinks({ names }: { names: string[] }) {
  if (names.length === 0) return <span className="text-slate-400">—</span>;
  return (
    <span className="inline-flex flex-wrap gap-x-3 gap-y-1">
      {names.map((name) => (
        <span key={name} className="inline-flex items-center gap-1.5 whitespace-nowrap">
          {name}
          <a
            href={rateMyProfessorsUrl(name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`See ${name}'s reviews on Rate My Professors`}
            title="Search Rate My Professors at U-M. The Registrar lists last names only, so check it's the right person."
            className="rounded bg-maize/40 px-1.5 py-0.5 text-[10px] font-semibold text-michigan transition-colors hover:bg-maize"
          >
            ★ Reviews ↗
          </a>
        </span>
      ))}
    </span>
  );
}
