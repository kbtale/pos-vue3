<template>
  <div class="pt-5">
    <menu-item
    label="Dashboard"
      mobile="mobile"
      :to="{ name: 'dashboard' }"
      v-if="visibility('dashboard_access')"
    />
    <template v-if="visibility('manage_sales')">
      <menu-item
        label="Sales"
        mobile="mobile"
        :to="{ name: 'sales' }"
      />
    </template>
    <template v-if="groupVisibility(portalGates)">
      <div class="my-2 mx-4 text-orange-500 text-xs">
        {{ $t('Portals') }}
      </div>
    </template>
    <template v-if="visibility('pos_portal')">
      <menu-item
        label="POS"
        mobile="mobile"
        :to="{ name: 'pos' }"
      />
    </template>
    <template v-if="visibility('kitchen_portal')">
      <menu-item
        label="kitchen"
        mobile="mobile"
        :to="{ name: 'kitchen-display' }"
      />
    </template>
    <template v-if="groupVisibility(foodGates)">
      <div class="my-2 mx-4 text-orange-500 text-xs">
        {{ $t('Foods') }}
      </div>
    </template>
    <template v-if="visibility('manage_food_categories')">
      <menu-item
        label="Categories"
        mobile="mobile"
        :to="{ name: 'categories' }"
      />
    </template>
    <template v-if="visibility('manage_food_items')">
      <menu-item
        label="Items"
        mobile="mobile"
        :to="{ name: 'products' }"
      />
    </template>
    <template v-if="visibility('manage_modifiers')">
      <menu-item
        label="Modifiers"
        mobile="mobile"
        :to="{ name: 'modifiers' }"
      />
    </template>
    <template v-if="visibility('manage_ingredients')">
      <menu-item
        label="Ingredients"
        mobile="mobile"
        :to="{ name: 'ingredients' }"
      />
    </template>
    <template v-if="groupVisibility(expenseGates)">
      <div class="my-2 mx-4 text-orange-500 text-xs">
        {{ $t('Expenses') }}
      </div>
    </template>
    <template v-if="visibility('manage_expense_types')">
      <menu-item
        label="Expense Types"
        mobile="mobile"
        :to="{ name: 'expense-types' }"
      />
    </template>
    <template v-if="visibility('manage_expenses')">
      <menu-item
        label="Expenses"
        mobile="mobile"
        :to="{ name: 'expenses' }"
      />
    </template>
    <template v-if="groupVisibility(peopleGates)">
      <div class="my-2 mx-4 text-orange-500 text-xs">
        {{ $t('People') }}
      </div>
    </template>
    <template v-if="visibility('manage_users')">
      <menu-item
        label="Users"
        mobile="mobile"
        :to="{ name: 'users' }"
      />
    </template>
  </div>
</template>

<script>
import menuItem from './menu-item.vue';

export default {
  name: 'SidebarMenu',
  components: {
    menuItem: 'menu-item',
  },
  methods: {
    visibility(permission) {
      return this.$store.getters['auth/hasPermission'](permission);
    },
    groupVisibility(permissions) {
      return permissions.some(permission => this.visibility(permission));
    },
  },
};
</script>

<!--
<template>
  <div class="pt-5">
    <div @click="portalGates = !portalGates" class="my-2 mx-4 text-orange-500 text-xs">
      Portals 1
    </div>
    <menu-item v-show="portalGates" label="Dashboard" mobile="mobile" icon="fa.palette-solid" to="/admin/dashboard"/>
    <menu-item v-show="portalGates" label="Sales" mobile="mobile" icon="fa.poll-h-solid" to="/admin/sales"/>
    <div @click="foodGates = !foodGates" class="my-2 mx-4 text-orange-500 text-xs">
      Food
    </div>
    <menu-item v-show="foodGates" label="POS" mobile="mobile" icon="fa.store-solid" to="/pos"/>
    <menu-item v-show="foodGates" label="Kitchen" mobile="mobile" icon="fa.utensils-solid" to="/kitchen-display"/>
    <menu-item v-show="foodGates" label="Categories" mobile="mobile" icon="fa.sitemap-solid" to="/admin/categories"/>
    <menu-item v-show="foodGates" label="Items" mobile="mobile" icon="fa.th-list-solid" to="/admin/products"/>
    <menu-item v-show="foodGates" label="Modifiers" mobile="mobile" icon="fa.stream-solid" to="/admin/modifiers"/>
    <menu-item v-show="foodGates" label="Ingredients" mobile="mobile" icon="fa.boxes-solid" to="/admin/ingredients"/>
    <div @click="expenseGates = !expenseGates" class="my-2 mx-4 text-orange-500 text-xs">
      Expenses
    </div>
    <menu-item v-show="expenseGates" label="Expense Types" mobile="mobile" icon="fa.sitemap-solid" to="/admin/expense-types"/>
    <menu-item v-show="expenseGates" label="Expenses" mobile="mobile" icon="fa.file-invoice-solid" to="/admin/expenses"/>
    <div @click="peopleGates = !peopleGates" class="my-2 mx-4 text-orange-500 text-xs">
      People
    </div>
    <menu-item v-show="peopleGates" label="Users" mobile="mobile" icon="fa.users-solid" to="/admin/users"/>
    <menu-item v-show="peopleGates" label="User roles" mobile="mobile" icon="fa.user-lock-solid" to="/admin/user-roles"/>
    <menu-item v-show="peopleGates" label="Customers" mobile="mobile" icon="fa.users-class-regular" to="/admin/customers"/>
    <div @click="reportGates = !reportGates" class="my-2 mx-4 text-orange-500 text-xs">
      Reports
    </div>
    <menu-item v-show="reportGates" label="Overall Report" mobile="mobile" icon="fa.file-invoice-solid" to="/admin/overall-report"/>
    <menu-item v-show="reportGates" label="Tax Report" mobile="mobile" icon="fa.file-invoice-solid" to="/admin/tax-report"/>
    <menu-item v-show="reportGates" label="Expense Report" mobile="mobile" icon="fa.file-invoice-solid" to="/admin/expense-report"/>
    <menu-item v-show="reportGates" label="Stock alert" mobile="mobile" icon="fa.file-invoice-solid" to="/admin/stock-alerts"/>
    <div @click="advancedGates = !advancedGates" class="my-2 mx-4 text-orange-500 text-xs">
      Advanced
    </div>
    <menu-item v-show="advancedGates" label="Imports exports" mobile="mobile" icon="fa.recycle-solid" to="/admin/imports-exports"/>
    <menu-item v-show="advancedGates" label="Service Tables" mobile="mobile" icon="fa.star-regular" to="/admin/service-tables"/>
    <menu-item v-show="advancedGates" label="Payment methods" mobile="mobile" icon="fa.dollar-sign-solid" to="/admin/payment-methods"/>
    <menu-item v-show="advancedGates" label="Backup" mobile="mobile" icon="fa.database-solid" to="/admin/backup"/>
    <div @click="settingsGates = !settingsGates" class="my-2 mx-4 text-orange-500 text-xs">
      Settings
    </div>
    <menu-item v-show="settingsGates" label="Languages" mobile="mobile" icon="fa.globe-solid" to="/admin/Languages"/>
  </div>
</template>

<script>
import menu-item from './menu-item.vue';

export default {
  components: {
    menu-item,
  },
  data() {
    return {
      portalGates: false,
      foodGates: false,
      expenseGates: false,
      peopleGates: false,
      reportGates: false,
      advancedGates: false,
      settingsGates: false
    };
  }
};
</script>
-->

/*
var render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"pt-5"},[_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('dashboard_access')),expression:"visibility('dashboard_access')"}],attrs:{"label":_vm.$t('Dashboard'),"mobile":_vm.mobile,"icon":"fa.palette-solid","to":"/admin/dashboard"}}),_vm._v(" "),(_vm.visibility('manage_sales'))?_c('menu-item',{attrs:{"label":_vm.$t('Sales'),"mobile":_vm.mobile,"icon":"fa.poll-h-solid","to":"/admin/sales"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.portalGates))?_c('div',{staticClass:"my-2 mx-4 text-orange-500 text-xs"},[_vm._v("\n    "+_vm._s(_vm.$t('Portals'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('pos_portal'))?_c('menu-item',{attrs:{"label":_vm.$t('POS'),"mobile":_vm.mobile,"icon":"fa.store-solid","to":"/pos"}}):_vm._e(),_vm._v(" "),(_vm.visibility('kitchen_portal'))?_c('menu-item',{attrs:{"label":_vm.$t('kitchen'),"mobile":_vm.mobile,"icon":"fa.utensils-solid","to":"/kitchen-display"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.foodGates))?_c('div',{staticClass:"my-2 mx-4 text-orange-500 text-xs"},[_vm._v("\n    "+_vm._s(_vm.$t('Foods'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('manage_food_categories'))?_c('menu-item',{attrs:{"label":_vm.$t('Categories'),"mobile":_vm.mobile,"icon":"fa.sitemap-solid","to":"/admin/categories"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_food_items'))?_c('menu-item',{attrs:{"label":_vm.$t('Items'),"mobile":_vm.mobile,"icon":"fa.th-list-solid","to":"/admin/products"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_modifiers'))?_c('menu-item',{attrs:{"label":_vm.$t('Modifiers'),"mobile":_vm.mobile,"icon":"fa.stream-solid","to":"/admin/modifiers"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_ingredients'))?_c('menu-item',{attrs:{"label":_vm.$t('Ingredients'),"mobile":_vm.mobile,"icon":"fa.boxes-solid","to":"/admin/ingredients"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.expenseGates))?_c('div',{staticClass:"my-2 mx-4 text-orange-500 text-xs"},[_vm._v("\n    "+_vm._s(_vm.$t('Expenses'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('manage_expense_types'))?_c('menu-item',{attrs:{"label":_vm.$t('Expense Types'),"mobile":_vm.mobile,"icon":"fa.sitemap-solid","to":"/admin/expense-types"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_expenses'))?_c('menu-item',{attrs:{"label":_vm.$t('Expenses'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/expenses"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.peopleGates))?_c('div',{staticClass:"my-2 mx-4 text-orange-500 text-xs"},[_vm._v("\n    "+_vm._s(_vm.$t('People'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('manage_users'))?_c('menu-item',{attrs:{"label":_vm.$t('Users'),"mobile":_vm.mobile,"icon":"fa.users-solid","to":"/admin/users"}}):_vm._e(),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('manage_user_roles')),expression:"visibility('manage_user_roles')"}],attrs:{"label":_vm.$t('User roles'),"mobile":_vm.mobile,"icon":"fa.user-lock-solid","to":"/admin/user-roles"}}),_vm._v(" "),(_vm.visibility('manage_customers'))?_c('menu-item',{attrs:{"label":_vm.$t('Customers'),"mobile":_vm.mobile,"icon":"fa.users-class-regular","to":"/admin/customers"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.reportGates))?_c('div',{staticClass:"my-2 mx-4 text-orange-500 text-xs"},[_vm._v("\n    "+_vm._s(_vm.$t('Reports'))+"\n  ")]):_vm._e(),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('overall_report')),expression:"visibility('overall_report')"}],attrs:{"label":_vm.$t('Overall Report'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/overall-report"}}),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('tax_report')),expression:"visibility('tax_report')"}],attrs:{"label":_vm.$t('Tax Report'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/tax-report"}}),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('expense_report')),expression:"visibility('expense_report')"}],attrs:{"label":_vm.$t('Expense Report'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/expense-report"}}),_vm._v(" "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('stock_alerts')),expression:"visibility('stock_alerts')"}],attrs:{"label":_vm.$t('Stock alert'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/stock-alerts"}}),_vm._v(" "),(_vm.groupVisibility(_vm.advanceGates) || _vm.groupVisibility(_vm.settingGates))?_c('div',{staticClass:"my-2 mx-4 text-orange-500 text-xs"},[_vm._v("\n    "+_vm._s(_vm.$t('Advance'))+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.visibility('import_exports'))?_c('menu-item',{attrs:{"label":_vm.$t('Imports exports'),"mobile":_vm.mobile,"icon":"fa.recycle-solid","to":"/admin/imports-exports"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_service_tables'))?_c('menu-item',{attrs:{"label":_vm.$t('Service Tables'),"mobile":_vm.mobile,"icon":"fa.star-regular","to":"/admin/service-tables"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_payment_methods'))?_c('menu-item',{attrs:{"label":_vm.$t('Payment methods'),"mobile":_vm.mobile,"icon":"fa.dollar-sign-solid","to":"/admin/payment-methods"}}):_vm._e(),_vm._v(" "),(_vm.visibility('database_backup'))?_c('menu-item',{attrs:{"label":_vm.$t('Backup'),"mobile":_vm.mobile,"icon":"fa.database-solid","to":"/admin/backup"}}):_vm._e(),_vm._v(" "),(_vm.groupVisibility(_vm.settingGates))?_c('menu-item',{attrs:{"label":_vm.$t('Settings'),"mobile":_vm.mobile,"icon":"fa.cogs-solid","to":"/admin/settings"}}):_vm._e(),_vm._v(" "),(_vm.visibility('manage_languages'))?_c('menu-item',{attrs:{"label":_vm.$t('Languages'),"mobile":_vm.mobile,"icon":"fa.globe-solid","to":"/admin/Languages"}}):_vm._e()],1)
}
var staticRenderFns = []

export { render, staticRenderFns }
*/

var render = function render(){var _vm=this,_c=_vm._self._c;return
    _c('div',{staticClass:"pt-5"},[_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('dashboard_access')),expression:"visibility('dashboard_access')"}],attrs:{"label":_vm.$t('Dashboard'),"mobile":_vm.mobile,"icon":"fa.palette-solid","to":"/admin/dashboard"}}),_vm._v("
    "),(_vm.visibility('manage_sales'))?_c('menu-item',{attrs:{"label":_vm.$t('Sales'),"mobile":_vm.mobile,"icon":"fa.poll-h-solid","to":"/admin/sales"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.portalGates))?_c('div',{staticClass:"my-2 mx-4
    text-orange-500 text-xs"},[_vm._v("\n "+_vm._s(_vm.$t('Portals'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('pos_portal'))?_c('menu-item',{attrs:{"label":_vm.$t('POS'),"mobile":_vm.mobile,"icon":"fa.store-solid","to":"/pos"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('kitchen_portal'))?_c('menu-item',{attrs:{"label":_vm.$t('kitchen'),"mobile":_vm.mobile,"icon":"fa.utensils-solid","to":"/kitchen-display"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.foodGates))?_c('div',{staticClass:"my-2 mx-4
    text-orange-500 text-xs"},[_vm._v("\n "+_vm._s(_vm.$t('Foods'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_food_categories'))?_c('menu-item',{attrs:{"label":_vm.$t('Categories'),"mobile":_vm.mobile,"icon":"fa.sitemap-solid","to":"/admin/categories"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_food_items'))?_c('menu-item',{attrs:{"label":_vm.$t('Items'),"mobile":_vm.mobile,"icon":"fa.th-list-solid","to":"/admin/products"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_modifiers'))?_c('menu-item',{attrs:{"label":_vm.$t('Modifiers'),"mobile":_vm.mobile,"icon":"fa.stream-solid","to":"/admin/modifiers"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_ingredients'))?_c('menu-item',{attrs:{"label":_vm.$t('Ingredients'),"mobile":_vm.mobile,"icon":"fa.boxes-solid","to":"/admin/ingredients"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.expenseGates))?_c('div',{staticClass:"my-2 mx-4
    text-orange-500 text-xs"},[_vm._v("\n "+_vm._s(_vm.$t('Expenses'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_expense_types'))?_c('menu-item',{attrs:{"label":_vm.$t('Expense
    Types'),"mobile":_vm.mobile,"icon":"fa.sitemap-solid","to":"/admin/expense-types"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_expenses'))?_c('menu-item',{attrs:{"label":_vm.$t('Expenses'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/expenses"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.peopleGates))?_c('div',{staticClass:"my-2 mx-4
    text-orange-500 text-xs"},[_vm._v("\n "+_vm._s(_vm.$t('People'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_users'))?_c('menu-item',{attrs:{"label":_vm.$t('Users'),"mobile":_vm.mobile,"icon":"fa.users-solid","to":"/admin/users"}}):_vm._e(),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('manage_user_roles')),expression:"visibility('manage_user_roles')"}],attrs:{"label":_vm.$t('User
    roles'),"mobile":_vm.mobile,"icon":"fa.user-lock-solid","to":"/admin/user-roles"}}),_vm._v("
    "),(_vm.visibility('manage_customers'))?_c('menu-item',{attrs:{"label":_vm.$t('Customers'),"mobile":_vm.mobile,"icon":"fa.users-class-regular","to":"/admin/customers"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.reportGates))?_c('div',{staticClass:"my-2 mx-4
    text-orange-500 text-xs"},[_vm._v("\n "+_vm._s(_vm.$t('Reports'))+"\n
    ")]):_vm._e(),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('overall_report')),expression:"visibility('overall_report')"}],attrs:{"label":_vm.$t('Overall
    Report'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/overall-report"}}),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('tax_report')),expression:"visibility('tax_report')"}],attrs:{"label":_vm.$t('Tax
    Report'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/tax-report"}}),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('expense_report')),expression:"visibility('expense_report')"}],attrs:{"label":_vm.$t('Expense
    Report'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/expense-report"}}),_vm._v("
    "),_c('menu-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.visibility('stock_alerts')),expression:"visibility('stock_alerts')"}],attrs:{"label":_vm.$t('Stock
    alert'),"mobile":_vm.mobile,"icon":"fa.file-invoice-solid","to":"/admin/stock-alerts"}}),_vm._v("
    "),(_vm.groupVisibility(_vm.advanceGates) ||
    _vm.groupVisibility(_vm.settingGates))?_c('div',{staticClass:"my-2 mx-4
    text-orange-500 text-xs"},[_vm._v("\n "+_vm._s(_vm.$t('Advance'))+"\n
    ")]):_vm._e(),_vm._v("
    "),(_vm.visibility('import_exports'))?_c('menu-item',{attrs:{"label":_vm.$t('Imports
    exports'),"mobile":_vm.mobile,"icon":"fa.recycle-solid","to":"/admin/imports-exports"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_service_tables'))?_c('menu-item',{attrs:{"label":_vm.$t('Service
    Tables'),"mobile":_vm.mobile,"icon":"fa.star-regular","to":"/admin/service-tables"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_payment_methods'))?_c('menu-item',{attrs:{"label":_vm.$t('Payment
    methods'),"mobile":_vm.mobile,"icon":"fa.dollar-sign-solid","to":"/admin/payment-methods"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('database_backup'))?_c('menu-item',{attrs:{"label":_vm.$t('Backup'),"mobile":_vm.mobile,"icon":"fa.database-solid","to":"/admin/backup"}}):_vm._e(),_vm._v("
    "),(_vm.groupVisibility(_vm.settingGates))?_c('menu-item',{attrs:{"label":_vm.$t('Settings'),"mobile":_vm.mobile,"icon":"fa.cogs-solid","to":"/admin/settings"}}):_vm._e(),_vm._v("
    "),(_vm.visibility('manage_languages'))?_c('menu-item',{attrs:{"label":_vm.$t('Languages'),"mobile":_vm.mobile,"icon":"fa.globe-solid","to":"/admin/Languages"}}):_vm._e()],1)
    }