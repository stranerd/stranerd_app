<template>
	<Justified>
		<div class="text-body h-full md:bg-new_gray">
			<PageLoading v-if="loading" />
			<template v-if="user">
				<div class="bg-primary md:mb-8 rounded-b-xl lg:rounded-none pt-4">
					<div
						class="lg:w-6/12 mx-4 lg:mx-auto flex md:flex-row md:mx-12 flex-col items-start gap-2 md:items-center justify-start text-body">
						<div class="w-full flex gap-2 items-center lg:justify-start">
							<div class="relative border-white border-4 rounded-full grid place-items-center mr-4">
								<Avatar :id="user.id" :size="72" :src="user.avatar" class="md:hidden" color="#C7D6E3" />
								<Avatar :id="user.id" :size="90" :src="user.avatar" class="hidden md:block"
									color="#C7D6E3" />
							</div>
							<div class="flex flex-col justify-start items-start">
								<h2 class="lg:text-xl text-base font-bold text-white mb-2">{{ user.fullName }}</h2>
								<span
									class="py-1 px-4 rounded-full lg:text-base text-xs w-auto flex border-white border-2 font-bold text-white bg-transparent">
									{{ user.rank.id }}
								</span>
							</div>
						</div>
						<div
							class="bg-white rounded-3xl w-full sm:w-4/12 flex justify-between gap-8 items-center min-w-[20rem] p-4 md:p-6">
							<ion-text class="text-primary font-bold text-xl sm:text-lg">
								{{ id === user.id ? 'Your' : user.firstName }} nerd score
							</ion-text>
							<DonutChart :bgColor="user.nerdScoreColor.bg" :fgColor="user.nerdScoreColor.fg"
								:percentage="user.scorePercentage" :size="80" class="!md:hidden" />
							<DonutChart :bgColor="user.nerdScoreColor.bg" :fgColor="user.nerdScoreColor.fg"
								:percentage="user.scorePercentage" :size="96" class="!hidden !md:flex" />
						</div>
					</div>
					<div
						class="flex lg:w-6/12 px-4 mx-auto mt-4 md:justify-center lg:justify-start lg:items-center gap-3 text-faded_gray font-bold whitespace-normal overflow-x-auto">
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
