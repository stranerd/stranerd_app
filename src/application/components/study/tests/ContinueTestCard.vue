<template>
	<router-link :to="`/study/tests/${test.id}`"
		class="w-full flex flex-col card-padding justify-between">
		<div class="flex flex-col">
			<div class="flex justify-between">
				<IonText class="text-left w-full font-500 truncate capitalize">
					<Institution v-if="testPrep && testPrep.isPastQuestionType"
						:institutionId="testPrep.data.institutionId" />
					<span v-else>{{ test.name }}</span>
				</IonText>
				<Tag :tag="test.isTimed ? 'Timed' : 'Study'" />
			</div>

			<IonText class="text-left w-full text-sub truncate">
				<span v-if="testPrep && testPrep.isPastQuestionType">
					<Course :courseId="testPrep.data.courseId" />
					{{ testPrep.data.questionType }}
					({{ testPrep.data.year }})
				</span>
			</IonText>
		</div>

		<IonProgressBar :value="test.progress" />
	</router-link>
</template>

<script lang="ts">
import { calendarOutline, playOutline } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { TestEntity } from '@modules/study'
import { useTestPrep } from '@app/composable/study/testPreps'
import Institution from '@app/components/school/institutions/Institution.vue'
import Course from '@app/components/school/courses/Course.vue'
import Tag from '../../core/Tag.vue'

export default defineComponent({
	name: 'ContinueTestCard',
	components: { Institution, Course, Tag },
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
