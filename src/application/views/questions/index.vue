<template>
<<<<<<< HEAD
	<IonPage>
		<IonContent>
=======
	<DashboardLayout>
		<div>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
			<div class="col-span-12 md:col-start-3 md:col-end-11">
				<div class="rounded-md flex flex-row items-center">
					<router-link active-class="activeSlideTab"
						class="w-1/2 text-center inactiveSlideTab"
<<<<<<< HEAD
						to="/questions/">
=======
						to="/questions">
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
						All Questions
					</router-link>
					<router-link active-class="activeSlideTab"
						class="w-1/2 text-center inactiveSlideTab"
						to="/questions/create">
						Ask your question
					</router-link>
				</div>
			</div>
<<<<<<< HEAD
			<all-questions />
		</IonContent>
	</IonPage>
=======
			<QuestionsList />
		</div>
	</DashboardLayout>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
</template>

<script lang="ts">
import { defineComponent } from 'vue'
<<<<<<< HEAD
import AllQuestions from '@app/components/questions/all.vue'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'Questions',
	components: {
		AllQuestions, IonContent, IonPage
	},
	layout: 'dashboard'
=======
import DashboardLayout from '@app/layouts/Dashboard.vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'

export default defineComponent({
	name: 'Questions',
	components: { QuestionsList, DashboardLayout }
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
})
</script>
