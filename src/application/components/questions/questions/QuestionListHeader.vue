<template>
	<div
		class="bg-primary h-32 rounded-b-xl sm:rounded-3xl flex items-center justify-between sm:mt-4 -mt-8 -mx-4 sm:mx-0 !z-40 py-6 lg:px-9 px-5">
		<ion-text class="text-white leading-tight lg:text-3xl text-xl font-bold">
			All questions
		</ion-text>
		<router-link to="/questions/create">
			<ion-button class="btn-white btn-white-sm font-bold">
				Ask a question
			</ion-button>
		</router-link>
	</div>

	<div
		class="flex items-center flex-col lg:flex-row justify-between  mb-8 lg:gap-14 gap-4 bg-white p-3 lg:rounded-2xl lg:py-3 py-4   lg:-mt-7 -mt-3 lg:!-mx-2.5 -mx-4">
		<div
			class="rounded-xl  text-sm   flex flex-row items-center gap-4  w-[92vw] lg:w-auto  bg-new_gray">
			<span class="bg-gray text-white px-4 py-2.5 rounded-lg font-bold w-44 grid place-items-center">
				All Subjects
			</span>
			<SelectSubject v-model:subjectId="subjectId" :show-all="true" class="w-auto -ml-4"
				placeholder="Search by subjects" />
		</div>
		<div class="flex items-center">
			<ion-segment v-model="answered" class="w-[92vw] lg:w-auto" mode="ios">
				<ion-segment-button v-for="choice in answeredChoices" :key="choice.key" :value="choice.val"
					class="!px-4" @click="answered = choice.val">
					<ion-label>{{ choice.key }}</ion-label>
				</ion-segment-button>
			</ion-segment>
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

<style scoped>
	.segment-button-checked {
		color: white !important
	}

	ion-segment {
		--background: #F2F3F5;
		color: #64778A;
		font-weight: bold;

	}

	ion-segment-button {
		--background-checked: #64778A;
		--background-focused: #64778A;
		--indicator-color: #64778A;
		--indicator-box-shadow: none;
		--padding-top: 0.5rem;
		--padding-bottom: 0.5rem;
		color: #64778A;
		font-weight: bold;
		margin: 0 !important;
	}
</style>
