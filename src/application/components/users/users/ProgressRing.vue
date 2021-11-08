<template>
	<div id="cont" :class="`-rotate-90 h-[${dimension}] w-[${dimension}] relative`">
		<div
			class="absolute flex w-full h-full flex-col justify-center items-center rotate-90 font-bold text-primary text-center text-lg md:text-xl">
			{{ progress }}
		</div>
		<svg id="svg" :height="dimension * 2" :viewPort="`0 0 ${dimension} ${dimension}`" :width="dimension * 2"
			version="1.1" xmlns="http://www.w3.org/2000/svg">
			<circle
				:cx="radius + 10"
				:cy="radius + 10"
				:r="radius"
				:stroke="baseColor"
				:stroke-width="stroke"
				fill="transparent"
				stroke-dasharray="565.48"
				stroke-dashoffset="0"
			/>
			<circle
				id="bar"
				:cx="radius + 10"
				:cy="radius + 10"
				:r="radius"
				:stroke="strokeColor"
				:stroke-width="stroke"
				:style="{ strokeDashoffset: compStrokeDashOffset }"
				fill="transparent"
				stroke-dasharray="565.48"
				stroke-dashoffset="0" />
		</svg>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'ProgressRing',
	props: {
		radius: {
			type: Number,
			default: 90
		},
		stroke: {
			type: Number,
			default: 4
		},
		baseColor: {
			type: String
		},
		strokeColor: {
			type: String
		},
		dimension: {
			type: Number,
			default: 100
		},
		progress: {
			type: Number,
			default: 0
		}
	},
	setup (props) {
		const normalizedRadius = ref(props.radius + props.stroke * 2)
		const circumference = ref(Math.PI * (normalizedRadius.value * 2))

		const compStrokeDashOffset = computed(() => ((100 - props.progress) / 100) * circumference.value)

		return {
			normalizedRadius,
			circumference,
			compStrokeDashOffset
		}
	}
})
</script>
<style scoped>
	#svg circle {
		stroke-dashoffset: 0;
		transition: stroke-dashoffset 1s linear;
	}


</style>
