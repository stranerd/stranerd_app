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

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateEvent } from '@app/composable/classes/timetable'
import TimetableForm from '@app/components/classes/timetable/TimetableForm.vue'

export default defineComponent({
	name: 'CreateTimetableModal',
	components: { TimetableForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, error, loading, eventClass, createEvent } = useCreateEvent()
		return { error, loading, factory, eventClass, createEvent }
	}
})
</script>
