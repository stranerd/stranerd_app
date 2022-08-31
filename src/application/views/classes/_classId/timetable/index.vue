<template>
	<ClassWrapper>
		<template v-slot:header="{ classInst }">
			<IonButton class="btn-primary" @click="openCreateTimetableModal(classInst, $router)">Set up timetable
			</IonButton>
		</template>
		<template v-slot="{ classInst }">
			<TimetableList :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import TimetableList from '@app/components/classes/timetable/TimetableList.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import { openCreateTimetableModal } from '@app/composable/classes/timetable'

export default defineComponent({
	name: 'ClassClassIdTimetable',
	components: { TimetableList, ClassWrapper },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Timetable', { back: true })
		return { openCreateTimetableModal }
	}
})
</script>
