<template>
	<img
		:onerror="`this.src = '${DEFAULT_PROFILE_BACKDROP}'`"
		:src="source || DEFAULT_PROFILE_BACKDROP"
		:style="`object-fit: cover;`"
		alt=""
		class="w-full"
	>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Media } from '@modules/core'
import { DEFAULT_PROFILE_BACKDROP } from '@utils/constants'

export default defineComponent({
	name: 'CoverAvatar',
	props: {
		src: {
			type: Object as PropType<Media | null>,
			default: null,
			validator: (p: any) => p === null || p === undefined || typeof p.link === 'string'
		}
	},
	setup (props) {
		const source = computed({
			get: () => typeof props.src?.link === 'string' ? props.src.link : false,
			set: () => {
			}
		})
		return { source, DEFAULT_PROFILE_BACKDROP }
	}
})
</script>
