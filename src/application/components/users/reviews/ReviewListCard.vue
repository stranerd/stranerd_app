<template>
	<div :id="review.id" class="d-flex flex-column gap-0-5 gap-md-1 py-1 text-dark border-bottom border-line">
		<div class="d-flex gap-0-5 gap-md-1 align-items-center">
			<Avatar :size="36" :src="review.avatar" />
			<DynamicText class="name">
				{{ review.userBio.fullName }}
			</DynamicText>
			<span class="d-flex align-items-baseline gap-0-25 mx-auto">
				<i class="fas fa-star text-gold" style="font-size: 21px;" />
				<DynamicText class="text-primary">{{ formatNumber(review.rating, 1) }}/5</DynamicText>
			</span>
			<DynamicText style="font-size: 14px;">
				{{ formatTime(review.createdAt) }}
			</DynamicText>
		</div>

		<DynamicText>{{ review.review }}</DynamicText>
	</div>
</template>

<script lang="ts">
import { ReviewEntity } from '@modules/users'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { formatTime } from '@utils/dates'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'ReviewListCard',
	props: {
		review: {
			required: true,
			type: Object as PropType<ReviewEntity>
		}
	},
	setup () {
		return { formatTime, formatNumber }
	}
})
</script>
<style lang="scss" scoped>
	.name {
		font-size: 17px;
		font-weight: 600;
	}

	.subject {
		font-weight: 600;
	}
</style>
