import axios from 'axios'

const state = {
    user: false,
    permissions: {},
    settings: false,
    role: { ordertaking_access: false, kitchendisplay_access: false, billingdisplay_access: false },
  };
  
  const getters = {
    isAllowedToSync(state) {
      return state.settings.synchronizer_display;
    },
  
    getVersion(state) {
      return state.settings.version;
    },
    getOrderTypes(state) {
      return state.settings.order_types;
    },
  
    getUserId(state) {
      return state.user.id;
    },
  
    getUser(state) {
      return state.user;
    },
    getRole(state) {
      return state.role;
    },
  
    getPermissions(state) {
      return state.permissions;
    },
  
    getSettings(state) {
      return state.settings;
    },
  
    isDemo(state) {
      return state.settings.is_demo_mode;
    },
  
    getAppName(state) {
      return state.settings.app_name;
    },
  
    getAppLogo(state) {
      console.log("Getting app logo...")
      console.log(state.settings);
      return state.settings.app_icon;
    },
  
    getAppBackground(state) {
      return state.settings.background;
    },
  
    getTaxSetup(state) {
      return state.settings.tax_setup;
    },
  
    getPrinter(state) {
      return state.settings.printer;
    },
  
    getSiteUrl(state) {
      return state.settings.url;
    },
  };
  
  const actions = {
    setSettings({ commit }, payload) {
      console.log("executing setSettings vuex");
      commit('SET_SETTINGS', payload);
    },
    login({ commit }, payload) {
      console.log("executing login vuex");
      commit('LOG_IN', payload);
    },
    logout({ commit }) {
      commit('LOG_OUT');
    },
    setUser({ commit }) {
      commit('SET_USER');
    },
    updateUser({ commit }, payload) {
      commit('UPDATE_USER', payload);
    },
  };
  
  const mutations = {
    SET_SETTINGS(state, data) {
      state.settings = data;
      console.log(state.settings);
    },
    LOG_IN(state, response) {
      console.log("Executing login mutation");
      state.user = response.user;
      state.permissions = response.user.role.permissions;
      state.role = state.user.role;
      localStorage.setItem('token', response.token);
      console.log("Local storage item set");
      console.log(window.axios);
      //window.axios.defaults.headers.common.Authorization = `Bearer ${response.token}`;
      console.log("Login mutation committed");
    },
    LOG_OUT(state) {
      axios.post('http://localhost:8000/api/v1/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(() => {
        state.user = false;
      });
      //delete window.axios.defaults.headers.common.Authorization;
      localStorage.removeItem('token');
    },
    SET_USER(state) {
      if (localStorage.getItem('token')) {
        axios.get('http://localhost:8000/api/v1/auth/user').then((response) => {
          state.user = response.data;
          state.permissions = response.data.role.permissions;
          state.role = response.data.role;
        });
      }
    },
    UPDATE_USER(state, response) {
      state.user = response;
      state.permissions = response.role.permissions;
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };
  
  