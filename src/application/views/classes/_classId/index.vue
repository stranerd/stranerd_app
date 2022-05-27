<template>
	<ClassWrapper :hideTitle="true">
		<template v-slot="{ classInst }">
			<div class="!gap-4 card-padding flex flex-col">
				<div class="flex gap-4 items-start">
					<Avatar :name="classInst.name" :size="64" :src="classInst.photo" />
					<div class="flex flex-col w-full">
						<IonText class="font-bold capitalize text-heading">{{ classInst.name }}</IonText>
						<Institution :institutionId="classInst.school.institutionId"
							class="text-secondaryText font-semibold" />
						<Department :departmentId="classInst.school.departmentId"
							:facultyId="classInst.school.facultyId" class="text-secondaryText" />
					</div>
				</div>
				<IonText class="text-secondaryText">{{ classInst.description }}</IonText>
			</div>
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import Department from '@app/components/school/departments/Department.vue'

export default defineComponent({
	name: 'ClassClassId',
	displayName: 'About',
	components: { ClassWrapper, Institution, Department }
})
</script>
