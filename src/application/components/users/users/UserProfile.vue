<template>
	<div class="min-h-full flex flex-col">
		<UserPageCard :user="user" class="px-4 lg:px-0 pb-4" />
		<div class="flex flex-col lg:gap-4 flex-1">
			<div class="flex items-center justify-between text-sm">
				<a v-for="path in [
						{ name: 'questions' },
						{ name: 'flashCards' },
						...(user.id === id ? [{ name: 'saved' }] : [])
					]" :key="path.name"
					:class="{ '!text-primaryBg !border-primaryBg': path.name === tab}"
					class="border-b-2 border-itemBg text-secondaryText p-3 capitalize w-full flex justify-center items-center gap-2"
					@click="tab = path.name">
					<span class="capitalize">{{ path.name }}</span>
				</a>
			</div>
			<UserQuestions v-if="tab === 'questions'" :user="user" />
			<UserFlashCards v-if="tab === 'flashCards'" :user="user" />
			<UserSets v-if="tab === 'saved'" :user="user" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import UserFlashCards from '@app/components/users/users/UserFlashCards.vue'
import UserSets from '@app/components/users/users/UserSets.vue'
import UserPageCard from '@app/components/users/users/UserPageCard.vue'
import { UserEntity } from '@modules/users'
import { useRoute } from 'vue-router'

const props = defineProps({
	user: {
		type: Object as PropType<UserEntity>,
		required: true
	}
})

const { id, isSubscribed } = useAuth()
const route = useRoute()
const { tab: t = '' } = route.query
const tabValues = ['questions', 'flashCards']
const tab = ref(tabValues.includes(t as string) ? t as string : tabValues[0])
</script>
