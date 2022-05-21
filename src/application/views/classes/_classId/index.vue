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

export default defineComponent({
	name: 'ClassClassId',
	displayName: 'Class',
	components: { ClassWrapper, TimetableList }
})
</script>
