<template>
	<nav class="fixed top-0 w-full grid grid-cols-12 lg:bg-white bg-primary h-auto z-20" style="z-index: 10 !important;" role="navigation">
		<div class="flex flex-row items-center col-span-12 md:py-2 md:px-10 px-4 py-1">
			<div class="py-2 sm:py-1 flex-grow">
				<NuxtLink class="" to="/">
					<Logo :secondary="true" class="hidden lg:inline-block" />
					<Logo class="lg:hidden inline-block" />
				</NuxtLink>
			</div>
			<div class="gap-9 flex-row-reverse hidden lg:flex items-center">
				<NuxtLink class="px-7 py-2 bg-primary rounded-md text-white border-2 border-primary text-md font-medium" to="/auth/signup">
					Sign Up
				</NuxtLink>
				<NuxtLink class="px-7 py-2 bg-white rounded-md text-text_link border-[2px] border-text_link text-md font-medium" to="/auth/signin">
					Sign In
				</NuxtLink>
				<NuxtLink class="text-text_link font-medium hover:text-primary_dark" to="/#contact-us">
					Contact
				</NuxtLink>
				<NuxtLink class="text-text_link font-medium hover:text-primary_dark" to="/#how-it-works">
					How it works
				</NuxtLink>
				<NuxtLink class="text-text_link font-medium hover:text-primary_dark" to="/">
					Home
				</NuxtLink>
			</div>
			<div class="lg:hidden">
				<span class="cursor-pointer text-white" @click="toggleMenu">
					<i
						:class="show ? 'fa-times' : 'fa-bars'"
						class="fas"
						style="font-size: 25px;"
					/>
				</span>
			</div>
		</div>
		<div v-if="show" class="flex flex-col items-center  bg-primary w-full pt-8 mt-2 h-[95%] fixed top-[5%]">
			<div class="py-1 px-3 flex flex-row items-center justify-center">
				<a class="py-3 px-6 rounded-md text-base font-medium text-white hover:bg-button_text" @click="navigate('/')">
					Home
				</a>
			</div>
			<div class="py-1 px-3 flex flex-row items-center justify-center">
				<a class="py-3 px-6 rounded-md text-base font-medium text-white hover:bg-button_text" @click="navigate('/#how-it-works')">
					How it works
				</a>
			</div>
			<div class="py-1 px-3 flex flex-row items-center justify-center">
				<a class="py-3 px-6 rounded-md text-base font-medium text-white hover:bg-button_text" @click="navigate('/#contact-us')">
					Contact
				</a>
			</div>

			<div class="py-1 px-3 flex flex-row items-center justify-center w-full">
				<a class="py-3 border-2 border-white rounded-md w-full text-center text-base font-medium text-white hover:bg-button_text" @click="navigate('/auth/signin')">
					Log In
				</a>
			</div>
			<div class="py-1 px-3 flex flex-row items-center justify-center w-full">
				<a class="py-3 border-2 border-white rounded-md  w-full text-center  bg-white text-base font-medium text-primary hover:bg-button_text" @click="navigate('/auth/signin')">
					Sign Up
				</a>
			</div>
			<div class="fixed bottom-9 flex flex-row items-center justify-center gap-6">
				<a href="https://instagram.com/officialstranerd" target="_blank">
					<img alt="" height="30" src="@app/assets/images/homepage/instagram_white.svg">
				</a>
				<a href="https://twitter.com/stranerds" target="_blank">
					<img alt="" height="30" src="@app/assets/images/homepage/twitter_white.svg">
				</a>
				<a href="https://facebook.com/officialstranerd" target="_blank">
					<img alt="" height="30" src="@app/assets/images/homepage/facebook_white.svg">
				</a>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { disableScroll, enableScroll } from '@utils/html'

export default defineComponent({
	name: 'HomeTopNavigation',
	setup () {
		const router = useRouter()
		const show = ref(false)
		const toggleMenu = () => {
			show.value ? enableScroll() : disableScroll()
			show.value = !show.value
		}
		const navigate = (link: string) => {
			toggleMenu()
			router.push(link)
		}
		return { show, toggleMenu, navigate }
	}
})
</script>
