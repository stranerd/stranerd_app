<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text>Test Preps</ion-text>
			</div>
			<router-link
				class="text-primary normalText flex items-center font-bold"
				to="/study/explore/preps">
				<span>explore</span>
			</router-link>
		</div>

		<template v-if="testPreps.length === 0">
			<div class="py-3">
				<EmptyState info="No test preps saved." />
			</div>
		</template>

		<template v-else>
			<div class="showcase">
				<TestPrepCard v-for="(testPrep, index) in testPreps" :key="testPrep.hash" :index="index+1"
					:testPrep="testPrep" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import TestPrepCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import { TestPrepEntity } from '@modules/study'

export default defineComponent({
	name: 'SetTestPrepList',
	components: { TestPrepCard },
	props: {
		testPreps: {
			type: Array as PropType<TestPrepEntity[]>,
			required: true
		}
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
