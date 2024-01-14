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
    <menu-item v-show="openSection === 'expenseGates'" label="Expense Types" mobile="mobile" :icon="['fas', 'sitemap']"to="/admin/expense-types"/>
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
    <menu-item @click="openSection = openSection === 'settingsGates' ? null : 'settingsGates'" label="Settings" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer" to="/admin/Settings"/>
    <menu-item @click="openSection = openSection === 'languageGates' ? null : 'languageGates'" label="Languages" class="py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer" to="/admin/Languages"/>
    <!--<menu-item v-show="openSection === 'settingsGates'" label="Languages" mobile="mobile" icon="font-awesome.globe-solid" to="/admin/Languages"/>-->
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

/*
var render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"pt-5"},[_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('dashboard_access')),expression:"visibility('dashboard_access')"}],attrs:{"label":_vm.$t('Dashboard'),"mobile":_vm.mobile,"icon":"font-awesome.palette-solid","to":"/admin/dashboard"}}),_vm._v(" "),(_vm.visibility('manage_sales'))?_c('menu-item',{attrs:{"label":_vm.$t('Sales'),"mobile":_vm.mobile,"icon":"font-awesome.poll-h-solid","to":"/admin/sales"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.portalGates))?_c('div',{staticClass:"py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n    "+_vm._s(_vm.$t('Portals'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('pos_portal'))?_c('menu-item',{attrs:{"label":_vm.$t('POS'),"mobile":_vm.mobile,"icon":"font-awesome.store-solid","to":"/pos"}}):_vm._e(),_vm._v(" "),(_vm.visibility('kitchen_portal'))?_c('menu-item',{attrs:{"label":_vm.$t('kitchen'),"mobile":_vm.mobile,"icon":"font-awesome.utensils-solid","to":"/kitchen-display"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.foodGates))?_c('div',{staticClass:"py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n    "+_vm._s(_vm.$t('Foods'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('manage_food_categories'))?_c('menu-item',{attrs:{"label":_vm.$t('Categories'),"mobile":_vm.mobile,"icon":"font-awesome.sitemap-solid","to":"/admin/categories"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_food_items'))?_c('menu-item',{attrs:{"label":_vm.$t('Items'),"mobile":_vm.mobile,"icon":"font-awesome.th-list-solid","to":"/admin/products"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_modifiers'))?_c('menu-item',{attrs:{"label":_vm.$t('Modifiers'),"mobile":_vm.mobile,"icon":"font-awesome.stream-solid","to":"/admin/modifiers"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_ingredients'))?_c('menu-item',{attrs:{"label":_vm.$t('Ingredients'),"mobile":_vm.mobile,"icon":"font-awesome.boxes-solid","to":"/admin/ingredients"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.expenseGates))?_c('div',{staticClass:"py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n    "+_vm._s(_vm.$t('Expenses'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('manage_expense_types'))?_c('menu-item',{attrs:{"label":_vm.$t('Expense Types'),"mobile":_vm.mobile,"icon":"font-awesome.sitemap-solid","to":"/admin/expense-types"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_expenses'))?_c('menu-item',{attrs:{"label":_vm.$t('Expenses'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/expenses"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.peopleGates))?_c('div',{staticClass:"py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n    "+_vm._s(_vm.$t('People'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('manage_users'))?_c('menu-item',{attrs:{"label":_vm.$t('Users'),"mobile":_vm.mobile,"icon":"font-awesome.users-solid","to":"/admin/users"}}):_vm._e(),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('manage_user_roles')),expression:"visibility('manage_user_roles')"}],attrs:{"label":_vm.$t('User roles'),"mobile":_vm.mobile,"icon":"font-awesome.user-lock-solid","to":"/admin/user-roles"}}),_vm._v(" "),(_vm.visibility('manage_customers'))?_c('menu-item',{attrs:{"label":_vm.$t('Customers'),"mobile":_vm.mobile,"icon":"font-awesome.users-class-regular","to":"/admin/customers"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.reportGates))?_c('div',{staticClass:"py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n    "+_vm._s(_vm.$t('Reports'))+"\n  ")]):_vm._e(),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('overall_report')),expression:"visibility('overall_report')"}],attrs:{"label":_vm.$t('Overall Report'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/overall-report"}}),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('tax_report')),expression:"visibility('tax_report')"}],attrs:{"label":_vm.$t('Tax Report'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/tax-report"}}),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('expense_report')),expression:"visibility('expense_report')"}],attrs:{"label":_vm.$t('Expense Report'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/expense-report"}}),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('stock_alerts')),expression:"visibility('stock_alerts')"}],attrs:{"label":_vm.$t('Stock alert'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/stock-alerts"}}),_vm._v(" "),(_vm.groupVisibility(_vm.advanceGates) || _vm.groupVisibility(_vm.settingGates))?_c('div',{staticClass:"py-2 px-4 select-none text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n    "+_vm._s(_vm.$t('Advance'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('import_exports'))?_c('menu-item',{attrs:{"label":_vm.$t('Imports exports'),"mobile":_vm.mobile,"icon":"font-awesome.recycle-solid","to":"/admin/imports-exports"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_service_tables'))?_c('menu-item',{attrs:{"label":_vm.$t('Service Tables'),"mobile":_vm.mobile,"icon":"font-awesome.star-regular","to":"/admin/service-tables"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_payment_methods'))?_c('menu-item',{attrs:{"label":_vm.$t('Payment methods'),"mobile":_vm.mobile,"icon":"font-awesome.dollar-sign-solid","to":"/admin/payment-methods"}}):_vm._e(),_vm._v(" "),(_vm.visibility('database_backup'))?_c('menu-item',{attrs:{"label":_vm.$t('Backup'),"mobile":_vm.mobile,"icon":"font-awesome.database-solid","to":"/admin/backup"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.settingGates))?_c('menu-item',{attrs:{"label":_vm.$t('Settings'),"mobile":_vm.mobile,"icon":"font-awesome.cogs-solid","to":"/admin/settings"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_languages'))?_c('menu-item',{attrs:{"label":_vm.$t('Languages'),"mobile":_vm.mobile,"icon":"font-awesome.globe-solid","to":"/admin/Languages"}}):_vm._e()],1)
}
var staticRenderFns = []

export { render, staticRenderFns }
*/

var render = function render(){var _vm=this,_c=_vm._self._c;return
    _c('div',{staticClass:"pt-5"},[_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('dashboard_access')),expression:"visibility('dashboard_access')"}],attrs:{"label":_vm.$t('Dashboard'),"mobile":_vm.mobile,"icon":"font-awesome.palette-solid","to":"/admin/dashboard"}}),_vm._v("
    "),(_vm.visibility('manage_sales'))?_c('menu-item',{attrs:{"label":_vm.$t('Sales'),"mobile":_vm.mobile,"icon":"font-awesome.poll-h-solid","to":"/admin/sales"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.portalGates))?_c('div',{staticClass:"py-2 px-4 select-none
    text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n "+_vm._s(_vm.$t('Portals'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('pos_portal'))?_c('menu-item',{attrs:{"label":_vm.$t('POS'),"mobile":_vm.mobile,"icon":"font-awesome.store-solid","to":"/pos"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('kitchen_portal'))?_c('menu-item',{attrs:{"label":_vm.$t('kitchen'),"mobile":_vm.mobile,"icon":"font-awesome.utensils-solid","to":"/kitchen-display"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.foodGates))?_c('div',{staticClass:"py-2 px-4 select-none
    text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n "+_vm._s(_vm.$t('Foods'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_food_categories'))?_c('menu-item',{attrs:{"label":_vm.$t('Categories'),"mobile":_vm.mobile,"icon":"font-awesome.sitemap-solid","to":"/admin/categories"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_food_items'))?_c('menu-item',{attrs:{"label":_vm.$t('Items'),"mobile":_vm.mobile,"icon":"font-awesome.th-list-solid","to":"/admin/products"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_modifiers'))?_c('menu-item',{attrs:{"label":_vm.$t('Modifiers'),"mobile":_vm.mobile,"icon":"font-awesome.stream-solid","to":"/admin/modifiers"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_ingredients'))?_c('menu-item',{attrs:{"label":_vm.$t('Ingredients'),"mobile":_vm.mobile,"icon":"font-awesome.boxes-solid","to":"/admin/ingredients"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.expenseGates))?_c('div',{staticClass:"py-2 px-4 select-none
    text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n "+_vm._s(_vm.$t('Expenses'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_expense_types'))?_c('menu-item',{attrs:{"label":_vm.$t('Expense
    Types'),"mobile":_vm.mobile,"icon":"font-awesome.sitemap-solid","to":"/admin/expense-types"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_expenses'))?_c('menu-item',{attrs:{"label":_vm.$t('Expenses'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/expenses"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.peopleGates))?_c('div',{staticClass:"py-2 px-4 select-none
    text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n "+_vm._s(_vm.$t('People'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_users'))?_c('menu-item',{attrs:{"label":_vm.$t('Users'),"mobile":_vm.mobile,"icon":"font-awesome.users-solid","to":"/admin/users"}}):_vm._e(),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('manage_user_roles')),expression:"visibility('manage_user_roles')"}],attrs:{"label":_vm.$t('User
    roles'),"mobile":_vm.mobile,"icon":"font-awesome.user-lock-solid","to":"/admin/user-roles"}}),_vm._v("
    "),(_vm.visibility('manage_customers'))?_c('menu-item',{attrs:{"label":_vm.$t('Customers'),"mobile":_vm.mobile,"icon":"font-awesome.users-class-regular","to":"/admin/customers"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.reportGates))?_c('div',{staticClass:"py-2 px-4 select-none
    text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n "+_vm._s(_vm.$t('Reports'))+"\n
    ")]):_vm._e(),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('overall_report')),expression:"visibility('overall_report')"}],attrs:{"label":_vm.$t('Overall
    Report'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/overall-report"}}),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('tax_report')),expression:"visibility('tax_report')"}],attrs:{"label":_vm.$t('Tax
    Report'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/tax-report"}}),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('expense_report')),expression:"visibility('expense_report')"}],attrs:{"label":_vm.$t('Expense
    Report'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/expense-report"}}),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('stock_alerts')),expression:"visibility('stock_alerts')"}],attrs:{"label":_vm.$t('Stock
    alert'),"mobile":_vm.mobile,"icon":"font-awesome.file-invoice-solid","to":"/admin/stock-alerts"}}),_vm._v("
    "),(_vm.groupVisibility(_vm.advanceGates) ||
    _vm.groupVisibility(_vm.settingGates))?_c('div',{staticClass:"py-2 px-4 select-none
    text-orange-500 hover:bg-orange-500 hover:text-slate-100 text-lg cursor-pointer"},[_vm._v("\n "+_vm._s(_vm.$t('Advance'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('import_exports'))?_c('menu-item',{attrs:{"label":_vm.$t('Imports
    exports'),"mobile":_vm.mobile,"icon":"font-awesome.recycle-solid","to":"/admin/imports-exports"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_service_tables'))?_c('menu-item',{attrs:{"label":_vm.$t('Service
    Tables'),"mobile":_vm.mobile,"icon":"font-awesome.star-regular","to":"/admin/service-tables"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_payment_methods'))?_c('menu-item',{attrs:{"label":_vm.$t('Payment
    methods'),"mobile":_vm.mobile,"icon":"font-awesome.dollar-sign-solid","to":"/admin/payment-methods"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('database_backup'))?_c('menu-item',{attrs:{"label":_vm.$t('Backup'),"mobile":_vm.mobile,"icon":"font-awesome.database-solid","to":"/admin/backup"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.settingGates))?_c('menu-item',{attrs:{"label":_vm.$t('Settings'),"mobile":_vm.mobile,"icon":"font-awesome.cogs-solid","to":"/admin/settings"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_languages'))?_c('menu-item',{attrs:{"label":_vm.$t('Languages'),"mobile":_vm.mobile,"icon":"font-awesome.globe-solid","to":"/admin/Languages"}}):_vm._e()],1)
    }