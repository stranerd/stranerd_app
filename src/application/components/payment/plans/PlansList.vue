<template>
	<div class="flex flex-col lg:flex-row gap-8">
		<div v-for="plan in plans" :key="plan.hash" class="flex flex-col border gap-4 p-6 flex-1 rounded-2xl">
			<span class="font-bold capitalize">{{ plan.name }}</span>
			<IonText>
				<span class="text-xl font-bold tracking-wider"><span
					v-html="formatCurrency(plan.currency)" />{{ plan.amount }}</span>
				<span>&nbsp;{{ plan.interval }}</span>
			</IonText>
			<span v-for="feature in plan.features" :key="feature.name" class="flex items-center gap-2">
				<IonIcon :class="feature.available ? 'text-success' : 'text-danger'"
					:icon="feature.available ? checkmarkOutline : closeOutline" />
				<IonText>{{ feature.name }}</IonText>
			</span>

			<IonButton class="btn-primary" disabled>Subscribe</IonButton>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePlanList } from '@app/composable/payment/plans'
import { cardOutline, checkmarkOutline, closeOutline } from 'ionicons/icons'
import { formatCurrency } from '@utils/commons'

export default defineComponent({
	name: 'PlansList',
	setup () {
		const { plans, loading, error } = usePlanList()
		return {
			checkmarkOutline, cardOutline, closeOutline,
			plans, loading, error, formatCurrency
		}
	}
})
</script>
