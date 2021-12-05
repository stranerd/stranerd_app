<template>
	<div class="md:w-8/12 w-full px-4 mx-auto   mt-8">
	

		<template v-if="testPreps.length === 0">
			<div class="py-3">
				<empty-state
					info="No TestPreps to Explore."
				></empty-state>
			</div>
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-8">
				<TestPrepCard  v-for="testPrep in testPreps" :key="testPrep.id" :testPrep="testPrep"/>
			</div>
		</template>

	</div>
</template>

<script lang="ts">
import {  onBeforeUnmount, onMounted } from 'vue'
import TestPrepCard from '@app/components/study/PlainStudyCard.vue'
import { useTestPrepList } from '@app/composable/study/testPreps'

export default {
	components: { TestPrepCard },
    	setup () {
		// const { id, isLoggedIn } = useAuth()
      		const { testPreps, listener, loading, error } = useTestPrepList()

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			testPreps,
		}
	}
}
</script>

<style scoped>
ion-select{
   --background: #F7F7FC;  
   background: #F7F7FC;  
   --padding-start: 1rem;
   --padding-end: 1rem;
}
ion-segment{
    --background: #F7F7FC;
    color: #8B9EB1;
    font-weight: bold;
}
ion-segment-button{
    --background-checked: #4D5C6F;
    --background-focused: #4D5C6F;
    --indicator-color: #4D5C6F;
    --indicator-box-shadow:none;
    --padding-top:0.5rem;
    --padding-bottom:0.5rem;
    color: #8B9EB1;
    font-weight: bold;
}
</style>