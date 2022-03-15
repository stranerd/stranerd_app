<template>
	<component :is="id ? 'router-link' : 'span'" :to="`/users/${id}/`">
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
	</component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Media } from '@modules/core'
import { DEFAULT_PROFILE_PHOTO } from '@utils/constants'

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
		return { source, DEFAULT_PROFILE_PHOTO }
	}
})
</script>
