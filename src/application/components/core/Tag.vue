<template>
	<span v-if="tag"
		:style="`color: rgb(${secondary ? '255, 255, 255' : color}); background-color: rgba(${color}, ${secondary ? 0.9 : 0.1});`"
		class="py-1 px-3 font-bold lg:text-sm text-xs rounded-3xl"
	>
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
			required: false
		},
		secondary: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		// The Colors below
		// 1: Cyan #54B5D3
		// 2. Pink #FF6496
		// 3: Orange #FFA84B
		// 4: Purple #C864DC
		// 5: Green #00D25A
		const colors = ['84, 181, 211', '255, 100, 150', '255, 168, 75', '200, 100, 220', '0, 210, 90']
		const randomNumber = Math.floor(Math.random() * colors.length)
		const color = colors[(props.index ?? randomNumber) % colors.length]

		return { colors, randomNumber, color }
	}
})
</script>
