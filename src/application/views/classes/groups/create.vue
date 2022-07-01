<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<GroupForm :error="error" :factory="factory" :loading="loading" :submit="createGroup" class="page-padding">
			<template v-slot:buttonText>Create Group</template>
		</GroupForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { setGroupClassId, useCreateGroup } from '@app/composable/classes/groups'
import GroupForm from '@app/components/classes/groups/GroupForm.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ClassesGroupsCreate',
	components: { GroupForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		if (to.query.classId) setGroupClassId(to.query.classId as string)
	}]),
	setup () {
		useRouteMeta('Start a discussion', { back: true })
		const { createGroup, factory, error, loading } = useCreateGroup()
		return { error, loading, createGroup, factory }
	}
})
</script>
