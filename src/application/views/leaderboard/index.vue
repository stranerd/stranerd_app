<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<page-loading v-if="loading" />
			<div v-else class="max-w-4xl mx-auto ">


				<div class="flex justify-center items-center mt-24 lg:mt-28 mb-2 md:px-2">
					<span class="font-bold text-dark_gray heading hidden md:block" variant="1">
						Tutor Leaderboard
					</span>
					<div class="flex gap-4 md:ml-auto">
						<ion-select class="max-w-[138px] text-xs md:text-sm  placeholder-[#8B9EB1] font-bold"
							interface="action-sheet"
							placeholder="General" value="notifications">
							<ion-select-option value="maths">Daily</ion-select-option>
							<ion-select-option value="physics">Monthly</ion-select-option>
							<ion-select-option value="bio">Yearly</ion-select-option>

						</ion-select>

						<ion-select v-model="rankType"
							class="max-w-[138px] text-xs md:text-sm  placeholder-[#8B9EB1] font-bold"
							interface="action-sheet" placeholder="Daily" value="notifications">
							<ion-select-option value="daily">Daily</ion-select-option>
							<ion-select-option value="weekly">Weekly</ion-select-option>
							<ion-select-option value="monthly">Monthly</ion-select-option>
						</ion-select>
					</div>

				</div>

				<div class="flex flex-col items-center justify-content-center gap-1 gap-md-2">
					<div class="flex flex-col gap-0-5 w-full">
						<div
							class="flex rounded-none lg:rounded-md bg-dark_gray font-bold normalText text-white py-4 lg:px-8 px-4 text-dark">
							<div class="w-3/12">
								<span>No.</span>
							</div>
							<div class="w-6/12">
								<span>Profile</span>
							</div>
							<div class="w-3/12 text-right">
								<span>Tutor Score</span>
							</div>
						</div>

						<div v-if="user"
							class="flex items-center mt-4 bg-light_gray rounded-none lg:rounded-md font-bold normalText text-dark_gray py-4 lg:px-8 px-4 border border-faded_gray">
							<div class="w-3/12">
								<span> - </span>
							</div>
							<div class="w-7/12 flex items-center gap-2">
								<avatar :size="24" :src="user.bio.photo" :id="user.id" />
								<span>
									{{ user.bio.fullName }}
								</span>
							</div>
							<div class="w-2/12 text-right text-primary font-semibold">
								<span>{{ user.account.rankings[rankType] }}</span>
							</div>
						</div>

						<template v-if="leaderboardData.length">
							<div v-for="(person, index) in leaderboardData" :key="person.id"
								class="flex items-center mt-4 bg-light_gray rounded-none lg:rounded-md font-bold normalText text-dark_gray py-4 lg:px-8 px-4">
								<div class="w-3/12">
									<span>{{ index + 1 }} </span>
								</div>
								<div class="w-3/12 flex items-center gap-2">
									<avatar :size="24" :src="person.bio.photo" :id="person.id" />
									<span>
										{{ person.bio.fullName }}
									</span>
								</div>
								<div class="w-6/12 font-normal text-right text-primary ">
									<span>{{ person.account.rankings[rankType] }}</span>
								</div>
							</div>
						</template>

					</div>

					<!-- <div class="text-center text-18">
						<a class="text-primary-dark py-2" @click.prevent="fetchOlder">LOAD MORE</a>
					</div> -->
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage, IonSelect, IonSelectOption } from '@ionic/vue'
import Avatar from '@app/components/core/Avatar.vue'
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import PageLoading from '@app/components/core/PageLoading.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'tutor leaderboard',
	layout: 'justified',
	displayName: 'LeaderBoard',
	components: { IonSelect, IonSelectOption, Avatar, IonPage, IonContent, PageLoading },
	setup () {
		const { filteredUsers: leaderboardData, rankType, loading, userIndex } = useLeaderboardList()
		const { user } = useAuth()

		return {
			user,
			rankType,
			leaderboardData,
			loading,
			userIndex
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-select {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
		background-color: #F7F7FC;
		--color: #8B9EB1;
		--padding-end: 1rem;
		--padding-top: 0.5rem !important;
		--padding-bottom: 0.5rem !important;
		border-radius: 6px;
	}
</style>
