<template>
	<ClassWrapper>
		<template v-slot="{ classInst }">
			<GroupsList :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import { chatboxEllipses } from 'ionicons/icons'
import GroupsList from '@app/components/classes/groups/GroupsList.vue'

export default defineComponent({
	name: 'ClassClassIdDiscussions',
	displayName: 'Class',
	components: { GroupsList, ClassWrapper },
	setup () {
		return { chatboxEllipses }
	}
})
</script>
