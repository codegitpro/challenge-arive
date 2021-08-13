const { addWebpackAlias, override } = require("customize-cra");
const path = require("path");

module.exports = override(
    addWebpackAlias({
        ["@this/components"]: path.resolve(__dirname, "./src/components"),
        ["@this/config"]: path.resolve(__dirname, "./src/config"),
        ["@this/constants"]: path.resolve(__dirname, "./src/constants"),
        ["@this/forms"]: path.resolve(__dirname, "./src/forms"),
        ["@this/global"]: path.resolve(__dirname, "./src/global"),
        ["@this/hooks"]: path.resolve(__dirname, "./src/hooks"),
        ["@this/pages"]: path.resolve(__dirname, "./src/pages"),
        ["@this/mocks"]: path.resolve(__dirname, "./src/mocks"),
        ["@this/services"]: path.resolve(__dirname, "./src/services"),
        ["@this/utils"]: path.resolve(__dirname, "./src/utils"),
        ["@this/validators"]: path.resolve(__dirname, "./src/validators"),
    }),
);
