import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import type { CodeHikeConfig } from "codehike/mdx";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const chConfig: CodeHikeConfig = {
  components: { code: "Code" },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
});

export default withMDX(nextConfig);
