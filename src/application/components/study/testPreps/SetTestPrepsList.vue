<template>
	<div>
		<EmptyState v-if="filtered.length === 0" btnText="Explore Test Preps"
			info="You have not saved any test preps yet. <br>
Find the one you need to study for your exams and save them now."
			route="/search/preps"
		/>
		<div class="showcase">
			<TestPrepListCard v-for="testPrep in filtered" :key="testPrep.hash" :testPrep="testPrep" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import { SetEntity, TestPrepEntity } from '@modules/study'

export default defineComponent({
	name: 'SetTestPrepsList',
	components: { TestPrepListCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
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
