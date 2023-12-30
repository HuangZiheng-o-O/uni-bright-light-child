import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export const pinia = createPinia()

export const piniaInstall = (app: App) => {
    pinia.use(
        createPersistedState({
            storage: {
                getItem(key: string){
                    return uni.getStorageSync(key)
                },
                setItem(key: string, value: any) {
                    uni.setStorageSync(key, value)
                },
            },
        }),
    )
    app.use(pinia)
}
