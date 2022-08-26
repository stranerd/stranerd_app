<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg relative py-12 md:py-28 -z-20">
		<div class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">What is Stranerd Connect?</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">Peer to peer and class to class collaboration</h2>
				<p class="lg:text-lg text-sm">
					Stranerd Connect is a communication medium for messaging and file sharing. You can reach out to other users and classes to work together on assignments or projects. 
				</p>
				<button class="landing_btn-outline">
					Get Started
				</button>
			</div>
			<img src="@/assets/images/landing/stranerdConnect.svg" alt="hero" class="w-auto z-20">
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex flex-col bg-primaryBg relative py-12 md:py-28 -z-20 px-6">
		<h1 class="lg:text-6xl text-4xl font-bold text-bodyBg text-center mb-16">Features</h1>
		<div class=" mx-auto place-content-center self-center grid lg:grid-cols-2 grid-cols-2 md:gap-8 gap-4  h-full">
			<div class="card" v-for="n in features" :key="n.title">
				<IonIcon :icon="n.icon" :style="`color:${n.color}`" />
				<h2 class="font-bold">{{n.title}}</h2>
				<p>{{n.desc}}</p>
			</div>
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex bg-[#00c6b52c] relative py-12 md:py-28 -z-20">
		<div class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Our App</span>
				<h2 class="lg:text-5xl text-3xl font-bold  lg:leading-[62px]">Full access from anywhere at anytime</h2>
				<p class="lg:text-lg text-sm">
					Wherever you may be, you can carry Stranerd in your pocket. With your mobile device, you have unlimited access to any activity.
				</p>
				<div class="flex gap-4 items-center mt-6">
					<a href="https://play.google.com/store/apps/details?id=com.stranerd.app" target="_blank" rel="noopener noreferrer">
						<img src="@/assets/images/auth/playstore1.svg" alt="playstore button" class="h-12 md:h-16"  />
					</a>
					<img src="@/assets/images/auth/appstore1.svg" alt="appstore button" class="h-12  md:h-16 cursor-not-allowed" />
				</div>
			</div>
			<img src="@/assets/images/landing/phone.svg" alt="hero" class="w-auto z-20">
		</div>
	</div>
	<LandingFooter />
</template>

<script setup lang="ts">
import LandingFooter from '@app/components/landing/LandingFooter.vue'
import { person, people } from 'ionicons/icons'
const features = [
	{
		icon:person,
		title:'Student Connect',
		desc:'1 on 1 discussions with any student in any class.',
		color:'#00C6B5'
	},
	{
		icon:people,
		title:'Class Connect',
		desc:'Class to class discussions with other classes.',
		color:'#FF6496'
	},


] 
</script>

<style scoped>
@media (min-width: 1000px) {
    .lg\:grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 378px)) !important;
    }
}

.card{
	@apply flex flex-col items-center justify-center gap-2 md:p-6 p-4  text-center bg-bodyBg md:rounded-3xl rounded-2xl md:h-[276px] h-36 md:text-lg text-xs 
}
</style>