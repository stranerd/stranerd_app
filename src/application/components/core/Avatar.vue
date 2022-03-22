<template>
	<component :is="id ? 'router-link' : 'span'" :to="`/users/${id}/`"
		class="rounded-full border border-white relative"
		style="border-width: 2px;">
		<span v-if="!source && name" :style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
			class="flex items-center justify-center uppercase bg-gray text-white font-semibold rounded-full">
			<span :style="`font-size: ${size/1.75}px;line-height: 1em`">{{ name[0] }}</span>
		</span>
		<img
			v-else
			:onerror="`this.src = '${DEFAULT_PROFILE_PHOTO}'`"
			:src="source || DEFAULT_PROFILE_PHOTO"
			:style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
			alt=""
			class="!max-w-[1920px] rounded-full"
		>
		<FileInput v-if="editable" accept="image/*"
			class="rounded-full absolute h-6 w-6 right-0 bottom-0 bg-gray text-white flex items-center justify-center"
			@files="catchPhoto">
			<IonIcon :icon="pencilOutline" />
		</FileInput>
	</component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Media, UploadedFile } from '@modules/core'
import { DEFAULT_PROFILE_PHOTO } from '@utils/constants'
import { pencilOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'

export default defineComponent({
	name: 'Avatar',
	props: {
		id: {
			type: String,
			default: ''
		},
		src: {
			type: Object as PropType<Media | UploadedFile | null>,
			default: null,
			validator: (p: any) => p === null || p === undefined || typeof p.link === 'string' || typeof p.url === 'string'
		},
		name: {
			type: String,
			required: false,
			default: ''
		},
		size: {
			required: false,
			type: Number,
			default: 40
		},
		editable: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props, { emit }) {
		const source = computed({
			get: () => typeof props.src?.link === 'string' ? props.src.link : false,
			set: () => {
			}
		})
		const catchPhoto = useFileInputCallback(async ([file]) => emit('photo', file))
		return { source, DEFAULT_PROFILE_PHOTO, pencilOutline, catchPhoto }
	}
})
</script>
