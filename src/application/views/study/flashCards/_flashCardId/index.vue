<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div v-if="flashCard" class="blueTop">
			<div class="flex items-center justify-between lg:w-8/12 w-full max-w-[60rem] mx-auto p-4">
				<div>
					<ion-text class="heading lg:text-xl font-bold text-white text-center">
						{{ flashCard.title }}
					</ion-text>
					<div class="flex items-center mt-2">
						<Avatar :id="flashCard.userId" :size="28" :src="flashCard.userBio.photo" color="#C7D6E3" />
						<ion-text class="text-white ml-2 text-base"> by <b>{{ flashCard.userBio.fullName }}</b>
						</ion-text>
					</div>
				</div>

				<div class="flex items-center text-white font-bold">
					<div class="md:flex items-center mr-8 hidden ">
						<ion-icon
							:icon="!cardMode ? copy: list"
							class="text-white text-xl cursor-pointer mr-2"
							@click="cardMode = !cardMode"
						/>
						<ion-text>
							{{!cardMode ? 'Card mode': 'List mode' }}
						</ion-text>
					</div>  
					<ion-icon
						:icon="ellipsisVertical"
						class="text-white text-xl cursor-pointer"
						@click="openMenu"
					/>
				</div>
			
			</div>
		</div>

		<FlashCardScreen :flashCard="flashCard" v-if="cardMode"/>
		<FlashCardListView :flashCard="flashCard" v-else/>

		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import {  ellipsisVertical, copy, list} from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { useFlashCard } from '@app/composable/study/flashCards'
import { useRoute } from 'vue-router'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import FlashCardScreen from '@root/application/components/study/flashCards/FlashCardScreen.vue'
import FlashCardListView from '@root/application/components/study/flashCards/FlashCardListView.vue'

export default defineComponent({
	name: 'View Flashcard',
	displayName: 'Flashcard Set',
	components: {
		Justified,
		Avatar,
		FlashCardScreen,
		FlashCardListView
	},
	setup () {
		const cardMode = ref(true)
		const { flashCardId } = useRoute().params
		const { flashCard, listener, error, loading } = useFlashCard(flashCardId as string)
		const openMenu = (event: Event) => openStudyEntityMenu(flashCard.value, {}, event)
		



		onMounted(listener.startListener)
		onUnmounted(listener.closeListener)

		return {
			 openMenu,copy, list,cardMode,
			flashCard, loading, ellipsisVertical,
			
		}
	}
})
</script>


