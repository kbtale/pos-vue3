<template>
  <main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex min-w-0">
          <svg-vue class="content-title-icon" :icon="['fas', 'pen']"></svg-vue>
          <h1 class="content-title">
            {{ $t('Edit service table') }}
          </h1>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button class="btn btn-red mx-1" type="button" @click="deleteServiceTableModal = true">
            {{ $t('Delete') }}
          </button>
          <router-link class="btn btn-app mx-1" to="/admin/service-tables">
            {{ $t('Back') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="content-card-body">
        <form @submit.prevent="updateServiceTable">
          <!--<loading :active="loading"></loading>-->
          <div class="md:grid md:grid-cols-3 md:gap-3 px-4 py-5 sm:p-6">
            <div class="md:col-span-1">
              <h3 class="form-description-head">
                {{ $t('Service table name') }}
              </h3>
              <p class="form-description-text">{{ $t('Edit Service table detail and information') }}.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-3 gap-3">
                <div class="col-span-3">
                  <label class="form-label" for="title">{{ $t('Table name or title') }}</label>
                  <input :placeholder="$t('Table name or title')" type="text" class="form-input" id="title" required v-model="table.title" />
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <span class="inline-flex">
              <router-link class="btn btn-app shadow-sm mx-1" to="/admin/service-tables">
                {{ $t('Cancel') }}
              </router-link>
              <button class="btn btn-app shadow-sm mx-1" type="submit">
                {{ $t('Save') }}
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
    <delete-model :show="deleteServiceTableModal" @cancelled="deleteServiceTableModal = false" @confirmed="deleteServiceTable">
      <template #title>{{ $t('Delete tag') }}</template>
      {{ $t('Are you sure you want to delete the service table ?') }}
      {{ $t('All data will be permanently removed') }}.
    </delete-model>
  </main>
</template>
<script>
import confirmationModel from '../../../layouts/admin/confirmation.vue';

export default {
  name: 'Edit',
  metaInfo() {
    return {
      title: this.$t('Edit service table'),
    };
  },
  components: {
    DeleteModel: confirmationModel,
  },
  data() {
    return {
      loading: true,
      deleteServiceTableModal: false,
      table: {
        title: null,
      },
    };
  },
  mounted() {
    this.getServiceTable();
  },
  methods: {
    deleteServiceTable() {
      this.$axios
        .delete('http://192.168.1.186:8000/'+'api/v1/admin/service-tables/'+this.$route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          /*
          this.$notify({
            title: this.$t('Success').toString(),
            text: response.data.message.toString(),
            type: 'success',
          });
          */
          this.$router.push('/admin/service-tables');
        })
        .catch(() => {
          this.deleteServiceTableModal = false;
        });
    },
    updateServiceTable() {
      this.loading = true;
      this.$axios
        .put('http://192.168.1.186:8000/'+'api/v1/admin/service-tables/'+this.$route.params.id, this.table, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.loading = false;
          /*
          this.$notify({
            title: this.$t('Success').toString(),
            text: response.data.message.toString(),
            type: 'success',
          });
          */
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getServiceTable() {
      this.loading = true;
      this.$axios
        .get('http://192.168.1.186:8000/'+'api/v1/admin/service-tables/'+this.$route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.table = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
