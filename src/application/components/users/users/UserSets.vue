<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 pt-12 px-5">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 flex flex-col px-3 text-body">
		<div v-for="flashCard in flashCards" :key="flashCard.hash" class="w-full md:px-2 md:py-3 mb-4 md:mb-0">
			<FlashCardListCard :flashCard="flashCard" :openMenu="(event) => openMenu(flashCard, event)" />
		</div>
		<EmptyState v-if="!loading && !error && flashCards.length === 0"
			info="This user hasn't created any flashCards yet or they are marked private" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { useUserFlashCardList } from '@app/composable/users/user/flashCards'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'
import { FlashCardEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'ProfileFolders',
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
