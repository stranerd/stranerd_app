<template>
	<DashboardLayout>
		<div>
			<div class="md:px-4 md:pt-8">
				<StudyHeader />
			</div>
			<div class="px-4 pb-8">
				<StudySection class="mt-16" />
				<TestPrepsList class="mt-16" />
				<FlashCardsList class="mt-16" />
				<NotesList class="mt-16" />
				<VideosList class="hidden mt-16" />
			</div>
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import StudyHeader from '@app/components/study/StudyHeader.vue'
import StudySection from '@app/components/study/StudySection.vue'
import TestPrepsList from '@app/components/study/testPreps/StudyTestPrepList.vue'
import FlashCardsList from '@app/components/study/flashCards/StudyFlashCardList.vue'
import NotesList from '@app/components/study/notes/StudyNotesList.vue'
import VideosList from '@app/components/study/videos/StudyVideosList.vue'

export default defineComponent({
	name: 'StudyHome',
	components: {
		DashboardLayout,
		StudyHeader,
		StudySection,
		TestPrepsList,
		FlashCardsList,
		NotesList,
		VideosList
	}
})
</script>
