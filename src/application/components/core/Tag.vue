<template>
	<span
		:class="[secondary ?'!text-white':'',`py-1 px-3 font-bold  rounded-3xl`]"
		:style="`color:${colors[index || randomNumber]}; background-color:${secondary? colors[index || randomNumber] : bgColors[index || randomNumber]}`"
	>
		<slot
			:bgColors="bgColors"
			:colors="colors"
			:index="index"
			:randomNumber="randomNumber"
			:tag="tag"
		>{{ tag }}</slot>
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
	setup () {
		// The Colors below
		// 0: non-active
		// 1: Cyan
		// 2: Orange
		// 3: Purple
		// 4: Blue
		// 5: Green
		const colors: Array<string> = [
			'0', 'rgba(84, 181, 211, 1)', 'rgba(255, 168, 75, 1)', 'rgba(200, 100, 220, 1)',
			'rgba(84, 109, 211, 1)', 'rgba(0, 210, 90, 1)'
		]
		const bgColors: Array<string> = [
			'0', 'rgba(84, 181, 211, 0.1)', 'rgba(255, 168, 75, 0.1)', 'rgba(200, 100, 220, 0.1)',
			'rgba(84, 109, 211, 0.1)', 'rgba(0, 210, 90, 0.1)'
		]

		const randomNumber = (Math.floor(Math.random() * 4) + 1)

		return {
			colors, bgColors, randomNumber
		}
	}
})
</script>
