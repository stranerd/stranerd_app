<template>
	<Justified>
		<div v-if="flashCard" class="blueTop py-2">
			<div class="flex items-center md:justify-between justify-center lg:w-8/12 w-full max-w-[60rem] mx-auto p-4">
				<div>
					<ion-text class="heading lg:text-xl font-bold text-white text-center">
						{{ flashCard.title }}
					</ion-text>
					<div class="flex items-center md:justify-start justify-center  mt-2">
						<Avatar :id="flashCard.userId" :size="28" :src="flashCard.userBio.photo" color="#C7D6E3" />
						<ion-text class="text-white ml-2 text-base"> by <b>{{ flashCard.userBio.fullName }}</b>
						</ion-text>
					</div>
				</div>

				<div class="items-center text-white font-bold hidden md:flex">
					<div class="flex items-center lg:mr-8 mr-2" @click="cardMode = !cardMode">
						<ion-icon
							:icon="!cardMode ? copy: list"
							class="text-white text-xl cursor-pointer md:mr-2 md:mt-0"
						/>
						<ion-text class="hidden md:flex">
							{{ !cardMode ? 'Card mode' : 'List mode' }}
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

		<div class="w-full bg-white flex md:hidden items-center justify-between text-gray p-4 -mt-8 rounded-b-xl">
			<div class="flex items-center lg:mr-8 mr-2" @click="cardMode = !cardMode">
				<ion-icon
					:icon="!cardMode ? copy: list"
					class="text-gray text-xl cursor-pointer mr-3"
				/>
				<ion-text class=" font-medium ">
					{{ !cardMode ? 'Card mode' : 'List mode' }}
				</ion-text>
			</div>
			<div class="flex items-center lg:mr-8 mr-2">
				<ion-text class=" font-medium ">
					Options
				</ion-text>
				<ion-icon
					:icon="ellipsisVertical"
					class="text-gray text-xl cursor-pointer ml-3"
					@click="openMenu"
				/>
			</div>
		</div>

		<template v-if="flashCard">
			<FlashCardScreen v-if="cardMode" :flashCard="flashCard" />
			<FlashCardListView v-else :flashCard="flashCard" />
		</template>

		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { copy, ellipsisVertical, list } from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { useFlashCard } from '@app/composable/study/flashCards'
import { useRoute } from 'vue-router'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import FlashCardScreen from '@root/application/components/study/flashCards/FlashCardScreen.vue'
import FlashCardListView from '@root/application/components/study/flashCards/FlashCardListView.vue'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardId',
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
		const { flashCard, error, loading } = useFlashCard(flashCardId as string)
		const openMenu = (event: Event) => openStudyEntityMenu(flashCard.value, {}, event)
		return {
			openMenu, copy, list, cardMode,
			flashCard, loading, ellipsisVertical
		}
	}
})
</script>
