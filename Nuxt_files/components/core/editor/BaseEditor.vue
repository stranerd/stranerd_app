<template>
	<span>
		<vue-editor
			:class="{'is-invalid': error, 'is-valid': valid }"
			:editor-toolbar="toolbar"
			:placeholder="placeholder"
			:value="value"
			use-custom-image-handler
			@input="$emit('update:value',$event)"
			@image-added="handleImageUpload"
		/>
		<DynamicText v-if="error" class="small text-danger">{{ error }}</DynamicText>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Notify } from '@/application/hooks/core/notifications'
import { UploaderService } from '@/modules/core'
import { isClient } from '@/utils/environment'

let VueEditor = null
if (isClient()) VueEditor = require('vue2-editor').VueEditor

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

export default defineComponent({
	name: 'BaseEditor',
	components: { 'vue-editor': VueEditor },
	props: {
		value: {
			required: true,
			type: String
		},
		toolbar: {
			required: true,
			type: Array
		},
		path: {
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
	},
	setup (props) {
		return {
			handleImageUpload: async (file: File, editor: any, cursorLocation: any, resetUploader: any) => {
				try {
					const res = await UploaderService.call(props.path, file)
					editor.insertEmbed(cursorLocation, 'image', res.link)
					editor.setSelection(cursorLocation + 1, 'silent')
					resetUploader()
				} catch (e: unknown) {
					await Notify({ title: e as any, icon: 'error' })
				}
			}
		}
	}
})
</script>

<style lang="scss">
	.quillWrapper {
		background: $color-white;
		box-sizing: border-box;
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: inherit !important;

		.ql-container {
			font-family: inherit !important;
		}

		.ql-toolbar {
			display: flex;
			flex-wrap: nowrap;
			overflow-x: auto;
			overflow-y: hidden;
			font-family: inherit !important;
			padding: 4px 0 !important;

			.ql-formats {
				display: flex;
				padding: 8px;
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
				border-left: 1px solid $color-sub;
			}
		}
	}

	.ql-toolbar.ql-snow {
		border: 1px solid $color-line !important;
	}

	.ql-container.ql-snow {
		border: 0 !important;
	}

	.ql-editor {
		background: $color-white;
		border: 1px solid $color-line;
		transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
	}

	.ql-editor:focus {
		outline: 0;
		border-radius: 6px;
		border: 1px solid #86b7fe;
		box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}

	.is-valid .ql-editor:focus {
		border: 1px solid $color-green;
		box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
	}

	.is-invalid .ql-editor:focus {
		border: 1px solid $color-red;
		box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
	}

	.ql-editor.ql-blank::before {
		color: inherit;
		opacity: 0.5;
		font-size: 1em;
	}
</style>
