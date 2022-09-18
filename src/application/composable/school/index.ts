import { useFacultyList } from '@app/composable/school/faculties'
import { useDepartmentList } from '@app/composable/school/departments'
import { useInstitutionList } from '@app/composable/school/institutions'
import { computed, onMounted, reactive, watch } from 'vue'

export const useChooseSchool = (institutionId: string, facultyId: string, departmentId: string) => {
	const school = reactive({
		institutionId, facultyId, departmentId
	})
	const { schools, gatewayExams } = useInstitutionList()
	const { faculties, fetchFaculties } = useFacultyList()
	const { departments, fetchDepartments } = useDepartmentList()
	const filteredFaculties = computed(() => faculties.value.filter((f) => f.institutionId === school.institutionId))
	const filteredDepartments = computed(() => departments.value.filter((d) => d.facultyId === school.facultyId))

	watch(() => school.institutionId, async () => {
		if (school.institutionId) await fetchFaculties(school.institutionId)
	})

	watch(() => school.facultyId, async () => {
		if (school.facultyId) await fetchDepartments(school.facultyId)
	})

	onMounted(async () => {
		if (school.institutionId) await fetchFaculties(school.institutionId)
		if (school.facultyId) await fetchDepartments(school.facultyId)
	})

	return {
		school, schools, gatewayExams, filteredDepartments, filteredFaculties
	}
}
