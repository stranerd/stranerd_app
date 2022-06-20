<template>
	<DefaultLayout>
		<div v-if="user">
			<UserPageCard :user="user" />
			<div class="flex flex-col gap-4">
				<div class="flex items-center justify-between">
					<span v-for="path in [
							{ name: 'questions', icon: helpCircleOutline },
							{ name: 'answers', icon: checkmarkCircleOutline },
							{ name: 'flashCards', icon: flashOutline },
							{ name: 'documents', icon: readerOutline }
						]" :key="path.name"
						:class="{ 'border-b-2 !text-primaryBg !border-primaryBg': path.name === tab}"
						class="border-b border-itemBg text-secondaryText p-4 capitalize w-full flex justify-center items-center gap-2"
						@click="tab = path.name">
						<IonIcon :icon="path.icon" />
						<span>{{ formatNumber(user.meta[path.name]) }}</span>
					</span>
				</div>
				<UserQuestions v-if="tab === 'questions'" :user="user" />
				<UserAnswers v-if="tab === 'answers'" :user="user" />
				<UserFlashCards v-if="tab === 'flashCards'" :user="user" />
				<UserDocuments v-if="tab === 'documents'" :user="user" />
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useRoute } from 'vue-router'
import { useUser } from '@app/composable/users/users'
import { checkmarkCircleOutline, flashOutline, helpCircleOutline, readerOutline } from 'ionicons/icons'
import { formatNumber } from '@utils/commons'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import UserAnswers from '@app/components/users/users/UserAnswers.vue'
import UserFlashCards from '@app/components/users/users/UserFlashCards.vue'
import UserDocuments from '@app/components/users/users/UserDocuments.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import UserPageCard from '@app/components/users/users/UserPageCard.vue'

export default defineComponent({
	name: 'UsersUserId',
	components: { UserQuestions, UserAnswers, UserFlashCards, UserDocuments, UserPageCard },
	beforeRouteEnter: generateMiddlewares([async ({ to }) => {
		if (to.params.userId === useAuth().id.value) return '/account'
	}]),
	setup () {
		useRouteMeta('Profile', { back: true })
		const { id } = useAuth()
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
		const tab = ref('questions')
		return {
			id, user, loading, error, formatNumber,
			tab, helpCircleOutline, readerOutline, checkmarkCircleOutline, flashOutline
		}
	}
})
</script>
