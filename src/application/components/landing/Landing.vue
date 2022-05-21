<template>
	<CTA />
	<About />
	<Testimonial />
	<GetStarted />
	<Features />
	<LandingFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LandingFooter from '@app/components/landing/LandingFooter.vue'
import About from '@app/components/landing/About.vue'
import Testimonial from '@app/components/landing/Testimonial.vue'
import Features from '@app/components/landing/Features.vue'
import GetStarted from '@app/components/landing/GetStarted.vue'
import CTA from '@app/components/landing/CTA.vue'

export default defineComponent({
	name: 'Index',
	components: {
		LandingFooter,
		About,
		Features,
		GetStarted,
		Testimonial,
		CTA
	}
})
</script>
