<template>
  <main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex min-w-0">
          <svg-vue class="content-title-icon" :icon="['fas', 'file-invoice-dollar']"></svg-vue>
          <h1 class="content-title">{{ $t('View sale order') }} #{{ sale.tracking }}</h1>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button @click="deleteSaleModal = true" class="btn btn-red mx-1" type="button">
            {{ $t('Delete') }}
          </button>
          <router-link class="btn btn-app rounded-none" :to="`/pos/${sale.uuid}`">
            {{ $t('Edit') }}
          </router-link>
          <router-link class="btn btn-app rounded-none" :to="`/print/sale/${sale.uuid}`">
            {{ $t('Print') }}
          </router-link>
          <router-link class="btn btn-red mx-1" to="/admin/sales">
            {{ $t('Back') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-10 gap-2">

        <div class="content-card-body col-span-10 md:col-span-5 bg-white shadow p-2 sm:p-6">
          <div class="flex place-content-center">
            <img :src="sale.signature">
          </div>

          <ol class="relative border-l border-gray-500 my-2">
            <li class="mb-2 ml-6">
              <div class="items-center rounded-md justify-between p-3 bg-white border border-gray-400 shadow-sm sm:flex">
                <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{ created_at }}</time>
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                  {{ $t('Created at') }}
                </div>
              </div>
            </li>
            <li v-if="sale.taker" class="mb-10 ml-6">
              <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 -full -left-3 ring-8 ring-white">
                <img class="-full shadow-lg" :src="sale.taker.avatar !== 'gravatar' ? sale.taker.avatar : sale.taker.gravatar" :alt="sale.taker.name" />
              </span>
              <div class="items-center rounded-md justify-between p-3 bg-white border border-gray-400 shadow-sm sm:flex">
                <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{ $t('At') }}: {{ sale.took_at }}</time>
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">{{ $t('Order taken by ') }} {{ sale.taker.name }}</div>
              </div>
            </li>
            <li class="mb-2 ml-6">
              <div class="items-center rounded-md justify-between p-3 bg-white border border-gray-400 shadow-sm sm:flex">
                <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{ sale.is_preparing ? $t('Yes') : $t('No') }}</time>
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                  {{ $t('Cooking started') }}
                </div>
              </div>
            </li>
            <li class="mb-2 ml-6">
              <div class="items-center rounded-md justify-between p-3 bg-white border border-gray-400 shadow-sm sm:flex">
                <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{ sale.progress }} %</time>
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                  {{ $t('Cooking progress') }}
                </div>
              </div>
            </li>

            <li v-if="sale.progress > 90 && sale.chef" class="mb-10 ml-6">
              <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 -full -left-3 ring-8 ring-white">
                <img class="-full shadow-lg" :src="sale.chef.avatar !== 'gravatar' ? sale.chef.avatar : sale.chef.gravatar" :alt="sale.chef.name" />
              </span>
              <div class="items-center rounded-md justify-between p-3 bg-white border border-gray-400 shadow-sm sm:flex">
                <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{ $t('At') }}: {{ sale.took_at }}</time>
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">{{ $t('Cooked by ') }} {{ sale.chef.name }}</div>
              </div>
            </li>
            <li v-if="sale.biller" class="mb-2 ml-6">
              <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 -full -left-3 ring-8 ring-white">
                <img class="-full shadow-lg" :src="sale.biller.avatar !== 'gravatar' ? sale.biller.avatar : sale.biller.gravatar" :alt="sale.biller.name" />
              </span>
              <div class="items-center rounded-md justify-between p-3 bg-white border border-gray-400 shadow-sm sm:flex">
                <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{ $t('At') }}: {{ sale.completed_at }}</time>
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">{{ $t('Checkout by ') }} {{ sale.biller.name }}</div>
              </div>
            </li>
            <li class="mb-10 ml-6">
              <div class="items-center rounded-md justify-between p-3 bg-white border border-gray-400 shadow-sm sm:flex">
                <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{ updated_at }}</time>
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                  {{ $t('Last updated at') }}
                </div>
              </div>
            </li>
          </ol>
        </div>
        <div class="content-card-body col-span-10 md:col-span-5 bg-white shadow p-2 sm:p-6">
          <ul role="list">
            <li v-for="(item, index) in sale.items" :key="index" class="w-full mb-1 py-1 rounded-md border-gray-400 shedow-md border">
              <div class="flex">
                <div class="ml-2 flex-1 flex flex-col pt-3 pl-3">
                  <div class="flex space-x-2 text-left text-xs font-medium">
                    <div class="truncate w-full">
                      <h3 class="text-lg">{{ item.name }}</h3>
                      <ul>
                        <li v-for="(modifier, key) in item.modifiers" class="product-topping flex justify-between">
                          <span>+ {{ modifier.title }}</span>
                          <span>{{ modifier.price }} x {{ modifier.qty }}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="font-semibold h-full border-gray-400 border-l w-1/4">
                      <p class="p-2 product-topping">{{ item.price }} x {{ item.qty }}</p>
                      <p class="p-2 product-topping">{{ item.modifiers_price }}</p>
                      <p class="border-gray-400 border-t p-2">
                        <strong>{{ item.sub_total }}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="w-full mb-1 mt-1 py-2 overflow-hidden">
            <div v-if="sale.items" class="px-1 flex justify-between font-semibold text-black">
              <p>{{ $t('Items') }} :</p>
              <p class="pl-2">{{ sale.items.length }}</p>
            </div>
            <div class="px-1 flex justify-between font-semibold text-black">
              <p>{{ $t('Subtotal') }} :</p>
              <p class="pl-2">{{ sale.cart_total_price }}</p>
            </div>
          </div>
          <div class="w-full py-2 overflow-hidden">
            <div class="px-1 flex justify-between font-semibold text-black">
              <p>{{ $t('Discount') }} ({{ sale.discount_rate }}%)</p>
              <p class="pl-2">{{ sale.discount_amount }} (-)</p>
            </div>

            <div class="px-1 flex justify-between font-semibold text-black">
              <template v-if="sale.tax.is_tax_fix">
                <p>{{ $t('Tax') }} ({{ sale.tax.rate }} {{ $t('fix') }})</p>
              </template>
              <template v-else>
                <p>{{ $t('Tax') }} ({{ sale.tax.rate }}{{ sale.tax.is_tax_fix ? '' : '%' }})</p>
              </template>
              <p class="pl-2">{{ sale.tax_amount }} (+)</p>
            </div>

            <div class="px-1 flex justify-between font-semibold text-black">
              <p>{{ $t('Total') }}</p>
              <p class="pl-2">{{ sale.payable_after_all }}</p>
            </div>
          </div>

          <div class="mt-1 overflow-hidden">
            <div class="px-1 flex justify-between font-semibold text-black">
              <p>{{ $t('Total cost') }}</p>
              <p class="pl-2">{{ sale.cart_total_cost }}</p>
            </div>
            <div class="px-1 flex justify-between font-semibold text-black">
              <p>{{ $t('Profit') }}</p>
              <p class="pl-2">{{ sale.cart_total_profit }}</p>
            </div>
            <div class="bg-gray-100 py-2 mt-3 overflow-hidden">
              <div class="px-4">
                <strong>{{ $t('Staff note') }}</strong>
                <p class="pl-2 text-gray-600 text-xs">{{ sale.staff_note }}</p>
              </div>
            </div>
            <div class="bg-gray-100 py-2 mt-3 overflow-hidden">
              <div class="px-4">
                <strong>{{ $t('Payment note') }}</strong>
                <p class="pl-2 text-gray-600 text-xs">{{ sale.payment_note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sale-delete-model :show="deleteSaleModal" @cancelled="deleteSaleModal = false" @confirmed="deleteSale">
      <template #title>{{ $t('Delete sale order') }}</template>
      {{ $t('Are you sure you want to delete the sale order ?') }}
    </sale-delete-model>
  </main>
</template>
<script>
//import VueBarcode from 'vue-barcode';
import confirmationModel from '../../../layouts/admin/confirmation.vue';

export default {
  metaInfo() {
    return {
      title: this.$t('Sale order'),
    };
  },
  components: {
    //barcode: VueBarcode,
    SaleDeleteModel: confirmationModel,
  },
  computed: {
    created_at() {
      let timestamp = this.sale.created_at;
      let date = new Date(timestamp);

      let formattedTimestamp = date.getFullYear() + '-' +
          ('00' + (date.getMonth()+1)).slice(-2) + '-' +
          ('00' + date.getDate()).slice(-2) + ' ' + 
          ('00' + date.getHours()).slice(-2) + ':' + 
          ('00' + date.getMinutes()).slice(-2) + ':' + 
          ('00' + date.getSeconds()).slice(-2);
      return formattedTimestamp
    },
    updated_at() {
      let timestamp = this.sale.updated_at;
      let date = new Date(timestamp);

      let formattedTimestamp = date.getFullYear() + '-' +
          ('00' + (date.getMonth()+1)).slice(-2) + '-' +
          ('00' + date.getDate()).slice(-2) + ' ' + 
          ('00' + date.getHours()).slice(-2) + ':' + 
          ('00' + date.getMinutes()).slice(-2) + ':' + 
          ('00' + date.getSeconds()).slice(-2);
      return formattedTimestamp
    }
  },
  data() {
    return {
      loading: true,
      deleteSaleModal: false,
      sale: {
        qr_link: null,
        discount: 0,
        shipping: 0,
        tax: {
          rate: 0,
          tax_id: null,
          is_tax_included: false,
          is_tax_fix: false,
        },
      },
    };
  },
  mounted() {
    this.getSaleOrder();
  },
  methods: {
    deleteSale() {
      this.$axios
        .delete('http://localhost:8000/api/v1/admin/sales/'+this.$route.params.uuid, {
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
          this.$router.push('/admin/sales');
        })
        .catch(() => {
          this.deleteSaleModal = false;
        });
    },
    getSaleOrder() {
      this.loading = true;
      console.log(this.$route)
      this.$axios
        .get('http://localhost:8000/api/v1/admin/sales/'+this.$route.params.uuid, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          console.log(JSON.stringify(response.data))
          this.sale = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
