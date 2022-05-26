<template>
	<DashboardLayout>
		<div>
			<router-link class="border-bottom-line p-4 flex items-center gap-4"
				to="/study/preps/start">
				<IonIcon :icon="addOutline" class="text-heading2" />
				<ion-text>Take test/Study solutions</ion-text>
			</router-link>

			<ContinueTests />
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import { addOutline } from 'ionicons/icons'
import ContinueTests from '@root/application/components/study/tests/ContinueTests.vue'

export default defineComponent({
	name: 'StudyPreps',
	displayName: 'Test preps',
	components: { DashboardLayout, ContinueTests },
	setup () {
		return { addOutline }
	}
})
</script>
