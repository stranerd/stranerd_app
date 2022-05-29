<template>
	<ClassWrapper>
		<template v-slot="{ classInst }">
			<SchemeList :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import SchemeList from '@app/components/classes/scheme/SchemeList.vue'

export default defineComponent({
	name: 'ClassClassIdScheme',
	displayName: 'Scheme of work',
	components: { SchemeList, ClassWrapper }
})
</script>

