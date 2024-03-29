<template>
  <div :class="input && input.preview ? 'has-preview' : null" class="image-input mt-1" @click="selectFile" @dragleave="dragleave" @dragover="dragover" @drop="drop">
    <img v-if="input && input.preview" :src="input.preview" alt="Image" />
    <input :id="id" ref="inputFile" :accept="allowed.join()" hidden type="file" @change="changeFile($event)" />
    <div class="image-input-render">
      <div class="image-input-info">
        {{ $t('Drag and drop or click to replace') }}
      </div>
      <button v-if="remove" class="btn-image-preview" type="button" @click.stop="removeFile">
        {{ $t('Remove') }}
      </button>
    </div>
    <div class="image-input-empty">
      <p class="image-input-empty-text">
        <svg-vue class="image-input-icon" :icon="['fas', 'cloud-upload']"></svg-vue>
        {{ $t('Drag and drop a file here or click') }}
      </p>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue';

export default {
  name: 'image-input',
  props: {
    modelValue: {
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    remove: {
      type: Boolean,
      default: true,
    },
    allowed: {
      type: Array,
      default() {
        return ['image/png', 'image/x-citrix-png', 'image/x-png', 'image/jpeg', 'image/x-citrix-jpeg'];
      },
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const input = ref(props.modelValue || { file: null, preview: null });
    const inputFile = ref(null); // new reference for the file input

    const selectFile = () => {
      inputFile.value.click();
    };

    const removeFile = () => {
      input.value.file = null;
      input.value.preview = null;
    };

    const changeFile = (event) => {
      event.preventDefault();
      console.log(input.value);

      if (!input.value) {
        input.value = { file: null, preview: null };
      }

      if (event.target.files.length) {
        if (props.allowed.includes(event.target.files[0].type)) {
          input.value.file = event.target.files[0];
          input.value.preview = URL.createObjectURL(event.target.files[0]);

          // Emit the update:modelValue event to update the parent's data
          emit('update:modelValue', input.value);
        } else {
          console.log("File not loaded.")
        }
      }
    };

    const dragover = (event) => {
      event.preventDefault();
      if (!event.currentTarget.classList.contains('dragging')) {
        event.currentTarget.classList.add('dragging');
      }
    };

    const dragleave = (event) => {
      event.currentTarget.classList.remove('dragging');
    };

    const drop = (event) => {
      event.preventDefault();

      if (event.dataTransfer.files.length) {
        if (props.allowed.includes(event.dataTransfer.files[0].type)) {
          input.value.file = event.dataTransfer.files[0];
          input.value.preview = URL.createObjectURL(event.dataTransfer.files[0]);
        } else {
          // your code here...
        }
      }
      event.currentTarget.classList.remove('dragging');
    };

    return {
      input,
      inputFile,
      selectFile,
      removeFile,
      changeFile,
      dragover,
      dragleave,
      drop,
    };
  },
};

</script>

<style lang="scss">
.image-input {
  @apply rounded-md relative block border rounded-md bg-white flex justify-center cursor-pointer h-48;

  &.has-preview {
    &:hover {
      .image-input-render {
        @apply inline rounded-md;
      }
    }
  }

  &:not(.has-preview) {
    &:not(.dragging) {
      &:hover {
        background-size: 30px 30px;
        animation: stripes 2s linear infinite;
        background-image: linear-gradient(
          -45deg,
          theme('colors.blue.100') 25%,
          transparent 25%,
          transparent 50%,
          theme('colors.blue.100') 50%,
          theme('colors.blue.100') 75%,
          transparent 75%,
          transparent
        );
      }
    }

    .image-input-empty {
      @apply inline;
    }
  }

  > img {
    @apply max-w-full max-h-full p-2 rounded-md;
  }

  .image-input-render {
    @apply hidden absolute z-10 bg-cyan-900 bg-opacity-50 w-full h-full;
  }

  .image-input-empty {
    @apply hidden relative z-10 h-full;
  }

  .image-input-info {
    @apply relative opacity-75 rounded-md text-white w-full text-center;
    top: 50%;
    transform: translateY(-50%);
  }

  .image-input-empty-text {
    @apply relative text-cyan-700 w-full text-center;
    top: 50%;
    transform: translateY(-50%);
  }

  .image-input-icon {
    @apply h-8 block ml-auto mr-auto rounded-md;
  }

  .btn-image-preview {
    @apply absolute uppercase border rounded-md border-white text-xs text-white py-1 px-2 z-20;
    top: 10px;
    right: 10px;
  }
}

@keyframes stripes {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 60px 30px;
  }
}
</style>
