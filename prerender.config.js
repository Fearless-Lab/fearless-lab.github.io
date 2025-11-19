export default {
  routes: ["/", "/banPick", "/banPickSimulation", "/about"],
  outDir: "prerendered",
  serveDir: "dist",
  flatOutput: false,
  skipPrerenderSelector: "[data-skip-prerender]",
};
