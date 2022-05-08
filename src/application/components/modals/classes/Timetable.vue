<template>
	<Modal>
		<template v-slot:title>
			Set up timetable
		</template>
		<div class="flex flex-col gap-4">
			<div class="flex items-center gap-2 w-full overflow-x-auto">
				<a v-for="day in days" :key="day.day"
					:class="activeDay === day.day ? 'bg-primary text-white border-primary' : 'text-gray bg-white border-gray'"
					class="w-full py-2 px-4 rounded-lg text-center border"
					@click="chooseDay(day.day)">
					{{ day.name }}
				</a>
			</div>
			<form v-if="tab === 0" class="flex flex-col gap-4" @submit.prevent="createEvent">
				<IonSelect v-if="eventClass" v-model="createFactory.title" class="capitalize bg-new_gray"
					interface="action-sheet" placeholder="Select Course">
					<IonSelectOption v-for="course in eventClass.courses" :key="course" class="capitalize">
						{{ course }}
					</IonSelectOption>
				</IonSelect>
				<IonInput v-else v-model="createFactory.title" class="w-full border border-new_gray"
					placeholder="Enter course"
					required
					show-cancel-button="never"
				/>
				<div class="flex gap-4 items-center">
					<IonInput :value="createFactory.startTime"
						class="w-full bg-new_gray" placeholder="Select start date" required
						type="time"
						@change="(e) => createFactory.startTime = e.target.value" />
					<IonInput :min="createFactory.startTime" :value="createFactory.endTime"
						class="w-full bg-new_gray" placeholder="Select end date" required
						type="time"
						@change="(e) => createFactory.endTime = e.target.value" />
				</div>
				<div class="flex flex-col gap-2">
					<div v-for="event in timetable" :key="event.hash" class="flex gap-1 items-center">
						<span class="bg-new_gray text-gray py-1 px-2 rounded-lg text-sub">
							{{
								event.data.start.hour.toString().padStart(2, '0')
							}}:{{ event.data.start.minute.toString().padStart(2, '0') }}
							-
							{{
								event.data.end.hour.toString().padStart(2, '0')
							}}:{{ event.data.end.minute.toString().padStart(2, '0') }}
						</span>
						<span class="text-dark truncate mr-auto">{{ event.title }}</span>
						<IonIcon :icon="pencilOutline" class="text-orange text-heading2" @click="enterEdit(event)" />
						<IonIcon :icon="trashOutline" class="text-red text-heading2" @click="deleteEvent(event)" />
					</div>
				</div>
				<div class="flex gap-4 items-center">
					<IonButton :disabled="createLoading || !createFactory.valid" class="btn-outline w-full"
						type="submit">
						Add
					</IonButton>
					<IonButton class="btn-primary w-full" @click="closeModal">Done</IonButton>
				</div>
			</form>
			<div v-if="tab === 1" class="flex flex-col gap-4">
				<IonSelect v-if="eventClass" v-model="editFactory.title" class="capitalize bg-new_gray"
					interface="action-sheet" placeholder="Select Course">
					<IonSelectOption v-for="course in eventClass.courses" :key="course" class="capitalize">
						{{ course }}
					</IonSelectOption>
				</IonSelect>
				<IonInput v-else v-model="editFactory.title" class="w-full border border-new_gray"
					placeholder="Enter course"
					required
					show-cancel-button="never"
				/>
				<div class="flex gap-4 items-center">
					<IonInput :value="editFactory.startTime"
						class="w-full bg-new_gray" placeholder="Select start date" required
						type="time"
						@change="(e) => editFactory.startTime = e.target.value" />
					<IonInput :min="editFactory.startTime" :value="editFactory.endTime"
						class="w-full bg-new_gray" placeholder="Select end date" required
						type="time"
						@change="(e) => editFactory.endTime = e.target.value" />
				</div>
				<div class="flex gap-4 items-center">
					<IonButton class="btn-outline w-full" @click="tab = 0">Back</IonButton>
					<IonButton :disabled="editLoading || !editFactory.valid" class="btn-primary w-full"
						@click="updateEvent">
						Save
					</IonButton>
				</div>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue'
import { useCreateEvent, useDeleteEvent, useEditEvent, useTimetable } from '@app/composable/classes/timetable'
import { useClassModal } from '@app/composable/core/modals'
import { EventEntity, EventFactory, EventType } from '@modules/classes'
import { pencilOutline, trashOutline } from 'ionicons/icons'
import { IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	name: 'TimetableModal',
	components: { IonSelect, IonSelectOption },
	setup () {
		const {
			createEvent, eventClass, factory: createFactory, error: createError, loading: createLoading
		} = useCreateEvent()
		const tab = ref(0)
		const editingEvent = ref(null as EventEntity | null)
		const editFactory = ref(new EventFactory()) as Ref<EventFactory>
		const { editEvent, error: editError, loading: editLoading } = useEditEvent()
		const activeDay = ref(1)
		const days = [
			{ day: 1, name: 'Monday' }, { day: 2, name: 'Tuesday' }, { day: 3, name: 'Wednesday' },
			{ day: 4, name: 'Thursday' }, { day: 5, name: 'Friday' }, { day: 6, name: 'Saturday' },
			{ day: 0, name: 'Sunday' }
		]
		const chooseDay = (day: number) => {
			activeDay.value = day
			createFactory.value.startDay = createFactory.value.endDay = day
			editFactory.value.startDay = editFactory.value.endDay = day
		}
		const closeModal = () => useClassModal().closeTimetable()
		const { loading: listLoading, error: listError, events } = useTimetable(eventClass?.id ?? '')
		const { loading: deleteLoading, error: deleteError, deleteEvent } = useDeleteEvent()
		const timetable = computed(() => events.value
			.filter((e) => e.data.type === EventType.timetable && e.data.start.day === activeDay.value))
		const enterEdit = (event: EventEntity) => {
			tab.value = 1
			editingEvent.value = event
			editFactory.value.loadEntity(event)
			activeDay.value = editFactory.value.startDay
		}
		const updateEvent = async () => {
			if (!editingEvent.value) return
			const passed = await editEvent(editingEvent.value, editFactory.value)
			if (!passed) return
			tab.value = 0
		}
		return {
			createError, createLoading, createEvent, createFactory, eventClass,
			tab, editError, editLoading, updateEvent, editFactory, enterEdit, pencilOutline,
			activeDay, days, chooseDay, closeModal,
			listLoading, listError, timetable, editingEvent,
			trashOutline, deleteEvent, deleteLoading, deleteError
		}
	}
})
</script>
