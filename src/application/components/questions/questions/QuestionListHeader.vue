<template>
	<div class="md:px-4 md:pt-12 pb-8">
		<div
			class="bg-white md:rounded-xl flex items-center justify-between p-3">
			<ion-text class="text-main_dark leading-tight lg:text-3xl text-xl font-bold ml-2">
				All questions
			</ion-text>
			<div class="flex items-center">
				<SelectSubject v-model:subjectId="subjectId" :show-all="true" class="w-32 mr-4 font-bold h-11"
					placeholder="Subject" />

				<ion-select v-model="answered"
					class="bg-new_gray !text-gray h-11 w-28 font-bold select-primary mr-4" interface="action-sheet"
					placeholder="State">
					<ion-select-option v-for="choice in answeredChoices" :key="choice.key"
						:value="choice.val" @click="answered = choice.val" >
						{{ choice.key}}
					</ion-select-option>
				</ion-select>

				<router-link to="/questions/create">
					<ion-button class="btn-primary font-bold">
						Ask a question
					</ion-button>
				</router-link>
			</div>
	
		</div>

		
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuestionList } from '@app/composable/questions/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import { IonSegment, IonSegmentButton } from '@ionic/vue'

export default defineComponent({
	name: 'QuestionListHeader',
	components: { SelectSubject,  },
	setup () {
		const { answeredChoices, answered, subjectId } = useQuestionList()
		return {
			answeredChoices, answered, subjectId
		}
	}
})
</script>
