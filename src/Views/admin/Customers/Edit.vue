<template>
  <main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex min-w-0">
          <svg-vue class="content-title-icon" :icon="['fas', 'pen-to-square']"></svg-vue>
          <h1 class="content-title">
            {{ $t('Edit customer') }}
          </h1>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button @click="deleteCustomerModal = true" class="btn btn-red mx-1" type="button">
            {{ $t('Delete') }}
          </button>
          <router-link class="btn btn-app mx-1" to="/admin/customers">
            {{ $t('Back') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="content-card-body">
        <!--<loading :active="loading"></loading>-->
        <form @submit.prevent="updateCustomer">
          <div class="md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
            <div class="md:col-span-1">
              <h3 class="form-description-head">
                {{ $t('customer details') }}
              </h3>
              <p class="form-description-text">{{ $t('This information will be displayed publicly') }}.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3">
                  <label class="form-label" for="name">{{ $t('Name') }}</label>
                  <div class="pt-1">
                    <input :placeholder="$t('First name')" class="form-input" id="name" required v-model="customer.name" />
                  </div>
                </div>
                <div class="col-span-3 md:flex md:space-x-2">
                  <div class="w-full">
                    <label class="form-label" for="email">{{ $t('Email') }}</label>
                    <div class="pt-1">
                      <input :placeholder="$t('Email')" class="form-input" id="email" v-model="customer.email" />
                    </div>
                  </div>
                  <div class="w-full">
                    <label class="form-label" for="phone">{{ $t('Phone') }}</label>
                    <div class="pt-1">
                      <input :placeholder="$t('Phone')" class="form-input" id="phone" v-model="customer.phone" />
                    </div>
                  </div>
                </div>

                <div class="col-span-3">
                  <label class="form-label" for="address">{{ $t('Address') }}</label>
                  <div class="pt-1">
                    <input :placeholder="$t('Address')" class="form-input" id="address" v-model="customer.address" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <span class="inline-flex">
              <router-link class="btn btn-app mx-1" to="/admin/customers">{{ $t('Cancel') }}</router-link>
              <button class="btn btn-green" type="submit">
                {{ $t('Update') }}
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
    <delete-model :show="deleteCustomerModal" @cancelled="deleteCustomerModal = false" @confirmed="deleteCustomer">
      <template #title>{{ $t('Delete customer') }}</template>
      {{ $t('Are you sure you want to delete the customer ?') }}
      {{ $t('All data will be permanently removed') }}.
    </delete-model>
  </main>
</template>
<script>
import confirmationModel from '../../../layouts/admin/confirmation.vue';
export default {
  name: 'edit',
  metaInfo() {
    return {
      title: this.$t('Edit customer'),
    };
  },
  components: {
    DeleteModel: confirmationModel,
  },
  data() {
    return {
      loading: true,
      deleteCustomerModal: false,
      customer: {
        name: null,
        email: null,
        phone: null,
        address: null,
      },
    };
  },
  mounted() {
    this.getCustomer();
  },
  methods: {
    updateCustomer() {
      this.loading = true;
      this.$axios
        .put('http://localhost:8000/api/v1/admin/customers/'+this.$route.params.uuid, this.customer,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.loading = false;
          this.$notify({
            title: this.$t('Success').toString(),
            text: response.data.message.toString(),
            type: 'success',
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getCustomer() {
      this.loading = true;
      this.$axios
        .get('http://localhost:8000/api/v1/admin/customers/'+this.$route.params.uuid,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.customer = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    deleteCustomer() {
      this.$axios
        .delete('http://localhost:8000/api/v1/admin/customers/'+this.$route.params.uuid,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.$notify({
            title: this.$t('Success').toString(),
            text: response.data.message.toString(),
            type: 'success',
          });
          this.$router.push('/admin/customers');
        })
        .catch(() => {
          this.deleteCustomerModal = false;
        });
    },
  },
};
</script>
