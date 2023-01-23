<template>
	<component :is="id ? 'router-link' : 'span'" :to="`/users/${id}`" class="rounded-full relative">
		<span v-if="!src && name" :style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
			class="flex items-center justify-center uppercase bg-secondaryText text-primaryText font-semibold rounded-full">
			<span :style="`font-size: ${size/2}px;line-height: 1em`">{{ name[0] }}</span>
		</span>
		<img
			v-else
			:onerror="`this.src = '${DEFAULT_PROFILE_PHOTO}'`"
			:src="source || DEFAULT_PROFILE_PHOTO"
			:style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
			alt=""
			class="!max-w-[1920px] rounded-full bg-secondaryText"
		>
		<FileInput v-if="editable" :style="`left: calc(${size}px - 1.75rem)`"
			accept="image/*"
			class="rounded-full absolute h-7 w-7 p-1 bottom-0 bg-primaryBg border border-primaryText text-primaryText flex items-center justify-center"
			@files="catchPhoto">
			<IonIcon :icon="cameraOutline" />
		</FileInput>
	</component>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { Media, UploadedFile } from '@modules/core'
import { cameraOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { parseURL } from '@utils/commons'

const DEFAULT_PROFILE_PHOTO = '/images/avatars/user_profile.svg'

const props = defineProps({
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
})
const emit = defineEmits(['photo'])

const source = computed({
	get: () => typeof props.src?.link === 'string' ? parseURL(props.src.link) : false,
	set: () => {
	}
})
const catchPhoto = useFileInputCallback(async ([file]) => emit('photo', file))
</script>
