<template>
	<DashboardLayout>
		<div>
			<MyStudy  class="mb-10"/>
			<StudyTools/>
			<TestPrep/>
			<FlashCard/>
			<Notes/>
			<Videos/>
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@root/application/layouts/Dashboard.vue'
import MyStudy from '@root/application/components/study/MyStudy.vue'
import StudyTools from '@app/components/study/studyTools/index.vue'
import TestPrep from '@app/components/study/testPrep/index.vue'
import FlashCard from '@app/components/study/flashcard/index.vue'
import Notes from '@app/components/study/notes/index.vue'
import Videos from '@app/components/study/videos/index.vue'

export default defineComponent({
	name: 'StudyHome',
	components: {
		DashboardLayout,
		MyStudy,
		StudyTools,
		TestPrep,
		FlashCard,
		Notes,
		Videos,
	}
})
</script>
