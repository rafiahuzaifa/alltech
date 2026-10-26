import Link from "next/link";
import type { ArticleSection } from "@/content/types";

// Renders **bold** and [label](href) inside a plain string.
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const bold = p.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link key={i} href={href}>{label}</Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          );
        }
        return p;
      })}
    </>
  );
}

export default function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <>
      {sections.map((s, i) => {
        const List = s.ordered ? "ol" : "ul";
        return (
          <section key={i}>
            {s.heading && <h2>{s.heading}</h2>}
            {s.paragraphs?.map((p, j) => <p key={j}><Inline text={p} /></p>)}
            {s.list && (
              <List>
                {s.list.map((li, j) => <li key={j}><Inline text={li} /></li>)}
              </List>
            )}
          </section>
        );
      })}
    </>
  );
}

export const sectionsToPlain = (sections: ArticleSection[]) =>
  sections
    .flatMap((s) => [s.heading ?? "", ...(s.paragraphs ?? []), ...(s.list ?? [])])
    .join(" ")
    .replace(/\*\*|\[|\]\([^)]+\)/g, "");
