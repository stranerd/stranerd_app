<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Notes
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
			:slides="3"
			class="flex flex-row w-full items-center mt-2 mb-8"
			slideClass="!w-3/6 !max-w-[17rem] !min-w-[15rem] !pr-3"
		>
			<template v-slot:default="{ item, index }">
				<notesCard :colorClass=" index  === 0 ? 'bg-butter_yellow' : 'bg-light_gray'" :item="item"
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
import notesCard from './notesCard.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper,  notesCard },
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
