/* eslint-disable import/no-default-export */
import path from "path"

import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { z } from "zod"

const envSchema = z.object({
    VITE_BACKEND_URL: z.string().url(),
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Validate env
    const env = Object.assign({}, process.env, loadEnv(mode, process.cwd()))
    envSchema.parse(env)

    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@scss": path.resolve("src/shared/scss"),
                "@app": path.resolve("src/app"),
                "@pages": path.resolve("src/pages"),
                "@widgets": path.resolve("src/widgets"),
                "@entities": path.resolve("src/entities"),
                "@features": path.resolve("src/features"),
                "@shared": path.resolve("src/shared"),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@scss/_mixins.scss" as *;
                        @use "@scss/_media.scss" as *;
                    `,
                },
            },
        },
    }
})
