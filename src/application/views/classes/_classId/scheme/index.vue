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
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ClassClassIdScheme',
	components: { SchemeList, ClassWrapper },
	setup () {
		useRouteMeta('Scheme of Work')
	}
})
</script>

