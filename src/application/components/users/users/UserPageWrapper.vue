<template>
	<Justified>
		<div class="text-body h-full md:bg-new_gray">
			<PageLoading v-if="loading" />
			<template v-if="user">
				<div class="bg-primary pt-5 md:mb-12 rounded-b-xl lg:rounded-none">
					<div
						class="lg:w-6/12 px-4 lg:mx-auto flex md:flex-row md:mx-12 flex-col items-start gap-2 md:items-center justify-start text-body mt-3">
						<div class="w-full flex  items-center lg:justify-start">
							<Avatar :id="user.id" :size="100" :src="user.avatar" color="#C7D6E3" class="mr-4" />
							<div class="flex flex-col justify-start items-start">
								<h2 class="lg:text-xl text-base font-bold text-white mb-2">{{ user.fullName }}</h2>
								<tag
									:tag="user.rank.id "
									:secondary="true"
									:index="1"
								/>
							
								<div class="text-white font-bold mt-1">
									<ion-text class="text-basee">{{user.scorePercentage}}</ion-text>
									<ion-text class="text-xs"> Nerd Score</ion-text>
								</div>
							</div>
						</div>
			
					</div>
					<div
						class="flex lg:w-6/12 px-4 mx-auto mt-3 md:justify-center lg:justify-start lg:items-center gap-3 text-faded_gray font-bold whitespace-normal overflow-x-auto">
		
						<router-link :to="`/users/${user.id}/questions`"
							class="pb-2 pr-3 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Questions
						</router-link>
						<router-link :to="`/users/${user.id}/answers`"
							class="pb-2 pr-3 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Answers
						</router-link>
						<router-link :to="`/users/${user.id}/flashCards`"
							class="pb-2 pr-3 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							FlashCards
						</router-link>
						<router-link :to="`/users/${user.id}/notes`"
							class="pb-2 pr-3 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Notes
						</router-link>
						<router-link :to="`/users/${user.id}/playlists`"
							class="pb-2 pr-3 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Playlist
						</router-link>
						<router-link :to="`/users/${user.id}/folders`"
							class="pb-2 pr-3 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							Folders
						</router-link>
						<router-link :to="`/users/${user.id}/`" class="pb-2 pr-3 cursor-pointer"
							exact-active-class="border-b-4 text-white border-white">
							About
						</router-link>
					</div>
				</div>
				<div class="mx-auto md:w-[83.33%] lg:w-[50%] grid grid-cols-12">
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
import Tag from '../../core/Tag.vue'

export default defineComponent({
	name: 'UserPageWrapper',
	components: { PageLoading, Justified, Tag },
	setup () {
		const { id } = useAuth()
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
		return { id, user, loading, error }
	}
})
</script>
