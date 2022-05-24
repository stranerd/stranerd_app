<template>
	<div
		class="w-full min-h-40 bg-white rounded-xl flex flex-col justify-between box-border !gap-2 card-padding text-secondaryText">
		<div>
			<div class="flex justify-between gap-2">
				<ion-text class="font-500 truncate w-full">
					<Institution :institutionId="testPrep.data.institutionId" />
				</ion-text>
				<SaveToSet :entity="testPrep" />
			</div>
			<IonText class="text-gray truncate">
				<Course :courseId="testPrep.data.courseId" />
				({{ testPrep.data.questionType }} {{ testPrep.data.year }})
			</IonText>
		</div>

		<div class="w-full flex items-center justify-end gap-2">
			<ion-button v-if="testPrep.canTest" class="btn-primary btn-sm"
				@click="createTest(testPrep, true)">
				Test
			</ion-button>
			<ion-button v-if="testPrep.canStudy" class="btn-outline text-primary btn-sm"
				@click="createTest(testPrep, false)">
				Solutions
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { calendarOutline, ellipsisVerticalOutline, playOutline } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { TestPrepEntity } from '@modules/study'
import { useCreateTest } from '@app/composable/study/tests'
import Institution from '@app/components/school/institutions/Institution.vue'
import Course from '@app/components/school/courses/Course.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'TestPrepListCard',
	components: { Institution, Course, SaveToSet },
	props: {
		testPrep: {
			type: TestPrepEntity,
			required: true
		}
	},
	setup () {
		const { loading, error, createTest } = useCreateTest()
		return {
			ellipsisVerticalOutline, calendarOutline, playOutline,
			loading, error, createTest
		}
	}
})
</script>
