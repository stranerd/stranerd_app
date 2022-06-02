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
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassClassIdEvents',
	components: { EventsList, ClassWrapper },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Events')
	}
})
</script>
