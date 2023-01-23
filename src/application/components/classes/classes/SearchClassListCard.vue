<template>
	<router-link :to="`/classes/${classInst.id}`" class="!gap-4 card card-padding flex flex-col">
		<div class="flex gap-2 items-center">
			<Avatar :name="classInst.name" :size="36" :src="classInst.photo" />
			<div class="flex flex-col gap-1 w-full">
				<IonText class="font-bold capitalize leading-none w-full truncate">{{ classInst.name }}</IonText>
				<span class="flex items-center gap-1 text-sm text-secondaryText leading-none">
					<Institution :institutionId="classInst.school.institutionId" />
					<IonIcon :icon="ellipse" class="dot" />
					<Department :departmentId="classInst.school.departmentId" :facultyId="classInst.school.facultyId" />
				</span>
			</div>
			<IonButton v-if="!classInst.members.includes(id) && !classInst.requests.includes(id)" :disabled="loading"
				class="btn-primary"
				style="--border-radius: 10rem;"
				@click="requestToJoinClass(true)">
				<SpinLoading v-if="loading" />
				<span v-else>Join</span>
			</IonButton>
		</div>
		<IonText class="text-secondaryText">{{ classInst.description }}</IonText>
		<IonButton v-if="classInst.requests.includes(id)" class="btn-outline"
			@click="requestToJoinClass(false)">
			<SpinLoading v-if="loading" />
			<span v-else>Cancel Request</span>
		</IonButton>
	</router-link>
</template>

<script lang="ts" setup>
import { ClassEntity } from '@modules/classes'
import { useClassMembersList } from '@app/composable/classes/classes'
import { useAuth } from '@app/composable/auth/auth'
import { ellipse } from 'ionicons/icons'
import Institution from '@app/components/school/institutions/Institution.vue'
import Department from '@app/components/school/departments/Department.vue'

const props = defineProps({
	classInst: {
		type: ClassEntity,
		required: true
	}
})

const { id } = useAuth()
const { loading, requestToJoinClass } = useClassMembersList(props.classInst, true)
</script>
