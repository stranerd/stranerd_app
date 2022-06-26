<template>
	<DefaultLayout>
		<template v-slot:panel>
			<SettingsPanel />
		</template>
		<form class="flex flex-col page-padding lg:gap-8" @submit.prevent="updateSchool">
			<IonList class="border-bottom-line text-sm">
				<IonListHeader>
					<IonLabel class="font-bold text-xl">Choose your academic level*</IonLabel>
				</IonListHeader>
				<IonRadioGroup v-model="factory.type" class="flex flex-col items-start" required>
					<IonItem class="flex items-center gap-4">
						<IonRadio slot="start" :value="UserSchoolType.secondary" />
						<IonLabel>Secondary school</IonLabel>
					</IonItem>
					<IonItem class="flex items-center gap-4">
						<IonRadio slot="start" :value="UserSchoolType.aspirant" />
						<IonLabel>Secondary school leaver</IonLabel>
					</IonItem>
					<IonItem class="flex items-center gap-4">
						<IonRadio slot="start" :value="UserSchoolType.college" />
						<IonLabel>University</IonLabel>
					</IonItem>
				</IonRadioGroup>
			</IonList>

			<div v-if="factory.isCollegeType" class="border-bottom-line flex flex-col gap-4">
				<IonText class="text-xl font-semibold">University set up</IonText>

				<div class="flex flex-col items-start gap-1">
					<IonLabel>What university are you in?</IonLabel>
					<IonSelect v-model="factory.institutionId"
						class="w-full capitalize"
						interface="action-sheet" placeholder="Select university"
						required>
						<IonSelectOption v-for="school in schools" :key="school.hash" :value="school.id"
							class="capitalize">
							{{ school.name }}
						</IonSelectOption>
					</IonSelect>
				</div>

				<div class="flex flex-col items-start gap-1">
					<IonLabel>What faculty are you in?</IonLabel>
					<IonSelect v-model="factory.facultyId"
						class="w-full capitalize"
						interface="action-sheet" placeholder="Select faculty"
						required>
						<IonSelectOption v-for="faculty in filteredFaculties" :key="faculty.hash" :value="faculty.id"
							class="capitalize">
							{{ faculty.name }}
						</IonSelectOption>
					</IonSelect>
				</div>

				<div class="flex flex-col items-start gap-1">
					<IonLabel>What department are you in?</IonLabel>
					<IonSelect v-model="factory.departmentAndTag"
						class="w-full capitalize"
						interface="action-sheet" placeholder="Select department"
						required>
						<IonSelectOption v-for="department in filteredDepartments" :key="department.hash"
							:value="department.idAndTag"
							class="capitalize">
							{{ department.name }}
						</IonSelectOption>
					</IonSelect>
				</div>

				<IonButton :disabled="loading || !factory.valid" class="!w-full btn-primary" type="submit">
					<SpinLoading v-if="loading" />
					<span v-else>Save School</span>
				</IonButton>
			</div>

			<template v-else>
				<div class="border-bottom-line flex flex-col gap-4">
					<IonLabel class="font-semibold">What exam(s) are you studying for?</IonLabel>
					<IonSelect v-model="factory.institutions"
						:multiple="true" class="w-full capitalize"
						interface="alert"
						placeholder="Select exams" required>
						<IonSelectOption v-for="exam in gatewayExams" :key="exam.hash" :value="exam.id"
							class="capitalize">
							{{ exam.name }}
						</IonSelectOption>
					</IonSelect>
				</div>

				<div v-for="(exam, index) in factory.exams" :key="exam.institutionId"
					class="border-bottom-line flex flex-col gap-4">
					<IonLabel class="font-semibold">
						<Institution :institutionId="exam.institutionId" />
						subject combination
					</IonLabel>
					<IonSelect v-model="factory.getInstitution(exam.institutionId).courseIds" :multiple="true"
						class="w-full capitalize"
						interface="alert" placeholder="Select subjects" required>
						<IonSelectOption
							v-for="course in courses.filter((c) => c.institutionId === exam.institutionId)"
							:key="course.hash" :value="course.id" class="capitalize">
							{{ course.name }}
						</IonSelectOption>
					</IonSelect>
					<div class="flex flex-col lg:flex-row gap-4">
						<IonInput v-model="factory.getInstitution(exam.institutionId).startTime"
							class="w-full" placeholder="Select start date" required
							type="date" />
						<IonInput v-model="factory.getInstitution(exam.institutionId).endTime"
							:min="factory.getInstitution(exam.institutionId).startTime"
							class="w-full" placeholder="Select end date" required
							type="date" />
					</div>
					<IonButton v-if="index === factory.exams.length - 1" :disabled="loading || !factory.valid"
						class="!w-full btn-primary" type="submit">
						Save School
						<SpinLoading v-if="loading" />
					</IonButton>
				</div>
			</template>
		</form>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useUserSchoolUpdate } from '@app/composable/auth/profile'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useCourseList } from '@app/composable/school/courses'
import { useFacultyList } from '@app/composable/school/faculties'
import { useDepartmentList } from '@app/composable/school/departments'
import { UserSchoolType } from '@modules/users'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import SettingsPanel from '@app/components/layout/panels/SettingsPanel.vue'

export default defineComponent({
	name: 'SettingsSchool',
	components: { Institution, SettingsPanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Edit School', { back: true })
		const { factory, error, loading, updateSchool } = useUserSchoolUpdate()

		const { schools, gatewayExams } = useInstitutionList()
		const { courses, fetchGeneralCourses } = useCourseList()
		const { faculties, fetchFaculties } = useFacultyList()
		const { departments, fetchDepartments } = useDepartmentList()
		const filteredFaculties = computed(() => faculties.value.filter((f) => f.institutionId === factory.value.institutionId))
		const filteredDepartments = computed(() => departments.value.filter((d) => d.facultyId === factory.value.facultyId))

		watch(() => factory.value.institutionId, async () => {
			factory.value.resetProp('facultyId')
			if (factory.value.institutionId) {
				await fetchFaculties(factory.value.institutionId)
				await fetchGeneralCourses(factory.value.institutionId)
			}
		})

		watch(() => factory.value.facultyId, async () => {
			factory.value.resetProp('departmentId')
			if (factory.value.facultyId) await fetchDepartments(factory.value.facultyId)
		})

		watch(() => factory.value.exams, async () => {
			await Promise.all(factory.value.exams.map(async (exam) => fetchGeneralCourses(exam.institutionId)))
		})
		onMounted(async () => {
			await Promise.all(factory.value.exams.map(async (exam) => fetchGeneralCourses(exam.institutionId)))
			if (factory.value.institutionId) {
				await fetchFaculties(factory.value.institutionId)
				await fetchGeneralCourses(factory.value.institutionId)
			}
			if (factory.value.facultyId) await fetchDepartments(factory.value.facultyId)
		})

		return {
			factory, error, loading, updateSchool, UserSchoolType,
			schools, gatewayExams, filteredFaculties, filteredDepartments, courses
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-list-header {
		--color: inherit;
		--color-checked: #{$color-primaryBg};
		padding-left: 0 !important;

		ion-label {
			margin-top: 0 !important;
		}
	}
</style>
