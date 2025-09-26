const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8088/api";
const ORIGIN = API.replace(/\/api\/?$/, "");   // http://localhost:8088

export const resolveImageUrl = (p) => {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  if (p.startsWith("/")) return ORIGIN + p;
  return ORIGIN + "/" + p;
};
