const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

const {games, BLD_DIR, DST_DIR} = require("../src/games");

let entries = {};
for (let i = 0; i < games.length; i++) {
    entries[games[i]] = path.join(BLD_DIR, games[i], "src");
}

// Game bundles
module.exports = {
    entry: entries,
    mode: "production",
    optimization: {
        minimizer: [new TerserPlugin({})],
    },
    output: {
        path: path.join(DST_DIR),
        filename: path.join("[name]", "[name].bundle.js"),
    },
    target: "web",
};

// Game HTML
