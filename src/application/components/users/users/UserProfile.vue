<template>
	<div class="h-full flex flex-col">
		<UserPageCard :user="user" class="px-4 lg:px-0 pb-6" />
		<div class="flex flex-col lg:gap-4 flex-1">
			<div class="flex items-center justify-between">
				<span v-for="path in [
						{ name: 'questions', icon: helpCircleOutline },
						...(isSubscribed ? [{ name: 'answers', icon: readerOutline }] : []),
						{ name: 'flashCards', icon: flashOutline },
						{ name: 'notes', icon: documentTextOutline }
					]" :key="path.name"
					:class="{ 'border-b-[3px] !text-primaryBg !border-primaryBg': path.name === tab}"
					class="border-b border-itemBg text-secondaryText p-4 capitalize w-full flex justify-center items-center gap-2"
					@click="tab = path.name">
					<IonIcon :icon="path.icon" />
					<span>{{ formatNumber(user.meta[path.name]) }}</span>
				</span>
			</div>
			<UserQuestions v-if="tab === 'questions'" :user="user" />
			<UserAnswers v-if="tab === 'answers' && isSubscribed" :user="user" />
			<UserFlashCards v-if="tab === 'flashCards'" :user="user" />
			<UserNotes v-if="tab === 'notes'" :user="user" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { documentTextOutline, flashOutline, helpCircleOutline, readerOutline } from 'ionicons/icons'
import { formatNumber } from '@utils/commons'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import UserAnswers from '@app/components/users/users/UserAnswers.vue'
import UserFlashCards from '@app/components/users/users/UserFlashCards.vue'
import UserNotes from '@app/components/users/users/UserNotes.vue'
import UserPageCard from '@app/components/users/users/UserPageCard.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'UserProfile',
	props: {
		user: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	components: { UserQuestions, UserAnswers, UserFlashCards, UserNotes, UserPageCard },
	setup () {
		const { id, isSubscribed } = useAuth()
		const tab = ref('questions')
		return {
			id, isSubscribed, formatNumber, tab,
			helpCircleOutline, readerOutline, documentTextOutline, flashOutline
		}
	}
})
</script>
