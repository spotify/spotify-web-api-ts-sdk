import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import path from "path";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Spotify Web SDK",
      components: {
        Hero: "./src/components/Hero.astro",
      },
      customCss: ["./src/styles/custom.css"],
      social: {
        github: "https://github.com/fostertheweb/spotify-web-sdk",
      },
      plugins: [
        starlightTypeDoc({
          entryPoints: [path.resolve("../src/index.ts")],
          tsconfig: [path.resolve("../tsconfig.json")],
        }),
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            { label: "Getting Started", link: "/guides/quickstart" },
            { label: "Authentication", link: "/guides/authentication" },
            {
              label: "Extensibility",
              link: "/guides/exstensibility",
            },
          ],
        },
        typeDocSidebarGroup,
      ],
    }),
  ],
});
