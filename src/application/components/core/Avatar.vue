<template>
	<router-link :to="`/profile/${id}`">
		<img
			:src="source"
			:style="`width: ${size}px; height: ${size}px; border-radius: 10rem; border: 1.5px solid transparent; object-fit: cover;`"
			alt=""
			class="!max-w-[1920px]"
		>
	</router-link>

</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Media } from '@modules/core'
import { DEFAULT_PROFILE_IMAGE } from '@utils/constants'

export default defineComponent({
	name: 'Avatar',
	props: {
		id:{
			type: String,
			default:null
		},
		src: {
			type: Object as PropType<Media | null>,
			default: null,
			validator: (p: any) => p === null || typeof p.link === 'string'
		},
		size: {
			required: false,
			type: Number,
			default: 40
		}
	},
	setup (props: any) {
		const source = computed({
			get: () => typeof props.src?.link === 'string' ? props.src.link : DEFAULT_PROFILE_IMAGE,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		return { source }
	}
})
</script>
