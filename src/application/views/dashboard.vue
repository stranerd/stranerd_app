<template>
<<<<<<< HEAD
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
=======
	<DashboardLayout>
		<div>
			<RecentQuestions class="mb-10" />
			<RecentTransaction />
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue'
import RecentTransaction from '@app/components/dashboard/RecentTransactions.vue'

export default defineComponent({
	name: 'Dashboard',
<<<<<<< HEAD
	layout: 'dashboard',
	components: {
		IonPage,
		IonContent,
=======
	components: {
		DashboardLayout,
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
		RecentQuestions,
		RecentTransaction
	}
})
</script>
