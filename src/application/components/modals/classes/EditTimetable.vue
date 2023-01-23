<template>
	<Modal :close="close" class="h-screen md:h-auto">
		<template v-slot:title>
			Edit Timetable
		</template>
		<TimetableForm :classInst="eventClass" :disabled="{ title: true }" :error="error" :factory="factory"
			:loading="loading"
			:submit="editEvent">
			<template v-slot:buttonText>Save</template>
		</TimetableForm>
	</Modal>
</template>

<script lang="ts" setup>
import { useEditEvent } from '@app/composable/classes/timetable'
import TimetableForm from '@app/components/classes/timetable/TimetableForm.vue'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, eventClass, editEvent } = useEditEvent()
</script>
