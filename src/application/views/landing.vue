<template>
	<HomeLayout>
		<Landing></Landing>
		<About></About>
		
		<Testimonial></Testimonial>
		<GetStarted></GetStarted>
		<Features></Features>
		<Footer></Footer>
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeLayout from '@app/layouts/home.vue'
import Footer from '@app/components/landing/footer.vue'
import About from '@app/components/landing/about.vue'
import Testimonial from '@app/components/landing/testimonial.vue'
import Features from '@app/components/landing/features.vue'
import GetStarted from '@app/components/landing/getStarted.vue'
import Landing from '@app/components/landing/landing.vue'

export default defineComponent({
	name: 'Index',
	components: {
		Footer,
		About,
		Features,
		GetStarted,
		Testimonial,
		Landing,
		HomeLayout
	}
})
</script>
