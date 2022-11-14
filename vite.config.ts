import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@styles': path.resolve(__dirname, './src/scss'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@routes': path.resolve(__dirname, './src/routes'),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/scss/settings.scss";`
            }
        }
    }
})
