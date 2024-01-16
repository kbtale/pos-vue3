<template>
<!--
<div class="bg-white relative flex-1">
  <div class="w-full flex categories-center justify-between">
            <div tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl leading-normal text-gray-800">
              <input type="text" id="search" v-model="filters.search" :placeholder="$t('Search')" @change="getSaleOrderList" class="form-input" />
            </div>
            <div class="flex items-center space-x-3">
              <p>{{ $t('Sort By:') }}</p>
              <div class="flex border-2 border-gray-300 rounded-md">
                <select @change="changeSort" aria-label="Sort by" class="form-input border-none" id="sorting" v-model="sort.column">
                  <option value="name">{{ $t('Name') }}</option>
                  <option value="email">{{ $t('Email') }}</option>
                  <option value="phone">{{ $t('Phone') }}</option>
                  <option value="address">{{ $t('Address') }}</option>
                  <option value="created_at">{{ $t('Created at') }}</option>
                  <option value="updated_at">{{ $t('Updated at') }}</option>
                </select>
                <button @click="changeSort" class="flex text-gray-800 font-bold px-2 form-input border-none bg-white" type="button">
                  <svg-vue class="h-4 w-4 text-gray-700" :icon="['fas', 'arrow-down-short-wide']" v-show="sort.order === 'asc'"></svg-vue>
                  <svg-vue class="h-4 w-4 text-gray-700" :icon="['fas', 'arrow-up-wide-short']" v-show="sort.order === 'desc'"></svg-vue>
                  <span class="ml-2">{{ $t('Sort') }}</span>
                </button>
              </div>
            </div>
          </div>
    <div class="sales-list">
    <div v-if="salesList.length > 0">
      <ul class="border-b border-gray-200 divide-y divide-gray-200">
        <li v-for="(sale, index) in salesList" :key="index">
          <router-link :to="`/admin/sales/${sale.uuid}/view`" class="flex items-center justify-between px-4 py-4 hover:bg-gray-100 sm:px-6">
            <div class="flex items-center truncate space-x-3">
              <div class="whitespace-no-wrap">
                <div class="text-sm leading-5 w-full truncate">
                  <span class="bg-gray-200 px-1 mr-1">ID # {{ sale.id }} </span>
                  {{ sale.customer ? `${$t('Customer')} : ${sale.customer.name}` : '' }}
                </div>
                <div class="text-sm leading-5 w-full truncate">
                  <span class="bg-yellow-200 px-1 mr-1"> {{ $t('Cost') }} : {{ sale.cart_total_cost }} </span>
                  <span class="bg-yellow-200 px-1 mr-1"> {{ $t('Price') }} : {{ sale.cart_total_price }} </span>
                </div>
                <div class="text-sm leading-5 w-full truncate">
                  <span class="bg-yellow-200 px-1 mr-1"> {{ $t('Discount') }} : {{ sale.discount_amount }} </span>
                  <span class="bg-yellow-200 px-1 mr-1"> {{ $t('Tax') }} : {{ sale.tax_amount }} </span>
                </div>
                {{ $t('Last update') }} : {{ sale.updated_at }}
              </div>
            </div>
            <svg-vue class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" :icon="['fas', 'angle-right']"></svg-vue>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      No sales found
    </div>
    </div>
</div>
-->
<main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex min-w-0">
          <svg-vue class="content-title-icon" :icon="['fas', 'rectangle-list']"></svg-vue>
          <h1 class="content-title">
            {{ $t('Sales') }}
          </h1>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <router-link class="btn btn-app" to="/admin">
            {{ $t('Back') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="content-card-body">
        <!--<loading :active="loading"></loading>-->
        <div class="p-4">
          <div class="w-full flex justify-between">
            <div tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl leading-normal text-gray-800">
              <input type="text" id="search" v-model="filters.search" :placeholder="$t('Search')" @change="getUsers" class="form-input" />
            </div>
            <div class="flex items-center space-x-3">
              <p>{{ $t('Sort By:') }}</p>
              <div class="flex border-2 border-gray-300 rounded-md">
                <select @change="changeSort" aria-label="Sort by" class="form-input border-none" id="sorting" v-model="sort.column">
                  <option value="name">{{ $t('Name') }}</option>
                  <option value="email">{{ $t('Email') }}</option>
                  <option value="phone">{{ $t('Phone') }}</option>
                  <option value="address">{{ $t('Address') }}</option>
                  <option value="created_at">{{ $t('Created at') }}</option>
                  <option value="updated_at">{{ $t('Updated at') }}</option>
                </select>
                <button @click="changeSort" class="flex text-gray-800 font-bold px-2 form-input border-none bg-white" type="button">
                  <svg-vue class="h-4 w-4 text-gray-700" :icon="['fas', 'arrow-down-short-wide']" v-show="sort.order === 'asc'"></svg-vue>
                  <svg-vue class="h-4 w-4 text-gray-700" :icon="['fas', 'arrow-up-wide-short']" v-show="sort.order === 'desc'"></svg-vue>
                  <span class="ml-2">{{ $t('Sort') }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="bg-white py-2">
            <div class="overflow-x-auto bg-white">
              <!--<loading :active="loading"></loading>-->
              <template v-if="salesList.length > 0">
                <li v-for="(sale, index) in salesList" :key="index" style="list-style: none" class="border-2">
                  <router-link :to="`/admin/sales/${sale.uuid}/view`" class="flex items-center px-4 py-2 hover:bg-gray-100 sm:px-6">
                      <div class="flex items-center truncate space-x-3 flex-1">
                        <div class="flex flex-col items-start">
                          <div>
                            <template v-if="(sale.progress < 99) && (!sale.completed_at)">
                            <svg-vue class="h-5 w-5 text-orange-400 group-hover:text-orange-500 group-focus:text-orange-600 transition ease-in-out duration-150" :icon="['fas', 'spinner']"></svg-vue>
                            </template>
                            <template v-else-if="(sale.progress > 99) && (!sale.completed_at)">
                            <svg-vue class="h-5 w-5 text-green-400 group-hover:text-green-500 group-focus:text-green-600 transition ease-in-out duration-150" :icon="['fas', 'circle-check']"></svg-vue>
                            </template>
                            <template v-if="(sale.completed_at) && (sale.total_paid<sale.cart_total_price) && (!sale.customer.partner)">
                            <svg-vue class="h-5 w-5 text-red-400 group-hover:text-red-500 group-focus:text-red-600 transition ease-in-out duration-150" :icon="['fas', 'triangle-exclamation']"></svg-vue>
                            </template>
                            <template v-if="(sale.completed_at) && (sale.total_paid<sale.cart_total_price) && (sale.customer.partner)">
                            <svg-vue class="h-5 w-5 text-orange-400 group-hover:text-orange-500 group-focus:text-orange-600 transition ease-in-out duration-150" :icon="['fas', 'user-tie']"></svg-vue>
                            </template>
                          </div>
                          <img :src="sale.signature" class="wider">
                        </div>
                        <div class="whitespace-no-wrap">
                          <div class="text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="bg-gray-200 px-1 mr-1">ID #{{ sale.id }} </span>
                            {{ sale.customer ? `${$t('Customer')}: ${sale.customer.name}` : '' }}
                          </div>
                          <div class="flex justify-start text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="px-1 mr-1"> {{ $t('Cost') }}: {{ sale.cart_total_cost }} </span>
                            <span class="px-1 mr-1"> {{ $t('Price') }}: {{ sale.cart_total_price }} </span>
                          </div>
                          <div class="flex justify-start text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="px-1 mr-1"> {{$t('Discount')}}: {{sale.discount_amount}}  </span>
                            <span class=" px-1 mr-1"> {{$t('Tax')}}: {{sale.tax_amount}} </span>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center truncate space-x-3 flex-1">
                        <div class="whitespace-no-wrap">
                          <div class="flex justify-start text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="px-1 mr-1"> {{ $t('Tracking') }}: #{{ sale.tracking }}  </span>
                          </div>
                          <div class="text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="px-1 mr-1">{{ $t('Created at') }}: {{ sale.took_at }} </span>
                          </div>
                          <div class="flex justify-start text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="px-1 mr-1"> {{$t('Last update')}}: {{ (sale.updated_at) ? `${sale.updated_at}` : `${sale.took_at}` }} </span>
                          </div>
                        </div>
                      </div>
                        <svg-vue class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" :icon="['fas', 'angle-right']"></svg-vue>
                    </router-link>
                  </li>
              </template>
              <template v-else>
                <no-content />
              </template>
              <nav class="bg-gray-100 px-4 py-3 flex items-center justify-between sm:px-6">
                <div class="hidden sm:block">
                  <p class="text-sm leading-5 text-gray-700">
                    {{ $t('Per page') }}
                    <select @change="getUsers" class="border-none py-1 px-2 mr-10" v-model="perPage">
                      <option value="1">1</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="150">150</option>
                    </select>
                    {{ $t('Showing') }}
                    <span class="font-medium">{{ pagination.perPage * pagination.currentPage - pagination.perPage + 1 }}</span>
                    {{ $t('to') }}
                    <span class="font-medium">{{
                      pagination.perPage * pagination.currentPage <= pagination.total ? pagination.perPage * pagination.currentPage : pagination.total
                    }}</span>
                    {{ $t('of') }}
                    <span class="font-medium">{{ pagination.total }}</span>
                    {{ $t('results') }}
                  </p>
                </div>
                <div class="flex-1 flex justify-between sm:justify-end">
                  <button
                    :class="pagination.currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''"
                    :disabled="pagination.currentPage <= 1"
                    @click="changePage(pagination.currentPage - 1)"
                    class="pagination-link"
                    type="button"
                  >
                    {{ $t('Previous') }}
                  </button>
                  <button
                    :class="pagination.currentPage >= pagination.totalPages ? 'opacity-50 cursor-not-allowed' : ''"
                    :disabled="pagination.currentPage >= pagination.totalPages"
                    @click="changePage(pagination.currentPage + 1)"
                    class="ml-3 pagination-link"
                    type="button"
                  >
                    {{ $t('Next') }}
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { ref } from 'vue';
import InputSelect from '../../../components/input-select.vue';
import NoContent from '../../../components/no-content.vue';

export default {
  components: {
    'input-select': InputSelect,
    'no-content': NoContent
  },
  data() {
    return {
      filtersSidebar: ref(false),
      filters: ref({
        search: '',
        order_type: null,
        table: null,
        taker: null,
        chef: null,
        biller: null,
      }),
      orderTypes: [
        { key: 'all', title: 'All' },
        { key: 'dining', title: 'Dining' },
        { key: 'takeout', title: 'Takeout' },
        { key: 'delivery', title: 'Delivery' },
      ],
      tableList: ref([]),
      takerList: ref([]),
      chefList: ref([]),
      billerList: ref([]),
      salesList: ref([]),
      perPage: ref(10),
      pagination: ref({
        currentPage: 1,
        totalPages: 0,
        perPage: 0,
        total: 0,
      }),
      sort: ref({
        column: 'tracking',
        order: 'desc',
      }),
      anyFilter: ref(false),
    };
  },
  mounted() {
    this.getSaleOrderList();
  },
  methods: {
    OrderType(value) {
      return Type[value];
    },
    getSaleOrderList() {
      this.$axios
        .get('http://192.168.1.186:8000/'+'api/v1/admin/sales/', {
          params: {
            page: this.page,
            sort: this.sort,
            perPage: this.perPage,
            ...this.filters,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          //console.log(JSON.stringify(response))
          this.salesList = response.data.items;
          this.pagination = response.data.pagination;
          if (this.pagination.totalPages < this.pagination.currentPage) {
            this.page = this.pagination.totalPages;
            this.getSaleOrderList();
          } else {
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    changeSort() {
      if (this.sort.order === 'asc') {
        this.sort.order = 'desc';
      } else if (this.sort.order === 'desc') {
        this.sort.order = 'asc';
      }
      this.getSaleOrderList();
    },
    changePage(page) {
      if (page > 0 && page <= this.pagination.totalPages && page !== this.page) {
        this.page = page;
        this.getSaleOrderList();
      }
    },
    decodeOrderType(key) {
      
    },
  },
};
</script>
<style scoped>
.wider {
  width: 10vw;
}
</style>