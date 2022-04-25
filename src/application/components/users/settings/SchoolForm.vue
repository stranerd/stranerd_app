<template>
	<PageLoading v-if="loading" />
	<div v-if="tab === 0" class="flex flex-col gap-4 modal-padding-x">
		<IonList class="text-sub">
			<ion-radio-group v-model="factory.type" class="flex flex-col items-start" required>
				<IonListHeader>
					<ion-label class="font-bold text-heading">Choose your academic level *</ion-label>
				</IonListHeader>
				<IonItem class="flex items-center gap-4">
					<ion-radio slot="start" :value="UserSchoolType.secondary" />
					<ion-label>Secondary school</ion-label>
				</IonItem>
				<IonItem class="flex items-center gap-4">
					<ion-radio slot="start" :value="UserSchoolType.aspirant" />
					<ion-label>Secondary school leaver</ion-label>
				</IonItem>
				<IonItem class="flex items-center gap-4">
					<ion-radio slot="start" :value="UserSchoolType.college" />
					<ion-label>University</ion-label>
				</IonItem>
			</ion-radio-group>
		</IonList>
		<div class="flex w-full gap-2 items-center justify-between">
			<ion-button class="btn-secondary w-24" size="small" type="button" @click.prevent="back">
				Back
				<ion-ripple-effect class="rounded-lg" />
			</ion-button>
			<ion-button class="btn-primary w-24" size="small" type="button" @click="tab = 1">
				Next
				<ion-ripple-effect class="rounded-lg" />
			</ion-button>
		</div>
	</div>
	<form v-if="tab === 1" class="flex flex-col gap-4 modal-padding-x" @submit.prevent="submit">
		<template v-if="factory.isCollegeType">
			<div class="flex flex-col items-start gap-1">
				<ion-label>What university are you in?</ion-label>
				<ion-select v-model="factory.institutionId"
					class="bg-new_gray w-full capitalize"
					interface="action-sheet" placeholder="Select university"
					required>
					<ion-select-option v-for="school in schools" :key="school.hash" :value="school.id"
						class="capitalize">
						{{ school.name }}
					</ion-select-option>
				</ion-select>
			</div>

			<div class="flex flex-col items-start gap-1">
				<ion-label>What faculty are you in?</ion-label>
				<ion-select v-model="factory.facultyId"
					class="bg-new_gray w-full capitalize"
					interface="action-sheet" placeholder="Select faculty"
					required>
					<ion-select-option v-for="faculty in filteredFaculties" :key="faculty.hash" :value="faculty.id"
						class="capitalize">
						{{ faculty.name }}
					</ion-select-option>
				</ion-select>
			</div>

			<div class="flex flex-col items-start gap-1">
				<ion-label>What department are you in?</ion-label>
				<ion-select v-model="factory.departmentId"
					class="bg-new_gray w-full capitalize"
					interface="action-sheet" placeholder="Select department"
					required>
					<ion-select-option v-for="department in filteredDepartments" :key="department.hash"
						:value="department.id"
						class="capitalize">
						{{ department.name }}
					</ion-select-option>
				</ion-select>
			</div>

			<div class="flex w-full gap-2 items-center justify-between">
				<ion-button class="btn-secondary w-24" size="small" type="button" @click.prevent="back">
					Back
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
				<ion-button class="btn-primary w-24" size="small" type="submit">
					Done
					<SpinLoading v-if="loading" />
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
			</div>
		</template>
		<template v-else>
			<div>
				<IonLabel class="font-semibold">What exam(s) are you studying for?</IonLabel>
				<ion-select v-model="factory.institutions" :multiple="true"
					class="bg-new_gray w-full capitalize"
					interface="alert"
					placeholder="Select exams" required>
					<ion-select-option v-for="exam in gatewayExams" :key="exam.hash" :value="exam.id"
						class="capitalize">
						{{ exam.name }}
					</ion-select-option>
				</ion-select>
			</div>
			<div class="flex w-full justify-between gap-2 items-center">
				<ion-button class="btn-secondary w-24" size="small" type="button" @click.prevent="back">
					Back
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
				<ion-button class="btn-primary w-24" size="small" type="button" @click.prevent="tab = 2">
					Next
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
			</div>
		</template>
	</form>
	<form v-if="tab === 2" class="flex flex-col gap-4 modal-padding-x" @submit.prevent="submit">
		<div v-for="exam in factory.exams" :key="exam.institutionId"
			class="flex flex-col gap-4">
			<IonLabel class="font-semibold">
				<Institution :institutionId="exam.institutionId" />
				subject combination
			</IonLabel>
			<ion-select v-model="exam.courseIds" :multiple="true" class="bg-new_gray w-full capitalize"
				interface="alert"
				placeholder="Select subjects" required>
				<ion-select-option v-for="course in courses.filter((c) => c.institutionId === exam.institutionId)"
					:key="course.hash" :value="course.id" class="capitalize">
					{{ course.name }}
				</ion-select-option>
			</ion-select>
			<div class="flex flex-col md:flex-row gap-4">
				<IonInput :min="new Date().toISOString().substring(0, 10)"
					:value="new Date(exam.startDate).toISOString().substring(0, 10)"
					class="w-full bg-new_gray" placeholder="Select start date" required
					type="date"
					@change="(e) => exam.startDate = new Date(e.target.value).getTime()" />
				<IonInput :min="new Date(exam.startDate).toISOString().substring(0, 10)"
					:value="new Date(exam.endDate).toISOString().substring(0, 10)"
					class="w-full bg-new_gray" placeholder="Select end date" required
					type="date"
					@change="(e) => exam.endDate = new Date(e.target.value).getTime()" />
			</div>
		</div>
		<div class="flex w-full justify-between gap-2 items-center">
			<ion-button class="btn-secondary w-24" size="small" type="button" @click.prevent="back">
				Back
				<ion-ripple-effect class="rounded-lg" />
			</ion-button>
			<ion-button class="btn-primary w-24" size="small" type="submit">
				Done
				<SpinLoading v-if="loading" />
				<ion-ripple-effect class="rounded-lg" />
			</ion-button>
		</div>
	</form>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useUserSchoolUpdate } from '@app/composable/auth/profile'
import { UserSchoolType } from '@modules/users'
import {
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonRadio,
	IonRadioGroup,
	IonRippleEffect,
	IonSelect,
	IonSelectOption
} from '@ionic/vue'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useCourseList } from '@app/composable/school/courses'
import { useFacultyList } from '@app/composable/school/faculties'
import { useDepartmentList } from '@app/composable/school/departments'
import Institution from '@app/components/school/institutions/Institution.vue'

export default defineComponent({
	name: 'SchoolForm',
	components: {
		IonRadioGroup, IonRippleEffect, IonRadio, IonSelect, IonSelectOption,
		IonLabel, IonList, IonListHeader, IonItem,
		Institution
	},
	props: {
		next: {
			type: Function,
			required: true
		},
		back: {
			type: Function,
			required: true
		}
	},
	setup (props) {
		const tab = ref(0)
		const { factory, loading, error, updateSchool } = useUserSchoolUpdate()
		const submit = async () => {
			await updateSchool()
			props.next()
		}
		const { schools, gatewayExams } = useInstitutionList()
		const { courses } = useCourseList()
		const { faculties, fetchFaculties } = useFacultyList()
		const { departments } = useDepartmentList()
		const filteredFaculties = computed(() => faculties.value.filter((f) => f.institutionId === factory.value.institutionId))
		const filteredDepartments = computed(() => departments.value.filter((d) => d.facultyId === factory.value.facultyId))

		watch(() => factory.value.institutionId, async () => {
			factory.value.resetProp('facultyId')
			if (factory.value.institutionId) await fetchFaculties(factory.value.institutionId)
		})

		return {
			tab, factory, loading, error, updateSchool, submit, UserSchoolType,
			schools, gatewayExams, courses, filteredFaculties, filteredDepartments
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-label {
		--color: #{$color-mainDark} !important;
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
