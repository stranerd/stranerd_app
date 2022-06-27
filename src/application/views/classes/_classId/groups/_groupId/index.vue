<template>
	<DefaultLayout :hideBottom="true" :hideTop="true" :hideFab="true">
		<Discussions :classId="classId" :groupId="groupId" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Discussions from '@app/components/classes/discussions/Discussions.vue'
import { useRoute } from 'vue-router'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ClassesClassIdGroupsGroupId',
	components: { Discussions },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Group', { back: true })
		const route = useRoute()
		const { classId, groupId } = route.params
		return { classId: classId as string, groupId: groupId as string }
	}
})
</script>
