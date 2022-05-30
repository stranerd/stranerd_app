<template>
	<ExploreWrapper>
		<ExploreTestPrepsList />
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ExplorePreps',
	components: { ExploreWrapper, ExploreTestPrepsList },
	setup () {
		useRouteMeta('Explore Preps')
	}
})
</script>
