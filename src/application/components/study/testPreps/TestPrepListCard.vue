<template>
	<div
		class="w-full min-h-40 bg-white rounded-xl flex flex-col justify-between box-border !gap-2 card-padding text-main_dark">
		<div>
			<div class="flex justify-between gap-2">
				<ion-text class="font-semibold truncate w-full">
					<Institution :institutionId="testPrep.data.institutionId" />
				</ion-text>
				<ion-icon :icon="isSaved ? bookmark : bookmarkOutline" class="text-xl text-gray"
					@click="openSaveModal(testPrep)" />
			</div>
			<IonText class="text-gray text-sm truncate">
				<Course :courseId="testPrep.data.courseId" />
				({{ testPrep.data.questionType }} {{ testPrep.data.year }})
			</IonText>
		</div>

		<div class="w-full flex items-center justify-end gap-2">
			<ion-button v-if="testPrep.canTest" class="btn-primary" size="small"
				@click="createTest(testPrep, true)">
				Test
			</ion-button>
			<ion-button v-if="testPrep.canStudy" class="btn-outline text-primary"
				size="small"
				@click="createTest(testPrep, false)">
				Solutions
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { bookmark, bookmarkOutline, calendarOutline, ellipsisVerticalOutline, playOutline } from 'ionicons/icons'
import { computed, defineComponent } from 'vue'
import { TestPrepEntity } from '@modules/study'
import { useCreateTest } from '@app/composable/study/tests'
import Institution from '@app/components/study/institutions/Institution.vue'
import Course from '@app/components/study/courses/Course.vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { openSaveModal } from '@app/composable/study/menus'

export default defineComponent({
	name: 'TestPrepListCard',
	components: { Institution, Course },
	props: {
		testPrep: {
			type: TestPrepEntity,
			required: true
		}
	},
	setup (props) {
		const { loading, error, createTest } = useCreateTest()
		const { sets } = useUserSetList()
		const isSaved = computed(() => sets.value.some((set) => set.allSaved.includes(props.testPrep.id)))
		return {
			ellipsisVerticalOutline, calendarOutline, playOutline, bookmark, bookmarkOutline,
			loading, error, createTest,
			isSaved, openSaveModal
		}
	}
})
</script>
