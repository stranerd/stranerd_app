<template>
	<router-link :to="`/users/${user.id}`"
		class="m-0 w-full bg-white rounded-xl flex flex-col md:gap-2 box-border p-4">
		<div class="items-center flex">
			<div class="relative border-white border-4 rounded-full grid place-items-center mr-4">
				<Avatar :id="user.id" :name="user.bio.firstName" :size="67" :src="user.avatar" />
			</div>
			<div class="flex flex-col justify-start items-start">
				<h2 class="lg:text-base text-xs font-bold mb-1 flex gap-1 items-center">
					<span>{{ user.fullName }}</span>
					<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="primary" />
				</h2>
				<span
					class="py-1 px-4 rounded-full text-xs w-auto flex border-2 font-bold bg-primary text-white">
					{{ user.rank.id }}
				</span>
			</div>
		</div>
		<div class="lg:mt-8 mt-5 text-gray flex justify-between items-center font-bold">
			<div class="bg-light_gray text-gray py-2 px-4 rounded-full flex gap-1 items-center text-body">
				<IonIcon :icon="helpCircleOutline" class="text-lg lg:text-3xl text-gray" />
				<span>{{ formatNumber(user.meta.questions, 0) }}</span>
			</div>
			<div class="bg-light_gray py-2 px-4 rounded-full flex gap-1 items-center text-body">
				<IonIcon :icon="chatboxEllipsesOutline" class="text-lg lg:text-3xl text-gray" />
				<span>{{ formatNumber(user.meta.answers, 0) }}</span>
			</div>
			<div class="bg-light_gray py-2 px-4 rounded-full flex gap-1 items-center text-body">
				<IonIcon :icon="flashOutline" class="text-lg lg:text-3xl text-gray" />
				<span>{{ formatNumber(user.meta.flashCards, 0) }}</span>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { chatboxEllipsesOutline, checkmarkCircleOutline, flashOutline, helpCircleOutline } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'UserListCard',
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup () {
		return { formatNumber, helpCircleOutline, flashOutline, chatboxEllipsesOutline, checkmarkCircleOutline }
	}
})
</script>
