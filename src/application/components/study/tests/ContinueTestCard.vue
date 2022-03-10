<template>
	<div class="bg-white w-full rounded-xl flex flex-col box-border card-padding">
		<div>
			<div class="w-full flex justify-between items-center gap-2">
				<ion-text class="text-left w-full text-main_dark font-semibold truncate capitalize">
					<Institution v-if="testPrep && testPrep.isPastQuestionType"
						:institutionId="testPrep.data.institutionId" />
					<span v-else>{{ test.name }}</span>
				</ion-text>
				<router-link :to="`/study/tests/${test.id}`">
					<ion-icon :icon="arrowForwardCircleOutline" class="text-xl text-primary" />
				</router-link>
			</div>

			<ion-text class="text-sm text-left w-full text-gray truncate">
				{{ test.isTimed ? 'Timed' : 'Study' }}
				<span v-if="testPrep && testPrep.isPastQuestionType">
					>
					<Course :courseId="testPrep.data.courseId" />
					{{ testPrep.data.questionType }}
					({{ testPrep.data.year }})
				</span>
			</ion-text>
		</div>

		<ion-progress-bar :value="test.progress" />
	</div>
</template>

<script lang="ts">
import { arrowForwardCircleOutline, calendarOutline, playOutline } from 'ionicons/icons'
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
		return { formatNumber, arrowForwardCircleOutline, calendarOutline, playOutline, testPrep }
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
