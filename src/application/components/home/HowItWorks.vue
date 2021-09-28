<template>
	<div class="col-span-12 lg:col-start-3 lg:col-end-11 grid grid-cols-2 mt-28">
		<div class="grid grid-cols-2 col-span-2 mb-24">
			<div class="col-span-2 lg:col-span-1 flex flex-col justify-center items-center">
				<img src="@app/assets/images/homepage/ask-question.svg" class="lg:w-5/6 md:w-3/5 w-10/12">
			</div>
			<div class="col-span-2 px-7 lg:col-span-1 flex flex-col justify-center mt-11 lg:items-start md:items-center items-center lg:mt-0">
				<h1 class="font-bold text-heading md:text-2xl text-lg pb-2">
					Ask A Question
				</h1>
				<ul class="py-2 list-none text-gray-700 md:text-lg text-sm">
					<li>✔️ Ask questions on various subjects to clear your doubts</li>
					<li>✔️ Go through all available answers from smart students</li>
					<li>✔️ Choose your best answers and ask another question</li>
				</ul>
				<div class="mt-8">
					<NuxtLink class=" md:px-6 md:py-4 px-4 py-3 bg-primary text-white font-bold md:text-base text-sm rounded-md" to="/questions/create">
						Ask A Question
					</NuxtLink>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-2 col-span-2 mb-24">
			<div class="col-span-2 lg:col-span-1 flex flex-col justify-center lg:hidden items-center">
				<img src="@app/assets/images/homepage/answer-question.svg" class="lg:w-5/6 md:w-3/5 w-10/12">
			</div>
			<div class="col-span-2 px-7 lg:col-span-1 flex flex-col justify-center mt-11 lg:items-start md:items-center items-center lg:mt-0">
				<h1 class="font-bold text-heading md:text-2xl text-lg pb-2">
					Answer A Question
				</h1>
				<ul class="py-2 list-none text-gray-700 md:text-lg text-sm">
					<li>✔️ Answer questions in subjects you are very good at</li>
					<li>✔️ Get rewarded if your answer is chosen as one of the best answers</li>
				</ul>
				<div class="mt-8">
					<NuxtLink class=" md:px-6 md:py-4 px-4 py-3 bg-primary text-white font-bold md:text-base text-sm rounded-md" to="/questions/create">
						Answer A Question
					</NuxtLink>
				</div>
			</div>
			<div class="col-span-2 lg:col-span-1 flex-col justify-center lg:flex hidden items-center">
				<img src="@app/assets/images/homepage/answer-question.svg" class="w-5/6">
			</div>
		</div>
		<div class="grid grid-cols-2 col-span-2 mb-24">
			<div class="col-span-2 lg:col-span-1 flex flex-col justify-center items-center">
				<img src="@app/assets/images/homepage/meet-top-nerd.svg" class="lg:w-5/6 md:w-3/5 w-10/12">
			</div>
			<div class="col-span-2 px-7 lg:col-span-1 flex flex-col justify-center mt-11 lg:items-start md:items-center items-center lg:mt-0">
				<h1 class="font-bold text-heading md:text-2xl text-lg pb-2">
					Meet Top Nerds
				</h1>
				<ul class="py-2 list-none text-gray-700  md:text-lg text-sm">
					<li>✔️ Get in-depth answers to homework questions</li>
					<li>✔️ Request sessions to get help for your homework</li>
					<li>✔️ Collaborate to solve problems and earn rewards</li>
				</ul>
				<div class="mt-8">
					<NuxtLink class=" md:px-6 md:py-4 px-4 py-3 bg-primary text-white font-bold md:text-base text-sm rounded-md" to="/questions/create">
						Meet Top Nerds
					</NuxtLink>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-2 col-span-2 mb-24">
			<div class="col-span-2 lg:col-span-1 flex flex-col justify-center items-center lg:hidden">
				<img v-if="isNigerian" class="lg:w-5/6 md:w-3/5 w-10/12" src="@app/assets/images/homepage/buy-coins-ng.svg">
				<img v-else class="lg:w-5/6 md:w-3/5 w-10/12" src="@app/assets/images/homepage/buy-coins.svg">
			</div>
			<div class="col-span-2 px-7 lg:col-span-1 flex flex-col justify-center mt-11 lg:items-start md:items-center items-center lg:mt-0">
				<h1 class="font-bold text-heading md:text-2xl text-lg pb-2">
					Coin System
				</h1>
				<ul class="py-2 list-none text-gray-700 md:text-lg text-sm">
					<li>✔️ Buy or gain affordable coins to interact on the site</li>
					<li>✔️ Bronze Coins are used to Ask Questions while</li>
					<li>✔️ Gold Coins are used for Booking Sessions with Nerds</li>
				</ul>
				<div class="mt-8">
					<NuxtLink class=" md:px-6 md:py-4 px-4 py-3 bg-primary text-white font-bold md:text-base rounded-md" to="/questions/create">
						Buy Coins
					</NuxtLink>
				</div>
			</div>
			<div class="col-span-2 lg:col-span-1 flex-col justify-center items-center lg:flex hidden ">
				<img v-if="isNigerian" class="w-5/6" src="@app/assets/images/homepage/buy-coins-ng.svg">
				<img v-else class="w-5/6" src="@app/assets/images/homepage/buy-coins.svg">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useAuth } from '@app/hooks/auth/auth'
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'HowItWorks',
	setup () {
		const isNigerian = computed({
			get: () => useAuth().location.value?.countryCode === 'NG',
			set: () => {
			}
		})
		return { isNigerian }
	}
})
</script>
