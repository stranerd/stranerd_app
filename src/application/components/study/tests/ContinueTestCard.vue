<template>
	<router-link :to="`/study/tests/${test.id}`"
		class="flex flex-col card-padding rounded-xl border border-2 border-itemBg !gap-6">
		<div class="flex flex-col">
			<div class="flex justify-between gap-4">
				<IonText class="flex-1 font-bold truncate capitalize">
					<Course v-if="testPrep && testPrep.isPastQuestionType"
						:courseId="testPrep.data.courseId" />
					<span v-else>{{ test.name }}</span>
				</IonText>
				<Tag :class="test.isTimed ? '!bg-royal' : '!bg-warning'" :tag="test.isTimed ? 'Timed' : 'Study'"
					class="!text-primaryText !text-xs" />
			</div>

			<Institution v-if="testPrep && testPrep.isPastQuestionType" :institutionId="testPrep.data.institutionId"
				class="text-sm" />

			<IonText v-if="testPrep" class="flex flex-col text-sm capitalize">
				{{ testPrep.data.questionType }} {{ testPrep.data.year }}
			</IonText>
		</div>

		<IonProgressBar :value="test.progress" />
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TestEntity } from '@modules/study'
import { useTestPrep } from '@app/composable/study/testPreps'
import Institution from '@app/components/school/institutions/Institution.vue'
import Course from '@app/components/school/courses/Course.vue'

export default defineComponent({
	name: 'ContinueTestCard',
	components: { Institution, Course },
	props: {
		test: {
			required: true,
			type: TestEntity
		}
	},
	setup (props) {
		const { testPrep } = useTestPrep(props.test.prepId)
		return { testPrep }
	}
})
</script>

<style lang="scss" scoped>
ion-progress-bar {
	--background: #{$color-itemBg};
	--progress-background: #{$color-success};
	height: .5rem !important;
	border-radius: 12px !important;
}
</style>
