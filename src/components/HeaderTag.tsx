export default function HeaderTag({ text, id }: { text: string; id: string }) {
  return <h2 className="section-heading" id={`${id}-heading`}>{text}</h2>;
}
