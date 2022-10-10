const esbuild = require("esbuild");
const path = require("path");
const glob = require("glob");

const {games, ROOT_DIR, SRC_DIR, BLD_DIR} = require("../src/games");
games.push("library");

const isProd = process.argv.some(
    (argv) => argv === "-prod" || argv === "--prod"
);

const nodeDefaults = {
    platform: "node",
    target: "es2020",
    sourcemap: isProd ? false : "inline",
    keepNames: true,
    logLevel: "info",
    minify: true,
    define: {
        "process.env.NODE_ENV": isProd ? '"production"' : '"development"',
    },
};

const bundleDefaults = {
    ...nodeDefaults,
    bundle: true,
};

let entries = {};
for (let i = 0; i < games.length; i++)
    entries[games[i]] = path.join(SRC_DIR, "js", games[i]);

for (let i = 0; i < games.length; i++) {
    esbuild.build({
        // TypeScript -> JavaScript
        ...nodeDefaults,
        format: "cjs",
        mainFields: ["browser", "main"],
        entryPoints: glob
            .sync(`src/${games[i]}/src/**/*.{ts,tsx}`, {
                nodir: true,
                root: ROOT_DIR,
            })
            .filter((file) => !file.endsWith(".d.ts")),
        outdir: path.join(BLD_DIR, games[i], "src"),
    });
}
