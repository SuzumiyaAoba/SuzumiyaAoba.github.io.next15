import type { MDXComponents } from "mdx/types";
import { highlight, Pre, RawCode } from "codehike/code";

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark");
  return <Pre code={highlighted} className="border border-zinc-800" />;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
  };
}
