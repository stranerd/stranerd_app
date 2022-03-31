<template>
	<DashboardLayout>
		<div class="py-4 lg:py-8 md:px-4 lg:px-0">
			<div class="px-4 md:p-0">
				<IonSegment v-model="tab"
					class="w-full bg-new_gray text-gray border border-new_gray border-xl md:border-white">
					<IonSegmentButton class="w-full" value="tests">My Tests</IonSegmentButton>
					<IonSegmentButton class="w-full" value="institutions">Explore</IonSegmentButton>
				</IonSegment>
			</div>

			<div class="md:mt-4">
				<ContinueTests v-if="tab === 'tests'" />
				<ExploreTestPrepsList v-if="tab === 'institutions'" />
			</div>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import { IonSegment, IonSegmentButton } from '@ionic/vue'
import ContinueTests from '@root/application/components/study/tests/ContinueTests.vue'
import ExploreTestPrepsList from '@root/application/components/study/testPreps/ExploreTestPrepsList.vue'

export default defineComponent({
	name: 'StudyPreps',
	displayName: 'Preps',
	components: { DashboardLayout, ContinueTests, IonSegment, IonSegmentButton, ExploreTestPrepsList },
	setup () {
		const tab = ref('tests')
		return { tab }
	}
})
</script>

<style lang="scss" scoped>
	ion-segment {
		border-radius: 0.5rem;
	}

	ion-segment-button {
		--background-checked: $color-white;
		--background-focused: $color-white;
		--indicator-color: $color-white;
		--padding-top: 0.75rem;
		--padding-bottom: 0.75rem;
		font-weight: bold;
		border-radius: 0.5rem;
		text-transform: capitalize;
		max-width: unset;
		color: $color-gray;
	}

	.segment-button-checked {
		color: $color-gray !important;
		background: $color-white;
	}
</style>
