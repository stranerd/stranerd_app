<template>
	<footer>
		<div class="w-full bg-main_dark md:px-8 px-4">
			<div class="container mx-auto px-3 py-10 lg:py-24">
				<div class="text-white">
					<div class="flex items-stretch flex-wrap lg:flex-nowrap gap-10 lg:gap-36 xl:gap-48 my-10">
						<div
							class="w-full md:w-1/2 flex items-stretch md:flex-auto flex-none gap-10 lg:gap-36 xl:gap-48">
							<div class="w-1/2 flex-auto">
								<div class="">
									<h2 class="footer-title font-bold">Company</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link class="font-light" to="">About us</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Honor Code</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Privacy Policy</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Terms of Service</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Terms and Conditions</router-link>
										</li>
									</ul>
								</div>
							</div>
							<div class="w-1/2 flex-auto">
								<div class="">
									<h2 class="footer-title font-bold">Community</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link class="font-light" to="">Ask a question</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Become a Tutor</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Blog</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">StranerdAfrica</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">StranerdOfficial</router-link>
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
											<router-link class="font-light" to="">Terms and Policies</router-link>
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
											<router-link class="font-light" to="">FAQs</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Support</router-link>
										</li>
										<li class="my-10">
											<router-link class="font-light" to="">Blog</router-link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col sm:flex-row md:items-center justify-between">
						<div class="my-10">
							<h2 class="text-primary mb-8">Language</h2>
							<select id="language" class="bg-transparent pr-4" name="language">
								<option value="English">English</option>
							</select>
						</div>
						<div class="flex gap-5 items-center justify-center md:justify-end my-10">
							<a aria-label="instagram link" class="inline-block"
								href="https://www.instagram.com/officialstranerd/">
								<img alt="instagram" src="@app/assets/images/social-media/instagram.png">
							</a>
							<a aria-label="twiiter link" class="inline-block" href="https://twitter.com/stranerds">
								<img alt="twitter" src="@app/assets/images/social-media/twitter.png">
							</a>
							<a aria-label="facebook link" class="inline-block"
								href="https://facebook.com/officialstranerd">
								<img alt="facebook" src="@app/assets/images/social-media/facebook.png">
							</a>
						</div>
					</div>
					<p class="w-full text-center my-10">
						© 2021 | Stranerd LLC. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script lang="ts">
export default {
	name: ''
}
</script>

<style scoped>
</style>
