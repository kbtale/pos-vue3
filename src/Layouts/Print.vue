<template>
    <div class="min-h-screen flex layout-bg">
      <div class="flex flex-col w-0 flex-1">
        <navbar></navbar>
        <router-view></router-view>
      </div>
    </div>
  </template>
  <script>
  import Navbar from './shared/navbar.vue';
  
  export default {
    name: 'public',
    metaInfo() {
      return {
        title: this.$t('Welcome'),
        titleTemplate: `%s - ${this.$store.getters['app/getAppName']}`,
      };
    },
    components: { Navbar },
  };
  </script>
  
<!--
var render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"bg-white",style:(_vm.cssVars)},[_c('loading',{attrs:{"status":_vm.loading}}),_vm._v(" "),_c('div',{staticClass:"action-btn-block py-1"},[_c('div',{staticClass:"px-5 w-full flex justify-between"},[_c('button',{staticClass:"btn btn-app py-0",on:{"click":function($event){return _vm.$router.go(-1)}}},[_vm._v(_vm._s(_vm.$t('Back')))]),_vm._v(" "),(_vm.isChangeAble)?[_c('div',{staticClass:"flex"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.printerSize.width),expression:"printerSize.width"}],staticClass:"form-input",attrs:{"type":"text","placeholder":_vm.$t('Printer width')},domProps:{"value":(_vm.printerSize.width)},on:{"input":function($event){if($event.target.composing)return;_vm.$set(_vm.printerSize, "width", $event.target.value)}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.printerSize.height),expression:"printerSize.height"}],staticClass:"form-input",attrs:{"type":"text","placeholder":_vm.$t('Printer width')},domProps:{"value":(_vm.printerSize.height)},on:{"input":function($event){if($event.target.composing)return;_vm.$set(_vm.printerSize, "height", $event.target.value)}}}),_vm._v(" "),_c('button',{staticClass:"btn btn-app",on:{"click":_vm.print}},[_vm._v(_vm._s(_vm.$t('Print')))])])]:[_c('div',{staticClass:"flex space-x-2"},[_c('button',{staticClass:"btn btn-app",on:{"click":_vm.printA4}},[_vm._v(_vm._s(_vm.$t('A4')))]),_vm._v(" "),_c('button',{staticClass:"btn btn-app",on:{"click":function($event){_vm.isChangeAble = !_vm.isChangeAble}}},[_vm._v(_vm._s(_vm.$t('Change size')))]),_vm._v(" "),_c('button',{staticClass:"btn btn-app",on:{"click":_vm.print}},[_vm._v(_vm._s(_vm.$t('Print')))])])],_vm._v(" "),_c('button',{staticClass:"btn btn-app",on:{"click":_vm.generatePDF}},[_vm._v("\n        "+_vm._s(_vm.$t('Download PDF File'))+"\n      ")])],2),_vm._v(" "),_c('vue-html2pdf',{ref:"html2Pdf",attrs:{"show-layout":false,"float-layout":true,"enable-download":true,"preview-modal":true,"filename":`pdf_file_${_vm.$route.params.id}`,"pdf-quality":2,"manual-pagination":true,"pdf-format":"a4","pdf-content-width":"100%"}},[_c('section',{attrs:{"slot":"pdf-content"},slot:"pdf-content"},[_c('div',{staticClass:"p-3",attrs:{"id":"pdf-content"}})])])],1),_vm._v(" "),_c('div',{staticClass:"flex justify-center"},[_c('div',{staticClass:"invoice-box p-2",attrs:{"id":"content-to-pdf"}},[_c('router-view'),_vm._v(" "),(_vm.hideAuthor)?[_c('p',{staticClass:"text-center text-xs only-print coooo"},[_vm._v("Powered by: info.codehas@gmail.com")])]:_vm._e()],2)])],1)
}
var staticRenderFns = []

export { render, staticRenderFns }
-->