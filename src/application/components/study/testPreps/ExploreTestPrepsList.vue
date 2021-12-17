<template>
	<div>
		<template v-if="filtered.length === 0">
			<EmptyState info="No testPreps available." />
		</template>
		<template v-else>
			<div class="showcase">
				<TestPrepListCard v-for="testPrep in filtered" :key="testPrep.hash" :testPrep="testPrep" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import { TestPrepEntity } from '@modules/study'

export default defineComponent({
	name: 'ExploreTestPrepsList',
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
		const filtered = computed(() => props.testPreps.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
