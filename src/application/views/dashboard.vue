<template>
	<DashboardLayout>
		<div>
			<div class="md:px-4 md:pt-8">
				<StatusBar />
			</div>
			<div class="px-4 pb-8">
				<ContinueStudy class="mt-28 md:mt-16" />
				<TestPrep :suggested="true" class="mt-16" />
				<RecentQuestions class="mt-16" />
				<Notes :suggested="true" class="mt-16" />
				<FlashCards :suggested="true" class="mt-16" />
				<StudyTools class="mt-16" />
			</div>
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
import StudyTools from '@app/components/study/studyTools/StudyTools.vue'

export default defineComponent({
	name: 'Dashboard',
	components: {
		DashboardLayout,
		RecentQuestions,
		ContinueStudy,
		TestPrep,
		Notes,
		FlashCards,
		StudyTools,
		StatusBar
	}
})
</script>
