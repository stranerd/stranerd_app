<template>
	<ClassWrapper>
		<div class="flex flex-col gap-6 mt-6">
			<div class="flex flex-col">
				<ion-label class="font-bold text-sm mb-2 px-4">Day</ion-label>
				<div class="flex items-center gap-2 w-full overflow-x-auto px-4">
					<a v-for="day in days" :key="day.day"
						:class="activeDay === day.day ? 'bg-primary text-white border-primary' : 'text-gray bg-white border-gray'"
						class="w-full py-2 px-4 rounded-lg text-center border"
						@click="chooseDay(day.day)">
						{{ day.name }}
					</a>
				</div>
			</div>
		
			<div class="flex flex-col gap-6 px-4">
				<div class="flex flex-col">
					<ion-label class="font-bold text-sm mb-2">Course</ion-label>
					<IonSelect v-if="eventClass" v-model="factory.title" class="capitalize bg-new_gray"
						interface="action-sheet" placeholder="Select Course">
						<IonSelectOption v-for="course in eventClass.courses" :key="course" class="capitalize">
							{{ course }}
						</IonSelectOption>
					</IonSelect>
					<IonInput v-else v-model="factory.title" class="w-full border bg-new_gray border-new_gray"
						placeholder="Enter course"
						required
						show-cancel-button="never"
					/>
				</div>
                
				<div class="flex flex-col">
					<ion-label class="font-bold text-sm mb-2">Lecturer</ion-label>
					<IonInput v-model="factory.lecturer" class="w-full border bg-new_gray border-new_gray"
						placeholder="Enter lecturer name"
						required
						show-cancel-button="never"
					/>
				</div>
			
				<div class="flex gap-4 items-center">
					<div class="flex flex-col w-full">
						<ion-label class="font-bold text-sm mb-2">Start time</ion-label>
						<IonInput :value="factory.startTime"
							class="w-full bg-new_gray" placeholder="Select start date" required
							type="time"
							@change="(e) => factory.startTime = e.target.value" />
					</div>
					<div class="flex flex-col w-full">
						<ion-label class="font-bold text-sm mb-2">End time</ion-label>
						<IonInput :min="factory.startTime" :value="factory.endTime"
							class="w-full bg-new_gray" placeholder="Select end date" required
							type="time"
							@change="(e) => factory.endTime = e.target.value" />
					</div>
				</div>
				<div v-if="tab === 0" class="flex flex-col gap-2">
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
						<IonIcon :icon="trashBinOutline" class="text-red text-heading2" @click="deleteEvent(event)" />
					</div>
				</div>
				<div class="flex gap-4 items-center">
					<template v-if="tab === 0">
						<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full"
							@click="createEvent">
							Add
						</IonButton>
					</template>
					<template v-else-if="tab === 1">
						<IonButton class="btn-primary w-full" @click="tab = 0">Back</IonButton>
						<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full"
							@click="updateEvent">
							Save
						</IonButton>
					</template>
				</div>
			</div>
		</div>

	</ClassWrapper>
</template>

<script lang="ts">
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import { computed, defineComponent, Ref, ref } from 'vue'
import { useCreateEvent, useDeleteEvent, useEditEvent, useTimetable } from '@app/composable/classes/timetable'
import { EventEntity, EventFactory, EventType } from '@modules/classes'
import { pencilOutline, trashBinOutline } from 'ionicons/icons'
import { IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	name: 'ClassClassIdCreateScheme',
	displayName: 'Set up Scheme',
	components: { ClassWrapper,IonSelect, IonSelectOption },
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
		const factory = computed(() => tab.value === 0 ? createFactory.value : editFactory.value)
		const loading = computed(() => tab.value === 0 ? createLoading.value : editLoading.value)
		return {
			createError, createEvent, eventClass,
			tab, editError, updateEvent, enterEdit, pencilOutline,
			activeDay, days, chooseDay, factory, loading,
			listLoading, listError, timetable, editingEvent,
			trashBinOutline, deleteEvent, deleteLoading, deleteError
		}
	}
})
</script>

