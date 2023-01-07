<template>
	<div class="flex flex-col rounded-lg bg-itemBg border-l-8 border-primaryBg p-4 gap-4">
		<IonText class="font-bold">{{ scheme.topic }}</IonText>
		<div class="flex gap-2 items-center text-secondaryText">
			<IonIcon :icon="calendarClearOutline" />
			<IonText>
				{{ formatDateAsDigits(new Date(scheme.start), false) }} -
				{{ formatDateAsDigits(new Date(scheme.end), false) }}
			</IonText>
			<span v-if="classInst.admins.includes(id)" class="ml-auto flex items-center gap-2">
				<IonIcon :icon="createOutline" class="text-warning"
					@click="openEditSchemeModal({ scheme, classInst }, $router)" />
				<SpinLoading v-if="loading" />
				<IonIcon v-else :icon="trashBinOutline" class="text-danger"
					@click="deleteScheme" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ClassEntity, SchemeEntity } from '@modules/classes'
import { markSchemeSeen, openEditSchemeModal, useDeleteScheme } from '@app/composable/classes/schemes'
import { calendarClearOutline, createOutline, trashBinOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { formatDateAsDigits } from '@utils/dates'

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
		onMounted(async () => {
			await markSchemeSeen(props.scheme, id.value)
		})
		return {
			id, deleteScheme, loading, error, openEditSchemeModal, calendarClearOutline,
			trashBinOutline, createOutline, formatDateAsDigits
		}
	}
})
</script>
