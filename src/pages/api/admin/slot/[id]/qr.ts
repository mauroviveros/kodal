import QRCode from "qrcode";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, url }) => {
  const QR = await QRCode.toDataURL(
    new URL(`/medal/${params.id}`, url.origin).toString(),
    { margin: 1 }
  );


  const base64 = QR.replace(/^data:image\/png;base64,/, "");
  const binary = Buffer.from(base64, "base64");

  return new Response(binary, {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": binary.length.toString(),
    },
  });

}
