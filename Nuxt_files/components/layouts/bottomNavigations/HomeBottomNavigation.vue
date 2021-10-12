<template>
	<div class="px-2 col-span-12 bg-[#191C29] grid grid-cols-12 md:py-20 py-14">
		<div class="col-span-12 lg:col-start-3 lg:col-end-11 grid grid-col-12 ">
			<div class="col-span-12 grid grid-cols-12">
				<div class="md:col-span-6 lg:col-span-3  col-span-12 py-4 flex flex-col lg:items-start items-center">
					<h1 class="text-white text-lg font-medium  mb-2">
						Company
					</h1>
					<NuxtLink class="text-white md:text-base text-sm" to="/about-us">
						About Us
					</NuxtLink>
					<NuxtLink class="text-white md:text-base text-sm" to="/legal/honor-code">
						Honor Code
					</NuxtLink>
				</div>
				<div class="md:col-span-6 lg:col-span-3 col-span-12  py-4 flex flex-col lg:items-start items-center">
					<h1 class="text-white text-lg font-medium  mb-2">
						<i class="fas fa-circle" style="font-size: 17px;" />
						<i class="fas fa-circle" style="font-size: 17px;" />
						<i class="fas fa-circle" style="font-size: 17px;" />
					</h1>
					<NuxtLink class="text-white md:text-base text-sm" to="/legal/privacy-policy">
						Privacy Policy
					</NuxtLink>
					<NuxtLink class="text-white md:text-base text-sm" to="/legal/term-of-service">
						Terms Of Service
					</NuxtLink>
					<NuxtLink class="text-white md:text-base text-sm" to="/legal/terms-and-conditions">
						Terms & Conditions
					</NuxtLink>
				</div>
				<div class="md:col-span-6 lg:col-span-3 col-span-12  py-4 flex flex-col lg:items-start items-center">
					<h1 class="text-white text-lg font-medium  mb-2">
						Community
					</h1>
					<NuxtLink class="text-white md:text-base text-sm" to="/questions/create">
						Ask a Question
					</NuxtLink>
					<NuxtLink class="text-white md:text-base text-sm" to="/">
						Blog
					</NuxtLink>
				</div>
				<div class="md:col-span-6 lg:col-span-3 col-span-12  py-4 flex flex-col  lg:items-start items-center">
					<h1 class="text-white text-lg font-medium  mb-2">
						Help
					</h1>
					<NuxtLink class="text-white md:text-base text-sm" to="/legal/FAQs">
						FAQ
					</NuxtLink>
				</div>

				<div class="col-span-12 border-t-2 border-white mt-7 py-6 flex flex-col justify-center items-center">
					<div class="flex flex-row justify-center items-center gap-9">
						<a class="text-white" href="https://instagram.com/officialstranerd" target="_blank">
							<img alt="" height="30" src="@app/assets/images/homepage/instagram_white.svg">
						</a>
						<a class="text-white" href="https://twitter.com/stranerds" target="_blank">
							<img alt="" height="30" src="@app/assets/images/homepage/twitter_white.svg">
						</a>
						<a class="text-white" href="https://facebook.com/officialstranerd" target="_blank">
							<img alt="" height="30" src="@app/assets/images/homepage/facebook_white.svg">
						</a>
					</div>
					<div class="flex flex-row justify-center items-center mt-4 md:text-base text-sm">
						<span class="text-white">
							&copy;
							<DynamicText>{{ new Date().getFullYear() }}</DynamicText>
							| Stranerd LLC. All rights reserved.
						</span>
					</div>
				</div>
			</div>
		</div>
		<!--
		<div class="col-lg-10 offset-lg-1 px-0">
			<div class="block-group">
				<div class="block">
					<h5 class="sessionHead">
						Company
					</h5>
					<NuxtLink class="linkText" to="/about-us">
						About Us
					</NuxtLink>
					<NuxtLink class="linkText" to="/legal/honor-code">
						Honor Code
					</NuxtLink>
				</div>
				<div class="block">
					<h5 class="sessionHead flex gap-0-25" style="font-size: 15px;">
						<i class="fas fa-circle" />
						<i class="fas fa-circle" />
						<i class="fas fa-circle" />
					</h5>

					<NuxtLink class="linkText" to="/legal/privacy-policy">
						Privacy Policy
					</NuxtLink>
					<NuxtLink class="linkText" to="/legal/term-of-service">
						Terms Of Service
					</NuxtLink>
					<NuxtLink class="linkText" to="/legal/terms-and-conditions">
						Terms & Conditions
					</NuxtLink>
				</div>
				<div class="block">
					<h5 class="sessionHead">
						Community
					</h5>
					<NuxtLink class="linkText" to="/questions/create">
						Ask a Question
					</NuxtLink>
					<NuxtLink class="linkText d-none" to="/">
						Blog
					</NuxtLink>
				</div>
				<div class="block">
					<h5 class="sessionHead">
						Help
					</h5>
					<NuxtLink class="linkText" to="/legal/FAQs">
						FAQ
					</NuxtLink>
				</div>
			</div>
			<div
				class="w-100 mt-3 flex flex-col gap-1 pt-3 class border-top border-white items-center justify-center"
			>
				<div class="flex gap-2">
					<a class="linkText" href="https://instagram.com/officialstranerd" target="_blank">
						<img alt="" height="30" src="@app/assets/images/homepage/instagram_white.svg">
					</a>
					<a class="linkText" href="https://twitter.com/stranerds" target="_blank">
						<img alt="" height="30" src="@app/assets/images/homepage/twitter_white.svg">
					</a>
					<a class="linkText" href="https://facebook.com/officialstranerd" target="_blank">
						<img alt="" height="30" src="@app/assets/images/homepage/facebook_white.svg">
					</a>
				</div>
				<div class="linkText" style="font-size: 14px;">
					&copy;
					<DynamicText>{{ new Date().getFullYear() }}</DynamicText>
					| Stranerd LLC. All rights reserved.
				</div>
			</div>
		</div>
		-->
	</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'HomeBottomNavigation'
})
</script>

<style lang="scss" scoped>
	.sessionHead {
		font-weight: $font-weight-bold;
	}

	.linkText {
		font-size: 13px;
		text-align: left;
	}

	.content_wrapper {
		background: $color-footer-dark;
		color: $color-line;
	}

	.block-group {
		display: grid;
		grid-gap: 2rem;
		grid-template-columns: repeat(2, 1fr);
		@media (min-width: $md) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.block {
		display: flex;
		flex-direction: column;
		@media (min-width: $md) {
			justify-content: center;
		}
	}
</style>
