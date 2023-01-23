<template>
	<HomeLayout>
		<div
			class="pricing_header text-primaryText text-center h-[72px] md:h-[100px] w-full flex items-center justify-center">
			<h1 class="relative text-2xl md:text-5xl font-bold">Privacy Policy</h1>
		</div>
		<PdfReader class="max-w-[900px] mx-auto" link="/legal/privacy-policy.pdf" />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PdfReader from '@app/components/core/media/PdfReader.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'LegalPrivacyPolicy',
	components: { PdfReader },
	setup () {
		useRouteMeta('Privacy Policy', { back: true })
	}
})
</script>

<style lang="scss" scoped>
.pricing_header {
	background: rgb(5 9 13 / 50%) url("@app/assets/images/newLanding/privacy_policy_header_banner.png") center 80%;
	background-size: cover;
	background-blend-mode: darken;
}

@media screen and (min-width: 768px) {
	.pricing_header {
		background-position: center 80%;
	}
}

</style>
