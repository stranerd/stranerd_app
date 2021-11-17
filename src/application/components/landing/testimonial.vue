<template>
	<div class="md:px-8 px-4 py-8 bg-light_gray">
		<div class="container mx-auto">
			<div class="flex items-stretch justify-between my-8">
				<div class="" v-for="(testimony, i) in testimonies" :key="i">
					<TestimonialCard :testimony="testimony" :secondCard="i === 1"></TestimonialCard>
				</div>				
			</div>
			<div class="my-8 controls flex justify-center items-center gap-2">
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-white border-2 border-primary"></span>
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-icon_inactive"></span>
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-icon_inactive"></span>
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-icon_inactive"></span>
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-icon_inactive"></span>
			</div>
		</div>
	</div>
</template>


<script lang="ts">
import TestimonialCard from '@app/components/landing/TestimonialCard.vue'
export default {
	name: '',
	components: {
		TestimonialCard
	},
	data() {
		return {
			testimonies: [
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				},
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'usa',
					flag: 'usa'
				},
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				}
			]
		}
	},
}
</script>