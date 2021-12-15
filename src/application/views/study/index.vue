<template>
	<DashboardLayout>
		<div>
			<SetView v-if="rootSet" :key="rootSet.hash" :set="rootSet" />
			<PageLoading v-if="loading" />
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useMySets } from '@app/composable/study/sets'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import SetView from '@app/components/study/sets/SetView.vue'

export default defineComponent({
	name: 'Study',
	middleware: ['isAuthenticated'],
	components: { DashboardLayout, SetView },
	setup () {
		const { rootSet, sets, error, loading } = useMySets()
		return { rootSet, sets, error, loading }
	}
})
</script>
