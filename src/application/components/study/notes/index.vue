<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Notes
			</span> 

			<router-link v-if="true && isLoggedIn"
				class="text-primary normalText flex items-center font-bold "
				to="/study/note/explore">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</router-link>
		</div>


		<template v-if="notes.length === 0">
			<div class="py-3">
				<empty-state
					info="You Have no Notes Available."
				></empty-state>
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="notes" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<notesCard :colorClass=" index  === 0 ? 'bg-light_orange' : 'bg-light_gray'" :index="index + 1" :note="item"
					/>

				</template>  
			</Swiper>
		</template>

	</div>
</template>



<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useNoteList } from '@app/composable/study/notes'
import { useAuth } from '@app/composable/auth/auth'
import notesCard from './notesCard.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper,  notesCard },
	setup () {
		const { id, isLoggedIn } = useAuth()
		const { notes: allNotes, listener, loading, error } = useNoteList()
		const notes = computed({
			get: () => allNotes.value.slice(0, 6),
			set: () => {
			}
		})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)


		return {
			notes,
			chevronForwardOutline,
			 isLoggedIn, 
		}
	}
})
</script>

<style>

</style>
