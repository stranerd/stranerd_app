<template>
	<footer>
		<div class="w-full bg-secondaryText md:px-8 px-4">
			<div class="container mx-auto px-3 py-10 lg:py-24">
				<div>
					<div class="flex items-stretch flex-wrap lg:flex-nowrap gap-10 lg:gap-36 xl:gap-48 my-10">
						<div
							class="w-full md:w-1/2 flex items-stretch md:flex-auto flex-none gap-10 lg:gap-36 xl:gap-48">
							<div class="w-1/2 flex-auto">
								<div>
									<h2 class="footer-title font-bold">Company</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link class="font-light" to="/legal/privacy-policy">Privacy Policy
											</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="/legal/terms-of-use">Terms of Service
											</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="/legal/terms-and-conditions">
												Terms and Conditions
											</router-link>
										</li>
									</ul>
								</div>
							</div>
							<div class="w-1/2 flex-auto">
								<div class="">
									<h2 class="footer-title font-bold">Community</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link class="font-light" to="/questions/create">
												Ask a question
											</router-link>
										</li>
										<li class="my-10">
											<a class="font-light" href="https://stranerd.medium.com">Blog</a>
										</li>
										<li class="my-10">
											<a class="font-light" href="https://www.instagram.com/stranerdafrica_/">
												Stranerd Africa
											</a>
										</li>
										<li class="my-10">
											<a class="font-light" href="https://www.instagram.com/officialstranerd/">
												Stranerd Official
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div
							class="w-full md:w-1/2 flex items-stretch md:flex-auto flex-none gap-10 lg:gap-36 xl:gap-48">
							<div class="w-1/2 flex-auto">
								<div class="">
									<h2 class="footer-title font-bold">About</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link class="font-light" to="">Company</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Team</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Press</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Careers</router-link>
										</li>
									</ul>
								</div>
							</div>
							<div class="w-1/2 flex-auto">
								<div class="">
									<h2 class="footer-title font-bold">Help</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link class="font-light" to="/legal/faqs">
												FAQs
											</router-link>
										</li>
										<li class="my-10">
											<a class="font-light" href="mailto:support@stranerd.com">Support</a>
										</li>
										<li class="my-10">
											<a class="font-light" href="https://stranerd.medium.com">Blog</a>
										</li>
										<li class="my-10">
											<a class="font-light" href="mailto:support@stranerd.com">Contact</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col sm:flex-row md:items-center justify-center">
						<div class="flex gap-5 items-center justify-center md:justify-end my-10">
							<a aria-label="instagram link" class="inline-block"
								href="https://www.instagram.com/stranerdapp/"
								target="_blank">
								<IonIcon :icon="logoInstagram" />
							</a>
							<a aria-label="twitter link" class="inline-block" href="https://twitter.com/stranerds"
								target="_blank">
								<IonIcon :icon="logoTwitter" />
							</a>
							<a aria-label="facebook link" class="inline-block"
								href="https://facebook.com/officialstranerd"
								target="_blank">
								<IonIcon :icon="logoFacebook" />
							</a>
							<a aria-label="facebook link" class="inline-block"
								href="https://www.linkedin.com/company/stranerd"
								target="_blank">
								<IonIcon :icon="logoLinkedin" />
							</a>
						</div>
					</div>
					<p class="w-full text-center my-10">
						© {{ new Date().getFullYear() }} | Stranerd LLC. All rights reserved.
					</p>
				</div>
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
