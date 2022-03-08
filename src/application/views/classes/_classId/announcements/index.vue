<template>
	<ClassWrapper>
		<template v-slot="{ classInst }">
			<AnnouncementsList :classInst="classInst" />
		</template>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/classes/ClassWrapper.vue'
import AnnouncementsList from '@app/components/classes/announcements/AnnouncementsList.vue'

export default defineComponent({
	name: 'ClassesClassIdAnnouncements',
	displayName: 'Class',
	components: { AnnouncementsList, ClassWrapper }
})
</script>
