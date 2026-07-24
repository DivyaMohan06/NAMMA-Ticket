import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Namma Ticket",
    short_name: "Namma Ticket",
    description: "Book BMTC tickets, manage passes, and show QR tickets.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfcf8",
    theme_color: "#0d765f",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
