<template>
	<router-link :to="`/users/${user.id}`" class="card-sm card-padding flex w-full items-center">
		<Avatar :name="user.bio.fullName" :size="32" :src="user.bio.photo" />
		<UserName :isTutor="user.roles.isStranerdTutor" :name="user.bio.fullName" class="font-bold" />
		<span v-if="rank < 4" :style="`color: ${rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : '#CD7F32'}`"
			class="text-lg flex items-center">
			<IonIcon :icon="star" />
		</span>
		<span class="ml-auto">
			{{ formatNumber(user.account.rankings[time].value, 2) }}pts
		</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { formatNumber } from '@utils/commons'
import { RankingTimes, UserEntity } from '@modules/users'
import { star } from 'ionicons/icons'

export default defineComponent({
	name: 'LeaderboardListCard',
	props: {
		user: {
			type: UserEntity,
			required: true
		},
		rank: {
			type: Number,
			required: true
		},
		time: {
			type: String as PropType<RankingTimes>,
			required: true
		}
	},
	setup () {
		return { formatNumber, star }
	}
})
</script>
