import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = ({ data }: { data: Record<string, unknown> }) => (
  <SyntaxHighlighter language="javascript" showLineNumbers style={coy}>
    {JSON.stringify(data, null, 2)}
  </SyntaxHighlighter>
);
