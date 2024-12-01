import path from "path";
import { readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";

import type { CodeHikeConfig } from "codehike/mdx";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";

import { highlight, Pre, RawCode } from "codehike/code";

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-light");
  return <Pre code={highlighted} />;
}

const chConfig: CodeHikeConfig = {
  components: { code: "Code" },
};

async function loadMDX(dir: string) {
  const root = path.resolve();
  const mdxpath = path.join(root, "src/app/test", dir);
  const data = await readFile(mdxpath, { encoding: "utf-8" });

  return compileMDX({
    options: {
      mdxOptions: {
        format: "mdx",
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig]],
      },
    },
    components: {
      Code,
    },
    source: data,
  });
}

export default async function () {
  const mdx = await loadMDX("./content.mdx");

  return mdx.content;
}
