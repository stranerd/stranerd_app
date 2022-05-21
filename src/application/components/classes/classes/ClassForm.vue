<template>
	<form class="flex flex-col gap-4 justify-center" @submit.prevent="null">
		<template v-if="tab === 0">
			<div class="flex flex-col items-start">
				<CoverAvatar :editable="true" :src="factory.coverPhoto" class="h-20"
					@photo="(p) => factory.coverPhoto = p" />
				<span class="modal-padding-x relative top-[-40px] inline-flex items-center justify-center -mb-10">
					<Avatar :editable="true" :name="factory.name" :size="80"
						:src="factory.photo" @photo="(p) => factory.photo = p" />
				</span>
			</div>
			<div class="flex flex-col gap-4 modal-padding-x">
				<ion-input v-model="factory.name"
					class="w-full bg-new_gray rounded-md"
					placeholder="Add a title"
					show-cancel-button="never"
				/>
				<ion-input v-model="factory.description"
					class="w-full bg-new_gray rounded-md"
					placeholder="Add a short description"
					show-cancel-button="never"
				/>

				<template v-if="showSchool">
					<div class="flex flex-col items-start gap-1">
						<ion-label>What school is the class in?</ion-label>
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
						<ion-label>What faculty is the class in?</ion-label>
						<ion-select v-model="factory.facultyId"
							class="bg-new_gray w-full capitalize"
							interface="action-sheet" placeholder="Select faculty"
							required>
							<ion-select-option v-for="faculty in filteredFaculties" :key="faculty.hash"
								:value="faculty.id"
								class="capitalize">
								{{ faculty.name }}
							</ion-select-option>
						</ion-select>
					</div>

					<div class="flex flex-col items-start gap-1">
						<ion-label>What department is the class in?</ion-label>
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
				</template>

				<ion-button class="btn-primary ml-auto" @click="tab = 1">Next</ion-button>
			</div>
		</template>
		<div v-else-if="tab === 1" class="flex flex-col gap-4 modal-padding-x">
			<div class="flex gap-4 items-center justify-between">
				<ion-input v-model="course"
					class="w-full bg-new_gray rounded-md"
					placeholder="Add a course"
					show-cancel-button="never"
					@keydown.enter.prevent="addCourse"
				/>
				<IonButton class="btn-primary" @click="addCourse">Add</IonButton>
			</div>

			<div class="flex flex-col gap-1" style="min-height: 178px;">
				<div v-for="(course, index) in factory.courses" :key="index + course"
					class="flex gap-4 items-center justify-between">
					<span class="truncate flex-grow text-main_dark">{{ course }}</span>
					<IonIcon :icon="closeOutline" class="text-red text-heading2"
						@click="factory.removeCourse(course)" />
				</div>
			</div>

			<div class="flex justify-between gap-4">
				<ion-button class="btn-outline border-primary text-primary" @click="tab = 0">Previous</ion-button>
				<ion-button :disabled="loading || !factory.valid" class="btn-primary" @click.prevent="submit">
					<slot name="buttonText">Submit</slot>
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
			</div>
			<PageLoading v-if="loading" />
		</div>
	</form>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { ClassFactory } from '@modules/classes'
import { IonLabel, IonRippleEffect, IonSelect, IonSelectOption } from '@ionic/vue'
import { closeOutline } from 'ionicons/icons'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useFacultyList } from '@app/composable/school/faculties'
import { useDepartmentList } from '@app/composable/school/departments'

export default defineComponent({
	name: 'ClassForm',
	components: { IonRippleEffect, IonSelect, IonSelectOption, IonLabel },
	props: {
		factory: {
			type: ClassFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		},
		showSchool: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props) {
		const tab = ref(0)
		const course = ref('')
		const addCourse = () => {
			if (!course.value) return
			props.factory.addCourse(course.value)
			course.value = ''
		}
		const { schools } = useInstitutionList()
		const { faculties, fetchFaculties } = useFacultyList()
		const { departments, fetchDepartments } = useDepartmentList()
		const filteredFaculties = computed(() => faculties.value.filter((f) => f.institutionId === props.factory.institutionId))
		const filteredDepartments = computed(() => departments.value.filter((d) => d.facultyId === props.factory.facultyId))

		watch(() => props.factory.institutionId, async () => {
			props.factory.resetProp('facultyId')
			if (props.factory.institutionId) await fetchFaculties(props.factory.institutionId)
		})

		watch(() => props.factory.facultyId, async () => {
			props.factory.resetProp('departmentId')
			if (props.factory.facultyId) await fetchDepartments(props.factory.facultyId)
		})
		return {
			tab, course, addCourse, closeOutline,
			schools, filteredFaculties, filteredDepartments
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-label {
		--color: #{$color-iconInactive} !important;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
