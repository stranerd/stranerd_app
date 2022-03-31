<template>
	<div class="relative w-full flex items-center">
		<img
			:onerror="`this.src = '${defaultCover}'`"
			:src="source || defaultCover"
			:style="`object-fit: cover;`"
			alt=""
			class="w-full h-full"
		>
		<FileInput v-if="editable" accept="image/*"
			class="rounded-full absolute right-0 mr-4 h-8 w-8 bg-gray text-white flex items-center justify-center"
			@files="catchPhoto">
			<IonIcon :icon="pencilOutline" />
		</FileInput>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Media, UploadedFile } from '@modules/core'
import { DEFAULT_PROFILE_BACKDROP, DEFAULT_PROFILE_BACKDROP_EDIT } from '@utils/constants'
import { useFileInputCallback } from '@app/composable/core/forms'
import { pencilOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'CoverAvatar',
	props: {
		src: {
			type: Object as PropType<Media | UploadedFile | null>,
			default: null,
			validator: (p: any) => p === null || p === undefined || typeof p.link === 'string'
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
		const defaultCover = computed(() => props.editable ? DEFAULT_PROFILE_BACKDROP_EDIT : DEFAULT_PROFILE_BACKDROP)
		return { pencilOutline, source, defaultCover, catchPhoto }
	}
})
</script>
