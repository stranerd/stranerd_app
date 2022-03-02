<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="No results found." />
		<div class="showcase">
			<InstitutionTestPrepsListCard v-for="group in filtered" :key="group.institutionId"
				:institutionId="group.institutionId" :testPreps="group.preps" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { TestPrepEntity } from '@modules/study'
import { groupedByInstitution } from '@app/composable/study/testPreps'
import InstitutionTestPrepsListCard from '@app/components/study/testPreps/InstitutionTestPrepsListCard.vue'

export default defineComponent({
	name: 'SearchTestPrepsList',
	components: { InstitutionTestPrepsListCard },
	props: {
		testPreps: {
			type: Array as PropType<TestPrepEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}

	},
	setup (props) {
		const filtered = computed(() => groupedByInstitution(props.testPreps).value.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
