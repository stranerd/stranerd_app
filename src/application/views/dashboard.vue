<template>
	<IonPage>
		<IonContent>
			<div class="col-span-12">
				<RecentQuestions class="mb-10" />
				<RecentTransaction />
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue'
import RecentTransaction from '@app/components/dashboard/RecentTransactions.vue'

export default defineComponent({
	name: 'Dashboard',
	layout: 'dashboard',
	components: {
		IonPage,
		IonContent,
		RecentQuestions,
		RecentTransaction
	}
})
</script>