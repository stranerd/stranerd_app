<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="h-full page-padding flex flex-col">
			<div class="card-sm bg-highlight card-padding flex flex-col mb-8 items-center text-center gap-3">
				<IonText class="font-bold text-lg">Personalize Stranerd to what you study.</IonText>
				<IonText>We use this information to provide tools and resources that are relevant to you.</IonText>
				<IonText>
					Course-specific resources, tailored search results, and recommendations on what to study next for
					each of your courses.
				</IonText>
			</div>
			<PageLoading v-if="loading" />
			<div v-if="tab === 0" class="flex flex-col gap-4 flex-1">
				<IonList class="text-sm">
					<IonListHeader>
						<IonLabel class="font-bold text-xl">Choose your academic level</IonLabel>
					</IonListHeader>
					<IonRadioGroup v-model="factory.type" class="flex flex-col items-start" required>
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
				<div class="flex gap-4 items-center mt-auto">
					<IonButton class="btn-outline w-full" type="button" @click.prevent="skip">
						Skip Setup
					</IonButton>
					<IonButton class="btn-primary w-full" type="button" @click="tab = 1">
						Next
					</IonButton>
				</div>
			</div>
			<form v-if="tab === 1" class="flex flex-col gap-4 flex-1" @submit.prevent="submit">
				<template v-if="factory.isCollegeType">
					<div class="flex flex-col items-start gap-2">
						<IonLabel>What university are you in?</IonLabel>
						<IonSelect :key="schools.length"
							v-model="factory.institutionId" class="w-full capitalize"
							interface="action-sheet" placeholder="Select university"
							required>
							<IonSelectOption v-for="school in schools" :key="school.hash" :value="school.id"
								class="capitalize">
								{{ school.name }}
							</IonSelectOption>
						</IonSelect>
					</div>

					<div class="flex flex-col items-start gap-2">
						<IonLabel>What faculty are you in?</IonLabel>
						<IonSelect :key="filteredFaculties.length"
							v-model="factory.facultyId" class="w-full capitalize"
							interface="action-sheet" placeholder="Select faculty"
							required>
							<IonSelectOption v-for="faculty in filteredFaculties" :key="faculty.hash"
								:value="faculty.id"
								class="capitalize">
								{{ faculty.name }}
							</IonSelectOption>
						</IonSelect>
					</div>

					<div class="flex flex-col items-start gap-2">
						<IonLabel>What department are you in?</IonLabel>
						<IonSelect :key="filteredDepartments.length"
							v-model="factory.departmentId" class="w-full capitalize"
							interface="action-sheet" placeholder="Select department"
							required>
							<IonSelectOption v-for="department in filteredDepartments" :key="department.hash"
								:value="department.id"
								class="capitalize">
								{{ department.name }}
							</IonSelectOption>
						</IonSelect>
					</div>

					<div class="flex gap-4 items-center mt-auto">
						<IonButton class="btn-outline w-full" type="button" @click.prevent="skip">
							Skip Setup
						</IonButton>
						<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full" type="submit">
							<SpinLoading v-if="loading" />
							<span v-else>Save</span>
						</IonButton>
					</div>
				</template>
				<template v-else>
					<div class="flex flex-col items-start gap-2">
						<IonLabel class="font-semibold">What exam(s) are you studying for?</IonLabel>
						<IonSelect v-model="factory.institutions" :multiple="true"
							class="w-full capitalize"
							interface="alert"
							placeholder="Select exams" required>
							<IonSelectOption v-for="exam in gatewayExams" :key="exam.hash" :value="exam.id"
								class="capitalize">
								{{ exam.name }}
							</IonSelectOption>
						</IonSelect>
					</div>
					<div class="flex gap-4 items-center mt-auto">
						<IonButton class="btn-outline w-full" type="button" @click.prevent="tab = 0">
							Back
						</IonButton>
						<IonButton class="btn-primary w-full" type="button" @click.prevent="tab = 2">
							Next
						</IonButton>
					</div>
				</template>
			</form>
			<form v-if="tab === 2" class="flex flex-col gap-4 flex-1" @submit.prevent="submit">
				<div v-for="exam in factory.exams" :key="exam.institutionId"
					class="flex flex-col gap-2">
					<IonLabel class="font-semibold">
						<Institution :institutionId="exam.institutionId" />
						subject combination
					</IonLabel>
					<IonSelect v-model="factory.getInstitution(exam.institutionId).courseIds" :multiple="true"
						class="w-full capitalize"
						interface="alert" placeholder="Select subjects" required>
						<IonSelectOption v-for="course in courses.filter((c) => c.institutionId === exam.institutionId)"
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
				</div>
				<div class="flex gap-4 items-center mt-auto">
					<IonButton class="btn-outline w-full" type="button" @click.prevent="tab=1">
						Back
					</IonButton>
					<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full" type="submit">
						<SpinLoading v-if="loading" />
						<span v-else>Save</span>
					</IonButton>
				</div>
			</form>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { saveSchoolState } from '@app/composable/auth/session'
import { useUserSchoolUpdate } from '@app/composable/auth/profile'
import { useCourseList } from '@app/composable/school/courses'
import { useChooseSchool } from '@app/composable/school'
import { UserSchoolType } from '@modules/users'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'AccountSetupSchool',
	components: { Institution },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		const router = useRouter()
		useRouteMeta('Account setup', { back: true })
		const skip = async () => {
			await saveSchoolState()
			await router.push('/dashboard')
		}

		const tab = ref(1)
		const { factory, loading, error, updateSchool } = useUserSchoolUpdate()
		const submit = async () => {
			await updateSchool()
			await skip()
		}
		const { courses, fetchInstitutionCourses } = useCourseList()
		const {
			school, schools, gatewayExams, filteredFaculties, filteredDepartments
		} = useChooseSchool(factory.institutionId, factory.facultyId, factory.departmentId)

		watch(() => factory.institutionId, async () => {
			factory.resetProp('facultyId')
			school.institutionId = factory.institutionId
		})

		watch(() => factory.facultyId, async () => {
			factory.resetProp('departmentId')
			school.facultyId = factory.facultyId
		})

		watch(() => factory.departmentId, async () => {
			school.departmentId = factory.departmentId
		})

		watch(() => factory.exams, async () => {
			await Promise.all(factory.exams.map(async (exam) => fetchInstitutionCourses(exam.institutionId)))
		})

		onMounted(async () => {
			await Promise.all(factory.exams.map(async (exam) => fetchInstitutionCourses(exam.institutionId)))
		})

		return {
			tab, factory, loading, error, updateSchool, submit, UserSchoolType,
			schools, gatewayExams, courses, filteredFaculties, filteredDepartments,
			skip
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
