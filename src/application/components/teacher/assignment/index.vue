<template>
	<div class="showcase-flex flex-1">
		<router-link to="/post-assignment">
			<div class="flex items-center justify-between px-4 py-3 rounded-lg border">
				<span class="flex items-center text-secondaryText">
					<IonIcon :icon="clipboardOutline" class="mr-4" />
					Post an assignment
				</span>
				<IonIcon :icon="arrowForwardOutline" class="text-secondaryText" />
			</div>
		</router-link>

		<AssignmentCard title="Week 1 Assignments"/>
		<AssignmentCard title="Week 2 Assignments"/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { clipboardOutline, arrowForwardOutline } from 'ionicons/icons'
import AssignmentCard from './assignmentCard.vue'

export default defineComponent({
	name: 'TeacherAssignment',
	components: { AssignmentCard },
	setup (props) {
	
		return {
			clipboardOutline, arrowForwardOutline
		}
	}
})
</script>
