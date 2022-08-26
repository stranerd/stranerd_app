<template>
	<footer class="bg-primaryBg text-white p-4 py-24 w-full">
		<div class="container mx-auto flex md:justify-around flex-wrap gap-5">
			<div class="flex flex-col items-start w-[45%] md:w-auto mt-12 md:mt-0 gap-8 pc">
				<img alt="logo" class="h-10" src="/images/icon_white.svg">
				<div class="flex items-center gap-6">
					<a href="https://www.instagram.com/stranerdapp/" target="_blank" rel="noopener noreferrer">
						<IonIcon :icon="logoInstagram" />
					</a>
					<a href="https://twitter.com/stranerds" target="_blank" rel="noopener noreferrer">
						<IonIcon :icon="logoTwitter" />
					</a>
					<a href="https://facebook.com/officialstranerd" target="_blank" rel="noopener noreferrer">
						<IonIcon :icon="logoFacebook" />
					</a>
					<a href="https://www.linkedin.com/company/stranerd" target="_blank" rel="noopener noreferrer">
						<IonIcon :icon="logoLinkedin" />
					</a>
				</div>
				<p>© {{ new Date().getFullYear() }} | Stranerd LLC. All rights reserved.</p>
			</div>
			<div class="flex flex-col gap-4 w-[45%] md:w-auto">
				<span class="font-bold md:text-2xl text-xl">Company</span>
				<a href="#">About us</a>
				<a href="#">Team</a>
				<a href="#">Privacy Policy</a>
				<a href="#">Terms of Service</a>
				<a href="#">Terms and Conditions</a>
			</div>
			<div class="flex flex-col gap-4 w-[45%] md:w-auto">
				<span class="font-bold md:text-2xl text-xl">Community</span>
				<a href="https://stranerd.medium.com" target="_blank">Blog</a>
				<a href="#">Stranerd APP</a>
				<a href="#">Stranerd Official</a>
			</div>
			<div class="flex flex-col gap-4 w-[40%] md:w-auto mt-12 md:mt-0">
				<span class="font-bold md:text-2xl text-xl">Help</span>
				<router-link class="font-light" to="/legal/faqs">FAQs</router-link>
				<a href="#">Honor Code</a>
				<a href="mailto:support@stranerd.com" target="_blank">Support</a>
				<a href="mailto:support@stranerd.com" target="_blank">Contact us</a>
			</div>
	
			<div class="flex flex-col items-start w-full md:w-auto mt-12 md:mt-0 gap-8 mobile">
				<img alt="logo" class="h-10" src="/images/icon_white.svg">
				<div class="flex items-center gap-6">
					<a href="https://www.instagram.com/stranerdapp/" target="_blank" rel="noopener noreferrer">
						<IonIcon :icon="logoInstagram" />
					</a>
					<a href="https://twitter.com/stranerds" target="_blank" rel="noopener noreferrer">
						<IonIcon :icon="logoTwitter" />
					</a>
					<a href="https://facebook.com/officialstranerd" target="_blank" rel="noopener noreferrer">
						<IonIcon :icon="logoFacebook" />
					</a>
					<a href="https://www.linkedin.com/company/stranerd" target="_blank" rel="noopener noreferrer">
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
	setup() {
		return {
			logoInstagram, logoTwitter, logoFacebook, logoLinkedin
		}
	}
})
</script>

<style scoped>
.mobile{
	@apply md:hidden flex
}
.pc{
	@apply md:flex hidden
}
</style>