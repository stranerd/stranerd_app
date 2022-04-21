<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 py-8 px-4">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 md:gap-4 flex flex-col">
		<div v-if="user.id === id && flashCards.length > 0" class="px-4 md:px-0">
			<IonButton class="w-full md:w-auto btn-primary" @click="editMode = !editMode">
				{{ editMode ? 'Done' : 'Edit' }}
			</IonButton>
		</div>
		<FlashCardListCard v-for="flashCard in flashCards" :key="flashCard.hash" :edit="editMode"
			:flashCard="flashCard" />
		<EmptyState v-if="!loading && !error && flashCards.length === 0"
			info="This user hasn't created any flashCards yet or they are marked private" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { useUserFlashCardList } from '@app/composable/users/users/flashCards'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'

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
		const { id } = useAuth()
		const editMode = ref(false)
		const { flashCards, error, loading } = useUserFlashCardList(props.user.id)
		return { flashCards, error, loading, editMode, id }
	}
})
</script>
