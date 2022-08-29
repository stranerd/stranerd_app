<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg relative py-12 md:py-28 -z-20">
		<div class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<!-- <img src="@/assets/images/landing/testi.svg" alt="hero" class="w-auto z-20"> -->
			<div class="shadow  w-full max-w-[576px] md:h-[576px] h-[320px] rounded-3xl md:p-8 p-5 flex flex-col justify-between">
				<div class="flex flex-col gap-5 justify-start items-start">
					<img alt="" class="object-contain h-5 md:h-9" src="@app/assets/images/New/comment.svg">
					<p class="text-base md:text-[28px] leading-[1.3]">
						{{ testimonies[tab].text }}
					</p>
				</div>
			
				<div class="flex w-full justify-between">
					<div class="flex gap-3">
						<img src="/images/avatars/user_profile.svg" class=" md:w-16 md:h-16 rounded-full">
						<p class="flex flex-col">
							<span class="font-bold md:text-lg text-sm">{{ testimonies[tab].author }}</span>
							<span class="md:text-xl text-sm">{{ testimonies[tab].university }}</span>
						</p>
					</div>

					<span class="flex gap-3">
						<IonIcon :icon="chevronBackCircleOutline" class="rounded-full  text-2xl md:text-4xl" @click="prev"/>
						<IonIcon :icon="chevronForwardCircleOutline" class="rounded-full  text-2xl md:text-4xl" @click="next"/>
					</span>
				</div>
			</div>

			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Testimonials</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">What our users say</h2>
				<p class="lg:text-lg text-sm">
					Feedback from personels in the education community on the impact Stranerd has on their academic activities.
				</p>
				<router-link to="/auth/signin" class="btn landing_btn-outline">
					Join today
				</router-link>
			</div>
		</div>


	</div>
</template>

<script setup lang="ts">
import { chevronBackCircleOutline, chevronForwardCircleOutline } from 'ionicons/icons'
import {ref} from 'vue'
const tab = ref(0)
const next = ()=>{
	if(tab.value === testimonies.length-1){
		tab.value = 0
	}else tab.value++
}
const prev = ()=>{
	if(tab.value === 0){
		tab.value = testimonies.length-1
	}else tab.value--
}
const testimonies = [
	{
		text: 'I’d say, for someone like me who has difficulty concentrating on stuff, you made navigation very easy. User interface, beautiful and easy to navigate. Cool and simple colors that do not confuse or hurt the eyes. And yay, I got my answer faster than I expected. I loved it.',
		author: 'Eunice Apo',
		university: 'University of Benin',
	},
	{
		text: 'Aside the fact that their content on Instagram is super relatable and helpful, I posted a set of past questions I did not have the solutions to last semester and I got the solutions quickly.',
		author: 'Emmanuel Bello',
		university: 'University of Lagos',
	},
	{
		text: 'It\'s very user friendly, and as someone mentioned earlier, the color palette of the website is easy on the eyes.',
		author: 'Laureen Abayomi',
		university: 'University of Lagos',
	},
	{
		text: 'I\'ve been impressed mostly! I really like the "coin system”',
		author: 'Daniel Uwagwu',
		university: 'University of Lagos',
	},
	{
		text: 'Stranerd has helped open my eyes to new approaches to learning and education. The best part is that I also get to meet other intellectuals and scholars.',
		author: 'Oreoluwa Oyinlola',
		university: 'University of Ibadan',
	}
]
</script>

<style scoped>
.shadow{
	box-shadow: 0px 0px 32px rgba(22, 37, 101, 0.05);
}
</style>