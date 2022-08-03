<template>
	<ClassWrapper :hideTitle="true">
		<template v-slot="{ classInst }">
			<div>
				<div class="px-4 py-6 gap-4 lg:p-0 flex flex-col border-bottom-line">
					<div class="flex gap-4 items-start">
						<Avatar :name="classInst.name" :size="64" :src="classInst.photo" />
						<div class="flex flex-col w-full">
							<div class="flex gap-4 items-center text-xl">
								<IonText class="font-bold capitalize">{{ classInst.name }}</IonText>
								<IonIcon v-if="classInst.admins.includes(id)" :icon="createOutline"
									@click="() => openClassEditModal(classInst, $router, false)" />
							</div>
							<Institution :institutionId="classInst.school.institutionId"
								class="text-secondaryText font-semibold" />
							<Department :departmentId="classInst.school.departmentId"
								:facultyId="classInst.school.facultyId" class="text-secondaryText" />
						</div>
					</div>
					<IonText class="text-secondaryText">{{ classInst.description }}</IonText>
				</div>

				<div class="flex flex-col card-padding lg:px-0 text-secondaryText border-bottom-line">
					<template v-if="classInst.admins.includes(id)">
						<a class="flex gap-4 items-center py-2"
							@click="() => openClassEditModal(classInst, $router, true)">
							<IonIcon :icon="listOutline" />
							<IonText>Edit courses list</IonText>
						</a>
					</template>
					<Share :link="classInst.shareLink" text="" title="Share this class">
						<div class="flex gap-4 items-center py-2">
							<IonIcon :icon="shareOutline" />
							<IonText>Share class link</IonText>
						</div>
					</Share>
				</div>

				<ClassMembers :key="classInst.hash" :classInst="classInst" />
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
import { createOutline, listOutline, shareOutline } from 'ionicons/icons'
import { openClassEditModal } from '@app/composable/classes/classes'
import { useRouteMeta } from '@app/composable/core/states'
import ClassMembers from '@app/components/classes/classes/ClassMembers.vue'

export default defineComponent({
	name: 'ClassClassId',
	components: { ClassWrapper, Institution, Department, ClassMembers },
	setup() {
		useRouteMeta('About', { back: true })
		const { id } = useAuth()
		return { id, openClassEditModal, createOutline, listOutline, shareOutline }
	}
})
</script>
