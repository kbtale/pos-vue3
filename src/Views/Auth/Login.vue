<template>
    <div class=" ">
      <!--<loading :active="loading"></loading>-->
      <Vueform @submit.prevent="submit" size="md" v-model="data">
        <template v-if="isDemoMode">
          <StaticElement name="loginAsDemo" class="my-2 bg-green-200 py-3">
            <StaticElement class="pl-5" name="loginAsDemoInfo" content="Click to login as below while demo mode &#128512;"></StaticElement>
            <div class="mt-2 text-center">
              <ButtonElement class="btn btn-app" type="button" @click="loginAsDemo('admin@admin.com')">
                {{ $t('Log as Admin') }}
              </ButtonElement>
            </div>
          </StaticElement>
          <StaticElement name="divider" tag="hr" />
        </template>
        <TextElement name="email" id="Email" :placeholder="$t('Email')" v-model="user.email" :columns="{ container: 6, label: 12, wrapper: 12, }" field-name="Email" :rules="['required', 'max:255',]"/>
        <TextElement name="password" input-type="password" v-model="user.password" :columns="{ container: 6, label: 12, wrapper: 12, }" :rules="['required', 'min:8', 'max:20']" field-name="Password" :placeholder="$t('Password')"/>
        <ButtonElement class="btn btn-app" id="submit-login" @click="submit()" :full="true">
            {{ $t('Sign In') }}
        </ButtonElement>  
        <StaticElement class="text-sm">
          {{ $t("Don't have an account?") }}
          <router-link class="align-baseline font-bold text-blue-700 hover:text-blue-900" to="/auth/register">{{ $t('Create account') }} </router-link>
        </StaticElement>
        <StaticElement class="text-sm">
          {{ $t("Can't access to your account?") }}
          <router-link class="align-baseline font-bold text-blue-700 hover:text-blue-900" to="/auth/recover">{{ $t('Recover account') }} </router-link>
        </StaticElement>
      </Vueform>
    </div>
  </template>
<script>
import Cookies from 'js-cookie';
import { Static } from 'vue';
export default {
    name: 'login',
    /*metaInfo() {
      return {
        title: this.$t('Sign In'),
      };
    },*/
    computed: {
        isDemoMode() {
            //return this.$store.getters['app/isDemo'];
            return true;
        },
    },
    data() {
        return {
            loading: false,
            user: {
                email: null,
                password: null,
                captcha_hash: null,
            },
            data: {}
        };
    },
    methods: {
        loginAsDemo(email) {
            this.user.email = email;
            this.user.password = '12345678';
            this.submit();
        },
        submit() {
            console.log(this.data)
            this.user.email = this.data.email;
            this.user.password = this.data.password;
            this.login();
        },
        login() {
            this.$axios
            .post('http://localhost/'+'api/v1/auth/login', this.user)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              this.$store.dispatch('app/login', response.data);
              this.getSettings();
              const intendedUrl = Cookies.get('intended_url');
              if (intendedUrl) {
                  console.log("Checking intendedUrl");
                  Cookies.remove('intended_url');
                  this.$router.push(intendedUrl);
              } else {
                console.log("Checking user role");
                  if (response.data.user.role_id == 1) {
                    const resolvedRoute = this.$router.resolve({name: 'AdminHome'});
                    console.log(resolvedRoute);
                    console.log("Dispatching... " + JSON.stringify(window.App))
                    //this.$store.dispatch('app/setSettings', window.app);
                    this.$router.push({name: 'AdminHome'});
                  }
                  const resolvedRoute = this.$router.resolve('/');
                  console.log(resolvedRoute);
                  //this.$router.push('/');
              }
            })
            .catch(() => {
            this.loading = false;
            this.user.password = null;
            });
        },
        getSettings(){
          this.axios.get('http://localhost/'+'api/v1/admin/settings/all', {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'ngrok-skip-browser-warning': '69420'
            }
          })
            .then((response) => {
              console.log(response.data)
              /*
              let settings = response.data
              settings.orderTypes = [
                { key: 'all', title: 'All' },
                { key: 'dining', title: 'Dining' },
                { key: 'takeout', title: 'Takeout' },
                { key: 'delivery', title: 'Delivery' },
              ];
              this.$store.dispatch('app/setSettings', settings);
              */
            })
        }
    },
    components: { Static }
};
</script>