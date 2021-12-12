<template>
	<DashboardLayout>
		<div class="pl-6 lg:pl-2 pr-1.5 pt-8 pb-32">
			<StatusBar/>
			<StudyTools class="mt-28 lg:mt-20" />
			<ContinueStudy class="mt-8" />
			<RecentQuestions class="mt-8"/>


			<!-- Suggested -->
			<TestPrep :suggested="true" class="mt-8"/>
			<Notes :suggested="true" class="mt-8" />
			<FlashCard :suggested="true" class="mt-8" />

		
			<!-- <MyStudy class="mt-8" /> -->
		
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue' 
import ContinueStudy from '@app/components/dashboard/ContinueStudy.vue'
import MyStudy from '@app/components/study/MyStudy.vue'
import StudyTools from '../components/study/studyTools/index.vue'
import StatusBar from '../components/dashboard/StatusBar.vue'
import TestPrep from '@app/components/study/testPreps/TestPrepList.vue'
import Notes from '@app/components/study/notes/NotesList.vue'
import FlashCard from '@app/components/study/flashCards/index.vue'


export default defineComponent({
	name: 'Dashboard',
	components: {
		DashboardLayout,
		RecentQuestions,
		ContinueStudy,
		TestPrep,
		Notes,
		FlashCard,
		// MyStudy,
		StudyTools,
		StatusBar
	}
})
</script>
