import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Support for Children, Women and Older People (SCWOP)",
    short_name: "SCWOP NGO",
    description:
      "SCWOP drives sustainable transformation for children, women, and elders in Addis Ababa, Ethiopia.",
    start_url: "/",
    display: "standalone",
    background_color: "#F0F5F9",
    theme_color: "#0B284C",
    icons: [
      {
        src: "/Logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
