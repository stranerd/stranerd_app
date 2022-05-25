<template>
	<div class="md:px-8 px-4 py-10 bg-white flex flex-col">
		<ion-text
			class="font-extrabold mx-auto lg:mt-48 lg:mb-24 mt-20 mb-12 text-center lg:text-5xl text-base text-secondaryText ">
			Made for students, loved by students
		</ion-text>
		<div class="container mx-auto">
			<div
				class="bg-primary p-5 lg:p-[3.25rem] lg:rounded-[3rem] rounded-3xl text-white max-w-[99rem] lg:h-[21rem] h-[18rem] flex flex-col justify-center">
				<img alt="" class="object-contain h-9" src="@app/assets/images/New/comment.svg">
				<ion-text class="text-center font-bold text-xs lg:text-2xl mt-6">
					{{ testimonies[tab].text }}
				</ion-text>

				<div class="flex items-center justify-center lg:mt-16 mt-10">
					<img v-if="testimonies[tab].img" :src="testimonies[tab].img" class="object-cover lg:h-10 lg:w-10 h-5 w-5 rounded-full">

					<ion-text class="text-center font-bold text-xs lg:text-xl ml-4">
						{{ testimonies[tab].author }}
					</ion-text>
				</div>
			</div>

			<div class="flex my-4 gap-2 justify-center">
				<IonIcon v-for="(t, i) in testimonies.length" :key="t" :class="tab === i ? 'text-white' : 'text-gray'"
					:icon="ellipseOutline"
					class="border border-gray rounded-full" @click="tab = i" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ellipseOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Testimonials',
	setup () {
		const tab = ref(0)
		const testimonies = [
			{
				text: 'I’d say, for someone like me who has difficulty concentrating on stuff, you made navigation very easy. User interface, beautiful and easy to navigate. Cool and simple colors that do not confuse or hurt the eyes. And yay, I got my answer faster than I expected. I loved it.',
				author: 'Eunice Apo',
				img: require('@app/assets/images/testimonials/eunice.jpeg')
			},
			{
				text: 'Aside the fact that their content on Instagram is super relatable and helpful, I posted a set of past questions I did not have the solutions to last semester and I got the solutions quickly.',
				author: 'Emmanuel Bello',
				img: require('@app/assets/images/testimonials/emmanuel.jpeg')
			},
			{
				text: 'It\'s very user friendly, and as someone mentioned earlier, the color palette of the website is easy on the eyes.',
				author: 'Laureen Abayomi',
				img: require('@app/assets/images/testimonials/laureen.jpeg')
			},
			{
				text: 'I\'ve been impressed mostly! I really like the "coin system”',
				author: 'Daniel Uwagwu',
				img: require('@app/assets/images/testimonials/daniel.jpeg')
			},
			{
				text: 'Stranerd has helped open my eyes to new approaches to learning and education. The best part is that I also get to meet other intellectuals and scholars.',
				author: 'Oreoluwa Oyinlola',
				// img: require('')
			}
		]
		return {
			testimonies, tab,
			ellipseOutline
		}
	}
})
</script>
