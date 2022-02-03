<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 py-8">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 gap-4 flex flex-col text-body">
		<FlashCardListCard v-for="flashCard in flashCards" :key="flashCard.hash" :flashCard="flashCard"
			:openMenu="(event) => openMenu(flashCard, event)" />
		<EmptyState v-if="!loading && !error && flashCards.length === 0"
			info="This user hasn't created any flashCards yet or they are marked private" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { useUserFlashCardList } from '@app/composable/study/flashCards'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'
import { FlashCardEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'ProfileFlashCards',
	components: { FlashCardListCard, IonProgressBar, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { flashCards, error, loading } = useUserFlashCardList(props.user.id)
		const openMenu = (entity: FlashCardEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		return { flashCards, error, loading, openMenu }
	}
})
</script>
