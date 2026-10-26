import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  id?: string;
}) {
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id} className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
