<template>
	<ExploreWrapper>
		<ExploreTestPrepsList />
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'

export default defineComponent({
	name: 'ExplorePreps',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreTestPrepsList }
})
</script>
