<template>
	<DashboardLayout>
		<div class="md:p-4">
			<EmptyState v-if="!loading && !error && sets.length === 0"
				info="You have not created any folders yet. Click the plus button to create one now" />
			<div class="showcase">
				<SetListCard v-for="set in sets" :key="set.hash" :set="set" />
			</div>
			<IonSkeletonText v-if="loading" animated class="h-28 rounded-xl px-4" />
			<!-- <PageLoading v-if="loading" /> -->
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { IonSkeletonText } from '@ionic/vue'

export default defineComponent({
	name: 'Study',
	displayName: 'Study',
	middlewares: ['isAuthenticated'],
	components: { DashboardLayout, SetListCard, IonSkeletonText },
	setup () {
		const { sets, error, loading } = useUserSetList()
		return { sets, error, loading }
	}
})
</script>
