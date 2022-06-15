<template>
	<ClassWrapper :hideTitle="true">
		<template v-slot="{ classInst }">
			<div>
				<div class="!gap-4 card-padding flex flex-col border-bottom-line">
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
				<div v-if="classInst.admins.includes(id)" class="flex flex-col card-padding text-secondaryText">
					<a v-for="{ name, icon, click } in [
							{ name: 'Edit Class Info', icon: createOutline, click: () => openClassEditModal(classInst, $router) },
							{ name: 'Courses List', icon: listOutline, click: () => openClassEditModal(classInst, $router, true) }
						]" :key="name" class="flex gap-4 items-center py-2"
						@click="click">
						<IonIcon :icon="icon" class="text-heading2" />
						<IonText>{{ name }}</IonText>
					</a>
				</div>
			</div>
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import Department from '@app/components/school/departments/Department.vue'
import { useAuth } from '@app/composable/auth/auth'
import { createOutline, listOutline } from 'ionicons/icons'
import { openClassEditModal } from '@app/composable/classes/classes'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ClassClassId',
	components: { ClassWrapper, Institution, Department },
	setup () {
		useRouteMeta('About')
		const { id } = useAuth()
		return { id, openClassEditModal, createOutline, listOutline }
	}
})
</script>
