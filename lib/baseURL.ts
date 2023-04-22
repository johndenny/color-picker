export default function getBaseURL() {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000/";
  return "https://color-picker-topaz.vercel.app/";
}
