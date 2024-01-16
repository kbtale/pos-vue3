<template>
  <main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex min-w-0">
          <svg-vue class="content-title-icon" :icon="['fas', 'earth-americas']"></svg-vue>
          <h1 class="content-title">
            {{ $t('Languages') }}
          </h1>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button v-if="isSync" @click="syncLanguages" class="btn btn-app mr-2" type="button">
            {{ $t('Synchronize') }}
          </button>
          <router-link class="btn btn-app mx-1" to="/admin/languages/new">
            {{ $t('Create') }}
          </router-link>
          <router-link class="btn btn-red mx-1" to="/admin">
            {{ $t('Back') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="content-card-body">
        <!--<loading :active="loading"></loading>-->
        <template v-if="languagesList.length > 0">
          <ul>
            <template v-for="(language, index) in languagesList" :key="index">
              <li :class="{ 'border-t border-gray-200': index !== 0 }">
                <router-link
                  :to="`/admin/languages/${language.id}/edit`"
                  class="block hover:bg-gray-50 focus:outline-none focus:bg-blue-100 transition duration-150 ease-in-out"
                >
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="min-w-0 flex-1 flex items-center">
                      <div class="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <div class="text-sm leading-5 font-medium text-blue-600 truncate">
                            {{ language.name }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg-vue class="h-5 w-5 text-gray-400" :icon="['fas', 'angle-right']"></svg-vue>
                    </div>
                  </div>
                </router-link>
              </li>
            </template>
          </ul>
        </template>
        <template v-else>
          <no-content />
        </template>
        <div class="hidden sm:block">
          <nav class="bg-white p-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <p class="text-sm leading-5 text-gray-700">
              {{ $t('Showing') }}
              <span class="font-medium">{{ languagesList.length }}</span>
              {{ $t('languages') }}
            </p>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import NoContent from '../../../components/no-content.vue'
export default {
  name: 'List',
  metaInfo() {
    return {
      title: this.$t('Translations'),
    };
  },
  components: {
    NoContent:'no-content'
  },
  data() {
    return {
      loading: true,
      languagesList: [],
    };
  },
  mounted() {
    this.getLanguages();
  },
  computed: {
    isSync() {
      return window.app.synchronizer_dispay;
    },
  },
  methods: {
    getLanguages() {
      this.loading = true;
      this.$axios
        .get('http://localhost/'+'api/v1/admin/languages/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.languagesList = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    syncLanguages() {
      this.loading = true;
      this.$notify({
        title: this.$t('Success').toString(),
        text: this.$t('The synchronization process has been started').toString(),
        type: 'info',
      });
      this.$axios.post('http://localhost/'+'api/v1/admin/languages/sync', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then((response) => {
        this.$notify({
          title: this.$t('Success').toString(),
          text: response.data.message.toString(),
          type: 'success',
        });
        this.loading = false;
      });
    },
  },
};
</script>
