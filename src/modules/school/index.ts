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
import { InstitutionsUseCase } from './domain/usecases/institutions'
import { FacultiesUseCase } from './domain/usecases/faculties'
import { DepartmentsUseCase } from './domain/usecases/departments'
import { CoursesUseCase } from './domain/usecases/courses'
import { PastQuestionsUseCase } from './domain/usecases/pastQuestions'

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

export const InstitutionsUseCases = new InstitutionsUseCase(institutionRepository)
export const FacultiesUseCases = new FacultiesUseCase(facultyRepository)
export const DepartmentsUseCases = new DepartmentsUseCase(departmentRepository)
export const CoursesUseCases = new CoursesUseCase(courseRepository)
export const PastQuestionsUseCases = new PastQuestionsUseCase(pastQuestionRepository)

export { CourseEntity, CourseFactory }
export { InstitutionEntity, InstitutionFactory }
export { PastQuestionFactory, PastQuestionEntity }
export { FacultyFactory, FacultyEntity }
export { DepartmentFactory, DepartmentEntity }

export { PastQuestionType } from './domain/types'
