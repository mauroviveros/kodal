<div align="center">

![Koda.pet](https://drive.google.com/thumbnail?id=1ZV9hWRPUsCZ_XPdUsrJckuGWlSVeEcvx&sz=w960)
# [Kodal.pet](https://kodal.pet/)

Smart pet tags with QR codes to identify, contact, and reunite pets with their families.

Scan the QR, access the digital profile, and reach the owner in seconds.

![GitHub last commit](https://img.shields.io/github/last-commit/mauroviveros/kodal?logo=git)
![GitHub License](https://img.shields.io/github/license/mauroviveros/kodal?logo=github)
![GitHub Repo stars](https://img.shields.io/github/stars/mauroviveros/kodal)
![GitHub watchers](https://img.shields.io/github/watchers/mauroviveros/kodal)

[![Astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

## 📦 Requirements

- [NodeJS](https://nodejs.org/) _v24.13.0_
- [PNPM](https://pnpm.io/) _v10.32.1_

## ⚙️ Environments

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

Then define the following variables:

| Variable | Required | What it is used for | Where to get it |
| :-- | :--: | :-- | :-- |
| `PUBLIC_SUPABASE_URL` | Yes | Supabase project URL used in browser/server clients | Supabase Dashboard -> Project Settings -> API. [Supabase docs](https://supabase.com/docs/guides/getting-started/quickstarts/astro) |
| `PUBLIC_SUPABASE_KEY` | Yes | Supabase anonymous public key for client-side requests | Supabase Dashboard -> Project Settings -> API (`anon` key). [Supabase API keys](https://supabase.com/docs/guides/api/api-keys) |
| `SECRET_SUPABASE_KEY` | Yes | Supabase service role key for trusted server operations | Supabase Dashboard -> Project Settings -> API (`service_role` key). [Supabase API keys](https://supabase.com/docs/guides/api/api-keys) |
| `RESEND_API_KEY` | Yes | Transactional email provider key used to send verification emails | Resend Dashboard -> API Keys. [Resend docs](https://resend.com/docs/api-reference/api-keys) |

Notes:

- Do not expose `SECRET_SUPABASE_KEY` in the client.
- Keep `.env` out of version control (only commit `.env.example`).
- If you deploy on Vercel, define the same variables in Project Settings -> Environment Variables.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
