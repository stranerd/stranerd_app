<template>
	<router-link :to="`/study/tests/${test.id}`"
		class="bg-white w-full rounded-xl flex flex-col box-border card-padding justify-between">
		<div class="flex flex-col">
			<div class="flex justify-between">
				<ion-text class="text-left w-full text-main_dark font-500 truncate capitalize">
					<Institution v-if="testPrep && testPrep.isPastQuestionType"
						:institutionId="testPrep.data.institutionId" />
					<span v-else>{{ test.name }}</span>
				</ion-text>

				<Tag :index="5" :tag="test.isTimed ? 'Timed' : 'Study'" />
			</div>

			<ion-text class="text-left w-full text-gray text-sub truncate">
				<span v-if="testPrep && testPrep.isPastQuestionType">
					<Course :courseId="testPrep.data.courseId" />
					{{ testPrep.data.questionType }}
					({{ testPrep.data.year }})
				</span>
			</ion-text>
		</div>

		<ion-progress-bar :value="test.progress" />
	</router-link>
</template>

<script lang="ts">
import { calendarOutline, playOutline } from 'ionicons/icons'
import { IonProgressBar } from '@ionic/vue'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { TestEntity } from '@modules/study'
import { useTestPrep } from '@app/composable/study/testPreps'
import Institution from '@app/components/school/institutions/Institution.vue'
import Course from '@app/components/school/courses/Course.vue'
import Tag from '../../core/Tag.vue'

export default defineComponent({
	name: 'ContinueTestCard',
	components: { IonProgressBar, Institution, Course, Tag },
	props: {
		test: {
			required: true,
			type: TestEntity
		}
	},
	setup (props) {
		const { testPrep } = useTestPrep(props.test.prepId)
		return { formatNumber, calendarOutline, playOutline, testPrep }
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
