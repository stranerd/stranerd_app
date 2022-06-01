<template>
	<div class="flex flex-col rounded-lg bg-itemBg border-l-8 border-primaryBg p-4 gap-2">
		<IonText class="font-bold">{{ scheme.topic }}</IonText>
		<div class="flex gap-2 items-center text-secondaryText">
			<IonIcon :icon="calendarClearOutline" class="text-heading2" />
			<IonText>{{ scheme.start }} - {{ scheme.end }}</IonText>
			<span v-if="classInst.admins.includes(id)" class="ml-auto flex items-center gap-2">
				<IonIcon :icon="createOutline" class="text-warning text-heading2"
					@click="openEditSchemeModal({ scheme, classInst }, $router)" />
				<SpinLoading v-if="loading" />
				<IonIcon v-else :icon="trashBinOutline" class="text-danger text-heading2r"
					@click="deleteScheme(scheme)" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity, SchemeEntity } from '@modules/classes'
import { openEditSchemeModal, useDeleteScheme } from '@app/composable/classes/schemes'
import { calendarClearOutline, createOutline, trashBinOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'SchemesListCard',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		},
		scheme: {
			type: SchemeEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { loading, error, deleteScheme } = useDeleteScheme(props.scheme.classId, props.scheme.id)
		return {
			id, deleteScheme, loading, error, openEditSchemeModal, calendarClearOutline,
			trashBinOutline, createOutline
		}
	}
})
</script>
