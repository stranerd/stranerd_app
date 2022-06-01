<template>
	<Modal class="h-screen md:h-auto">
		<template v-slot:title>
			Edit Timetable
		</template>
		<TimetableForm :classInst="eventClass" :disabled="{ title: true }" :error="error" :factory="factory" :loading="loading"
			:submit="editEvent">
			<template v-slot:buttonText>Save</template>
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
		const { factory, error, loading, eventClass, editEvent } = useEditEvent()
		return { error, loading, factory, eventClass, editEvent }
	}
})
</script>
