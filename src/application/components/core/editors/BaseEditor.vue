<template>
	<div class="flex flex-col">
		<VueEditor
			v-model="comp"
			:class="{'is-invalid': error, 'is-valid': valid }"
			:editor-toolbar="toolbar"
			:placeholder="placeholder"
		/>
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
// @ts-ignore
import { VueEditor } from 'vue3-editor'
/* const customToolBar = [
 [{ size: ['small', false, 'large', 'huge'] }],
 [{ header: [false,1,2,3,4,5,6] }],
 ['bold', 'italic', 'underline', 'strike'],
 [{ script: 'sub' }, { script: 'super' }],
 [{ indent: '-1' }, { indent: '+1' }],
 [{ align: '' },{ align: 'center' },{ align: 'right' },{ align: 'justify' }],
 ['blockquote', 'code-block'],
 [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
 [{ color: [] },{ background: [] }],
 ['link', 'image', 'video', 'formula'],
 ['clean']
 ] */

const props = defineProps({
	value: {
		required: true,
		type: String
	},
	placeholder: {
		required: true,
		type: String
	},
	error: {
		required: true,
		type: String
	},
	valid: {
		required: true,
		type: Boolean
	}
})

const emit = defineEmits(['update:value'])

const comp = computed({
	get: () => props.value,
	set: (ev: string) => {
		emit('update:value', ev)
	}
})

const toolbar = [
	[{ header: [2, 3, 4, 5, false] }],
	['bold', 'italic', 'underline', 'strike'],
	[{ script: 'sub' }, { script: 'super' }],
	['code-block'],
	['clean']
]
</script>

<style lang="scss">
.quillWrapper {
	background: $color-bodyBg;
	min-height: 320px;
	border-radius: 0.5rem;
	color: $color-bodyText;
	box-sizing: border-box;
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	font-family: inherit !important;
	font-size: inherit !important;

	.ql-container {
		font-family: inherit !important;
		font-size: inherit !important;
		flex: 1;
		min-height: 100%;
		display: flex;
		flex-direction: column;

		.ql-editor {
			flex: 1;
		}
	}

	.ql-editor.ql-blank::before {
		color: inherit;
	}

	.ql-toolbar {
		display: none;
		flex-wrap: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		font-family: inherit !important;
		font-size: inherit !important;

		// padding: 4px 0 !important;

		.ql-formats {
			display: flex;

			// padding: 8px;
			margin: 0 !important;

			.ql-expanded {
				position: static;

				.ql-picker-options {
					min-width: 0;
					top: 0;
					left: 0;
					position: absolute;
				}
			}
		}

		.ql-formats + .ql-formats {
			// border-left: 1px solid red;
		}
	}
}

.ql-toolbar.ql-snow {
	// border: 1px solid red !important;
}

.ql-container.ql-snow {
	border: 0 !important;
}

.ql-editor {
	background: $color-bodyBg;
	border: 1px solid $color-itemBg;
	border-radius: 0.5rem;
	transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
	font-family: inherit !important;
	font-size: inherit !important;
}

.ql-editor:focus {
	outline: 0;

	// border: 0px solid $color-info;
	// box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.is-valid .ql-editor:focus {
	// border: 0px solid $color-success;
	// box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.is-invalid .ql-editor:focus {
	// border: 0px solid $color-danger;
	// box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.ql-editor.ql-blank::before {
	color: inherit;
	opacity: 0.35;
	font-style: normal;
}
</style>
