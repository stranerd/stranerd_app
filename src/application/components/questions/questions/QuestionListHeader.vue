<template>
	<div class="md:px-4 md:pt-4 pb-8">
		<div
			class="bg-primary md:rounded-t-3xl flex items-center justify-between py-6 lg:px-9 px-5">
			<ion-text class="text-white leading-tight lg:text-3xl text-xl font-bold">
				All questions
			</ion-text>
			<router-link to="/questions/create">
				<ion-button class="btn-white font-bold">
					Ask a question
				</ion-button>
			</router-link>
		</div>

		<div
			class="flex items-center flex-col lg:flex-row justify-between lg:gap-14 gap-4 bg-white p-3 md:rounded-b-2xl lg:py-3 py-4">
			<div
				class="rounded-xl text-sm  flex flex-row items-center gap-4 w-[92vw] lg:w-auto bg-new_gray">
				<span class="bg-gray text-white px-4 py-2.5 rounded-lg font-bold w-44 grid place-items-center">
					All Subjects
				</span>
				<SelectSubject v-model:subjectId="subjectId" :show-all="true" class="w-auto -ml-4"
					placeholder="Search by subjects" />
			</div>
			<div class="flex items-center">
				<ion-segment v-model="answered" class="w-[92vw] lg:w-auto bg-new_gray" mode="ios">
					<ion-segment-button v-for="choice in answeredChoices" :key="choice.key" :value="choice.val"
						class="!px-3 ion-segment-button" @click="answered = choice.val">
						<ion-label>{{ choice.key }}</ion-label>
					</ion-segment-button>
				</ion-segment>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { chevronDown, chevronUp, flash, folder } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { useQuestionList } from '@app/composable/questions/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import { IonSegment, IonSegmentButton } from '@ionic/vue'

export default defineComponent({
	name: 'QuestionListHeader',
	components: { SelectSubject, IonSegment, IonSegmentButton },
	setup () {
		const { answeredChoices, answered, subjectId } = useQuestionList()
		return {
			answeredChoices, answered, subjectId,
			chevronDown, chevronUp, folder, flash
		}
	}
})
</script>
