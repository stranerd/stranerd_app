<template>
	<div class="flex flex-col lg:flex-row gap-8">
		<PlansListCard v-for="plan in plans" :key="plan.hash" :plan="plan" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePlanList } from '@app/composable/payment/plans'
import PlansListCard from '@app/components/payment/plans/PlansListCard.vue'

export default defineComponent({
	name: 'PlansList',
	components: { PlansListCard },
	setup () {
		const { plans, loading, error } = usePlanList()
		return { plans, loading, error }
	}
})
</script>
