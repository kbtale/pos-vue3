<template>
  <main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
    <div class="my-6 max-w-1/6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex min-w-0">
          <svg-vue class="content-title-icon" :icon="['fas', 'user-lock']"></svg-vue>
          <h1 class="content-title">
            {{ $t('User roles') }}
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
              <input type="text" id="search" v-model="filters.search" :placeholder="$t('Search')" @change="getUserRoles" class="form-input" />
            </div>
            <div class="flex items-center space-x-3">
              <p>{{ $t('Sort By:') }}</p>
              <div class="flex border-2 border-gray-300 rounded-md">
                <select @change="changeSort" aria-label="Sort by" class="form-input border-none" id="sorting" v-model="sort.column">
                  <option value="name">{{ $t('Name') }}</option>
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
            <div class="bg-gray-100 p-2 mb-2 border sm:flex items-center justify-between">
              <div class="flex md:space-x-2">
                <router-link to="/admin/user-roles/new" class="btn btn-app">
                  {{ $t('Add') }}
                </router-link>
              </div>
            </div>
            <div class="overflow-x-auto bg-white">
              <!--<loading :active="loading"></loading>-->
              <template v-if="userList.length">
                <table class="w-full whitespace-nowrap">
                  <tbody>
                    <tr
                      v-for="(userRole, index) in userList"
                      :key="index"
                      tabindex="0"
                      class="focus:outline-none h-16 border-b border-cyan-900 rounded hover:bg-gray-100"
                    >
                      <td class="pl-5 py-2 items-center">
                        <p class="text-base font-medium text-xlleading-none text-gray-700">
                          {{ userRole.name }}
                        </p>
                        <span class="text-xs text-gray-400">{{ userRole.created_at }}</span>
                      </td>
                      <td class="py-2 items-center">
                        <p class="text-base font-medium text-xlleading-none text-gray-700">
                          {{ userRole.users }}
                        </p>
                        <span class="text-xs text-gray-400">{{ $t('Users assigned') }}</span>
                      </td>

                      <td class="py-2 items-center">
                        <template v-if="!userRole.is_primary">
                          <router-link
                            :to="'/admin/user-roles/' + userRole.id + '/edit'"
                            class="bg-cyan-900 hover:bg-cyan-800 text-white rounded text-sm py-3 px-5 rounded"
                          >
                            {{ $t('View') }}
                          </router-link>
                        </template>
                      </td>
                    </tr>
                    <tr class="h-3"></tr>
                  </tbody>
                </table>
              </template>
              <template v-else>
                <no-content :search="filters.search" />
              </template>
              <nav class="bg-gray-100 px-4 py-3 flex items-center justify-between sm:px-6">
                <div class="hidden sm:block">
                  <p class="text-sm leading-5 text-gray-700">
                    {{ $t('Per page') }}
                    <select @change="getUserRoles" class="border-none py-1 px-2 mr-10" v-model="perPage">
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
import NoContent from '../../../components/no-content.vue'
export default {
  name: 'list',
  metaInfo() {
    return {
      title: this.$t('User roles'),
    };
  },
  components: {
    'no-content': NoContent
  },
  data() {
    return {
      page: 1,
      sort: {
        order: 'asc',
        column: 'created_at',
      },
      filters: {
        search: null,
      },
      perPage: 10,
      loading: false,
      pagination: {
        currentPage: 0,
        perPage: 0,
        total: 0,
        totalPages: 0,
      },
      userList: [],
    };
  },
  mounted() {
    this.getUserRoles();
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.pagination.totalPages && page !== this.page) {
        this.page = page;
        this.getUserRoles();
      }
    },
    changeSort() {
      if (this.sort.order === 'asc') {
        this.sort.order = 'desc';
      } else if (this.sort.order === 'desc') {
        this.sort.order = 'asc';
      }
      this.getUserRoles();
    },
    getUserRoles() {
      this.loading = true;
      this.$axios
        .get('http://192.168.1.186:8000/'+'api/v1/admin/user-roles/', {
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
          this.userList = response.data.items;
          this.pagination = response.data.pagination;
          if (this.pagination.totalPages < this.pagination.currentPage) {
            this.page = this.pagination.totalPages;
            this.getUserRoles();
          } else {
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
