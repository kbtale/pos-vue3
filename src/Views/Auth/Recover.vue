<template>
  <div>
    <!--<loading :active="loading"></loading>-->
    <form @submit.prevent="submit">
      <div class="mb-4 pt-1 relative shadow-sm">
        <label class="form-label" for="email">
          {{ $t('Email') }}
        </label>
        <input :placeholder="$t('Email')" class="form-input block w-full mt-1 sm:text-sm sm:leading-5" id="email" required type="text" v-model="user.email" />
      </div>
      <div class="mb-4 text-right">
        <button class="btn btn-app" id="submit-recover" type="submit">
          {{ $t('Send account recovery email') }}
        </button>
      </div>
      <p class="text-sm">
        {{ $t('Do you already have access to your account?') }}
        <router-link class="align-baseline font-bold text-blue-700 hover:text-blue-900" to="/auth/login">{{ $t('Sign In') }} </router-link>
      </p>
    </form>
  </div>
</template>
<script>
export default {
  name: 'recover',
  metaInfo() {
    return {
      title: this.$t('Recover account'),
    };
  },
  data() {
    return {
      loading: false,
      user: {
        email: null,
        captcha_hash: null,
      },
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      if (this.$store.getters['app/getSettings.recaptcha_enabled']) {
        await this.$recaptchaLoaded();
        const token = await this.$recaptcha('recover');
        this.user.captcha_hash = token;
        this.recover();
      } else {
        this.recover();
      }
    },
    recover() {
      this.loading = true;
      this.$axios
        .post('http://192.168.1.186:8000/'+'api/v1/auth/recover', this.user)
        .then((response) => {
          /*
          this.$notify({
            title: this.$t('Success').toString(),
            text: response.data.message.toString(),
            type: 'success',
          });
          */
          this.loading = false;
          this.$router.push('/auth/login');
        })
        .catch(() => {
          this.loading = false;
          this.user.email = null;
        });
    },
  },
};
</script>
