<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				FlashCards
			</span>

			<router-link v-if="true && isLoggedIn"
				class="text-primary normalText flex items-center font-bold "
				to="#">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</router-link>
		</div> 

		<Swiper v-if="true"
			:freeMode="true"
			:items="[1,2,3]"
			:slides="1.1"
			class="mt-2 overflow-x-auto flex"
			slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6"
		>
			<template v-slot:default="{ item, index }">
				<FlashcardsCard :colorClass=" index  === 0 ? 'bg-butter_yellow' : 'bg-light_gray'" :item="item" :index="index"
				/>

			</template>
		
		</Swiper>
	

	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useAuth } from '@app/composable/auth/auth'
import FlashcardsCard from './FlashcardsCard.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper,  FlashcardsCard },
	setup () {
		const { id, isLoggedIn } = useAuth()


		return {
			chevronForwardOutline, chevronBackOutline, ellipse,
			 isLoggedIn, 
		}
	}
})
</script>

<style>

</style>
