<template>
	<div v-if="classInst" class="flex border-bottom-line card-padding items-start">
		<Avatar :name="classInst.name" :size="32" :src="classInst.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>You have been accepted into a class</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<div class="border border-2 border-itemBg rounded-xl flex flex-col gap-4 p-4">
				<div class="flex items-center gap-6 justify-between">
					<Avatar :name="classInst.name" :size="32" :src="classInst.photo" />
					<IonIcon :icon="arrowForwardOutline" />
				</div>
				<div class="flex flex-col">
					<IonText class="font-bold">{{ classInst.name }}</IonText>
					<Institution :institutionId="classInst.school.institutionId"
						class="text-secondaryText text-sm font-bold" />
					<Department :departmentId="classInst.school.departmentId" :facultyId="classInst.school.facultyId"
						class="text-secondaryText text-sm" />
				</div>
				<IonText>{{ classInst.description }}</IonText>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useClass } from '@app/composable/classes/classes'
import { arrowForwardOutline, ellipse } from 'ionicons/icons'

const props = defineProps({
	notification: {
		type: NotificationEntity,
		required: true
	},
	classId: {
		type: String,
		required: true
	}
})

const { classInst } = useClass(props.classId)
</script>
