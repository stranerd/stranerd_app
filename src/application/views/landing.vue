<template>
	<HomeLayout>
		<div>
			<div class="landing">
				<Navigation></Navigation>
				<Landing></Landing>
				<About></About>
				<Download></Download>
				<Statistics></Statistics>
				<GetStarted></GetStarted>
				<Testimonial></Testimonial>
				<Features></Features>
				<Footer></Footer>
			</div>
		</div>
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeLayout from '@app/layouts/home.vue'
import Footer from '@app/components/landing/footer.vue'
import Navigation from '@app/components/landing/navigation.vue'
import About from '@app/components/landing/about.vue'
import Testimonial from '@app/components/landing/testimonial.vue'
import Features from '@app/components/landing/features.vue'
import GetStarted from '@app/components/landing/getStarted.vue'
import Statistics from '@app/components/landing/statistics.vue'
import Download from '@app/components/landing/download.vue'
import Landing from '@app/components/landing/landing.vue'

export default defineComponent({
	name: 'Index',
	components: {
		Footer,
		Navigation,
		About,
		Features,
		GetStarted,
		Testimonial,
		Statistics,
		Download,
		Landing,
		HomeLayout
	}
})
</script>
