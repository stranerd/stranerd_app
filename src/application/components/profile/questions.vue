<template>
	<div class="col-span-12 flex flex-col px-3  normalText">
		<div class="  w-full md:px-2 md:py-3 mb-4 md:mb-0">
			<question></question>
		</div>

		<div class="  w-full md:px-2 md:py-3 mb-4 md:mb-0">
			<question></question>
		</div>

		<div class="  w-full md:px-2 md:py-3 mb-4 md:mb-0">
			<question></question>
		</div>

		<div class="  w-full md:px-2 md:py-3 mb-4 md:mb-0">
			<question></question>
		</div>
	</div>
</template>

<script lang="ts">


import { defineAsyncComponent } from 'vue'
const Question = defineAsyncComponent(() => import('@/application/components/questions/question.vue'))

export default  {
	name: 'profileQuestions',
	components: {  Question },
	setup() {
	
		return {
			
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #F7F7FC;
}

</style>