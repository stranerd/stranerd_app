<template>
	<div class="flex flex-col gap-8">
		<IonText class="font-bold text-2xl card-padding !py-0">Questions</IonText>
		<QuestionsView />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionsView from '@app/components/questions/questions/QuestionsView.vue'

export default defineComponent({
	name: 'QuestionsPanel',
	components: { QuestionsView }
})
</script>
