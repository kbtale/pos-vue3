<template>
  <main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex min-w-0">
          <svg-vue class="content-title-icon" :icon="['fas', 'robot']"></svg-vue>
          <h1 class="content-title">
            {{ $t('Captcha') }}
          </h1>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <router-link class="btn btn-app" to="/admin/settings">{{ $t('Back') }}</router-link>
        </div>
      </div>
    </div>
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <!--<loading :active="loading"></loading>-->
      <form @submit.prevent="save">
        <div class="content-card-body">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-3 gap-3">
              <div class="col-span-3">
                <label class="form-label" for="recaptcha_enabled">{{ $t('reCaptcha status') }}</label>
                <input-switch
                  :disabled-label="$t('reCaptcha verification is disabled')"
                  :enabled-label="$t('reCaptcha verification is enabled')"
                  id="captcha.recaptcha_enabled"
                  v-model="captcha.recaptcha_enabled"
                ></input-switch>
                <div class="form-description-text">{{ $t('Activate the Google reCaptcha v3 verification in public forms, to avoid sending with robots') }}.</div>
              </div>
              <template v-if="captcha.recaptcha_enabled">
                <div class="col-span-3">
                  <label class="form-label" for="recaptcha_public"
                    >{{ $t('reCaptcha site key') }}
                    <a href="https://www.google.com/recaptcha/admin/" rel="noopener" class="text-blue-500 hover:text-blue-600" target="_blank"
                      >({{ $t('lets generate') }})</a
                    >
                  </label>
                  <input :placeholder="$t('reCaptcha public key')" class="form-input" id="recaptcha_public" type="text" v-model="captcha.recaptcha_public" />
                </div>
                <div class="col-span-3">
                  <label class="form-label" for="recaptcha_private">{{ $t('reCaptcha private key') }}</label>
                  <input :placeholder="$t('reCaptcha private key')" class="form-input" id="recaptcha_private" type="text" v-model="captcha.recaptcha_private" />
                </div>
              </template>
            </div>
          </div>
          <div class="card-footer">
            <div class="inline-flex">
              <button class="btn btn-app" type="submit">
                {{ $t('Save') }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import InputSwitch from '../../../components/input-switch.vue'
export default {
  name: 'captcha',
  metaInfo() {
    return {
      title: this.$t('Captcha settings'),
    };
  },
  components: {
    'input-switch': InputSwitch,
  },
  data() {
    return {
      loading: true,
      captcha: {
        recaptcha_enabled: false,
        recaptcha_private: null,
        recaptcha_public: null,
      },
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.$axios
        .get('http://192.168.1.186:8000/'+'api/v1/admin/settings/captcha/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.captcha = response.data;
          this.loading = false;
        })
        .catch(function () {
          this.$router.push('/admin/settings');
        });
    },
    save() {
      this.loading = true;
      this.$axios
        .post('http://192.168.1.186:8000/'+'api/v1/admin/settings/captcha/', this.captcha, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.loading = false;
          window.app.recaptcha_enabled = this.captcha.recaptcha_enabled;
          window.app.recaptcha_public = this.captcha.recaptcha_public;
          this.$store.commit('setSettings', window.app);
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
