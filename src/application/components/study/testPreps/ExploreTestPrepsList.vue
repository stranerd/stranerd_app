<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="No testPreps found." />
		<div v-else class="showcase">
			<InstitutionTestPrepsListCard v-for="group in filtered" :key="group.institutionId"
				:institutionId="group.institutionId" :testPreps="group.preps" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import { TestPrepEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import { groupedByInstitution, useTestPrepList } from '@app/composable/study/testPreps'
import InstitutionTestPrepsListCard from '@app/components/study/testPreps/InstitutionTestPrepsListCard.vue'

export default defineComponent({
	name: 'ExploreTestPrepsList',
	components: { InstitutionTestPrepsListCard },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const { loading, error, listener, testPreps } = useTestPrepList()
		const openMenu = (entity: TestPrepEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => groupedByInstitution(testPreps.value).value.slice(0, props.sliced ? 6 : undefined))
		onMounted(listener.startListener)
		onUnmounted(listener.closeListener)
		return { filtered, openMenu, loading, error }
	}
})
</script>
