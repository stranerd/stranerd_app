<template>
	<ExploreWrapper>
		<div>
			<EmptyState v-if="testPreps.length === 0" info="No available testPreps" />
			<ExploreTestPrepsList :testPreps="testPreps" />
			<PageLoading v-if="loading" />
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import ExploreWrapper from '@app/components/study/explore/ExploreWrapper.vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'

export default defineComponent({
	name: 'ExploreTestPreps',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreTestPrepsList },
	setup () {
		const { testPreps, listener, loading, error } = useTestPrepList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { testPreps, loading, error }
	}
})
</script>
