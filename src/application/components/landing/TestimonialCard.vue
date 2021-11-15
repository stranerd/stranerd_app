<template>
	<div>
		<div class="card h-full flex items-center">
			<div class="card-body">
				<p class="testimony mb-5">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet. 
				</p>
				<div class="flex gap-2 items-center">
					<div class="rounded-full overflow-hidden w-24 h-24">
						<img src="@app/assets/images/testimonials/eunice.jpeg" alt="testimonial image" class="w-full w-min-full h-min-full">
					</div>
					<div class="">
						<h3 class="testimonial-name">Eunice Apo</h3>
					</div>
				</div>
				<div class="flag">
					<img src="@app/assets/images/flags/nigeria.png" alt="flag image" class="flag-image">
				</div>
			</div>
		</div>
	</div>
</template>


<script lang="ts">
export default {
	name: 'TestimonialCard',
}
</script>