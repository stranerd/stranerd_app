<template>
	<div
		class="min-h-40 flex flex-col justify-between !gap-2 card-padding">
		<div>
			<div class="flex justify-between gap-2">
				<IonText class="font-500 truncate w-full">
					<Institution :institutionId="testPrep.data.institutionId" />
				</IonText>
				<SaveToSet :entity="testPrep" />
			</div>
			<IonText class="truncate">
				<Course :courseId="testPrep.data.courseId" />
				({{ testPrep.data.questionType }} {{ testPrep.data.year }})
			</IonText>
		</div>

		<div class="w-full flex items-center justify-end gap-2">
			<IonButton v-if="testPrep.canTest" class="btn-primary"
				@click="createTest(testPrep, true)">
				Test
			</IonButton>
			<IonButton v-if="testPrep.canStudy" class="btn-outline"
				@click="createTest(testPrep, false)">
				Solutions
			</IonButton>
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
