<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div v-if="!disabled.classId" class="flex flex-col gap-2">
			<IonLabel>Class</IonLabel>
			<IonSelect v-model="factory.classId" :disabled="disabled.classId"
				class="capitalize" interface="action-sheet" placeholder="Select the class" required>
				<IonSelectOption v-for="classInst in adminClasses" :key="classInst.hash" :value="classInst.id"
					class="capitalize">
					{{ classInst.name }}
				</IonSelectOption>
			</IonSelect>
			<DisplayError :error="factory.errors.classId" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel>Announcement</IonLabel>
			<IonTextarea v-model="factory.body"
				:class="{'valid': factory.isValid('body'), 'invalid': factory.errors.body}"
				placeholder="Write announcement" row="3" />
			<DisplayError :error="factory.errors.body" />
		</div>

		<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full md:w-auto" type="submit">
			<slot name="buttonText">Submit</slot>
			<IonRippleEffect class="rounded-lg" />
		</IonButton>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { AnnouncementFactory } from '@modules/classes'
import { useUserClassList } from '@app/composable/users/users/classes'

export default defineComponent({
	name: 'AnnouncementForm',
	props: {
		factory: {
			type: AnnouncementFactory,
			required: true
		},
		submit: {
			type: Function as PropType<() => Promise<void>>,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		},
		disabled: {
			type: Object,
			required: false,
			default: () => ({})
		}
	},
	setup () {
		const { adminClasses } = useUserClassList()
		return { adminClasses }
	}
})
</script>
