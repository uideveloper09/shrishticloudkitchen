# Google Sign-in — `shrishticloud.kitchen`

NextAuth uses this callback automatically (no code change needed):

```text
https://shrishticloud.kitchen/api/auth/callback/google
```

You must add **exactly** that URL in Google Cloud and set env vars on Vercel.

---

## 1. Google Cloud Console

1. Open [APIs & Credentials](https://console.cloud.google.com/apis/credentials).
2. Select OAuth client **Web application** (e.g. “Shrishti Cloud Kitchen Login”) → **Edit**.
3. **Authorized JavaScript origins** — add (one per line):

   ```text
   http://localhost:3000
   https://shrishticloud.kitchen
   ```

4. **Authorized redirect URIs** — add (one per line):

   ```text
   http://localhost:3000/api/auth/callback/google
   https://shrishticloud.kitchen/api/auth/callback/google
   ```

   > Spelling matters: **`shrishticloud`** (with **`h`** after `s`) — not `srishticloud`.

5. **Save**.

6. Copy **Client ID** and **Client secret** (same OAuth client you edited).

---

## 2. Vercel (Production)

Project → **Settings** → **Environment Variables** (Production):

| Name | Value |
|------|--------|
| `NEXTAUTH_URL` | `https://shrishticloud.kitchen` |
| `NEXTAUTH_SECRET` | Random 32+ chars (e.g. `openssl rand -base64 32`) |
| `GOOGLE_CLIENT_ID` | From Google Console |
| `GOOGLE_CLIENT_SECRET` | From Google Console |

- No trailing slash on `NEXTAUTH_URL`.
- After saving → **Deployments** → **Redeploy** the latest deployment.

---

## 3. OAuth consent screen

[OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent): add **Authorized domains** if prompted:

- `shrishticloud.kitchen`

---

## Check

- Visit `https://shrishticloud.kitchen` → Login → **Sign in with Google**.
- If you still see `redirect_uri_mismatch`, open Google’s **error details** and ensure the `redirect_uri` shown there is **exactly** listed under **Authorized redirect URIs** (including `http`/`https` and spelling).
