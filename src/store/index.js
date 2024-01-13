import { createStore } from 'vuex';
import appStore from './modules/app.store.js'
import cartStore from './modules/cart.store.js'

export default createStore({
    modules: {
        app: appStore,
        cart: cartStore
    },
    strict: false,
});