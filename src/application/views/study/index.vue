<template>
	<DashboardLayout>
		<div class="pl-6 lg:pl-2 pr-1.5 pt-8 pb-8">
			<StudyHeader/>

			<StudySection class="mt-8"/>

			<TestPrep class="mt-8" />
			<FlashCard class="mt-8" />
			<Notes class="mt-8" />
			<!-- <Videos class="mt-8" /> -->


		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import TestPrep from '@app/components/study/testPreps/TestPrepList.vue'
import FlashCard from '@app/components/study/flashCards/index.vue'
import Notes from '@app/components/study/notes/NotesList.vue'
import Videos from '@app/components/study/videos/VideosList.vue'
import StudyHeader from '@root/application/components/study/StudyHeader.vue'
import StudySection from '@root/application/components/study/StudySection.vue'

export default defineComponent({
	name: 'StudyHome',
	components: {
		DashboardLayout,
		TestPrep,
		FlashCard,
		Notes,
		StudyHeader,
		StudySection,
		// Videos
	}
})
</script>
