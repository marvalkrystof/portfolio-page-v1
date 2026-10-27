import type { ReactNode } from "react";
import HeaderTag from "./HeaderTag";
import type { SectionId } from "../data/navigation";

interface ContentBoxProps {
  children: ReactNode;
  text: string;
  id: SectionId;
  count?: number;
}

export default function ContentBox({ children, text, id, count }: ContentBoxProps) {
  return (
    <section className="content-section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="section-heading-row">
        <HeaderTag text={text} id={id} />
        {count !== undefined && <span className="section-count">{count.toString().padStart(2, "0")}</span>}
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}
