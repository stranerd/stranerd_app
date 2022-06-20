<template>
	<DefaultLayout>
		<div>
			<ExploreTestPrepsList />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyPrepsStart',
	components: { ExploreTestPrepsList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Choose Exam', { back: true })
	}
})
</script>
