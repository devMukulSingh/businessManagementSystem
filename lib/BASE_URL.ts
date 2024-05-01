export const BASE_URL_FRONTEND =
  process.env.NODE_ENV === "production"
    ? "https://m-ecom-store.vercel.app"
    : "http://localhost:3001";
