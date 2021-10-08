<template>
	<div :class="`py-4 px-4 rounded-lg ${props.colorClass} flex flex-col w-full`">
		<div class="flex flex-row items-center">
			<img src="/assets/images/person-circle.svg" class="inline h-7 mr-2"/>
			<span class="font-bold text-dark_gray">Timmy Nuetron</span>
			<div class="flex flex-row-reverse flex-grow">
				<button class="py-1 px-3 rounded-lg text-white bg-dark_gray font-bold flex flex-row items-center">
					<span class="mr-2">Answer</span>
					<span class="h-1 w-1 rounded-full bg-white mr-2" ></span>
					<span class="mr-1 text-sm">+20</span>
					<img src="/assets/images/bronze.svg" class=" h-4"/>
				</button>
			</div>
		</div>

		<div class="mt-3" v-if="props.isFeatured">
			<button class="py-1 px-3 rounded-lg text-white bg-star_yellow font-bold flex flex-row items-center">
				Featured
			</button>
		</div>
		<div class="mt-3 flex flex-row items-center">
			<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3" ></span>
			<span class="font-semibold text-dark_gray">Physics</span>
		</div>

		<p class="py-2 text-dark_gray leading-normal">
			From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the horizontal plane at a speed of 21 m/s.
			Calculate the total time the ball is in the air?
		</p>

		<div class="w-full flex flex-col lg:flex-row lg:justify-between">
			<div class="mt-2 mb-2 flex flex-row items-center gap-4">
				<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
					Motion
				</span>
				<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
					projectile-motion
				</span>
				<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg">
					projectile
				</span>
			</div>

			<div  class="mt-2 flex flex-row items-center ">
				<span class="font-bold text-icon_inactive lg:mr-2">30m ago</span>
				<div class="flex flex-row-reverse items-center flex-grow">
					<span class="font-bold text-icon_inactive">5 answers</span>
					<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3" ></span>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		isFeatured: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		return {
			props
		}
	},
})
</script>
