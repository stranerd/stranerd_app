<template>
	<IonPage>
		<ask-questions />
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AskQuestions from '@app/components/questions/ask.vue'
import { IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'QuestionCreate',
	components: {
		AskQuestions, IonPage
	},
	middlewares: ['isAuthenticated'],
	layout: 'questions'
})
</script>
