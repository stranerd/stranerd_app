<template>
	<Modal>
		<template v-slot:title>
			Edit Timetable
		</template>
		<TimetableForm :error="error" :factory="factory" :loading="loading" :submit="editEvent">
			<template v-slot:buttonText>Update Timetable</template>
		</TimetableForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditEvent } from '@app/composable/classes/timetable'
import TimetableForm from '@app/components/classes/timetable/TimetableForm.vue'

export default defineComponent({
	name: 'EditTimetableModal',
	components: { TimetableForm },
	setup () {
		const { editEvent, factory, error, loading } = useEditEvent()
		return { error, loading, editEvent, factory }
	}
})
</script>
