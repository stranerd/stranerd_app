<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text>Test Preps</ion-text>
			</div>
			<router-link
				:to="`/study/sets/${set.id}/preps`"
				class="text-primary normalText flex items-center font-bold">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="filtered.length === 0">
			<EmptyState info="No test preps saved." />
		</template>

		<template v-else>
			<div class="showcase">
				<TestPrepCard v-for="testPrep in filtered" :key="testPrep.hash" :testPrep="testPrep" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import TestPrepCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import { SetEntity, TestPrepEntity } from '@modules/study'

export default defineComponent({
	name: 'SetTestPrepList',
	components: { TestPrepCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
		testPreps: {
			type: Array as PropType<TestPrepEntity[]>,
			required: true
		}
	},
	setup (props) {
		const filtered = computed({
			get: () => props.testPreps.slice(0, 6),
			set: () => {
			}
		})
		return { filtered }
	}
})
</script>

<style>
	ion-badge {
		--background: #FFDC00 !important;
		--color: #132740 !important;
		--padding-top: 6px !important;
	}
</style>
