<template>
	<div class="h-full flex items-start">
		<div :class="secondCard ? 'border-light_blue' : 'border-white'" class="card-arrow border"></div>
		<div :class="secondCard ? 'bg-light_blue' : 'bg-white'"
			class="card relative w-44 lg:w-96 rounded-tl-none rounded-xl h-full flex items-center">
			<div class="card-body px-5 py-8 lg:px-8 lg:py-10">
				<div v-for="(paragraph, i) in testimony.testimonies" :key="i" class="my-3">
					<p class="testimony text-xs lg:text-base font-normal">
						{{ paragraph }}
					</p>
				</div>
				<div class="flex gap-2 my-3 items-center">
					<div class="rounded-full overflow-hidden w-14 h-14 flex items-center justify-center">
						<img :src="require('@app/assets/images/testimonials/' + testimony.image + '.jpeg')"
							alt="testimonial image" class="w-full w-min-full h-min-full">
					</div>
					<div class="">
						<h3 class="testimonial-name font-bold text-xs lg:text-base">{{ testimony.name }}</h3>
					</div>
				</div>
				<div class="flag">
					<img :alt="testimony.country + 'flag'"
						:src="require('@app/assets/images/flags/' + testimony.flag + '.png')" class="flag-image">
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TestimonialCard',
	props: {
		testimony: {
			type: Object,
			required: true
		},
		secondCard: {
			type: Boolean,
			default: false,
			required: false
		}

	}
})
</script>

<style scoped>
	@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');

	.card-arrow {
		height: 0;
		width: 0;
		border-width: 10px;
		border-bottom-color: transparent;
		border-left-color: transparent;
	}

	.testimony {
		font-family: 'DM Sans', sans-serif;
	}
</style>
