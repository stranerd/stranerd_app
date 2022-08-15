<template>
	<PrepsWrapper>
		<div class="h-full flex flex-col lg:gap-8">
			<div class="flex items-center p-4 lg:p-0 gap-4">
				<form v-if="institutions.length" class="flex-2" @submit.prevent="search">
					<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
				</form>
				<IonSelect v-model="institutionId" class="capitalize flex-1" interface="action-sheet">
					<IonSelectOption :value="null" disabled>Select Institution</IonSelectOption>
					<IonSelectOption v-for="institution in institutions" :key="institution.hash" :value="institution.id"
						class="capitalize">
						{{ institution.name }}
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="showcase-flex px-4 gap-4 lg:px-0">
				<EmptyState v-if="!loading && !error && courses.length === 0"
					:info="institutionId ? 'No courses found' : 'Select an institution first'" />
				<router-link v-for="course in (searchMode ? searchResults : courses)"
					:key="course.hash" :to="`/study/preps/courses/${course.id}`"
					class="capitalize card-padding rounded-xl border border-2 border-itemBg font-bold">
					{{ course.name }}
				</router-link>
				<BlockLoading v-if="loading" />
			</div>
		</div>
	</PrepsWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { orComputed, useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useCourseList } from '@app/composable/school/courses'
import PrepsWrapper from '@app/components/study/testPreps/PrepsWrapper.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'StudyPrepsPractice',
	components: { PrepsWrapper },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Test preps', { back: true })
		const { user } = useAuth()
		const institutionId = ref(user.value?.firstInstitution ?? null)
		const { institutions, loading: institutionsLoading, error: institutionsError } = useInstitutionList()
		const {
			courses, loading: coursesLoading, error: coursesError, fetchInstitutionCourses,
			searchValue, searchMode, searchResults, search
		} = useCourseList()
		const filteredCourses = computed(() => {
			const c = searchMode.value ? searchResults.value : courses.value
			if (!institutionId.value) return c
			return c.filter((c) => c.institutionId === institutionId.value)
		})

		watch([institutionId], async () => {
			if (institutionId.value) await fetchInstitutionCourses(institutionId.value)
		})

		onMounted(async () => {
			if (institutionId.value) await fetchInstitutionCourses(institutionId.value)
		})

		const loading = orComputed([institutionsLoading, coursesLoading])
		const error = orComputed([institutionsError, coursesError])

		return {
			searchValue, searchMode, searchResults, search,
			institutionId, institutions, courses: filteredCourses, loading, error
		}
	}
})
</script>
