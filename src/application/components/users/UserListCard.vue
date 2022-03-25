<template>
	<router-link :to="`/users/${user.id}`"
		class="w-full bg-white rounded-xl flex flex-col card-padding box-border">
		<div class="items-start gap-2 flex">
			<Avatar :id="user.id" :name="user.bio.fullName" :size="40" :src="user.bio.photo" />
			<div class="flex flex-col justify-start items-start">
				<h2 class="text-sub font-bold mb-1 flex gap-1 items-center">
					<span>{{ user.bio.fullName }}</span>
					<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="primary" />
				</h2>
				<span
					class="py-1 px-4 rounded-full text-sub w-auto flex border-2 font-bold bg-primary text-white">
					{{ user.rank.id }}
				</span>
			</div>
		</div>
		<div class="text-gray flex justify-between items-center font-bold">
			<div class="bg-light_gray rounded-full flex gap-1 items-center">
				<IonIcon :icon="helpCircleOutline" class="text-lg lg:text-3xl text-gray" />
				<span>{{ formatNumber(user.meta.questions, 0) }}</span>
			</div>
			<div class="bg-light_gray rounded-full flex gap-1 items-center">
				<IonIcon :icon="chatboxEllipsesOutline" class="text-lg lg:text-3xl text-gray" />
				<span>{{ formatNumber(user.meta.answers, 0) }}</span>
			</div>
			<div class="bg-light_gray rounded-full flex gap-1 items-center">
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
