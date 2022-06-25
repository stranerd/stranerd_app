<template>
	<div>
		<IonText class="font-bold text-2xl px-4 mb-4">Questions</IonText>
		<QuestionView />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionView from '@app/components/questions/questions/QuestionView.vue'

export default defineComponent({
	name: 'SettingsPanel',
	components: { QuestionView }
})
</script>
