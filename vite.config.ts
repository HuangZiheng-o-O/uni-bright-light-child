import {defineConfig, loadEnv} from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import TransformPages from "uni-read-pages-vite";
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd()) // 获取 .env里面定义是参数
    console.log('env', env, mode, command)
    return {
        plugins: [
            requireTransform({}),
            uni()
        ],
        define: {
            ROUTES: new TransformPages().routes,
        },
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_SERVER_NAME,
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
