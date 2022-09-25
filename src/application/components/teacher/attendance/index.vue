<template>
	<div class="showcase-flex flex-1">
		<!-- This is the attnendance Seection -->
		<div class="flex items-center justify-between px-4 py-3 rounded-lg border text-sm">
			<span class="flex items-center text-secondaryText">
				<IonIcon :icon="addOutline" class="mr-4" />
				Take attendance today
			</span>
			<IonIcon :icon="arrowForwardOutline" class="text-secondaryText" />
		</div>

		<div class="w-full rounded-lg text-sm text-primaryBg flex items-center justify-between border border-primaryBg overflow-hidden text-sm">
			<span class="w-1/2 text-center py-2" v-for="item in tabs" :key="item.id" @click="currentTab = item.path"
				:class="{'bg-primaryBg text-bodyBg': item.path == currentTab}"
			>
				{{item.path}}
			</span>
		</div>

		<LogTab v-if="currentTab == 'Log'"/>
		<StudentTab v-if="currentTab == 'Students'"/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { arrowForwardOutline, addOutline } from 'ionicons/icons'
import LogTab from './logs/logTab.vue'
import StudentTab from './students/studentTab.vue'

export default defineComponent({
	name: 'TeacherAttendance',
	components: {LogTab, StudentTab},
	setup (props) {
		const currentTab = ref('Log')

		const tabs = [
			{path: 'Log', id: 1},
			{path: 'Students', id: 2}
		]
		return {
		 	arrowForwardOutline, addOutline, tabs, currentTab
		}
	}
})
</script>
