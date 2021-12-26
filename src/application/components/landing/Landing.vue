<template>
	<CTA />
	<About />
	<Testimonial />
	<GetStarted />
	<Features />
	<Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from '@app/components/landing/Footer.vue'
import About from '@app/components/landing/About.vue'
import Testimonial from '@app/components/landing/Testimonial.vue'
import Features from '@app/components/landing/Features.vue'
import GetStarted from '@app/components/landing/GetStarted.vue'
import CTA from '@app/components/landing/CTA.vue'

export default defineComponent({
	name: 'Index',
	components: {
		Footer,
		About,
		Features,
		GetStarted,
		Testimonial,
		CTA
	}
})
</script>
