<template>
	<ClassWrapper>
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

export default defineComponent({
	name: 'ClassClassIdTimetable',
	components: { TimetableList, ClassWrapper },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Timetable', { back: true })
	}
})
</script>
