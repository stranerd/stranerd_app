<template>
	<div class="bg-primary pt-2 md:mb-12  rounded-b-xl lg:rounded-none">
		<div
			class="lg:w-6/12 px-4 lg:mx-auto flex md:flex-row md:mx-12 flex-col items-start gap-2 md:items-center justify-start normalText mt-3">
			<div class="w-full flex gap-2 items-center  lg:justify-start">
				<div class="relative border-white border-4 rounded-full grid place-items-center mr-4">
					<Avatar :id="user.id" :size="90" :src="user.avatar" color="#C7D6E3" />
				</div>
				<div class="flex flex-col justify-start items-start">
					<h2 class="lg:text-xl text-base font-bold text-white">{{ user.fullName }}</h2>
					<span
						class="py-1 px-4 rounded-full lg:text-base text-xs w-auto flex border-white border-2 font-bold text-white bg-transparent">
						{{ user.rank.id }}
					</span>
				</div>
			</div>
			<div
				class="bg-white rounded-3xl w-full sm:w-4/12 flex justify-between gap-8 items-center min-w-[20rem]   mt-3 sm:mt-0 p-6 sm:mb-0 mb-5">
				<ion-text class="text-primary font-bold text-xl sm:text-lg">Your nerd score</ion-text>
				<DonutChart :score="user ? user.score: 0" :size="96" :total="user ? user.expectedScore : 100" />
			</div>
		</div>
		<div
			class="flex lg:w-6/12 px-4 mx-auto mt-3 md:justify-center lg:justify-start lg:items-center gap-3 text-faded_gray font-bold  whitespace-normal overflow-x-auto">
			<router-link :to="`/users/${user.id}/bio`" class="pb-2 pr-3 cursor-pointer"
				exact-active-class="border-b-4 text-white border-white">
				About
			</router-link>
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
			<router-link v-if="user.id === id" :to="`/users/${user.id}/settings`"
				class="pb-2 pr-3 cursor-pointer"
				exact-active-class="border-b-4 text-white border-white">
				Settings
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Avatar from '@app/components/core/Avatar.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'UserProfileCard',
	components: { Avatar },
	props: {
		user: {
			required: true,
			type: UserEntity
		}
	},
	setup (props) {
		const { id } = useAuth()
		return { id }
	}
})
</script>
