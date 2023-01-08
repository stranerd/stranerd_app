<template>
	<div class="flex flex-col lg:flex-row gap-8">
		<PlansListCard v-for="plan in plans" :key="plan.hash" :plan="plan" />
	</div>
</template>

<script lang="ts" setup>
import { usePlanList } from '@app/composable/payment/plans'
import PlansListCard from '@app/components/payment/plans/PlansListCard.vue'

const { plans, loading, error } = usePlanList()
</script>
