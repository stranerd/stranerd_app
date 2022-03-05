<template>
	<span v-if="tag"
		:style="`color: rgb(${secondary ? '255, 255, 255' : color}); background-color: rgba(${color}, ${secondary ? 0.9 : 0.075});`"
		class="py-1 px-3 text-sm rounded-2xl">
		<slot :tag="tag">{{ tag }}</slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Tag',
	props: {
		tag: {
			required: true,
			type: String
		},
		index: {
			type: Number,
			required: false,
			default: 0
		},
		secondary: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		// The Colors below
		// 0: Gray #64778A
		// 1: Cyan #54B5D3
		// 2. Pink #FF6496
		// 3: Orange #FFA84B
		// 4: Purple #C864DC
		// 5: Green #00D25A
		// 6: Primary #546DD3
		const colors = ['100, 119, 138', '84, 181, 211', '255, 100, 150', '255, 168, 75', '200, 100, 220', '0, 210, 90', '84, 109, 211']
		const color = colors[props.index % colors.length]

		return { colors, color }
	}
})
</script>
