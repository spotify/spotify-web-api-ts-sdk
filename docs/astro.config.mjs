import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { generateTypeDoc } from "starlight-typedoc";

const typeDocSidebarGroup = await generateTypeDoc({
  entryPoints: ["../src/index.ts"],
  tsconfig: ["../tsconfig.json"],
});

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
      sidebar: [
        {
          label: "Guides",
          autogenerate: {
            directory: "guides",
          },
        },
        {
          ...typeDocSidebarGroup,
          label: "Reference",
        },
      ],
    }),
  ],
});
