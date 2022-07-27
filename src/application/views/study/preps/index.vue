<template>
	<DefaultLayout>
		<div class="h-full flex flex-col">
			<header class="flex flex-col px-4 lg:px-0 py-6 lg:pt-0 gap-2">
				<IonText class="font-bold text-lg">Improve your studying</IonText>
				<span>Here you can find exam MCQ solutions, exam theory solutions, and textbook solutions.</span>
				<form class="mt-4" @submit.prevent="search">
					<IonSearchbar v-model="searchValue" placeholder="Find solutions" type="search" />
				</form>
			</header>

			<div class="flex items-center justify-between">
				<a v-for="name in [ 'MCQs', 'Theories', 'Textbooks']" :key="name"
					:class="{ '!text-primaryBg !border-primaryBg': name === tab}"
					class="border-b-2 border-itemBg text-secondaryText p-4 capitalize w-full flex justify-center items-center"
					@click="tab = name">
					<span>{{ name }}</span>
				</a>
			</div>

			<div class="p-4 py-6 lg:px-0 flex-grow flex flex-col">
				<template v-if="tab === 'Textbooks'">
					<EmptyTests />
				</template>
				<template v-else>
					<div v-if="searchMode" class="min-h-full showcase-flex gap-4">
						<EmptySearch v-if="searchResults.length === 0" />
						<div v-else class="flex items-center justify-between gap-4 text-sm">
							<IonText class="font-bold">Search</IonText>
							<span class="flex text-secondaryText gap-1" @click="isOpen = true">
								<span>Filter</span>
								<IonIcon :icon="funnelOutline" />
							</span>
						</div>
						<TestPrepListCard v-for="prep in searchResults" :key="prep.hash" :testPrep="prep" />
					</div>
					<SavedTestPreps v-else :obj="tab === 'MCQs'" />
				</template>
			</div>

			<IonModal v-bind="{ ...modalProps, isOpen }" @didDismiss="isOpen = false">
				<Modal :close="() => isOpen = false" :removeHeaderBg="true">
					<template v-slot:title>Filters</template>
					<div class="flex flex-col gap-6">
						<div class="flex flex-col gap-2">
							<IonLabel>Select an institution</IonLabel>
							<IonSelect v-model="filters.institutionId" class="capitalize" interface="action-sheet"
								required>
								<IonSelectOption :value="null">All</IonSelectOption>
								<IonSelectOption v-for="institution in institutions" :key="institution.hash"
									:value="institution.id" class="capitalize">
									{{ institution.name }}
								</IonSelectOption>
							</IonSelect>
						</div>
						<div class="flex flex-col gap-2">
							<IonLabel>Select a subject/course</IonLabel>
							<IonSelect v-model="filters.courseId" class="capitalize" interface="action-sheet" required>
								<IonSelectOption :value="null">All</IonSelectOption>
								<IonSelectOption v-for="course in courses" :key="course.hash" :value="course.id"
									class="capitalize">
									{{ course.name }}
								</IonSelectOption>
							</IonSelect>
						</div>
						<div class="flex flex-col gap-2">
							<IonLabel>Select a year</IonLabel>
							<IonSelect v-model="filters.year" class="capitalize" interface="action-sheet" required>
								<IonSelectOption :value="null">All</IonSelectOption>
								<IonSelectOption v-for="year in years" :key="year" :value="year">
									{{ year }}
								</IonSelectOption>
							</IonSelect>
						</div>
						<IonButton class="btn-primary" @click="isOpen = false; search();">Show Results</IonButton>
					</div>
				</Modal>
			</IonModal>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import { funnelOutline } from 'ionicons/icons'
import SavedTestPreps from '@app/components/study/testPreps/SavedTestPreps.vue'
import TestPrepListCard from '@app/components/study/testPreps/SavedTestPrepListCard.vue'
import { modalProps } from '@app/composable/core/modal'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useCourseList } from '@app/composable/school/courses'
import { PastQuestionType } from '@modules/school'

export default defineComponent({
	name: 'StudyPreps',
	components: { TestPrepListCard, SavedTestPreps },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Test preps', {})
		const tab = ref('MCQs')
		const isOpen = ref(false)
		const { filters, searchValue, searchMode, searchResults, search } = useTestPrepList()
		const years = new Array(new Date().getFullYear() - 1980).fill(0).map((_, i, arr) => arr.length - i + 1980)
		const { institutions } = useInstitutionList()
		const { courses, fetchGeneralCourses } = useCourseList()
		const filteredCourses = computed(() => courses.value.filter((c) => c.institutionId === filters.institutionId))
		watch(tab, async (t) => {
			filters.questionTypes = t === 'MCQs' ? [PastQuestionType.objective] : Object.values(PastQuestionType).filter((c) => c !== PastQuestionType.objective)
			if (searchMode.value) await search()
		})

		watch(() => filters.institutionId, async () => {
			filters.courseId = null
			if (filters.institutionId) await fetchGeneralCourses(filters.institutionId)
		})

		onMounted(async () => {
			filters.questionTypes = [PastQuestionType.objective]
			if (filters.institutionId) await fetchGeneralCourses(filters.institutionId)
		})

		return {
			tab, isOpen, modalProps, funnelOutline,
			searchValue, searchMode, searchResults, search,
			filters, years, institutions, courses: filteredCourses
		}
	}
})
</script>
