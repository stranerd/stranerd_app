<template>
	<Modal>
		<template v-slot:title>
			Create a timetable
		</template>
		<TimetableForm :error="error" :factory="factory" :loading="loading" :submit="createEvent">
			<template v-slot:buttonText>Create timetable</template>
		</TimetableForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEventClass, useCreateEvent } from '@app/composable/classes/timetable'
import TimetableForm from '@app/components/classes/timetable/TimetableForm.vue'

export default defineComponent({
	name: 'CreateTimetableModal',
	components: { TimetableForm },
	setup () {
		const { createEvent, factory, error, loading } = useCreateEvent(getEventClass()!)
		return { error, loading, createEvent, factory }
	}
})
</script>
