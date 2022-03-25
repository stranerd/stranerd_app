<template>
	<ClassWrapper>
		<template v-slot="{ classInst }">
			<ClassQuestions :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import ClassQuestions from '@app/components/classes/classes/ClassQuestions.vue'

export default defineComponent({
	name: 'ClassClassIdQuestions',
	displayName: 'Class',
	components: { ClassWrapper, ClassQuestions }
})
</script>
