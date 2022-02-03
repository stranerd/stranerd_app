<template>
	<DashboardLayout>
		<div>
			<RootSetView v-if="rootSet" :key="rootSet.id" :set="rootSet" />
			<PageLoading v-if="loading" />
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserRootSet } from '@app/composable/study/sets'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import RootSetView from '@app/components/study/sets/RootSetView.vue'

export default defineComponent({
	name: 'Study',
	displayName: 'Study',
	middlewares: ['isAuthenticated'],
	components: { DashboardLayout, RootSetView },
	setup () {
		const { rootSet, error, loading } = useUserRootSet()
		return { rootSet, error, loading }
	}
})
</script>
