<template>
	<IonSkeletonText v-if="loading" animated class="h-36 rounded-xl" />
	<div v-else>
		<EmptyState v-if="fetched && !loading && filtered.length === 0" info="No results found." />
		<div class="showcase">
			<InstitutionTestPrepsListCard v-for="group in filtered" :key="group.institutionId"
				:institutionId="group.institutionId" :testPreps="group.preps" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { TestPrepEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import { groupedByInstitution } from '@app/composable/study/testPreps'
import InstitutionTestPrepsListCard from '@app/components/study/testPreps/InstitutionTestPrepsListCard.vue'
import { IonSkeletonText } from '@ionic/vue'
import { useSearch } from '@app/composable/meta/search'

export default defineComponent({
	name: 'SearchTestPrepsList',
	components: { InstitutionTestPrepsListCard, IonSkeletonText },
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
		const { loading, fetched } = useSearch()
		const openMenu = (entity: TestPrepEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => groupedByInstitution(props.testPreps).value.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu, loading, fetched }
	}
})
</script>
