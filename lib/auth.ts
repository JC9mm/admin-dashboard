import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

const registeredRedirectUris = [
  'http://localhost:3000',
  'https://your-production-url.com'
];

function validateRedirectUri(redirectUri) {
  return registeredRedirectUris.includes(redirectUri);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  secret: process.env.AUTH_SECRET,
  url: process.env.NEXTAUTH_URL
});

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return null;

  const res = await fetch("https://api.jorgecastillo.net/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token }),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
  } else {
    localStorage.clear();
    return null;
  }
};

export const signInWithValidation = async (provider, options) => {
  const { redirectTo } = options;
  if (!validateRedirectUri(redirectTo)) {
    throw new Error("The provided value for the input parameter 'redirect_uri' is not valid.");
  }
  return signIn(provider, options);
};
