<template>
  <div class="rich-text-editor">
    <div
      class="toolbar bg-gray-100 p-2 rounded-t-lg border flex flex-wrap gap-2"
    >
      <!-- Text Style -->
      <UButtonGroup>
        <UButton
          :color="
            editor?.isActive('heading', { level: 1 }) ? 'primary' : 'gray'
          "
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
          icon="i-gravity-ui-heading-1"
          square
          variant="ghost"
        />
        <UButton
          :color="
            editor?.isActive('heading', { level: 2 }) ? 'primary' : 'gray'
          "
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
          icon="i-gravity-ui-heading-2"
          square
          variant="ghost"
        />
        <UButton
          :color="
            editor?.isActive('heading', { level: 3 }) ? 'primary' : 'gray'
          "
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
          icon="i-gravity-ui-heading-3"
          square
          variant="ghost"
        />
        <UButton
          :color="
            editor?.isActive('heading', { level: 4 }) ? 'primary' : 'gray'
          "
          @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()"
          icon="i-gravity-ui-heading-4"
          square
          variant="ghost"
        />
        <UButton
          :color="
            editor?.isActive('heading', { level: 5 }) ? 'primary' : 'gray'
          "
          @click="editor?.chain().focus().toggleHeading({ level: 5 }).run()"
          icon="i-gravity-ui-heading-5"
          square
          variant="ghost"
        />
        <UButton
          :color="
            editor?.isActive('heading', { level: 6 }) ? 'primary' : 'gray'
          "
          @click="editor?.chain().focus().toggleHeading({ level: 6 }).run()"
          icon="i-gravity-ui-heading-6"
          square
          variant="ghost"
        />
        <UButton
          :color="editor?.isActive('paragraph') ? 'primary' : 'gray'"
          @click="editor?.chain().focus().setParagraph().run()"
          icon="i-gravity-ui-text"
          square
          variant="ghost"
        />
      </UButtonGroup>

      <!-- Text Formatting -->
      <UButtonGroup>
        <UButton
          :color="editor?.isActive('bold') ? 'primary' : 'gray'"
          @click="editor?.chain().focus().toggleBold().run()"
          icon="i-ic-outline-format-bold"
          square
          variant="ghost"
        />
        <UButton
          :color="editor?.isActive('italic') ? 'primary' : 'gray'"
          @click="editor?.chain().focus().toggleItalic().run()"
          icon="i-ic-outline-format-italic"
          square
          variant="ghost"
        />
        <UButton
          :color="editor?.isActive('strike') ? 'primary' : 'gray'"
          @click="editor?.chain().focus().toggleStrike().run()"
          icon="i-heroicons-minus-solid"
          square
          variant="ghost"
        />
        <UButton
          :color="editor?.isActive('link') ? 'primary' : 'gray'"
          @click="showLinkInput"
          icon="i-heroicons-link"
          square
          variant="ghost"
        />
      </UButtonGroup>

      <!-- Lists -->
      <UButtonGroup>
        <UButton
          :color="editor?.isActive('bulletList') ? 'primary' : 'gray'"
          @click="editor?.chain().focus().toggleBulletList().run()"
          icon="i-heroicons-list-bullet-solid"
          square
          variant="ghost"
        />
        <UButton
          :color="editor?.isActive('orderedList') ? 'primary' : 'gray'"
          @click="editor?.chain().focus().toggleOrderedList().run()"
          icon="i-tabler-list-numbers"
          square
          variant="ghost"
        />
      </UButtonGroup>

      <!-- Alignment -->
      <UButtonGroup>
        <UButton
          :color="editor?.isActive({ textAlign: 'left' }) ? 'primary' : 'gray'"
          @click="editor?.chain().focus().setTextAlign('left').run()"
          icon="i-heroicons-bars-3-bottom-left-solid"
          square
          variant="ghost"
        />
        <UButton
          :color="
            editor?.isActive({ textAlign: 'center' }) ? 'primary' : 'gray'
          "
          @click="editor?.chain().focus().setTextAlign('center').run()"
          icon="i-heroicons-bars-3-center-left-solid"
          square
          variant="ghost"
        />
        <UButton
          :color="editor?.isActive({ textAlign: 'right' }) ? 'primary' : 'gray'"
          @click="editor?.chain().focus().setTextAlign('right').run()"
          icon="i-heroicons-bars-3-solid"
          square
          variant="ghost"
        />
      </UButtonGroup>

      <!-- Additional Features -->
      <UButtonGroup>
        <UButton
          :color="editor?.isActive('blockquote') ? 'primary' : 'gray'"
          @click="editor?.chain().focus().toggleBlockquote().run()"
          icon="i-heroicons-chat-bubble-left-right-solid"
          square
          variant="ghost"
        />
        <UButton
          :color="editor?.isActive('codeBlock') ? 'primary' : 'gray'"
          @click="editor?.chain().focus().toggleCodeBlock().run()"
          icon="i-heroicons-code-bracket-square-solid"
          square
          variant="ghost"
        />
        <UButton
          :color="editor?.isActive('code') ? 'primary' : 'gray'"
          @click="editor?.chain().focus().toggleCode().run()"
          icon="i-heroicons-code-bracket-solid"
          square
          variant="ghost"
        />
        <UButton
          @click="editor?.chain().focus().setHorizontalRule().run()"
          icon="i-heroicons-minus-solid"
          square
          variant="ghost"
        />
        <UButton
          @click="$refs.imageInput.click()"
          icon="i-ic-outline-image"
          square
          variant="ghost"
        />
        <input
          ref="imageInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="uploadImage"
        />
        <UButton
          @click="editor?.chain().focus().undo().run()"
          :disabled="!editor?.can().undo()"
          icon="i-heroicons-arrow-uturn-left-solid"
          square
          variant="ghost"
        />
        <UButton
          @click="editor?.chain().focus().redo().run()"
          :disabled="!editor?.can().redo()"
          icon="i-heroicons-arrow-uturn-right-solid"
          square
          variant="ghost"
        />
      </UButtonGroup>
    </div>

    <editor-content
      :editor="editor"
      class="prose max-w-none border rounded-b-lg p-4 min-h-[200px] focus:outline-none relative"
    />

    <!-- Image Controls Popup -->
    <div
      v-if="showImageControls"
      class="image-controls bg-white border rounded-lg shadow-lg p-4 absolute z-50"
      :style="{
        left: `${imageControlsPosition.x}px`,
        top: `${imageControlsPosition.y}px`
      }"
    >
      <div class="flex items-center gap-4">
        <UButton
          icon="i-heroicons-minus-small"
          @click="resizeImage(-10)"
          square
          variant="ghost"
          size="xs"
        />
        <div class="flex items-center gap-2">
          <input
            v-model="imageWidth"
            type="text"
            class="w-20 px-2 py-1 border rounded"
            @change="updateImageSize"
          />
        </div>
        <UButton
          icon="i-heroicons-plus-small"
          @click="resizeImage(10)"
          square
          variant="ghost"
          size="xs"
        />
        <UButton
          icon="i-heroicons-trash"
          @click="deleteImage"
          color="red"
          square
          variant="ghost"
          size="xs"
        />
      </div>
    </div>

    <!-- Link Dialog -->
    <div
      v-if="showLinkDialog"
      class="link-dialog bg-white border rounded-lg shadow-lg p-4 absolute z-50"
      :style="{
        left: `${linkDialogPosition.x}px`,
        top: `${linkDialogPosition.y}px`
      }"
    >
      <div class="flex items-center gap-2">
        <input
          v-model="linkUrl"
          type="url"
          placeholder="Enter URL"
          class="px-2 py-1 border rounded"
          @keyup.enter="setLink"
        />
        <UButton
          icon="i-heroicons-check"
          color="primary"
          square
          variant="ghost"
          size="xs"
          @click="setLink"
        />
        <UButton
          v-if="editor?.isActive('link')"
          icon="i-heroicons-trash"
          color="red"
          square
          variant="ghost"
          size="xs"
          @click="unsetLink"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from '@tiptap/extension-link';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

// Custom mention extension
const Mention = Extension.create({
  name: 'mention',

  addOptions() {
    return {
      suggestion: {
        char: '@',
        command: ({ editor, range, props }) => {
          editor
            .chain()
            .focus()
            .insertContent([
              {
                type: 'text',
                text: `@${props} `,
              },
            ])
            .run();
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('mention'),
        props: {
          handleKeyDown(view, event) {
            if (event.key === '@') {
              const { state } = view;
              const { selection } = state;
              const { $from } = selection;
              
              const users = [
                'John Doe',
                'Jane Smith',
                'Bob Johnson',
                'Alice Brown',
                'Charlie Wilson',
              ];

              const coords = view.coordsAtPos($from.pos);
              const dom = document.createElement('div');
              dom.className = 'mention-suggestions';
              
              users.forEach(user => {
                const item = document.createElement('div');
                item.className = 'mention-item';
                item.textContent = user;
                item.addEventListener('click', () => {
                  view.dispatch(
                    view.state.tr.insertText(`@${user} `, $from.pos)
                  );
                  tippy.hideAll();
                });
                dom.appendChild(item);
              });

              tippy(document.body, {
                getReferenceClientRect: () => coords,
                appendTo: () => document.body,
                content: dom,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              });
            }
            return false;
          },
        },
      }),
    ];
  },
});

const imageInput = ref(null);
const selectedImage = ref(null);
const imageWidth = ref('100%');
const showImageControls = ref(false);
const imageControlsPosition = ref({ x: 0, y: 0 });

const showLinkDialog = ref(false);
const linkUrl = ref('');
const linkDialogPosition = ref({ x: 0, y: 0 });

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Image.configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: 'resizable-image',
      },
    }),
    Link.configure({
      openOnClick: true,
      HTMLAttributes: {
        class: 'text-blue-600 hover:text-blue-800 underline',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
    Mention,
  ],
  onUpdate: () => {
    emit("update:modelValue", editor.value.getHTML());
  },
});

const uploadImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = e.target.result;
      editor.value?.chain().focus().setImage({ 
        src: image,
        width: '100%',
      }).run();
    };
    reader.readAsDataURL(file);
  }
  event.target.value = "";
};

const handleImageClick = (event) => {
  const clickedImage = event.target;
  if (clickedImage.tagName === 'IMG') {
    selectedImage.value = clickedImage;
    imageWidth.value = clickedImage.style.width || '100%';
    
    // Position controls near the image
    const rect = clickedImage.getBoundingClientRect();
    imageControlsPosition.value = {
      x: rect.left,
      y: rect.bottom + window.scrollY + 10
    };
    
    showImageControls.value = true;
  } else {
    showImageControls.value = false;
  }
};

const updateImageSize = () => {
  if (selectedImage.value) {
    selectedImage.value.style.width = imageWidth.value;
    editor.value?.commands.focus();
  }
};

const resizeImage = (amount) => {
  if (selectedImage.value) {
    const currentWidth = parseInt(selectedImage.value.style.width) || 100;
    const newWidth = Math.max(10, Math.min(100, currentWidth + amount));
    imageWidth.value = `${newWidth}%`;
    updateImageSize();
  }
};

const deleteImage = () => {
  if (selectedImage.value) {
    selectedImage.value.remove();
    showImageControls.value = false;
  }
};

const setLink = () => {
  if (linkUrl.value) {
    editor.value?.chain().focus().setLink({ href: linkUrl.value }).run();
  } else {
    editor.value?.chain().focus().unsetLink().run();
  }
  showLinkDialog.value = false;
  linkUrl.value = '';
};

const unsetLink = () => {
  editor.value?.chain().focus().unsetLink().run();
  showLinkDialog.value = false;
  linkUrl.value = '';
};

const showLinkInput = () => {
  const { state } = editor.value;
  const { from } = state.selection;
  const coords = editor.value?.view.coordsAtPos(from);
  
  if (coords) {
    linkDialogPosition.value = {
      x: coords.left,
      y: coords.bottom + window.scrollY + 10,
    };
  }
  
  const previousUrl = editor.value?.getAttributes('link').href;
  linkUrl.value = previousUrl || '';
  showLinkDialog.value = true;
};

// Add click event listener to handle image selection
onMounted(() => {
  const editorElement = document.querySelector('.ProseMirror');
  if (editorElement) {
    editorElement.addEventListener('click', handleImageClick);
  }
});

// Clean up event listener
onBeforeUnmount(() => {
  const editorElement = document.querySelector('.ProseMirror');
  if (editorElement) {
    editorElement.removeEventListener('click', handleImageClick);
  }
  editor.value?.destroy();
});
</script>

<style>
.ProseMirror {
  outline: none;
}

.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
  margin: 1em 0;
  display: block;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.ProseMirror img:hover {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.ProseMirror pre {
  background: #0d0d0d;
  border-radius: 0.5rem;
  color: #fff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  padding: 0.75rem 1rem;
  margin: 1rem 0;
}

.ProseMirror pre code {
  background: none;
  color: inherit;
  font-size: 0.875rem;
  padding: 0;
}

.ProseMirror code {
  background: #e2e8f0;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.ProseMirror hr {
  border: none;
  border-top: 2px solid #e2e8f0;
  margin: 2rem 0;
}

.ProseMirror .mention {
  color: #2563eb;
  font-weight: 500;
  background: #e2e8f0;
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
  white-space: nowrap;
}

.mention-suggestions {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}

.mention-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #1e293b;
}

.mention-item:hover {
  background-color: #f8fafc;
}

.image-controls {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.link-dialog {
  min-width: 300px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.link-dialog input {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  outline: none;
}

.link-dialog input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.ProseMirror a {
  color: #2563eb;
  text-decoration: underline;
  transition: color 0.2s;
}

.ProseMirror a:hover {
  color: #1d4ed8;
}
</style>
