<template>
	<router-link :to="`/study/tests/${test.id}/take`"
		class="m-0 bg-white w-full rounded-xl flex flex-col gap-2 box-border p-4">
		<div class="w-full flex justify-between items-center">
			<ion-text class="text-left w-full text-main_dark font-semibold truncate capitalize">
				<Institution v-if="testPrep && testPrep.isPastQuestionType"
					:institutionId="testPrep.data.institutionId" />
				<span v-else>{{ test.name }}</span>
			</ion-text>
			<ion-icon :icon="arrowForwardOutline" class="text-2xl text-primary" />
		</div>

		<ion-text class="text-sm text-left w-full text-gray mb-1 truncate">
			{{ test.isTimed ? 'Timed' : 'Study' }}
			<span v-if="testPrep && testPrep.isPastQuestionType">
				>
				<Course :courseId="testPrep.data.courseId" />
				{{ testPrep.data.questionType }}
				({{ testPrep.data.year }})
			</span>
		</ion-text>

		<ion-progress-bar :value="test.progress"  class="mt-6" />
	</router-link>
</template>

<script lang="ts">
import { arrowForwardOutline, calendarOutline, playOutline } from 'ionicons/icons'
import { IonProgressBar } from '@ionic/vue'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { TestEntity } from '@modules/study'
import { useTestPrep } from '@app/composable/study/testPreps'
import Institution from '@app/components/study/institutions/Institution.vue'
import Course from '@app/components/study/courses/Course.vue'

export default defineComponent({
	name: 'ContinueTestCard',
	components: { IonProgressBar, Institution, Course },
	props: {
		test: {
			required: true,
			type: TestEntity
		}
	},
	setup (props) {
		const { testPrep } = useTestPrep(props.test.prepId)
		return { formatNumber, arrowForwardOutline, calendarOutline, playOutline, testPrep }
	}
})
</script>

<style lang="scss" scoped>
	ion-progress-bar {
		height: .5rem !important;
		border-radius: 12px !important;
		@media (max-width: 768px) {
			height: .25rem !important;
		}
			
		
	}

	ion-progress-bar::part(progress) {
		border-radius: 120px !important;
	}
</style>
