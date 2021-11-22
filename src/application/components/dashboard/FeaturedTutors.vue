<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Featured tutors
			</span>
			<slider-controller class="hidden lg:flex" />
			<div class="text-primary normalText flex items-center font-bold ">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</div>
		</div>

		<Swiper :freeMode="true" :items="tutors" :slides="4" class="overflow-x-auto lg:hidden mt-2"
			slideClass="flex md:!min-w-[200px] !w-[190px] mr-3"
		>
			<template v-slot:default="{ item: tutor }">
				<TutorCard :showButton="false" :tutor="tutor" class="flex bg-light_gray" />
			</template>
		</Swiper>
		<Swiper :items="tutors" :slides="4" class="hidden lg-flex mt-2 items-center" slideClass="!w-1/3 !pr-3">
			<template v-slot:default="{ item: tutor }">
				<TutorCard :showButton="false" :tutor="tutor" class="flex bg-light_gray" />
			</template>
		</Swiper>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import SliderController from '@app/components/core/nav/sliderController.vue'
import TutorCard from '@app/components/users/tutors/TutorCard.vue'
import Swiper from '@app/components/core/Swiper.vue'
import { useTutorsList } from '@app/composable/users/roles/tutors'

export default defineComponent({
	name: 'FeaturedTutors',
	components: { IonIcon, SliderController, TutorCard, Swiper },
	setup () {
		const { tutors } = useTutorsList()
		return {
			chevronForwardOutline, chevronBackOutline, ellipse, tutors
		}
	}
})
</script>
