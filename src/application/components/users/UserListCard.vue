<template>
	<router-link :class="`m-0 w-full bg-white rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border p-4`"
		:to="`/users/${user.id}`">
		<div class="items-center flex">
			<div class="relative border-white border-4 rounded-full grid place-items-center mr-4">
				<Avatar :id="user.id" :size="90" :src="user.avatar" color="#C7D6E3" />
			</div>
			<div class="flex flex-col justify-start items-start">
				<h2 class="lg:text-xl text-base font-bold">{{ user.fullName }}</h2>
				<span
					class="py-1 px-4 rounded-full lg:text-base text-xs w-auto flex border-2 font-bold bg-primary text-white">
					{{ user.rank.id }}
				</span>
			</div>
		</div>
		<div class="mt-8 flex justify-between items-center">
			<div class="bg-light_gray text-gray py-2 px-4 rounded-full flex gap-1 items-center">
				<IonIcon :icon="helpCircle" color="#64778A" size="large" />
				<span>{{ formatNumber(user.meta.questions, 0) }}</span>
			</div>
			<div class="bg-light_gray py-2 px-4 rounded-full flex gap-1 items-center">
				<IonIcon :icon="chatboxEllipses" color="#64778A" size="large" />
				<span>{{ formatNumber(user.meta.answers, 0) }}</span>
			</div>
			<div class="bg-light_gray py-2 px-4 rounded-full flex gap-1 items-center">
				<IonIcon :icon="flash" color="#64778A" size="large" />
				<span>{{ formatNumber(user.meta.flashCards, 0) }}</span>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { chatboxEllipses, flash, helpCircle } from 'ionicons/icons'
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
		return { formatNumber, helpCircle, flash, chatboxEllipses }
	}
})
</script>
