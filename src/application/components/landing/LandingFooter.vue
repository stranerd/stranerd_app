<template>
	<footer class="bg-primaryBg text-white p-4 py-24 w-full">
		<div class="container mx-auto flex md:justify-around flex-wrap gap-5">
			<div class="flex flex-col items-start w-[45%] md:w-auto mt-12 md:mt-0 gap-8 pc">
				<img alt="logo" class="h-10" src="/images/icon_white.svg">
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
				<p>© {{ new Date().getFullYear() }} | Stranerd LLC. All rights reserved.</p>
			</div>
			<div class="flex flex-col gap-4 w-[45%] md:w-auto">
				<span class="font-bold md:text-2xl text-xl">Company</span>
				<router-link to="/about">About us</router-link>
				<router-link to="/legal/privacy-policy">Privacy Policy</router-link>
				<router-link to="/legal/terms-and-conditions">Terms and Conditions</router-link>
				<router-link to="/legal/tutors-terms-of-service">Tutors Terms of Service</router-link>
			</div>
			<div class="flex flex-col gap-4 w-[45%] md:w-auto">
				<span class="font-bold md:text-2xl text-xl">Community</span>
				<a href="https://stranerd.medium.com" target="_blank">Blog</a>
				<a href="#">Stranerd APP</a>
				<a href="#">Stranerd Official</a>
			</div>
			<div class="flex flex-col gap-4 w-[40%] md:w-auto mt-12 md:mt-0">
				<span class="font-bold md:text-2xl text-xl">Help</span>
				<router-link class="font-light" to="/faqs">FAQs</router-link>
				<router-link to="/legal/honor-code">Honor Code</router-link>
				<router-link to="/contact">Contact us</router-link>
			</div>

			<div class="flex flex-col items-start w-full md:w-auto mt-12 md:mt-0 gap-8 mobile">
				<img alt="logo" class="h-10" src="/images/icon_white.svg">
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
				<p>© {{ new Date().getFullYear() }} | Stranerd LLC. All rights reserved.</p>
			</div>
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
</style>
