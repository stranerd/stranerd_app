<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Notes
			</span>

			<router-link
				class="text-primary normalText flex items-center font-bold"
				to="/study/notes/explore">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl" />
			</router-link>
		</div>

		<template v-if="notes.length === 0">
			<div class="py-3">
				<EmptyState info="No Notes Available." />
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="notes" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<NoteListCard :colorClass=" index  === 0 ? 'bg-light_orange' : 'bg-light_gray'" :index="index + 1"
						:note="item" />
				</template>
			</Swiper>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronForwardOutline } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useNoteList } from '@app/composable/study/notes'
import NoteListCard from '@app/components/study/notes/StudyNoteListCard.vue'

export default defineComponent({
	name: 'StudyNotesList',
	components: { IonIcon, Swiper, NoteListCard },
	setup () {
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
			chevronForwardOutline
		}
	}
})
</script>

<style>

</style>
