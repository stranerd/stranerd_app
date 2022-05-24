<template>
	<DashboardLayout>
		<div class="py-4 lg:py-8 md:px-4 lg:px-0">
			<router-link to="/study/preps/chooseExam/" class="border-bottom-line px-4 pb-4 flex items-center">
				<IonIcon  :icon="addOutline" class="text-xl" />
				<ion-text class="text-secondaryText ml-4">Start test prep</ion-text>
			</router-link>

			<div class="md:mt-4">
				<ContinueTests />
			</div>
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
	setup(){
		return {addOutline}
	}

})
</script>


