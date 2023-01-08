<template>
	<div class="flex flex-col justify-between card-sm card-padding">
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

<script lang="ts" setup>
import { TestPrepEntity } from '@modules/study'
import { useCreateTest } from '@app/composable/study/tests'
import Institution from '@app/components/school/institutions/Institution.vue'
import Course from '@app/components/school/courses/Course.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

const props = defineProps({
	testPrep: {
		type: TestPrepEntity,
		required: true
	}
})

const { loading, error, createTest } = useCreateTest()
</script>
