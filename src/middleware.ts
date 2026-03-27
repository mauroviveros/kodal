import { defineMiddleware } from "astro:middleware";
import { createClient } from "./supabase/client";

const REGEX_PROTECTED_PATHS = [/^\/admin.*/];
const REDIRECT_PATH = "/signin";

const shouldSkipAuth = (path: string) => {
  const isPathProtected = REGEX_PROTECTED_PATHS.some(regex => regex.test(path));
  return !isPathProtected;
}

export const onRequest = defineMiddleware(async ({ request, cookies, url, locals, redirect }, next) => {
  if (shouldSkipAuth(url.pathname)) return next();

  const supabase = createClient({ request, cookies });
  const { data, error } = await supabase.auth.getUser();
  if(error || !data.user) return redirect(`${REDIRECT_PATH}?redirectTo=${encodeURIComponent(url.pathname)}`);

  locals.user = data.user;
  return next();
});
