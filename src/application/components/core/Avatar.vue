<template>
	<component :is="id ? 'router-link' : 'span'" :to="`/users/${id}/`">
		<img
			v-if="source"
			:onerror="`this.src = '${DEFAULT_PROFILE_IMAGE}'`"
			:src="source"
			:style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
			alt=""
			class="!max-w-[1920px] rounded-full"
		>
		<span v-else-if="name" :style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
			class="flex items-center justify-center uppercase bg-faded_gray text-main_dark font-semibold rounded-full">
			<span class="text-xl">{{ name[0] }}</span>
		</span>
		<img
			v-else
			:src="DEFAULT_PROFILE_IMAGE"
			:style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
			alt=""
			class="!max-w-[1920px] rounded-full"
		>
	</component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Media } from '@modules/core'
import { DEFAULT_PROFILE_IMAGE } from '@utils/constants'

export default defineComponent({
	name: 'Avatar',
	props: {
		id: {
			type: String,
			default: ''
		},
		src: {
			type: Object as PropType<Media | null>,
			default: null,
			validator: (p: any) => p === null || p === undefined || typeof p.link === 'string'
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
		}
	},
	setup (props) {
		const source = computed({
			get: () => typeof props.src?.link === 'string' ? props.src.link : false,
			set: () => {
			}
		})
		return { source, DEFAULT_PROFILE_IMAGE }
	}
})
</script>
