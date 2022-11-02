
<template>
	<footer class="bg-primaryText text-bodyText p-6 py-24 w-full">
		<div class="container max-w-[1200px] mx-auto flex md:justify-between flex-wrap gap-5">
			<div class="flex flex-col gap-4 w-[45%] md:w-auto">
				<span class="font-bold md:text-2xl text-xl">Product</span>
				<router-link to="/about">About us</router-link>
				<router-link to="/legal/privacy-policy">Honor code</router-link>
				<router-link to="/legal/terms-and-conditions">What we offer</router-link>
			</div>
			<div class="flex flex-col gap-4 w-[40%] md:w-auto">
				<span class="font-bold md:text-2xl text-xl">Help</span>
				<router-link class="font-light" to="/faqs">FAQs</router-link>
				<router-link to="/legal/honor-code">Contact us</router-link>
				<router-link to="/contact">Email us</router-link>
			</div>
			
			<div class="flex flex-col gap-4 w-[45%] md:w-auto mt-6 md:mt-0">
				<span class="font-bold md:text-2xl text-xl">Community</span>
				<a href="https://stranerd.medium.com" target="_blank">Blog</a>
				<a href="#">App store</a>
				<a href="#">Google play</a>
			</div>
			<div class="flex flex-col gap-4 w-[45%] md:w-auto mt-6 md:mt-0">
				<span class="font-bold md:text-2xl text-xl">Legal</span>
				<router-link to="/legal/privacy-policy">Privacy Policy</router-link>
				<router-link to="/legal/terms-and-conditions">Terms and Conditions</router-link>
				<router-link to="/legal/tutors-terms-of-service">Terms of Service</router-link>
			</div>
		</div>
		<div class=" flex flex-col items-start w-auto max-w-[1200px] mx-auto mt-9 gap-3">
			<div class="flex items-center gap-6">
				<a href="https://www.instagram.com/stranerdapp/" rel="noopener noreferrer" target="_blank">
					<IonIcon :icon="logoInstagram" />
				</a>
				<a href="https://twitter.com/stranerds" rel="noopener noreferrer" target="_blank">
					<IonIcon :icon="logoTwitter" />
				</a>
				<a href="https://facebook.com/officialstranerd" rel="noopener noreferrer" target="_blank">
					<IonIcon :icon="logoFacebook" />
				</a>
				<a href="https://www.linkedin.com/company/stranerd" rel="noopener noreferrer" target="_blank">
					<IonIcon :icon="logoLinkedin" />
				</a>
			</div>
			<p class="text-bodyText">© {{ new Date().getFullYear() }} | Stranerd LLC.</p>
		</div>
	</footer>
</template>

<script lang="ts">
import { logoFacebook, logoInstagram, logoLinkedin, logoTwitter } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LandingFooter',
	setup () {
		return {
			logoInstagram, logoTwitter, logoFacebook, logoLinkedin
		}
	}
})
</script>

<style lang="scss" scoped>
.mobile {
	@apply md:hidden flex
}

.pc {
	@apply md:flex hidden
}

a{
	color: theme('colors.secondaryText');
	font-weight: bold;
}
</style>
