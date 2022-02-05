<template>
	<Justified>
		<div class="text-body h-full md:bg-new_gray">
			<PageLoading v-if="loading" />
			<template v-if="user">
				<div class="bg-primary rounded-b-xl lg:rounded-none pt-4 px-4">
					<div class="w-full md:w-10/12 lg:w-6/12 mx-auto flex flex-col gap-4">
						<div class="text-body w-full flex gap-2 md:gap-4 items-center lg:justify-start">
							<div class="relative border-white border-4 rounded-full grid place-items-center">
								<Avatar :id="user.id" :size="72" :src="user.avatar" class="md:hidden" color="#C7D6E3" />
								<Avatar :id="user.id" :size="90" :src="user.avatar" class="hidden md:block"
									color="#C7D6E3" />
							</div>
							<div class="flex flex-col justify-start items-start">
								<h2 class="lg:text-xl text-base font-bold text-white">{{ user.fullName }}</h2>
								<Tag :index="user.rank.level - 1" :secondary="true" :tag="user.rank.id" />
							</div>
						</div>
						<div class="flex items-center gap-3 text-faded_gray font-semibold overflow-x-auto">
							<router-link :to="`/users/${user.id}/questions`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Questions
							</router-link>
							<router-link :to="`/users/${user.id}/answers`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Answers
							</router-link>
							<router-link :to="`/users/${user.id}/flashCards`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								FlashCards
							</router-link>
							<router-link :to="`/users/${user.id}/notes`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Notes
							</router-link>
							<router-link :to="`/users/${user.id}/videos`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Videos
							</router-link>
							<router-link v-if="false" :to="`/users/${user.id}/folders`"
								class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								Folders
							</router-link>
							<router-link :to="`/users/${user.id}/`" class="pb-2 cursor-pointer"
								exact-active-class="border-b-4 text-white border-white">
								About
							</router-link>
						</div>
					</div>
				</div>
				<div class="w-full md:w-10/12 lg:w-6/12 mx-auto p-4 md:mt-8">
					<slot :user="user" />
				</div>
			</template>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageLoading from '@app/components/core/PageLoading.vue'
import Justified from '@app/layouts/Justified.vue'
import { useUser } from '@app/composable/users/user'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'UserPageWrapper',
	components: { PageLoading, Justified },
	setup () {
		const { id } = useAuth()
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
		return { id, user, loading, error }
	}
})
</script>
