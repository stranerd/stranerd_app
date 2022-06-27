<template>
	<Modal>
		<template v-slot:title>
			Create a group
		</template>
		<GroupForm :error="error" :factory="factory" :loading="loading" :submit="createGroup">
			<template v-slot:buttonText>Create Group</template>
		</GroupForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateGroup } from '@app/composable/classes/groups'
import GroupForm from '@app/components/classes/groups/GroupForm.vue'

export default defineComponent({
	name: 'CreateGroupModal',
	components: { GroupForm },
	setup () {
		const { createGroup, factory, error, loading } = useCreateGroup()
		return { error, loading, createGroup, factory }
	}
})
</script>
