<template>
	<IonPage>
		<all-questions />
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AllQuestions from '@app/components/questions/all.vue'
import { IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'QuestionsPage',
	components: {
		AllQuestions, IonPage
	},
	layout: 'questions'
})
</script>
