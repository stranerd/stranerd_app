<template>
	<span class="cursor-pointer" @click="openFileSelect">
		<input
			ref="fileInput"
			:accept="accept"
			:multiple="multiple"
			class="hidden"
			name="file"
			type="file"
			@change.prevent="handler"
		>
		<slot />
	</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UploadedFile } from '@modules/core'

const props = defineProps({
	multiple: {
		type: Boolean,
		required: false,
		default: false
	},
	accept: {
		type: String,
		required: false,
		default: '*'
	}
})

const emit = defineEmits(['files'])

const fileInput = ref(null as HTMLInputElement | null)
const openFileSelect = async () => {
	if (fileInput.value) fileInput.value.value = null as any
	fileInput.value?.click()
}
const handler = async (e: Event) => {
	const fileList = (e.target as HTMLInputElement)?.files ?? []
	const files: UploadedFile[] = []
	for (let i = 0; i < fileList.length; i++) {
		const file = fileList[i]
		files.push(new UploadedFile({
			name: file.name,
			path: file.webkitRelativePath,
			type: file.type,
			size: file.size,
			data: file.slice(),
			ref: file
		}))
	}
	if (files.length) emit('files', props.multiple ? files : files.slice(0, 1))
}
</script>
