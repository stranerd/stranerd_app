<template>
	<ClassWrapper :hideTitle="true">
		<template v-slot="{ classInst }">
			<ClassMembers :key="classInst.hash" :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import ClassMembers from '@app/components/classes/classes/ClassMembers.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassClassIdMembers',
	components: { ClassWrapper, ClassMembers },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Classmates')
	}
})
</script>
