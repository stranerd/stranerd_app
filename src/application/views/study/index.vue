<template>
	<DashboardLayout>
		<div class="p-4">
			<EmptyState v-if="!loading && !error && sets.length === 0"
				info="You have not created any folders yet. Click the plus button to create one now" />
			<div class="showcase">
				<SetListCard v-for="set in sets" :key="set.hash" :openMenu="(event) => openMenu(set, event)"
					:set="set" />
			</div>
			<PageLoading v-if="loading" />
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import { SetEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import { useUserSetList } from '@app/composable/users/users/sets'

export default defineComponent({
	name: 'Study',
	displayName: 'Study',
	middlewares: ['isAuthenticated'],
	components: { DashboardLayout, SetListCard },
	setup () {
		const openMenu = (entity: SetEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const { rootSets: sets, error, loading } = useUserSetList()
		return { sets, error, loading, openMenu }
	}
})
</script>
