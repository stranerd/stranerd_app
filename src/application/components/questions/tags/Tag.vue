<template>
	<router-link :to="`/questions/tags/${tag}`" class="py-1 px-3 font-bold  rounded-3xl" :style="`color:${colors[index || randomNumber]}; background-color:${bgColors[index || randomNumber]}`" >
		<span>{{ tag }}</span>
		<span>{{ index }}</span>
	</router-link>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Tag',
	props: {
		tag: {
			type: String,
			required: true
		},
		index:{
			type: Number,
			required: false
		}
	},

	setup(){
		const colors: Array<string> = [
			'0','rgba(84, 181, 211, 1)', 'rgba(255, 168, 75, 1)',  'rgba(200, 100, 220, 1)',
			'rgba(84, 109, 211, 1)', 'rgba(0, 210, 90, 1)',  
		]
		const bgColors: Array<string> = [
			'0', 'rgba(84, 181, 211, 0.1)', 'rgba(255, 168, 75, 0.1)', 'rgba(200, 100, 220, 0.1)',
			'rgba(84, 109, 211, 0.1)', 'rgba(0, 210, 90, 0.1)',   
		]

		const randomNumber =  (Math.floor(Math.random() * 4)+1)

		return {
			colors, bgColors, randomNumber
		}
	}
	
})
</script>


