<template>
    <div class="editor shadow-sm mt1">
      <loading :status="loading"></loading>
      <div v-html="top"></div>
   <div v-if="!readonly">
        <tinymce ref="editor" :d="id" :init="editorConfig" :model="{ value: input, callback: updateInput, expression: 'input' }"></tinymce>
        <input ref="imageInput" :id="id" :accept="allowed.join()" type="file" @change="uploadFile">
      </div>
      <div v-else v-html="input"></div>
      <div v-show="openSidebar" class="fixed inset-0 overflow-hidden" :class="{ 'z-1500': openSidebar }">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <div class="relative w-screen max-w-md">
              <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                <button @click="closeSidebar" class="text-gray-100 hover:text-white transition ease-in-out duration-150">
                  <svg-vue class="h-6 w-6" icon="font-awesome.times-light"></svg-vue>
                </button>
              </div>
              <div class="h-full flex flex-col pt-6 bg-white shadow-xl">
                <header class="px-4 sm:px-6 pb-6 border-b border-gray-200">
                  <h2 class="text-lg leading-7 font-medium text-gray-900">
                    {{ sidebar.quickReplySelect ? $t('Quick replies') : '' }}
                  </h2>
                </header>
                <div class="relative flex-1 overflow-y-scroll">
                  <ul class="divide-y divide-gray-200 overflow-y-auto" v-if="sidebar.quickReplySelect && quickReplyList.length > 0">
                    <li class="px-6 py-5 relative hover:bg-gray-100 cursor-pointer" v-for="(quickReply, index) in quickReplyList" :key="index" @click="setContent(quickReply.body)">
                      <div class="text-sm leading-5 font-medium text-gray-900 truncate">{{ quickReply.name }}</div>
                      <div class="text-sm leading-5 text-gray-500 truncate">{{ quickReply.body }}</div>
                    </li>
                  </ul>
                  <div class="h-full flex" v-else-if="sidebar.quickReplySelect">
                    <div class="m-auto">
                      <div class="grid grid-cols-1 justify-items-center h-full w-full px-4 py-10">
                        <div class="flex justify-center items-center">
                          <svg-vue class="h-full h-auto w-40 mb-8" icon="undraw.browsing"></svg-vue>
                        </div>
                        <div class="flex justify-center items-center">
                          <div class="w-full font-semibold text-xl">{{ $t('No records found') }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
</template>
<script>
import loading from './LoadingComponent.vue';
import tinymce from './TinymceComponent.vue';

export default {
  name: 'EditorComponent',
  components: {
    loading,
    tinymce,
    svgVue
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    allowed: {
      type: Array,
      default: () => []
    },
    input: {
      type: String,
      default: ''
    },
    editorConfig: {
      type: Object,
      default: () => ({})
    },
    openSidebar: {
      type: Boolean,
      default: false
    },
    sidebar: {
      type: Object,
      default: () => ({})
    },
    quickReplyList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    updateInput(value) {
      this.$emit('input', value);
    },
    uploadFile(event) {
      this.$emit('upload-file', event);
    },
    closeSidebar() {
      this.$emit('close-sidebar');
    },
    setContent(content) {
      this.$emit('set-content', content);
    }
  }
};
</script>
<!--
var render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"editor shadow-sm mt-1"},[_c('loading',{attrs:{"status":_vm.loading}}),_vm._v(" "),_vm._t("top"),_vm._v(" "),(_vm.readonly)?[_c('div',{staticClass:"border border-gray-400 p-4",domProps:{"innerHTML":_vm._s(_vm.input)}})]:[_c('tinymce',{ref:"editor",attrs:{"d":_vm.id,"init":_vm.editorConfig},model:{value:(_vm.input),callback:function ($$v) {_vm.input=$$v},expression:"input"}}),_vm._v(" "),_c('input',{ref:"imageInput",attrs:{"id":_vm.id,"accept":_vm.allowed.join(),"hidden":"","type":"file"},on:{"change":function($event){return _vm.uploadFile($event)}}})],_vm._v(" "),_vm._t("bottom"),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.openSidebar),expression:"openSidebar"}],staticClass:"fixed inset-0 overflow-hidden",class:{ 'z-1500': _vm.openSidebar }},[_c('div',{staticClass:"absolute inset-0 overflow-hidden"},[_c('div',{staticClass:"absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"}),_vm._v(" "),_c('section',{staticClass:"absolute inset-y-0 right-0 pl-10 max-w-full flex"},[_c('div',{staticClass:"relative w-screen max-w-md"},[_c('div',{staticClass:"absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4"},[_c('button',{staticClass:"text-gray-100 hover:text-white transition ease-in-out duration-150",attrs:{"aria-label":"Close panel","type":"button"},on:{"click":_vm.closeSidebar}},[_c('svg-vue',{staticClass:"h-6 w-6",attrs:{"icon":"font-awesome.times-light"}})],1)]),_vm._v(" "),_c('div',{staticClass:"h-full flex flex-col pt-6 bg-white shadow-xl"},[_c('header',{staticClass:"px-4 sm:px-6 pb-6 border-b border-gray-200"},[_c('h2',{staticClass:"text-lg leading-7 font-medium text-gray-900"},[(_vm.sidebar.quickReplySelect)?[_vm._v("\n                  "+_vm._s(_vm.$t('Quick replies'))+"\n                ")]:_vm._e()],2)]),_vm._v(" "),_c('div',{staticClass:"relative flex-1 overflow-y-scroll"},[(_vm.sidebar.quickReplySelect)?[(_vm.quickReplyList.length > 0)?[_c('ul',{staticClass:"divide-y divide-gray-200 overflow-y-auto"},[_vm._l((_vm.quickReplyList),function(quickReply,index){return [_c('li',{key:index,staticClass:"px-6 py-5 relative hover:bg-gray-100 cursor-pointer",on:{"click":function($event){return _vm.setContent(quickReply.body)}}},[_c('div',{staticClass:"text-sm leading-5 font-medium text-gray-900 truncate"},[_vm._v("\n                          "+_vm._s(quickReply.name)+"\n                        ")]),_vm._v(" "),_c('div',{staticClass:"text-sm leading-5 text-gray-500 truncate"},[_vm._v("\n                          "+_vm._s(quickReply.body)+"\n                        ")])])]})],2)]:[_c('div',{staticClass:"h-full flex"},[_c('div',{staticClass:"m-auto"},[_c('div',{staticClass:"grid grid-cols-1 justify-items-center h-full w-full px-4 py-10"},[_c('div',{staticClass:"flex justify-center items-center"},[_c('svg-vue',{staticClass:"h-full h-auto w-40 mb-8",attrs:{"icon":"undraw.browsing"}})],1),_vm._v(" "),_c('div',{staticClass:"flex justify-center items-center"},[_c('div',{staticClass:"w-full font-semibold text-xl"},[_vm._v(_vm._s(_vm.$t('No records found')))])])])])])]]:_vm._e()],2)])])])])])],2)
}
var staticRenderFns = []

export { render, staticRenderFns }
-->