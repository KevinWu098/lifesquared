/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
    plugins: [
        "prettier-plugin-tailwindcss",
        "@ianvs/prettier-plugin-sort-imports",
    ],
    importOrder: [
        "^(react/(.*)$)|^(react$)",
        "^(next/(.*)$)|^(next$)",
        "<THIRD_PARTY_MODULES>",
        "",
        "^types$",
        "^~/types/(.*)$",
        "^~/config/(.*)$",
        "^~/lib/(.*)$",
        "^~/hooks/(.*)$",
        "^~/components/ui/(.*)$",
        "^~/components/(.*)$",
        "^~/styles/(.*)$",
        "^~/app/(.*)$",
        "",
        "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

export default config;
