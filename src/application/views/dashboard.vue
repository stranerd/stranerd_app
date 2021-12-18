<template>
	<DashboardLayout>
		<div>
			<div v-if="isLoggedIn" class="md:px-4 md:pt-8">
				<StatusBar />
			</div>
			<div class="px-4 pb-8">
				<ContinueStudy v-if="isLoggedIn" :sliced="true" class="mt-28 md:mt-16" />
				<TestPrepList :suggested="true" class="mt-16" />
				<RecentQuestions class="mt-16" />
				<NotesList :suggested="true" class="mt-16" />
				<VideosList :suggested="true" class="hidden mt-16" />
				<FlashCardList :suggested="true" class="mt-16" />
				<StudyTools class="mt-16 hidden" />
			</div>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import StatusBar from '@app/components/dashboard/StatusBar.vue'
import TestPrepList from '@app/components/study/testPreps/TestPrepList.vue'
import NotesList from '@app/components/study/notes/NotesList.vue'
import VideosList from '@app/components/study/videos/VideosList.vue'
import FlashCardList from '@app/components/study/flashCards/FlashCardList.vue'
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue'
import ContinueStudy from '@app/components/study/tests/ContinueTests.vue'
import StudyTools from '@app/components/study/studyTools/StudyTools.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Dashboard',
	components: {
		DashboardLayout,
		RecentQuestions,
		ContinueStudy,
		TestPrepList,
		NotesList,
		VideosList,
		FlashCardList,
		StudyTools,
		StatusBar
	},
	setup () {
		const { isLoggedIn } = useAuth()
		return { isLoggedIn }
	}
})
</script>
