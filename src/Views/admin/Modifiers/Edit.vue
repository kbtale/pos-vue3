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
          <button class="btn btn-red mx-1" type="button" @click="deleteModifierModal = true">
            {{ $t('Delete') }}
          </button>
          <router-link class="btn btn-app mx-1" to="/admin/modifiers">
            {{ $t('Back') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="content-card-body">
        <form @submit.prevent="updateModifier">
          <!--<loading :active="loading"></loading>-->
          <div class="md:grid md:grid-cols-3 md:gap-4 px-4 py-5 sm:p-6">
            <div class="md:col-span-1">
              <h3 class="form-description-head">
                {{ $t('Food modifier information') }}
              </h3>
              <p class="form-description-text">{{ $t('Enter information for new food modifier with ingredients') }}.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3">
                  <label class="form-label" for="title">{{ $t('Title') }}</label>
                  <div class="pt-1">
                    <input :placeholder="$t('Title')" class="form-input" id="title" required v-model="modifier.title" />
                  </div>
                </div>
                <div class="col-span-3">
                  <ingredient-consumption @updated="uplink($event)" :item="modifier" />
                </div>
                <div class="col-span-3 md:flex md:space-x-2">
                  <div class="w-full">
                    <label class="form-label" for="cost">{{ $t('Cost') }}</label>
                    <div class="pt-1">
                      <input :placeholder="$t('Cost')" type="number" step="0.01" class="form-input" id="cost" required v-model="modifier.cost" />
                    </div>
                  </div>
                  <div class="w-full">
                    <label class="form-label" for="price">{{ $t('Price') }}</label>
                    <div class="pt-1">
                      <input :placeholder="$t('Price')" type="number" step="0.01" class="form-input" id="price" required v-model="modifier.price" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <span class="inline-flex">
              <router-link class="btn btn-app shadow-sm mx-1" to="/admin/modifiers">
                {{ $t('Cancel') }}
              </router-link>
              <button class="btn btn-green shadow-sm" type="submit">
                {{ $t('Update') }}
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
    <delete-model :show="deleteModifierModal" @cancelled="deleteModifierModal = false" @confirmed="deleteModifier">
      <template #title>{{ $t('Delete modifier') }}</template>
      {{ $t('Are you sure you want to delete the food modifier?') }}
      {{ $t('All data will be permanently removed') }}.
    </delete-model>
  </main>
</template>
<script>
import confirmationModel from '../../../layouts/admin/confirmation.vue';
import IngredientConsumption from '../../../Components/ingredient-consumption.vue';
export default {
  name: 'Edit',
  metaInfo() {
    return {
      title: this.$t('Edit modifier'),
    };
  },
  components: {
    DeleteModel: confirmationModel,
    'ingredient-consumption': IngredientConsumption,
  },
  data() {
    return {
      loading: true,
      deleteModifierModal: false,
      modifier: {
        ingredients: [],
        title: null,
        price: 1,
      },
    };
  },
  mounted() {
    this.getFoodModifier();
  },
  methods: {
    uplink(e) {
      this.modifier = e;
    },
    deleteModifier() {
      this.$axios
        .delete('http://192.168.1.186:8000/'+'api/v1/admin/modifiers/'+this.$route.params.id, {
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
          this.$router.push('/admin/modifiers');
        })
        .catch(() => {
          this.deleteModifierModal = false;
        });
    },
    updateModifier() {
      this.loading = true;
      this.$axios
        .put('http://192.168.1.186:8000/'+'api/v1/admin/modifiers/'+this.$route.params.id, this.modifier, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          console.log("Updating modifier")
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
    getFoodModifier() {
      this.loading = true;
      this.$axios
        .get('http://192.168.1.186:8000/'+'api/v1/admin/modifiers/'+this.$route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          console.log("Getting food modifiers")
          this.modifier = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
