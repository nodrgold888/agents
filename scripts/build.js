const esbuild = require("esbuild");

esbuild.buildSync({
  entryPoints: ["src/components/TvPanel.jsx"],
  bundle: true,
  outfile: "dist/tvpanel.js",
  format: "cjs",
  platform: "node",
  external: ["react", "react-dom"],
  loader: { ".jsx": "jsx" },
});

console.log("Built dist/tvpanel.js");
