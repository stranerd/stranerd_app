<template>
	<footer>
		<div class="w-full bg-main_dark md:px-8 px-4">
			<div class="container mx-auto px-3 py-10">
				<div class="text-white">
					<div class="flex items-stretch flex-wrap lg:flex-nowrap gap-10 my-10">
						<div class="w-full md:w-1/2 flex items-stretch md:flex-auto flex-none gap-10">
							<div class="w-1/2 flex-auto">
								<div class="">
									<h2 class="footer-title font-bold">Company</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link to="" class="font-light">About us</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Honor Code</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Privacy Policy</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Terms of Service</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Terms and Conditions</router-link>
										</li>
									</ul>
								</div>
							</div>
							<div class="w-1/2 flex-auto">
								<div class="">
									<h2 class="footer-title font-bold">Community</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link to="" class="font-light">Ask a question</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Become a Tutor</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Blog</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">StranerdAfrica</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">StranerdOfficial</router-link>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="w-full md:w-1/2 flex items-stretch md:flex-auto flex-none gap-10">
							<div class="w-1/2 flex-auto">
								<div class="">
									<h2 class="footer-title font-bold">About</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link to="" class="font-light">Company</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Team</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Press</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Terms and Policies</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Careers</router-link>
										</li>
									</ul>
								</div>
							</div>
							<div class="w-1/2 flex-auto">
								<div class="">
									<h2 class="footer-title font-bold">Help</h2>
									<ul class="footer-links-contain text-sm">
										<li class="my-10">
											<router-link to="" class="font-light">FAQs</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Support</router-link>
										</li>
										<li class="my-10">
											<router-link to="" class="font-light">Blog</router-link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col sm:flex-row md:items-center justify-between">
						<div class="my-10">
							<h2 class="text-primary mb-8">Language</h2>
							<select name="language" id="language" class="bg-transparent pr-4">
								<option value="English">English</option>
							</select>
						</div>
						<div class="flex gap-5 items-center justify-center md:justify-end my-10">
							<a href="https://www.instagram.com/officialstranerd/" class="inline-block" aria-label="instagram link">
								<img src="@app/assets/images/social-media/instagram.png" alt="instagram">
							</a>
							<a href="https://twitter.com/stranerds" class="inline-block" aria-label="twiiter link">
								<img src="@app/assets/images/social-media/twitter.png" alt="twitter">
							</a>
							<a href="https://facebook.com/officialstranerd" class="inline-block" aria-label="facebook link">
								<img src="@app/assets/images/social-media/facebook.png" alt="facebook">
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
	name: '',
}
</script>

<style scoped>
</style>