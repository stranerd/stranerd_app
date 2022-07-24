<template>
	<div class="card flex flex-col card-sm p-4">
		<Course :courseId="testPrep.data.courseId" class="font-bold capitalize" />
		<Institution :institutionId="testPrep.data.institutionId" class="text-sm" />
		<div class="flex justify-between text-sm">
			<IonText>{{ testPrep.data.year }}</IonText>
			<SaveToSet :entity="testPrep">
				<template v-slot="{ isSaved }">
					<span :class="isSaved ? 'text-danger': 'text-primaryBg'">
						{{ isSaved ? 'delete' : 'save for later' }}
					</span>
				</template>
			</SaveToSet>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TestPrepEntity } from '@modules/study'
import { useCreateTest } from '@app/composable/study/tests'
import Institution from '@app/components/school/institutions/Institution.vue'
import Course from '@app/components/school/courses/Course.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'SavedTestPrepListCard',
	components: { Institution, Course, SaveToSet },
	props: {
		testPrep: {
			type: TestPrepEntity,
			required: true
		}
	},
	setup () {
		const { loading, error, createTest } = useCreateTest()
		return { loading, error, createTest }
	}
})
</script>
