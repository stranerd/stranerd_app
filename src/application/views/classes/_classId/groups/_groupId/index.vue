<template>
	<Justified :hideBottom="true" :hideFab="true" :hideTop="true">
		<DiscussionsList :classId="classId" :groupId="groupId" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import DiscussionsList from '@app/components/classes/discussions/DiscussionsList.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'ClassesClassIdGroupsGroupId',
	displayName: 'Group',
	components: { Justified, DiscussionsList },
	middlewares: ['isAuthenticated'],
	setup () {
		const route = useRoute()
		const { classId, groupId } = route.params
		return { classId, groupId }
	}
})
</script>
