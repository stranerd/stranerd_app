<template>
	<router-link
		:class="`m-0 min-w-[16.5rem] bg-white w-full rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border p-6 `"
		:to="`/study/tests/${test.id}/take`"
	>
		<div class="flex flex-col items-center justify-between w-full mx-auto capitalize">
			<div class="w-full flex justify-between items-center">
				<ion-text class="text-base text-left w-full text-main_dark font-bold">
					<Institution v-if="testPrep && testPrep.isPastQuestionType"
						:institutionId="testPrep.data.institutionId" />
					<span v-else>{{ test.name }}</span>
				</ion-text>
				<ion-icon :icon="arrowForward" class="text-3xl text-gray" />
			</div>

			<ion-text class="text-base text-left w-full text-gray font-bold">
				{{ test.isTimed ? 'Timed' : 'Study' }}
				<span v-if="testPrep && testPrep.isPastQuestionType">
					>
					<Course :courseId="testPrep.data.courseId" />
					({{ testPrep.data.year }})
				</span>
			</ion-text>

			<ion-progress-bar class="mt-10" value="0.5" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { arrowForward, calendar, play } from 'ionicons/icons'
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
		return { formatNumber, arrowForward, calendar, play, testPrep }
	}
})
</script>

<style lang="scss" scoped>
	ion-progress-bar {
		height: .55rem !important;
		border-radius: 12px !important;
	}

	ion-progress-bar::part(progress) {
		border-radius: 120px !important;
	}

	ion-card {
		box-shadow: none !important;

	}
</style>
