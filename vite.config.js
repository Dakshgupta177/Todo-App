import { defineConfig } from "vite";
import HtmlWebpackPlugin from "html-webpack-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/Todo/",
  plugins: [
    react(),
    tailwindcss(),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Path to your custom index.html
      filename: "index.html",
      inject: "body", // Inject the scripts at the end of the body
    }),
  ],
});
