import { createStore } from 'vuex';
import appStore from './modules/app.store.js'
import cartStore from './modules/cart.store.js'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    modules: {
        app: appStore,
        cart: cartStore
    },
    strict: false,
    plugins: [createPersistedState()],
});