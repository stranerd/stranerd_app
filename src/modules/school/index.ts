import { CourseApiDataSource } from './data/datasources/course-api'
import { InstitutionApiDataSource } from './data/datasources/institution-api'
import { PastQuestionApiDataSource } from './data/datasources/pastQuestion-api'
import { FacultyApiDataSource } from './data/datasources/faculty-api'
import { DepartmentApiDataSource } from './data/datasources/department-api'
import { CourseTransformer } from './data/transformers/course'
import { InstitutionTransformer } from './data/transformers/institution'
import { PastQuestionTransformer } from './data/transformers/pastQuestion'
import { FacultyTransformer } from './data/transformers/faculty'
import { DepartmentTransformer } from './data/transformers/department'
import { CourseRepository } from './data/repositories/course'
import { InstitutionRepository } from './data/repositories/institution'
import { PastQuestionRepository } from './data/repositories/pastQuestion'
import { FacultyRepository } from './data/repositories/faculty'
import { DepartmentRepository } from './data/repositories/department'
import { CourseEntity } from './domain/entities/course'
import { CourseFactory } from './domain/factories/course'
import { InstitutionEntity } from './domain/entities/institution'
import { InstitutionFactory } from './domain/factories/institution'
import { PastQuestionFactory } from './domain/factories/pastQuestion'
import { PastQuestionEntity } from './domain/entities/pastQuestion'
import { FacultyFactory } from './domain/factories/faculty'
import { FacultyEntity } from './domain/entities/faculty'
import { DepartmentFactory } from './domain/factories/department'
import { DepartmentEntity } from './domain/entities/department'
import { GetCoursesUseCase } from './domain/usecases/courses/getCourses'
import { ListenToCoursesUseCase } from './domain/usecases/courses/listenToCourses'
import { FindCourseUseCase } from './domain/usecases/courses/findCourse'
import { AddCourseUseCase } from './domain/usecases/courses/addCourse'
import { EditCourseUseCase } from './domain/usecases/courses/editCourse'
import { DeleteCourseUseCase } from './domain/usecases/courses/deleteCourse'
import { AddInstitutionUseCase } from './domain/usecases/institutions/addInstitution'
import { DeleteInstitutionUseCase } from './domain/usecases/institutions/deleteInstitution'
import { GetInstitutionsUseCase } from './domain/usecases/institutions/getInstitutions'
import { ListenToInstitutionsUseCase } from './domain/usecases/institutions/listenToInstitutions'
import { EditInstitutionUseCase } from './domain/usecases/institutions/editInstitution'
import { FindInstitutionUseCase } from './domain/usecases/institutions/findInstitution'
import { GetPastQuestionsUseCase } from './domain/usecases/pastQuestions/getPastQuestions'
import { ListenToPastQuestionsUseCase } from './domain/usecases/pastQuestions/listenToPastQuestions'
import { FindPastQuestionUseCase } from './domain/usecases/pastQuestions/findPastQuestion'
import { AddPastQuestionUseCase } from './domain/usecases/pastQuestions/addPastQuestion'
import { EditPastQuestionUseCase } from './domain/usecases/pastQuestions/editPastQuestion'
import { DeletePastQuestionUseCase } from './domain/usecases/pastQuestions/deletePastQuestion'
import { GetTestQuestionsUseCase } from './domain/usecases/pastQuestions/getTestQuestions'
import { GetFacultiesUseCase } from './domain/usecases/faculties/getFaculties'
import { ListenToFacultiesUseCase } from './domain/usecases/faculties/listenToFaculties'
import { FindFacultyUseCase } from './domain/usecases/faculties/findFaculty'
import { AddFacultyUseCase } from './domain/usecases/faculties/addFaculty'
import { EditFacultyUseCase } from './domain/usecases/faculties/editFaculty'
import { DeleteFacultyUseCase } from './domain/usecases/faculties/deleteFaculty'
import { GetDepartmentsUseCase } from './domain/usecases/departments/getDepartments'
import { ListenToDepartmentsUseCase } from './domain/usecases/departments/listenToDepartments'
import { FindDepartmentUseCase } from './domain/usecases/departments/findDepartment'
import { AddDepartmentUseCase } from './domain/usecases/departments/addDepartment'
import { EditDepartmentUseCase } from './domain/usecases/departments/editDepartment'
import { DeleteDepartmentUseCase } from './domain/usecases/departments/deleteDepartment'

const courseDataSource = new CourseApiDataSource()
const institutionDataSource = new InstitutionApiDataSource()
const pastQuestionDataSource = new PastQuestionApiDataSource()
const facultyDataSource = new FacultyApiDataSource()
const departmentDataSource = new DepartmentApiDataSource()

const courseTransformer = new CourseTransformer()
const institutionTransformer = new InstitutionTransformer()
const pastQuestionTransformer = new PastQuestionTransformer()
const facultyTransformer = new FacultyTransformer()
const departmentTransformer = new DepartmentTransformer()

const courseRepository = new CourseRepository(courseDataSource, courseTransformer)
const institutionRepository = new InstitutionRepository(institutionDataSource, institutionTransformer)
const pastQuestionRepository = new PastQuestionRepository(pastQuestionDataSource, pastQuestionTransformer)
const facultyRepository = new FacultyRepository(facultyDataSource, facultyTransformer)
const departmentRepository = new DepartmentRepository(departmentDataSource, departmentTransformer)

export const FindCourse = new FindCourseUseCase(courseRepository)
export const GetCourses = new GetCoursesUseCase(courseRepository)
export const ListenToCourses = new ListenToCoursesUseCase(courseRepository)
export const AddCourse = new AddCourseUseCase(courseRepository)
export const EditCourse = new EditCourseUseCase(courseRepository)
export const DeleteCourse = new DeleteCourseUseCase(courseRepository)

export const FindInstitution = new FindInstitutionUseCase(institutionRepository)
export const GetInstitutions = new GetInstitutionsUseCase(institutionRepository)
export const ListenToInstitutions = new ListenToInstitutionsUseCase(institutionRepository)
export const AddInstitution = new AddInstitutionUseCase(institutionRepository)
export const EditInstitution = new EditInstitutionUseCase(institutionRepository)
export const DeleteInstitution = new DeleteInstitutionUseCase(institutionRepository)

export const FindPastQuestion = new FindPastQuestionUseCase(pastQuestionRepository)
export const GetPastQuestions = new GetPastQuestionsUseCase(pastQuestionRepository)
export const ListenToPastQuestions = new ListenToPastQuestionsUseCase(pastQuestionRepository)
export const AddPastQuestion = new AddPastQuestionUseCase(pastQuestionRepository)
export const EditPastQuestion = new EditPastQuestionUseCase(pastQuestionRepository)
export const DeletePastQuestion = new DeletePastQuestionUseCase(pastQuestionRepository)
export const GetTestQuestions = new GetTestQuestionsUseCase(pastQuestionRepository)

export const FindFaculty = new FindFacultyUseCase(facultyRepository)
export const GetFaculties = new GetFacultiesUseCase(facultyRepository)
export const ListenToFaculties = new ListenToFacultiesUseCase(facultyRepository)
export const AddFaculty = new AddFacultyUseCase(facultyRepository)
export const EditFaculty = new EditFacultyUseCase(facultyRepository)
export const DeleteFaculty = new DeleteFacultyUseCase(facultyRepository)

export const FindDepartment = new FindDepartmentUseCase(departmentRepository)
export const GetDepartments = new GetDepartmentsUseCase(departmentRepository)
export const ListenToDepartments = new ListenToDepartmentsUseCase(departmentRepository)
export const AddDepartment = new AddDepartmentUseCase(departmentRepository)
export const EditDepartment = new EditDepartmentUseCase(departmentRepository)
export const DeleteDepartment = new DeleteDepartmentUseCase(departmentRepository)

export { CourseEntity, CourseFactory }
export { InstitutionEntity, InstitutionFactory }
export { PastQuestionFactory, PastQuestionEntity }
export { FacultyFactory, FacultyEntity }
export { DepartmentFactory, DepartmentEntity }

export { PastQuestionType } from './domain/entities/pastQuestion'
export type { PastQuestionData } from './domain/entities/pastQuestion'