import { flag } from "flags/next";
import { vercelAdapter } from '@flags-sdk/vercel';

export const disableToken = flag<boolean>({
  key: "disable-token-auth",
  adapter: vercelAdapter(),
});
