<template>
	<DashboardLayout>
		<div class="px-4  pt-8 pb-32">
			<StatusBar />
			<!-- <StudyTools class="mt-28 lg:mt-14" /> -->
			<ContinueStudy  class="mt-8"/>
			<TestPrep :suggested="true" class="mt-8" /> 
			<RecentQuestions class="mt-8" />


			<!-- Suggested -->
			
			<Notes :suggested="true" class="mt-8" />
			<FlashCards :suggested="true" class="mt-8" />
			
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import StatusBar from '@app/components/dashboard/StatusBar.vue'
import TestPrep from '@app/components/study/testPreps/StudyTestPrepList.vue'
import Notes from '@app/components/study/notes/StudyNotesList.vue'
import FlashCards from '@app/components/study/flashCards/StudyFlashCardList.vue'
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue'
import ContinueStudy from '@app/components/dashboard/ContinueTests.vue'
// import StudyTools from '@app/components/study/studyTools/StudyTools.vue'

export default defineComponent({
	name: 'Dashboard',
	components: {
		DashboardLayout,
		RecentQuestions,
		ContinueStudy,
		TestPrep,
		Notes,
		FlashCards,
		// StudyTools,
		StatusBar
	}
})
</script>
