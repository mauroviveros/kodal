import type { APIRoute } from "astro";
import QRCode from "qrcode";

export const GET: APIRoute = async ({ params, url }) => {
  const qr = await QRCode.toDataURL(`${url.origin}/medal/${params.id}`);

  // Devolver como imagen PNG
  const base64 = qr.replace(/^data:image\/png;base64,/, "");
  const binary = Buffer.from(base64, "base64");

  return new Response(binary, {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": binary.length.toString(),
    },
  });
};
