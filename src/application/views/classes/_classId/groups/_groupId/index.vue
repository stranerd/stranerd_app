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

export default defineComponent({
	name: 'ClassesClassIdGroupsGroupId',
	displayName: 'Group',
	components: { Justified, Discussions },
	middlewares: ['isAuthenticated'],
	setup () {
		const route = useRoute()
		const { classId, groupId } = route.params
		return { classId, groupId }
	}
})
</script>
