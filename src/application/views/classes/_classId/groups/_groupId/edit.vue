<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<GroupForm :disabled="{ classId: true }" :error="error" :factory="factory" :loading="loading"
			:submit="editGroup" class="page-padding">
			<template v-slot:buttonText>Update Group</template>
		</GroupForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { getEditingGroup, useEditGroup } from '@app/composable/classes/groups'
import { generateMiddlewares } from '@app/middlewares'
import GroupForm from '@app/components/classes/groups/GroupForm.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ClassesClassIdGroupsGroupIdEdit',
	components: { GroupForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { classId = '', groupId = '' } = to.params
		const group = getEditingGroup()
		if (!group || group.id !== groupId) return `/classes/${classId}/groups/${groupId}`
		const canEdit = group.admins.includes(id.value)
		if (!canEdit) return `/classes/${classId}/groups/${group.id}`
	}]),
	setup () {
		useRouteMeta('Edit group', { back: true })
		const { editGroup, factory, error, loading } = useEditGroup()
		return { error, loading, editGroup, factory }
	}
})
</script>
