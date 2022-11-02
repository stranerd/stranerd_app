
<template>
	<div class="w-full h-auto flex bg-primaryText py-4 md:py-8">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-between">
			<div
				class="shadow  w-full max-w-[576px] md:h-[576px] h-[320px] rounded-3xl md:p-8 p-5 flex flex-col justify-between">
				<div class="flex flex-col gap-5 justify-start items-start">
					<img alt="" class="object-contain h-5 md:h-9" src="@app/assets/images/New/comment.svg">
					<p class="text-sm md:text-2xl leading-[1.3]">
						{{ testimonies[tab].text }}
					</p>
				</div>

				<div class="flex w-full justify-between">
					<div class="flex gap-3">
						<img class=" md:w-16 md:h-16 rounded-full" src="/images/avatars/user_profile.svg">
						<p class="flex flex-col">
							<span class="font-bold md:text-lg text-sm">{{ testimonies[tab].author }}</span>
							<span class="md:text-xl text-sm">{{ testimonies[tab].university }}</span>
						</p>
					</div>

					<span class="flex gap-3">
						<IonIcon :icon="chevronBackCircleOutline" class="rounded-full  text-2xl md:text-4xl" @click="prev" />
						<IonIcon :icon="chevronForwardCircleOutline" class="rounded-full  text-2xl md:text-4xl" @click="next" />
					</span>
				</div>
			</div>

			<div class="flex flex-col md:gap-5 gap-3 lg:max-w-[47%] text-bodyText">
				<h2 class="md:text-4xl text-2xl font-bold">What students say</h2>
				<p class="md:text-lg text-sm">
					Feedback from students about the impact Stranerd has on their academic activities and educational journey.
				</p>
				<router-link class="btn bg-primaryBg text-primaryText " to="/auth/signin">
					Join today
				</router-link>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { chevronBackCircleOutline, chevronForwardCircleOutline } from 'ionicons/icons'
import { ref } from 'vue'

const tab = ref(0)
const next = () => {
	if (tab.value === testimonies.length - 1) {
		tab.value = 0
	} else tab.value++
}
const prev = () => {
	if (tab.value === 0) {
		tab.value = testimonies.length - 1
	} else tab.value--
}
const testimonies = [
	{
		text: 'I’d say, for someone like me who has difficulty concentrating on stuff, you made navigation very easy. User interface, beautiful and easy to navigate. Cool and simple colors that do not confuse or hurt the eyes. And yay, I got my answer faster than I expected. I loved it.',
		author: 'Eunice Apo',
		university: 'University of Benin'
	},
	{
		text: 'Aside the fact that their content on Instagram is super relatable and helpful, I posted a set of past questions I did not have the solutions to last semester and I got the solutions quickly.',
		author: 'Emmanuel Bello',
		university: 'University of Lagos'
	},
	{
		text: 'It\'s very user friendly, and as someone mentioned earlier, the color palette of the website is easy on the eyes.',
		author: 'Laureen Abayomi',
		university: 'University of Lagos'
	},
	{
		text: 'I\'ve been impressed mostly! I really like the "coin system”',
		author: 'Daniel Uwagwu',
		university: 'University of Lagos'
	},
	{
		text: 'Stranerd has helped open my eyes to new approaches to learning and education. The best part is that I also get to meet other intellectuals and scholars.',
		author: 'Oreoluwa Oyinlola',
		university: 'University of Ibadan'
	}
]
</script>

<style scoped>
.shadow {
	box-shadow: 0px 0px 12px var(--clr-itemBg);
}

a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>
