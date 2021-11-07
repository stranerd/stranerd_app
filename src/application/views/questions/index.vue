<template>
	<IonPage>
		<IonContent>
			<div class="col-span-12 md:col-start-3 md:col-end-11 px-3">
				<div class="rounded-md flex flex-row items-center">
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
			<all-questions />
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AllQuestions from '@app/components/questions/all.vue'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'QuestionsPage',
	components: {
		AllQuestions, IonContent, IonPage
	},
	layout: 'dashboard'
})
</script>
