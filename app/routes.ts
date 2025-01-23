import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("word-counter", "routes/word-counter.tsx"),
  route("editor", "routes/editor.tsx"),
] satisfies RouteConfig;
