<template>
	<div class="w-full h-auto flex flex-col bg-primaryBg py-4 md:py-8  overflow-x-hidden">
		<div
			class="container mx-auto text-primaryText p-6 flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl text-primaryText">
				<h2 class="lg:text-4xl text-2xl font-bold  ">Official Partners</h2>
				<p class="lg:text-lg text-sm">
					Strategic association and collaborations with organizations that provide us with important support.
				</p>
			</div>
			<div class="flex md:hidden flex-row overflow-auto w-auto lg:w-1/2 gap-6">
				<Vue3Marquee>
					<div v-for="partner in partners" :key="partner.id"
						class="rounded-lg h-[148px] w-[268px] flex-none flex items-center justify-center bg-primaryText mx-3">
						<img :src="partner.img" alt="">
					</div>
				</Vue3Marquee>
			</div>

			<div class="hidden md:flex flex-row overflow-auto flex-wrap w-auto h-[400px] lg:w-1/2 gap-6">
				<!-- <dynamic-marquee> -->
				<div v-for="partner in partners" :key="partner.id"
					class="rounded-lg h-[148px] w-[268px] flex-none flex items-center justify-center bg-primaryText">
					<img :src="partner.img" alt="" />
				</div>
				<!-- </dynamic-marquee> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

const partners = [
	{ img: new URL('@/assets/images/newLanding/partner/partner_unilag.svg', import.meta.url).href, id: 1 },
	{ img: new URL('@/assets/images/newLanding/partner/partner_village_capital.svg', import.meta.url).href, id: 2 },
	{ img: new URL('@/assets/images/newLanding/partner/partner_m_international.svg', import.meta.url).href, id: 3 },
	{ img: new URL('@/assets/images/newLanding/partner/partner_tutor_stack.svg', import.meta.url).href, id: 4 },
	{ img: new URL('@/assets/images/newLanding/partner/partner_microsoft.svg', import.meta.url).href, id: 5 },
	{ img: new URL('@/assets/images/newLanding/partner/partner_alx.svg', import.meta.url).href, id: 6 }
]
</script>
