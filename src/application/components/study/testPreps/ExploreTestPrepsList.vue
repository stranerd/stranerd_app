<template>
	<div class="showcase-flex">
		<EmptyState v-if="!loading && !error && filtered.length === 0" info="No testPreps found." />
		<InstitutionTestPrepsListCard v-for="group in filtered" :key="group.institutionId"
			:institutionId="group.institutionId" :testPreps="group.preps" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
		const { loading, error, testPreps } = useTestPrepList()
		const filtered = computed(() => groupedByInstitution(testPreps.value).value.slice(0, props.sliced ? 3 : undefined))
		return { filtered, loading, error }
	}
})
</script>
