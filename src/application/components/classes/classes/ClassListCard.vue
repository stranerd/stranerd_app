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
				<router-link v-for="{ name, path, icon } in [
						{ name: 'Announcements', path: 'announcements', icon: megaphoneOutline },
						{ name: 'Events', path: 'events', icon: calendarOutline },
						{ name: 'Timetable', path: 'timetable', icon: calendarClearOutline },
						{ name: 'Scheme of Work', path: 'schemes', icon: listOutline },
						{ name: 'Discussions', path: 'groups', icon: chatbubblesOutline },
						{ name: 'Library', path: 'library', icon: libraryOutline },
						{ name: 'About', path: '', icon: informationCircleOutline }
					]" :key="path" :to="`/classes/${classInst.id}/${path}`"
					class="flex gap-4 items-center px-6 py-3" exact-active-class="hasBg">
					<IonIcon :icon="icon" />
					<IonText>{{ name }}</IonText>
				</router-link>
			</transition-group>
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
	chevronForwardOutline,
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
		const show = ref(true)
		return {
			show, chevronForwardOutline, chatbubblesOutline, informationCircleOutline, libraryOutline,
			megaphoneOutline, peopleOutline, listOutline, calendarOutline, calendarClearOutline
		}
	}
})
</script>

<style lang="scss" scoped>
	.fade-enter-from, .fade-leave-to {
		opacity: 0;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .25s ease-in-out;
	}
</style>
