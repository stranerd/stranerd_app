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
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassesClassIdAnnouncements',
	components: { AnnouncementsList, ClassWrapper },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Announcements')
	}
})
</script>
