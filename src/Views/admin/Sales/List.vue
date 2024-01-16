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
                  <router-link :to="`/admin/sales/${sale.uuid}/view`" class="flex items-center justify-between px-4 py-2 hover:bg-gray-100 sm:px-6">
                      <div class="flex items-center truncate space-x-3 border">
                        <img :src="sale.signature" class="wider">
                        <div class="whitespace-no-wrap">
                          <div class="text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="bg-gray-200 px-1 mr-1">ID #{{ sale.id }} </span>
                            {{ sale.customer ? `${$t('Customer')}: ${sale.customer.name}` : '' }}
                          </div>
                          <div class="flex justify-start text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="px-1 mr-1"> {{ $t('Cost') }}: {{ sale.cart_total_cost }} </span>
                            <span class="px-1 mr-1"> {{ $t('Price') }}: {{ sale.cart_total_price }} </span>
                          </div>
                          <div v-if="sale.discount_amount>0 || sale.tax_amount>0" class="flex justify-start text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span v-if="sale.discount_amount>0" class="bg-yellow-200 px-1 mr-1"> {{ (sale.discount_amount > 0) ? `${$t('Discount')}: ${sale.discount_amount}` : '' }}  </span>
                            <span v-if="sale.tax_amount>0" class="bg-yellow-200 px-1 mr-1"> {{ (sale.tax_amount > 0) ? `${$t('Tax')}: ${sale.tax_amount}` : '' }} </span>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center truncate space-x-3 border">
                        <div class="whitespace-no-wrap">
                          <div class="text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="bg-gray-200 px-1 mr-1">ID #{{ sale.id }} </span>
                            {{ sale.customer ? `${$t('Customer')}: ${sale.customer.name}` : '' }}
                          </div>
                          <div class="flex justify-start text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span class="px-1 mr-1"> {{ $t('Cost') }}: {{ sale.cart_total_cost }} </span>
                            <span class="px-1 mr-1"> {{ $t('Price') }}: {{ sale.cart_total_price }} </span>
                          </div>
                          <div v-if="sale.discount_amount>0 || sale.tax_amount>0" class="flex justify-start text-sm leading-5 w-full truncate py-2 px-3 border-b border-gray-300">
                            <span v-if="sale.discount_amount>0" class="bg-yellow-200 px-1 mr-1"> {{ (sale.discount_amount > 0) ? `${$t('Discount')}: ${sale.discount_amount}` : '' }}  </span>
                            <span v-if="sale.tax_amount>0" class="bg-yellow-200 px-1 mr-1"> {{ (sale.tax_amount > 0) ? `${$t('Tax')}: ${sale.tax_amount}` : '' }} </span>
                          </div>
                          {{ $t('Last update') }}: {{ sale.updated_at }}
                        </div>
                      </div>
                      <svg-vue class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" :icon="['fas', 'angle-right']"></svg-vue>
                    </router-link>
                  </li>
              </template>
              <template v-else>
                <no-content :search="filters.search" />
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
import inputSelect from '../../../components/input-select.vue';

export default {
  components: {
    inputSelect
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
        order: 'asc',
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
        .get('http://localhost:8000/'+'api/v1/admin/sales/', {
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
          console.log(JSON.stringify(response))
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
<!-- var render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"bg-white relative flex-1"},[_c('div',{staticClass:"my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8"},[_c('div',{staticClass:"md:flex md:items-center md:justify-between"},[_c('div',{staticClass:"flex min-w-0"},[_c('svg-vue',{staticClass:"content-title-icon",attrs:{"icon":"font-awesome.poll-h-solid"}}),_vm._v(" "),_c('h1',{staticClass:"content-title"},[_vm._v("\n          "+_vm._s(_vm.$t('Sale orders'))+"\n        ")])],1),_vm._v(" "),_c('div',{staticClass:"mt-4 flex md:mt-0"},[_c('div',{staticClass:"mx-1"},[_c('button',{staticClass:"inline-flex justify-center w-full btn btn-app",attrs:{"id":"filter-button","type":"button"},on:{"click":_vm.openFiltersSidebar}},[_c('svg-vue',{staticClass:"self-center mr-2 h-4 w-4",attrs:{"icon":"font-awesome.filter-regular"}}),_vm._v("\n            "+_vm._s(_vm.$t('Filters'))+"\n            "),_c('svg-vue',{staticClass:"self-center mx-1.5 -mx-1 h-3 w-3",attrs:{"icon":"font-awesome.chevron-right-solid"}})],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.filtersSidebar),expression:"filtersSidebar"}],staticClass:"fixed inset-0 overflow-hidden z-30"},[_c('div',{staticClass:"absolute inset-0 overflow-hidden"},[_c('section',{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:(_vm.closeFiltersSidebar),expression:"closeFiltersSidebar"}],staticClass:"absolute inset-y-0 right-0 pl-10 max-w-full flex"},[_c('transition',{attrs:{"duration":"500","enter-active-class":"transform transition ease-in-out duration-500","enter-class":"translate-x-full","enter-to-class":"translate-x-0","leave-active-class":"transform transition ease-in-out duration-500","leave-class":"translate-x-0","leave-to-class":"translate-x-full"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.filtersSidebar),expression:"filtersSidebar"}],staticClass:"w-screen max-w-xs"},[_c('div',{staticClass:"h-full flex flex-col space-y-4 bg-white shadow-xl"},[_c('header',{staticClass:"px-4 pt-4 sm:px-6"},[_c('div',{staticClass:"flex items-start justify-between space-x-3"},[_c('h2',{staticClass:"text-lg leading-7 font-medium text-gray-900"},[_vm._v("\n                            "+_vm._s(_vm.$t('Filters'))+"\n                          ")]),_vm._v(" "),_c('div',{staticClass:"h-7 flex items-center"},[_c('button',{staticClass:"text-gray-400 hover:text-gray-900 transition ease-in-out duration-150",attrs:{"aria-label":"Close panel","type":"button"},on:{"click":_vm.closeFiltersSidebar}},[_c('svg',{staticClass:"h-6 w-6",attrs:{"fill":"none","stroke":"currentColor","viewBox":"0 0 24 24","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M6 18L18 6M6 6l12 12","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2"}})])])])])]),_vm._v(" "),_c('div',{staticClass:"relative flex-1 px-4 sm:px-6 h-full border-t overflow-y-scroll"},[_c('div',{staticClass:"absolute inset-0 px-4 sm:px-6"},[_c('div',{staticClass:"grid grid-cols-3 py-3"},[_c('div',{staticClass:"col-span-3 my-2"},[_c('label',{staticClass:"form-label text-sm",attrs:{"for":"search"}},[_vm._v(_vm._s(_vm.$t('Search')))]),_vm._v(" "),_c('div',{staticClass:"relative flex-grow focus-within:z-10"},[_c('div',{staticClass:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"},[_c('svg-vue',{staticClass:"h-4 w-4 text-gray-400",attrs:{"icon":"font-awesome.search-regular"}})],1),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.lazy",value:(_vm.filters.search),expression:"filters.search",modifiers:{"lazy":true}}],staticClass:"form-input block w-full pl-10 text-sm transition ease-in-out duration-150",attrs:{"placeholder":_vm.$t('Search'),"aria-label":"Search","id":"search"},domProps:{"value":(_vm.filters.search)},on:{"change":[function($event){return _vm.$set(_vm.filters, "search", $event.target.value)},_vm.getSaleOrderList]}})])]),_vm._v(" "),_c('div',{staticClass:"col-span-3 my-2"},[_c('label',{staticClass:"form-label text-sm",attrs:{"for":"order_type"}},[_vm._v(_vm._s(_vm.$t('By Order Type')))]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.order_type),expression:"filters.order_type"}],staticClass:"form-input",attrs:{"aria-label":"Sort by","id":"order_type"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.filters, "order_type", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},_vm.getSaleOrderList]}},[_c('option',{domProps:{"value":null}},[_vm._v(_vm._s(_vm.$t('By Order Type')))]),_vm._v(" "),_vm._l((_vm.orderTypes),function(ortype,index){return _c('option',{key:index,domProps:{"value":ortype.key}},[_vm._v(_vm._s(ortype.title))])})],2)]),_vm._v(" "),(_vm.filters.order_type === 'dining')?_c('div',{staticClass:"col-span-3 my-2"},[_c('label',{staticClass:"form-label text-sm",attrs:{"for":"table"}},[_vm._v(_vm._s(_vm.$t('By Serice table')))]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.table),expression:"filters.table"}],staticClass:"form-input",attrs:{"aria-label":"Sort by","id":"table"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.filters, "table", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},_vm.getSaleOrderList]}},[_c('option',{domProps:{"value":null}},[_vm._v(_vm._s(_vm.$t('By table')))]),_vm._v(" "),_vm._l((_vm.tableList),function(table,index){return [_c('option',{key:index,domProps:{"value":table.id}},[_vm._v("\n                                    "+_vm._s(table.title)+"\n                                  ")])]})],2)]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"col-span-3 my-2"},[_c('label',{staticClass:"form-label text-sm",attrs:{"for":"taker"}},[_vm._v(_vm._s(_vm.$t('By order taker')))]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.taker),expression:"filters.taker"}],staticClass:"form-input",attrs:{"id":"taker"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.filters, "taker", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},_vm.getSaleOrderList]}},[_c('option',{domProps:{"value":null}},[_vm._v(_vm._s(_vm.$t('By taker')))]),_vm._v(" "),_vm._l((_vm.takerList),function(taker,index){return [_c('option',{key:index,domProps:{"value":taker.id}},[_vm._v("\n                                    "+_vm._s(taker.name)+"\n                                  ")])]})],2)]),_vm._v(" "),_c('div',{staticClass:"col-span-3 my-2"},[_c('label',{staticClass:"form-label text-sm",attrs:{"for":"chef"}},[_vm._v(_vm._s(_vm.$t('By Chef')))]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.chef),expression:"filters.chef"}],staticClass:"form-input",attrs:{"aria-label":"Sort by","id":"chef"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.filters, "chef", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},_vm.getSaleOrderList]}},[_c('option',{domProps:{"value":null}},[_vm._v(_vm._s(_vm.$t('By Chef')))]),_vm._v(" "),_vm._l((_vm.chefList),function(chef,index){return [_c('option',{key:index,domProps:{"value":chef.id}},[_vm._v("\n                                    "+_vm._s(chef.name)+"\n                                  ")])]})],2)]),_vm._v(" "),_c('div',{staticClass:"col-span-3 my-2"},[_c('label',{staticClass:"form-label text-sm",attrs:{"for":"biller"}},[_vm._v(_vm._s(_vm.$t('By Biller')))]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.biller),expression:"filters.biller"}],staticClass:"form-input",attrs:{"aria-label":"Sort by","id":"biller"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.filters, "biller", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},_vm.getSaleOrderList]}},[_c('option',{domProps:{"value":null}},[_vm._v(_vm._s(_vm.$t('By biller')))]),_vm._v(" "),_vm._l((_vm.billerList),function(biller,index){return [_c('option',{key:index,domProps:{"value":biller.id}},[_vm._v("\n                                    "+_vm._s(biller.name)+"\n                                  ")])]})],2)]),_vm._v(" "),_c('div',{staticClass:"col-span-3 my-2"},[_c('label',{staticClass:"form-label text-sm",attrs:{"for":"label"}},[_vm._v(_vm._s(_vm.$t('Sort')))]),_vm._v(" "),_c('div',{staticClass:"relative inline-flex w-full"},[_c('button',{staticClass:"form-input rounded-none rounded-l-md flex",attrs:{"type":"button"},on:{"click":_vm.changeSort}},[_c('svg-vue',{directives:[{name:"show",rawName:"v-show",value:(_vm.sort.order === 'asc'),expression:"sort.order === 'asc'"}],staticClass:"h-5 w-5 text-gray-400",attrs:{"icon":"font-awesome.sort-amount-down-alt-regular"}}),_vm._v(" "),_c('svg-vue',{directives:[{name:"show",rawName:"v-show",value:(_vm.sort.order === 'desc'),expression:"sort.order === 'desc'"}],staticClass:"h-5 w-5 text-gray-400",attrs:{"icon":"font-awesome.sort-amount-up-alt-regular"}}),_vm._v(" "),_c('span',{staticClass:"ml-2"},[_vm._v(_vm._s(_vm.$t('Sort')))])],1),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.sort.column),expression:"sort.column"}],staticClass:"form-input rounded-none w-full rounded-r-md",attrs:{"aria-label":"Sort by","id":"sort.column"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.sort, "column", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},_vm.changeSort]}},[_c('option',{attrs:{"value":"tracking"}},[_vm._v("\n                                    "+_vm._s(_vm.$t('Tracking'))+"\n                                  ")]),_vm._v(" "),_c('option',{attrs:{"value":"id"}},[_vm._v("\n                                    "+_vm._s(_vm.$t('Order Number'))+"\n                                  ")]),_vm._v(" "),_c('option',{attrs:{"value":"created_at"}},[_vm._v("\n                                    "+_vm._s(_vm.$t('Created at'))+"\n                                  ")]),_vm._v(" "),_c('option',{attrs:{"value":"updated_at"}},[_vm._v("\n                                    "+_vm._s(_vm.$t('Updated at'))+"\n                                  ")])])])]),_vm._v(" "),_c('div',{staticClass:"col-span-3 my-2"},[_c('label',{staticClass:"form-label text-sm",attrs:{"for":"label"}},[_vm._v(_vm._s(_vm.$t('Items per page')))]),_vm._v(" "),_c('input-select',{staticClass:"form-input",attrs:{"options":[
                                  { id: 5, name: 5 },
                                  { id: 10, name: 10 },
                                  { id: 25, name: 25 },
                                  { id: 50, name: 50 },
                                ],"id":"per_page","option-label":"name","required":""},on:{"change":_vm.getSaleOrderList},model:{value:(_vm.perPage),callback:function ($$v) {_vm.perPage=$$v},expression:"perPage"}})],1)])])])])])])],1)])])]),_vm._v(" "),_c('button',{staticClass:"btn btn-app mx-1",attrs:{"type":"button"},on:{"click":_vm.getSaleOrderList}},[_c('svg-vue',{staticClass:"w-4 h-4",attrs:{"icon":"font-awesome.sync-regular"}})],1),_vm._v(" "),_c('router-link',{staticClass:"btn btn-app mx-1",attrs:{"to":"/admin"}},[_vm._v("\n          "+_vm._s(_vm.$t('Back'))+"\n        ")])],1)])]),_vm._v(" "),_c('loading',{attrs:{"status":_vm.loading}}),_vm._v(" "),_c('div',{staticClass:"sales-list"},[(_vm.saleList.length > 0)?[_c('div',{staticClass:"sm:hidden"},[_c('ul',{staticClass:"border-b border-gray-200 divide-y divide-gray-200"},[_vm._l((_vm.saleList),function(sale,index){return [_c('li',{key:index},[_c('router-link',{staticClass:"flex items-center justify-between px-4 py-4 hover:bg-gray-100 sm:px-6",attrs:{"to":'/admin/sales/' + sale.uuid + '/view'}},[_c('div',{staticClass:"flex items-center truncate space-x-3"},[_c('div',{staticClass:"whitespace-no-wrap"},[_c('div',{staticClass:"text-sm leading-5 w-full truncate"},[_c('span',{staticClass:"bg-gray-200 px-1 mr-1"},[_vm._v("ID # "+_vm._s(sale.id)+" ")]),_vm._v(" "),(sale.customer)?_c('span',{staticClass:"bg-gray-200 px-1 mr-1"},[_vm._v(_vm._s(_vm.$t('Customer'))+" : "+_vm._s(sale.customer.name))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"text-sm leading-5 w-full truncate"},[_c('span',{staticClass:"bg-yellow-200 px-1 mr-1"},[_vm._v(" "+_vm._s(_vm.$t('Cost'))+" : "+_vm._s(_vm._f("currency")(sale.cart_total_cost))+" ")]),_vm._v(" "),_c('span',{staticClass:"bg-yellow-200 px-1 mr-1"},[_vm._v(" "+_vm._s(_vm.$t('Price'))+" : "+_vm._s(_vm._f("currency")(sale.cart_total_price))+" ")])]),_vm._v(" "),_c('div',{staticClass:"text-sm leading-5 w-full truncate"},[_c('span',{staticClass:"bg-yellow-200 px-1 mr-1"},[_vm._v(" "+_vm._s(_vm.$t('Discount'))+" : "+_vm._s(_vm._f("currency")(sale.discount_amount))+" ")]),_vm._v(" "),_c('span',{staticClass:"bg-yellow-200 px-1 mr-1"},[_vm._v(_vm._s(_vm.$t('Tax'))+" : "+_vm._s(_vm._f("currency")(sale.tax_amount)))])]),_vm._v("\n                    "+_vm._s(_vm.$t('Last update'))+" : "+_vm._s(sale.updated_at)+"\n                  ")])]),_vm._v(" "),_c('svg-vue',{staticClass:"ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150",attrs:{"icon":"font-awesome.angle-right-regular"}})],1)],1)]})],2)]),_vm._v(" "),_c('div',{staticClass:"hidden sm:block"},[_c('div',{staticClass:"align-middle inline-block min-w-full border-b border-gray-200"},[_c('table',{staticClass:"min-w-full divide-y divide-gray-200"},[_c('thead',[_c('tr',{staticClass:"bg-cyan-900 text-orange-400"},[_c('th',{staticClass:"hidden lg:table-cell p-2 text-left text-xs leading-4 font-semibold uppercase tracking-wider text-center"},[_vm._v("\n                  "+_vm._s(_vm.$t('Tracking'))+"\n                ")]),_vm._v(" "),_c('th',{staticClass:"p-2 text-left text-xs leading-4 font-semibold uppercase tracking-wider whitespace-no-wrap overflow-x-auto"},[_vm._v("\n                  "+_vm._s(_vm.$t('Information'))+"\n                ")]),_vm._v(" "),_c('th',{staticClass:"p-2 text-left text-xs leading-4 uppercase"},[_vm._v(_vm._s(_vm.$t('Table'))+"/"+_vm._s(_vm.$t('Type')))]),_vm._v(" "),_c('th',{staticClass:"p-2 text-left text-xs leading-4 uppercase"},[_vm._v(_vm._s(_vm.$t('Status')))]),_vm._v(" "),_c('th',{staticClass:"p-2 text-left text-xs leading-4 uppercase"},[_vm._v("\n                  "+_vm._s(_vm.$t('Booked at'))+"\n                ")]),_vm._v(" "),_c('th',{staticClass:"p-2 text-left text-xs leading-4 uppercase"},[_vm._v("\n                  "+_vm._s(_vm.$t('Prepared at'))+"\n                ")]),_vm._v(" "),_c('th',{staticClass:"p-2 text-left text-xs leading-4 uppercase"},[_vm._v("\n                  "+_vm._s(_vm.$t('Completed at'))+"\n                ")])])]),_vm._v(" "),_c('tbody',{staticClass:"bg-white divide-y divide-gray-200"},[_vm._l((_vm.saleList),function(sale,index){return [_c('router-link',{staticClass:"cursor-pointer hover:bg-gray-100",attrs:{"to":'/admin/sales/' + sale.uuid + '/view',"tag":"tr"}},[_c('td',{staticClass:"hidden lg:table-cell px-3 py-1 whitespace-no-wrap leading-5"},[_c('barcode',{attrs:{"value":sale.tracking,"font-size":"10","width":"1","height":"20"}})],1),_vm._v(" "),_c('td',{staticClass:"py-1 max-w-0 w-full md:w-1/2 whitespace-no-wrap"},[_c('div',{staticClass:"text-sm leading-5 w-full truncate"},[_c('span',{staticClass:"bg-gray-200 px-1 mr-1"},[_vm._v("ID # "+_vm._s(sale.id)+" ")]),_vm._v(" "),(sale.customer)?_c('span',{staticClass:"bg-gray-200 px-1 mr-1"},[_vm._v(_vm._s(_vm.$t('Customer'))+" : "+_vm._s(sale.customer.name))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"text-sm leading-5 w-full truncate"},[_c('span',{staticClass:"bg-yellow-200 px-1 mr-1"},[_vm._v(" "+_vm._s(_vm.$t('Cost'))+" : "+_vm._s(_vm._f("currency")(sale.cart_total_cost))+" ")]),_vm._v(" "),_c('span',{staticClass:"bg-yellow-200 px-1 mr-1"},[_vm._v(" "+_vm._s(_vm.$t('Price'))+" : "+_vm._s(_vm._f("currency")(sale.cart_total_price))+" ")]),_vm._v(" "),_c('span',{staticClass:"bg-yellow-200 px-1 mr-1"},[_vm._v(" "+_vm._s(_vm.$t('Discount'))+" : "+_vm._s(_vm._f("currency")(sale.discount_amount ?? 0))+" ")]),_vm._v(" "),_c('span',{staticClass:"bg-yellow-200 px-1 mr-1"},[_vm._v(_vm._s(_vm.$t('Tax'))+" : "+_vm._s(_vm._f("currency")(sale.tax_amount)))])])]),_vm._v(" "),_c('td',{staticClass:"px-2 py-1 whitespace-no-wrap leading-5 text-xs text-center"},[(sale.table)?_c('span',{staticClass:"px-2 bg-yellow-200 py-1 rounded"},[_vm._v(" "+_vm._s(sale.table.title)+" ")]):_vm._e(),_vm._v("\n                    "+_vm._s(_vm.decodeOrderType(sale.order_type))+"\n                  ")]),_vm._v(" "),_c('td',{staticClass:"px-2 py-1 whitespace-no-wrap leading-5 text-xs text-center"},[_vm._v(_vm._s(sale.progress ?? 0)+"%")]),_vm._v(" "),_c('td',{staticClass:"px-2 py-1 whitespace-no-wrap leading-5 text-xs"},[_vm._v("\n                    "+_vm._s(sale.took_at)+"\n                  ")]),_vm._v(" "),_c('td',{staticClass:"px-2 py-1 whitespace-no-wrap leading-5 text-xs"},[_vm._v("\n                    "+_vm._s(sale.prepared_at)+"\n                  ")]),_vm._v(" "),_c('td',{staticClass:"px-2 py-1 whitespace-no-wrap leading-5 text-xs"},[_vm._v("\n                    "+_vm._s(sale.completed_at)+"\n                  ")])])]})],2)])])])]:[_c('no-content',{attrs:{"search":_vm.anyFilter}})]],2),_vm._v(" "),_c('nav',{staticClass:"bg-white absolute bottom-0 left-0 w-full px-4 py-2 flex items-center justify-between border-t border-gray-500 sm:px-6"},[_c('div',{staticClass:"hidden sm:block"},[_c('p',{staticClass:"text-sm leading-5 text-gray-700"},[_vm._v("\n        "+_vm._s(_vm.$t('Showing'))+"\n        "),_c('span',{staticClass:"font-medium"},[_vm._v(_vm._s(_vm.pagination.perPage * _vm.pagination.currentPage - _vm.pagination.perPage + 1))]),_vm._v("\n        "+_vm._s(_vm.$t('to'))+"\n        "),_c('span',{staticClass:"font-medium"},[_vm._v(_vm._s(_vm.pagination.perPage * _vm.pagination.currentPage <= _vm.pagination.total ? _vm.pagination.perPage * _vm.pagination.currentPage : _vm.pagination.total))]),_vm._v("\n        "+_vm._s(_vm.$t('of'))+"\n        "),_c('span',{staticClass:"font-medium"},[_vm._v(_vm._s(_vm.pagination.total))]),_vm._v("\n        "+_vm._s(_vm.$t('results'))+"\n      ")])]),_vm._v(" "),_c('div',{staticClass:"flex-1 flex justify-between sm:justify-end"},[_c('button',{staticClass:"pagination-link",class:_vm.pagination.currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : '',attrs:{"disabled":_vm.pagination.currentPage <= 1,"type":"button"},on:{"click":function($event){return _vm.changePage(_vm.pagination.currentPage - 1)}}},[_vm._v("\n        "+_vm._s(_vm.$t('Previous'))+"\n      ")]),_vm._v(" "),_c('button',{staticClass:"ml-3 pagination-link",class:_vm.pagination.currentPage >= _vm.pagination.totalPages ? 'opacity-50 cursor-not-allowed' : '',attrs:{"disabled":_vm.pagination.currentPage >= _vm.pagination.totalPages,"type":"button"},on:{"click":function($event){return _vm.changePage(_vm.pagination.currentPage + 1)}}},[_vm._v("\n        "+_vm._s(_vm.$t('Next'))+"\n      ")])])])],1)
}
var staticRenderFns = []

export { render, staticRenderFns } -->