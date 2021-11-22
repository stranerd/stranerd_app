<template>
	<div>
		<div class="w-full flex justify-between mt-10">
			<span class="heading font-bold text-main_dark">
				Upcoming events
			</span>

			<slider-controller class="hidden lg:flex" />

			<div class="text-primary normalText flex items-center font-bold ">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</div>
		</div>

		<Swiper :freeMode="true" :items="[1,2,3,4,5]" :slides="3" class="mt-3 lg:hidden overflow-x-auto"
			slideClass="flex md:!w-[17rem] !w-[12.5rem] mr-3"
		>
			<template v-slot:default="{ index }">
				<ScheduleCard :colorClass="0 === index ? 'bg-light_green' : 'bg-light_gray'" />
			</template>
		</Swiper>

		<Swiper :items="[1,2,3,4,5]" :slides="3" class="mt-2 hidden lg:flex" slideClass="!w-1/3 !pr-3">
			<template v-slot:default="{ index }">
				<ScheduleCard :colorClass="0 === index ? 'bg-light_green' : 'bg-light_gray'" />
			</template>
		</Swiper>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import SliderController from '@app/components/core/nav/sliderController.vue'
import ScheduleCard from '@app/components/users/schedule/ScheduleCard.vue'

export default defineComponent({
	name: 'Home',
	components: { IonIcon, SliderController, Swiper, ScheduleCard },
	setup () {
		return { chevronForwardOutline, chevronBackOutline, ellipse }
	}
})
</script>
