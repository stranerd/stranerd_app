<template>
	<Modal :close="close" class="h-screen md:h-auto">
		<template v-slot:title>
			Set up Timetable
		</template>
		<TimetableForm :classInst="eventClass" :error="error" :factory="factory" :loading="loading"
			:submit="createEvent">
			<template v-slot:buttonText>Add</template>
		</TimetableForm>
	</Modal>
</template>

<script lang="ts" setup>
import { useCreateEvent } from '@app/composable/classes/timetable'
import TimetableForm from '@app/components/classes/timetable/TimetableForm.vue'

defineProps({
	close: {
		type: Function,
		required: true
	}
})

const { factory, error, loading, eventClass, createEvent } = useCreateEvent()
</script>
