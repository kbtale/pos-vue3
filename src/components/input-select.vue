<template>
    <div
      class="relative"
      v-click-away="closeDropdown"
    >
      <div
        class="w-full inline-block w--sm cursor-pointer"
        :class="classes"
        :aria-expanded="open"
        aria-haspopup="listbox"
        aria-labelledby="listbox-label"
        type="button"
        @click="openDropdown"
      >
        <button
          class="relative w-full text-left focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          <div
            class="flex items-center space-x-3"
          >
            <div
              v-if="open && searchable"
              class="relative w-full"
            >
              <input
                ref="search"
                :placeholder= "Search"
                aria-label="Search"
                v-model="search"
                @click.prevent
              >
            </div>
            <div
              v-else
            >
              <span
                v-if="!anySelected"
              >
                {{ !defaultLabel ? $t('Select an option') : defaultLabel }}
              </span>
              <span
                v-else-if="multiple"
              >
                {{ $t('Selected') }} {{ Object.keys(selected).length }} {{ $t('options') }}
              </span>
              <span
                v-else
              >
                {{ optionLabel }}
              </span>
            </div>
          </div>
        </button>
      </div>
      <span
        v-show="open"
        class="absolute z-20 mt-1 mb-2 w-full bg-white shadow"
      >
        <ul
          class="max-h-60 py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
          role="listbox"
          tabindex="-1"
        >
          <li
            v-if="!searchable && !required"
            role="option"
            @click="selectOption(null)"
          >
            {{ !defaultLabel ? $t('Select an option') : defaultLabel }}
          </li>
          <li
            v-else-if="Object.keys(filteredOptions).length === 0"
            role="option"
          >
            {{ $t('No results found') }}
          </li>
          <li
            v-for="(option, index) in filteredOptions"
            :key="index"
            role="option"
            @click="selectOption(option[optionKey])"
          >
            <div
              v-if="multiple"
              :class="{ 'font-semibold': Object.values(selected).indexOf(option[optionKey]) > -1 }"
            >
              {{ option[optionLabel] }}
            </div>
            <div v-else>
              {{ option[optionLabel] }}
            </div>
          </li>
        </ul>
      </span>
    </div>
  </template>
  
<script>
import { ref, computed } from 'vue';
  
export default {
    props: {
      options: {
        type: Array,
        required: true
      },
      required: {
        type: Boolean,
        default: false
      },
      searchable: {
        type: Boolean,
        default: false
      },
      defaultLabel: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const open = ref(false);
      const search = ref('');
      const selected = ref(props.multiple ? [] : null);
      const optionKey = ref('id');
      const optionLabel = ref('label');
  
      const classes = computed(() => {
        return {
          'bg-blue-400 text-white': open.value,
          'text-gray-900': !open.value
        };
      });
  
      const filteredOptions = computed(() => {
        if (!search.value) {
          return props.options;
        }
  
        return props.options.filter(option => {
            if (option[optionLabel.value] != undefined)
                return option[optionLabel.value].toLowerCase().includes(search.value.toLowerCase());
        });
      });
  
      const closeDropdown = () => {
        open.value = false;
      };
  
      const openDropdown = () => {
        open.value = true;
      };
  
      const selectOption = (option) => {
        selected.value = option;
        closeDropdown();
      };
  
      return {
        open,
        search,
        selected,
        optionKey,
        optionLabel,
        classes,
        filteredOptions,
        closeDropdown,
        openDropdown,
        selectOption
      };
    }
  }
</script>
  
<!--
/*
var render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:(_vm.closeDropdown),expression:"closeDropdown"}],staticClass:"relative"},[_c('div',{staticClass:"w-full inline-block w-full shadow-sm cursor-pointer"},[_c('button',{staticClass:"relative w-full text-left focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5",class:_vm.classes,attrs:{"aria-expanded":"true","aria-haspopup":"listbox","aria-labelledby":"listbox-label","type":"button"},on:{"click":_vm.openDropdown}},[[_c('div',{staticClass:"flex items-center space-x-3"},[(_vm.open && _vm.searchable)?[_c('div',{staticClass:"relative w-full"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.search),expression:"search"}],ref:"search",staticClass:"form-input",attrs:{"placeholder":_vm.$t('Search'),"aria-label":"Search"},domProps:{"value":(_vm.search)},on:{"click":function($event){$event.preventDefault();},"input":function($event){if($event.target.composing)return;_vm.search=$event.target.value}}})])]:_c('div',{staticClass:"flex items-center space-x-3 w-full pl-3 pr-10"},[(!_vm.anySelected)?[_c('span',{staticClass:"block truncate"},[_vm._v(_vm._s(!_vm.defaultLabel ? _vm.$t('Select an option') : _vm.defaultLabel))])]:(_vm.multiple)?[_c('span',{staticClass:"block truncate"},[_vm._v("\n                "+_vm._s(_vm.$t('Selected'))+" "+_vm._s(Object.keys(_vm.selected).length)+"\n                "+_vm._s(_vm.$t('options'))+"\n              ")])]:[_vm._l((_vm.options),function(option,index){return [(option[_vm.optionKey] === _vm.selected)?_c('div',{key:index},[_vm._t("selectedOption",function(){return [_c('span',{staticClass:"block truncate"},[_vm._v(_vm._s(option[_vm.optionLabel]))])]},{"anySelected":_vm.anySelected,"option":option})],2):_vm._e()]})]],2)],2)],_vm._v(" "),_c('span',{staticClass:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"},[_c('svg',{staticClass:"h-5 w-5 text-gray-400",attrs:{"fill":"none","stroke":"currentColor","viewBox":"0 0 20 20"}},[_c('path',{attrs:{"d":"M7 7l3-3 3 3m0 6l-3 3-3-3","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5"}})])])],2)]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.open),expression:"open"}],staticClass:"absolute z-20 mt-1 mb-2 w-full bg-white shadow"},[_c('ul',{staticClass:"max-h-60 py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5",attrs:{"role":"listbox","tabindex":"-1"}},[(!_vm.searchable)?[(!_vm.required)?_c('li',{staticClass:"text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-400 hover:text-white",attrs:{"id":"listbox-item-0","role":"option"},on:{"click":function($event){return _vm.selectOption(null)}}},[_c('div',{staticClass:"flex items-center space-x-3"},[_c('div',{staticClass:"font-normal block truncate",class:!_vm.anySelected ? 'font-semibold' : 'font-normal'},[_vm._v("\n              "+_vm._s(!_vm.defaultLabel ? _vm.$t('Select an option') : _vm.defaultLabel)+"\n            ")])])]):_vm._e()]:_vm._e(),_vm._v(" "),(Object.keys(_vm.filteredOptions).length === 0)?[_c('li',{staticClass:"text-gray-900 select-none relative py-2 pl-3 pr-9",attrs:{"id":"listbox-item-empty","role":"option"}},[_vm._t("notFound",function(){return [_c('div',{staticClass:"flex items-center space-x-3"},[_c('div',{staticClass:"font-normal block truncate font-normal"},[_vm._v("\n                "+_vm._s(_vm.$t('No results found'))+"\n              ")])])]},{"anySelected":_vm.anySelected})],2)]:[_vm._l((_vm.filteredOptions),function(option,index){return [_c('li',{key:index,staticClass:"text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-400 hover:text-white",attrs:{"id":'listbox-item-' + index,"role":"option"},on:{"click":function($event){return _vm.selectOption(option[_vm.optionKey])}}},[_vm._t("selectOption",function(){return [_c('div',{staticClass:"flex items-center space-x-3"},[(_vm.multiple)?[_c('div',{staticClass:"font-normal block truncate",class:Object.values(_vm.selected).indexOf(option[_vm.optionKey]) > -1 ? 'font-semibold' : 'font-normal'},[_vm._v("\n                    "+_vm._s(option[_vm.optionLabel])+"\n                  ")])]:[_c('div',{staticClass:"font-normal block truncate",class:option[_vm.optionKey] === _vm.selected ? 'font-semibold' : 'font-normal'},[_vm._v("\n                    "+_vm._s(option[_vm.optionLabel])+"\n                  ")])]],2)]},{"anySelected":_vm.anySelected,"option":option})],2)]})]],2)])])
}
var staticRenderFns = []

export { render, staticRenderFns }
*/
-->