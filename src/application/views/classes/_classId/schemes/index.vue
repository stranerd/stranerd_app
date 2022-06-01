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
import SchemeList from '@app/components/classes/schemes/SchemesList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ClassClassIdSchemes',
	components: { SchemeList, ClassWrapper },
	setup () {
		useRouteMeta('Scheme of Work')
	}
})
</script>
