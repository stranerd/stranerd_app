<template>
	<DashboardLayout>
		<div class="pl-6 lg:pl-2 pr-1.5 pt-8 pb-8">
			<TestPrepsList />
			<FlashCardsList class="mt-8" />
			<NotesList class="mt-8" />
			<VideosList class="mt-8" />
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import TestPrepsList from '@app/components/study/testPreps/StudyTestPrepList.vue'
import FlashCardsList from '@app/components/study/flashCards/StudyFlashCardList.vue'
import NotesList from '@app/components/study/notes/StudyNotesList.vue'
import VideosList from '@app/components/study/videos/StudyVideosList.vue'

export default defineComponent({
	name: 'StudyHome',
	components: {
		DashboardLayout,
		TestPrepsList,
		FlashCardsList,
		NotesList,
		VideosList
	}
})
</script>
