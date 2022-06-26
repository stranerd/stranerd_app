<template>
	<div>
		<IonText class="font-bold text-2xl card-padding !pt-0">Home</IonText>
		<DashboardView />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardView from '@app/components/dashboard/DashboardView.vue'

export default defineComponent({
	name: 'DashboardPanel',
	components: { DashboardView }
})
</script>
