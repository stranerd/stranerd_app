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

export default defineComponent({
	name: 'ClassClassIdMembers',
	components: { ClassWrapper, ClassMembers },
	setup () {
		useRouteMeta('Classmates')
	}
})
</script>
