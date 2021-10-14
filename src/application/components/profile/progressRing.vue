<template>

	<div id="cont" :class="`-rotate-90 h-[${dimension}] w-[${dimension}] relative`">
		<div class="absolute flex w-full h-full flex-col justify-center items-center rotate-90 font-bold text-primary text-center text-lg md:text-xl">
			{{ progress }}
		</div>
		<svg id="svg" :width="dimension * 2" :height="dimension * 2" :viewPort="`0 0 ${dimension} ${dimension}`" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<circle 
				:r="radius" 
				:cx="radius + 10" 
				:cy="radius + 10" 
				:stroke-width="stroke"
				:stroke="baseColor"
				fill="transparent" 
				stroke-dasharray="565.48" 
				stroke-dashoffset="0"
			></circle>
			<circle 
				id="bar" 
				:r="radius" 
				:cx="radius + 10" 
				:cy="radius + 10" 
				:stroke="strokeColor"
				:style="{ strokeDashoffset: compstrokeDashoffset }"
				:stroke-width="stroke"
				fill="transparent" 
				stroke-dasharray="565.48" 
				stroke-dashoffset="0"></circle>
		</svg>
	</div>
</template>
<script lang="ts">

import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
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
	setup(props) {

		const normalizedRadius = ref(props.radius + props.stroke * 2)
		const circumference = ref(Math.PI*(normalizedRadius.value * 2))

		const strokeDashoffset = () => {
			
			return ((100-props.progress)/100) * circumference.value
    
		}

		const compstrokeDashoffset = computed(strokeDashoffset)


		return {
			normalizedRadius,
			circumference,
			compstrokeDashoffset
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