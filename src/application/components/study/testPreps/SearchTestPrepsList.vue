<template>
	<div>
		<template v-if="filtered.length === 0">
			<EmptyState info="No testPreps available." />
		</template>
		<template v-else>
			<div class="showcase">
				<TestPrepListCard v-for="testPrep in filtered" :key="testPrep.hash" :openMenu="() => openMenu(testPrep)"
					:testPrep="testPrep" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import { TestPrepEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'SearchTestPrepsList',
	components: { TestPrepListCard },
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
		const openMenu = (entity: TestPrepEntity) => openStudyEntityMenu(entity, {})
		const filtered = computed(() => props.testPreps.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu }
	}
})
</script>
