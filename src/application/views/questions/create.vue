<template>
	<IonPage>
		<IonContent>
			<div>
				<div class="col-span-12 md:col-start-3 md:col-end-11 px-3 ">
					<div class="bg-light_gray rounded-md flex flex-row items-center">
						<router-link active-class="activeSlideTab"
							class="w-1/2 text-center inactiveSlideTab"
							to="/questions/">
							All Questions
						</router-link>
						<router-link active-class="activeSlideTab"
							class="w-1/2 text-center inactiveSlideTab"
							to="/questions/create">
							Ask your question
						</router-link>
					</div>
				</div>
				<ask-questions />
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AskQuestions from '@app/components/questions/ask.vue'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'CreateQuestionPage',
	components: {
		AskQuestions, IonPage, IonContent
	},
	middlewares: ['isAuthenticated'],
	layout: 'dashboard'
})
</script>
