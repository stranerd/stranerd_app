<template>
	<ClassWrapper>
		<template v-slot="{ classInst }">
			<ClassMembers :key="classInst.hash" :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/ClassWrapper.vue'
import ClassMembers from '@app/components/classes/ClassMembers.vue'

export default defineComponent({
	name: 'ClassClassIdMembers',
	displayName: 'Class',
	components: { ClassWrapper, ClassMembers }
})
</script>
