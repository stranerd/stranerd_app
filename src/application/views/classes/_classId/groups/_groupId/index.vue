<template>
	<Justified :hideBottom="true" :hideTop="true">
		<Discussions :classId="classId" :groupId="groupId" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import Discussions from '@app/components/classes/discussions/Discussions.vue'
import { useRoute } from 'vue-router'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ClassesClassIdGroupsGroupId',
	components: { Justified, Discussions },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Group')
		const route = useRoute()
		const { classId, groupId } = route.params
		return { classId, groupId }
	}
})
</script>
