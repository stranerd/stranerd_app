<template>
	<div class="!gap-4 card-padding flex flex-col">
		<div class="flex gap-4 items-center" @click="show = !show">
			<Avatar :name="classInst.name" :size="36" :src="classInst.photo" />
			<IonText class="font-bold capitalize truncate w-full">{{ classInst.name }}</IonText>
			<IonIcon :icon="show ? chevronUpOutline : chevronDownOutline" class="text-heading2" />
		</div>
		<div v-if="show" class="flex flex-col gap-2 text-secondaryText px-2">
			<router-link v-for="{ name, path, icon } in [
					{ name: 'Announcements', path: 'announcements', icon: megaphoneOutline },
					{ name: 'Events', path: 'events', icon: calendarOutline },
					{ name: 'Timetable', path: 'timetable', icon: calendarClearOutline },
					{ name: 'Scheme of Work', path: 'scheme', icon: listOutline },
					{ name: 'Discussions', path: 'groups', icon: chatbubblesOutline },
					{ name: 'Classmates', path: 'members', icon: peopleOutline },
					{ name: 'Library', path: 'library', icon: libraryOutline },
					{ name: 'About', path: '', icon: informationCircleOutline }
				]" :key="path" :to="`/classes/${classInst.id}/${path}`"
				class="flex gap-4 items-center py-2">
				<IonIcon :icon="icon" class="text-heading2" />
				<IonText>{{ name }}</IonText>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ClassEntity } from '@modules/classes'
import {
	calendarClearOutline,
	calendarOutline,
	chatbubblesOutline,
	chevronDownOutline,
	chevronUpOutline,
	informationCircleOutline,
	libraryOutline,
	listOutline,
	megaphoneOutline,
	peopleOutline
} from 'ionicons/icons'

export default defineComponent({
	name: 'ClassListCard',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	setup () {
		const show = ref(false)
		return {
			show, chevronDownOutline, chevronUpOutline,
			chatbubblesOutline, informationCircleOutline, libraryOutline,
			megaphoneOutline, peopleOutline, listOutline, calendarOutline, calendarClearOutline
		}
	}
})
</script>
