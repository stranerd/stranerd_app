<template>
	<DashboardLayout>
		<div>
			<ExploreTestPrepsList />
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyPrepsStart',
	components: { DashboardLayout, ExploreTestPrepsList },
	setup () {
		useRouteMeta('Choose Exam')
	}
})
</script>
