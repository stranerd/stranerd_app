<template>
	<DashboardLayout>
		<div>
			<RootSetView v-if="rootSet" :key="rootSet.id" :set="rootSet" />
			<PageLoading v-if="loading" />
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useMySets } from '@app/composable/study/sets'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import RootSetView from '@app/components/study/sets/RootSetView.vue'

export default defineComponent({
	name: 'Study',
	middleware: ['isAuthenticated'],
	components: { DashboardLayout, RootSetView },
	setup () {
		const { rootSet, error, loading, listener } = useMySets()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { rootSet, error, loading }
	}
})
</script>
