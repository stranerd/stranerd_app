<template>
	<div class="w-full lg:min-h-[696px] h-auto bg-primaryText py-6 ">
		<div class="bg-primaryText w-full p-6">
			<div
				class="bg-bodyBg h-auto w-full max-w-[606px] mx-auto border flex items-center gap-4 pl-4 rounded-lg my-6">
				<IonIcon :icon="searchOutline" class="" />
				<input class="bg-transparent py-3 focus:border-0 focus:outline-0 w-full" placeholder="Search for question"
					type="text" />
			</div>
			<FaqsList />
		</div>
		<div class="w-full h-auto flex items-center justify-center bg-primaryBg px-6 py-12">
			<div>
				<p class="text-primaryText text-xl md:text-3xl mb-6 text-center">Still have questions?</p>
				<router-link class="btn bg-primaryText text-primaryBg mx-auto" to="/">
					Contact us
				</router-link>
			</div>
		</div>
		<App />
		<Testimonial />
	</div>
</template>

<script lang="ts" setup>
import FaqsList from '@app/components/landing/contact/FaqsList.vue'
import App from '../App.vue'
import Testimonial from '@app/components/landing/Testimonial.vue'
import { searchOutline } from 'ionicons/icons'</script>

<style scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>
