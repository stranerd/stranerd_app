<template>
	<div class="col-span-12 flex flex-col px-3 normalText">
		<answer :is-profile="true"></answer>
		<answer  :is-profile="true"></answer>
	</div>
</template>

<script lang="ts">

import { defineAsyncComponent } from 'vue'
const Answer = defineAsyncComponent(() => import('@/application/components/questions/answers/each.vue'))


export default  {
	name: 'profileAnswers',
	components: {  Answer },
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