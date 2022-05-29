<template>
	<ClassWrapper>
		<template v-slot="{ classInst }">
			<EventsList :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import EventsList from '@app/components/classes/events/EventsList.vue'

export default defineComponent({
	name: 'ClassClassIdEvents',
	displayName: 'Events',
	components: { EventsList, ClassWrapper }
})
</script>

