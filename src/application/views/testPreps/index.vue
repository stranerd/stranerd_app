<template>
	<DashboardLayout>
		<IonSegment v-model="stateMode"
			class="w-full bg-new_gray text-gray border border-new_gray border-xl md:border-white mt-4">
			<IonSegmentButton class="w-full" value="testPrep">My test preps</IonSegmentButton>
			<IonSegmentButton class="w-full" value="explore">Explore</IonSegmentButton>
		</IonSegment>
		<div class="md:mt-4" v-if="stateMode == 'testPrep'">
			<ContinueTests/>
		</div>
		<div class="md:mt-4" v-if="stateMode == 'explore'">
			<explore-test-preps-list/>
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
	name: 'TestPreps',
	displayName: 'Questions',
	components: {  DashboardLayout, ContinueTests, IonSegment, IonSegmentButton, ExploreTestPrepsList },
	setup(){ 
		const stateMode = ref('testPrep')
		return{
			stateMode
		}
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