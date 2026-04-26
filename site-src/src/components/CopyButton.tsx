import { useState } from "react";

interface Props {
  command: string;
  html: string;
  copyLabel: string;
  copiedLabel: string;
}

export default function CopyButton({ command, html, copyLabel, copiedLabel }: Props) {
  const [label, setLabel] = useState(copyLabel);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setLabel(copiedLabel);
      window.setTimeout(() => setLabel(copyLabel), 1300);
    } catch {
      setLabel(copyLabel);
    }
  }

  return (
    <button className="codebox" data-copy={command} onClick={copy}>
      <span className="code-lines" dangerouslySetInnerHTML={{ __html: html }} />
      <em>{label}</em>
    </button>
  );
}
