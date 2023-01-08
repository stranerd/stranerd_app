<template>
	<div class="flex flex-col card-padding !gap-4 !px-0">
		<div class="flex gap-4 items-center cursor-pointer card-padding !py-0" @click="show = !show">
			<Avatar :name="classInst.name" :size="40" :src="classInst.photo" />
			<IonText class="font-bold capitalize truncate w-full">{{ classInst.name }}</IonText>
			<span>
				<IonIcon :class="{'rotate-90': show}" :icon="chevronForwardOutline" />
			</span>
		</div>
		<div v-if="show" class="flex flex-col text-secondaryText">
			<transition-group appear name="fade">
				<router-link v-for="{ name, path, icon, unRead } in [
						{ name: 'Announcements', path: 'announcements', icon: megaphoneOutline, unRead: !!unReadAnnouncements },
						{ name: 'Events', path: 'events', icon: calendarOutline, unRead: !!unReadEvents },
						{ name: 'Timetable', path: 'timetable', icon: calendarClearOutline, unRead: !!unReadTimetable },
						{ name: 'Scheme of Work', path: 'schemes', icon: listOutline, unRead: !!unReadSchemes },
						{ name: 'Library', path: 'library', icon: libraryOutline, unRead: false },
						{ name: 'About', path: '', icon: informationCircleOutline, unRead: false }
					]" :key="path" :to="`/classes/${classInst.id}/${path}`"
					class="flex gap-4 items-center px-6 py-3" exact-active-class="hasBg">
					<IonIcon :icon="icon" />
					<IonText>{{ name }}</IonText>
					<div class="flex-1" />
					<IonIcon v-if="unRead" :icon="ellipse" class="dot text-info" />
				</router-link>
			</transition-group>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ClassEntity } from '@modules/classes'
import {
	calendarClearOutline,
	calendarOutline,
	chevronForwardOutline,
	ellipse,
	informationCircleOutline,
	libraryOutline,
	listOutline,
	megaphoneOutline
} from 'ionicons/icons'
import { useAnnouncementList } from '@app/composable/classes/announcements'
import { useEventList } from '@app/composable/classes/events'
import { useTimetable } from '@app/composable/classes/timetable'
import { useSchemesList } from '@app/composable/classes/schemes'

const props = defineProps({
	classInst: {
		type: ClassEntity,
		required: true
	}
})

const show = ref(true)
const { unReadAnnouncements } = useAnnouncementList(props.classInst.id)
const { unReadEvents } = useEventList(props.classInst.id)
const { unReadTimetable } = useTimetable(props.classInst.id)
const { unReadSchemes } = useSchemesList(props.classInst.id)
</script>

<style lang="scss" scoped>
.fade-enter-from, .fade-leave-to {
	opacity: 0;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity 0.25s ease-in-out;
}
</style>
