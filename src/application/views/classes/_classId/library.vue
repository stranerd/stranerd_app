<template>
	<ClassWrapper>
		<template v-slot="{ classInst }">
			<ClassLibrary :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import ClassLibrary from '@app/components/classes/classes/ClassLibrary.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassClassIdLibrary',
	components: { ClassWrapper, ClassLibrary },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Library', { back: true })
	}
})
</script>
