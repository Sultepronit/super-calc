import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import manifest from './webmanifest.json';

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico'],
            manifest
        })
    ]
});