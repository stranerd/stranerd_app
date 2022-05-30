<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div class="flex items-center gap-2 w-full overflow-x-auto">
			<a v-for="day in days" :key="day.day"
				:class="activeDay === day.day ? 'bg-primaryBg text-primaryText border-primaryBg' : 'text-secondaryText border-itemBg'"
				class="w-full py-2 px-4 rounded-lg text-center border"
				@click="chooseDay(day.day)">
				{{ day.name }}
			</a>
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel class="font-bold">Course</IonLabel>
			<IonSelect v-if="classInst" v-model="factory.title" class="capitalize"
				interface="action-sheet" placeholder="Select Course">
				<IonSelectOption v-for="course in classInst.courses" :key="course" class="capitalize">
					{{ course }}
				</IonSelectOption>
			</IonSelect>
			<IonInput v-else v-model="factory.title"
				:class="{'valid': factory.isValid('title'), 'invalid': factory.errors.title}"
				placeholder="Enter course title"
				required
				show-cancel-button="never"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel class="font-bold">Lecturer</IonLabel>
			<IonInput v-model="factory.lecturer"
				:class="{'valid': factory.isValid('lecturer'), 'invalid': factory.errors.lecturer}"
				placeholder="Enter lecturer name"
				required
				show-cancel-button="never"
			/>
		</div>

		<div class="flex gap-4 items-center">
			<div class="flex flex-col gap-2 w-full">
				<IonLabel class="font-bold">Starts At</IonLabel>
				<IonInput :value="factory.startTime"
					class="w-full" placeholder="Select start time" required
					type="time"
					@change="(e) => factory.startTime = e.target.value" />
			</div>
			<div class="flex flex-col gap-2 w-full">
				<IonLabel class="font-bold">Ends At</IonLabel>
				<IonInput :value="factory.endTime"
					class="w-full" placeholder="Select end time" required
					type="time"
					@change="(e) => factory.endTime = e.target.value" />
			</div>
		</div>

		<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonText">Submit</slot>
		</IonButton>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ClassEntity, EventFactory } from '@modules/classes'

export default defineComponent({
	name: 'TimetableForm',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		},
		factory: {
			type: EventFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const activeDay = ref(props.factory.startDay ?? 1)
		const days = [
			{ day: 1, name: 'Monday' }, { day: 2, name: 'Tuesday' }, { day: 3, name: 'Wednesday' },
			{ day: 4, name: 'Thursday' }, { day: 5, name: 'Friday' }, { day: 6, name: 'Saturday' },
			{ day: 0, name: 'Sunday' }
		]
		const chooseDay = (day: number) => {
			activeDay.value = day
			props.factory.startDay = props.factory.endDay = day
		}
		return { activeDay, days, chooseDay }
	}
})
</script>
