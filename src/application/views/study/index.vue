<template>
	<DashboardLayout>
		<div  class="pl-6 lg:pl-2 pr-1.5 pt-8 pb-8">

			<TestPrep />
			<FlashCard class="mt-8"/>
			<Notes class="mt-8"/>
			<Videos class="mt-8"/>
			
		
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import TestPrep from '@app/components/study/testPrep/index.vue'
import FlashCard from '@app/components/study/flashcard/index.vue'
import Notes from '@app/components/study/notes/index.vue'
import Videos from '@app/components/study/videos/index.vue'

export default defineComponent({
	name: 'StudyHome',
	components: {
		DashboardLayout,
		TestPrep,
		FlashCard,
		Notes,
		Videos,
	}
})
</script>
