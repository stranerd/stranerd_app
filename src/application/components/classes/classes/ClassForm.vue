<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<Avatar :editable="true" :name="factory.name" :size="80" :src="factory.photo" @photo="savePhoto" />

		<div class="flex flex-col gap-2">
			<IonLabel>Title</IonLabel>
			<IonInput v-model="factory.name"
				:class="{'valid': factory.isValid('name'), 'invalid': factory.errors.name}"
				:disabled="disabled.name"
				placeholder="Name your class"
				show-cancel-button="never"
			/>
			<DisplayError :error="factory.errors.name" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel>Description</IonLabel>
			<IonInput v-model="factory.description"
				:class="{'valid': factory.isValid('description'), 'invalid': factory.errors.description}"
				:disabled="disabled.description"
				placeholder="Add a short description"
				show-cancel-button="never"
			/>
			<DisplayError :error="factory.errors.description" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel>University</IonLabel>
			<IonSelect v-model="factory.institutionId" :disabled="disabled.institutionId"
				class="capitalize" interface="action-sheet"
				placeholder="Select your university" required>
				<IonSelectOption v-for="school in schools" :key="school.hash" :value="school.id"
					class="capitalize">
					{{ school.name }}
				</IonSelectOption>
			</IonSelect>
			<DisplayError :error="factory.errors.institutionId" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel>Faculty</IonLabel>
			<IonSelect v-model="factory.facultyId" :disabled="disabled.facultyId"
				class="capitalize" interface="action-sheet"
				placeholder="Select your faculty" required>
				<IonSelectOption v-for="faculty in filteredFaculties" :key="faculty.hash"
					:value="faculty.id" class="capitalize">
					{{ faculty.name }}
				</IonSelectOption>
			</IonSelect>
			<DisplayError :error="factory.errors.facultyId" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel>Department</IonLabel>
			<IonSelect v-model="factory.departmentId" :disabled="disabled.departmentId"
				class="capitalize" interface="action-sheet"
				placeholder="Select your department" required>
				<IonSelectOption v-for="department in filteredDepartments" :key="department.hash"
					:value="department.id" class="capitalize">
					{{ department.name }}
				</IonSelectOption>
			</IonSelect>
			<DisplayError :error="factory.errors.departmentId" />
		</div>

		<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonText">Submit</slot>
		</IonButton>
	</form>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, watch } from 'vue'
import { ClassFactory } from '@modules/classes'
import { closeOutline } from 'ionicons/icons'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useFacultyList } from '@app/composable/school/faculties'
import { useDepartmentList } from '@app/composable/school/departments'
import { UploadedFile } from '@modules/core'

export default defineComponent({
	name: 'ClassForm',
	props: {
		factory: {
			type: ClassFactory,
			required: true
		},
		submit: {
			type: Function as PropType<() => Promise<void>>,
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
		disabled: {
			type: Object,
			required: false,
			default: () => ({})
		}
	},
	setup (props) {
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

		onMounted(async () => {
			if (props.factory.institutionId) await fetchFaculties(props.factory.institutionId)
			if (props.factory.facultyId) await fetchDepartments(props.factory.facultyId)
		})

		const savePhoto = async (p: UploadedFile) => {
			props.factory.photo = p
		}

		return {
			closeOutline, savePhoto,
			schools, filteredFaculties, filteredDepartments
		}
	}
})
</script>
