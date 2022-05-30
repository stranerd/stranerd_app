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

export default defineComponent({
	name: 'ClassClassIdLibrary',
	components: { ClassWrapper, ClassLibrary },
	setup () {
		useRouteMeta('Library')
	}
})
</script>
