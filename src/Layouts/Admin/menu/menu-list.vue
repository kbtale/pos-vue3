<template>
  <div class="pt-5">
    <div @click="openSection = openSection === 'portalGates' ? null : 'portalGates'" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer">
      Portals
    </div>
    <menu-item v-show="openSection === 'portalGates'" label="Dashboard" mobile="mobile" :icon="['fas', 'chart-line']" to="/admin/dashboard"/>
    <menu-item v-show="openSection === 'portalGates'" label="Sales" mobile="mobile" :icon="['fas', 'square-poll-horizontal']" to="/admin/sales"/>
    <div @click="openSection = openSection === 'foodGates' ? null : 'foodGates'" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer">
      Food
    </div>
    <menu-item v-show="openSection === 'foodGates'" label="POS" mobile="mobile" :icon="['fas', 'store']" to="/pos"/>
    <menu-item v-show="openSection === 'foodGates'" label="Kitchen" mobile="mobile" :icon="['fas', 'utensils']" to="/kitchen-display"/>
    <menu-item v-show="openSection === 'foodGates'" label="Categories" mobile="mobile" :icon="['fas', 'sitemap']" to="/admin/categories"/>
    <menu-item v-show="openSection === 'foodGates'" label="Items" mobile="mobile" :icon="['fas', 'table-list']" to="/admin/products"/>
    <menu-item v-show="openSection === 'foodGates'" label="Modifiers" mobile="mobile" :icon="['fas', 'bars-staggered']" to="/admin/modifiers"/>
    <menu-item v-show="openSection === 'foodGates'" label="Ingredients" mobile="mobile" :icon="['fas', 'boxes-stacked']" to="/admin/ingredients"/>
    <div @click="openSection = openSection === 'expenseGates' ? null : 'expenseGates'" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer">
      Expenses
    </div>
    <menu-item v-show="openSection === 'expenseGates'" label="Expense Types" mobile="mobile" :icon="['fas', 'sitemap']" to="/admin/expense-types"/>
    <menu-item v-show="openSection === 'expenseGates'" label="Expenses" mobile="mobile" :icon="['fas', 'file-invoice']" to="/admin/expenses"/>
    <div @click="openSection = openSection === 'peopleGates' ? null : 'peopleGates'" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer">
      People
    </div>
    <menu-item v-show="openSection === 'peopleGates'" label="Users" mobile="mobile" :icon="['fas', 'users']" to="/admin/users"/>
    <menu-item v-show="openSection === 'peopleGates'" label="User roles" mobile="mobile" :icon="['fas', 'user-lock']" to="/admin/user-roles"/>
    <menu-item v-show="openSection === 'peopleGates'" label="Customers" mobile="mobile" :icon="['fas', 'users-line']" to="/admin/customers"/>
    <div @click="openSection = openSection === 'reportGates' ? null : 'reportGates'" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer">
      Reports
    </div>
    <menu-item v-show="openSection === 'reportGates'" label="Overall Report" mobile="mobile" :icon="['fas', 'file-invoice']" to="/admin/overall-report"/>
    <menu-item v-show="openSection === 'reportGates'" label="Tax Report" mobile="mobile" :icon="['fas', 'file-invoice']" to="/admin/tax-report"/>
    <menu-item v-show="openSection === 'reportGates'" label="Expense Report" mobile="mobile" :icon="['fas', 'file-invoice']" to="/admin/expense-report"/>
    <menu-item v-show="openSection === 'reportGates'" label="Stock alert" mobile="mobile" :icon="['fas', 'file-invoice']" to="/admin/stock-alerts"/>
    <div @click="openSection = openSection === 'advancedGates' ? null : 'advancedGates'" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer">
      Advanced
    </div>
    <menu-item v-show="openSection === 'advancedGates'" label="Imports exports" mobile="mobile" :icon="['fas', 'recycle']" to="/admin/imports-exports"/>
    <menu-item v-show="openSection === 'advancedGates'" label="Service Tables" mobile="mobile" :icon="['fas', 'star']" to="/admin/service-tables"/>
    <menu-item v-show="openSection === 'advancedGates'" label="Payment methods" mobile="mobile" :icon="['fas', 'dollar-sign']" to="/admin/payment-methods"/>
    <menu-item v-show="openSection === 'advancedGates'" label="Backup" mobile="mobile" :icon="['fas', 'database']" to="/admin/backup"/>
    <router-link to="/admin/settings" custom v-slot="{ navigate, isActive, isExactActive }">
      <div @click="openSection = openSection === 'settingsGates' ? null : 'settingsGates'; navigate()" :class="[isActive && 'active', isExactActive && 'exact-active']" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer">
        Settings
      </div>
    </router-link>
    <router-link to="/admin/languages" custom v-slot="{ navigate, isActive, isExactActive }">
      <div @click="openSection = openSection === 'languageGates' ? null : 'languageGates'; navigate()" :class="[isActive && 'active', isExactActive && 'exact-active']" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer">
        Languages
      </div>
    </router-link>
    </div>
</template>

<script>
import MenuItem from './menu-item.vue';

export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      openSection: null,
    };
  }
};
</script>