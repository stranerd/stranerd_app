<template>
	<Modal>
		<template v-slot:title>
			Edit Group
		</template>
		<GroupForm :error="error" :factory="factory" :loading="loading" :submit="editGroup">
			<template v-slot:buttonText>Update Group</template>
		</GroupForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditGroup } from '@app/composable/classes/groups'
import GroupForm from '@app/components/classes/groups/GroupForm.vue'

export default defineComponent({
	name: 'EditGroupModal',
	components: { GroupForm },
	setup () {
		const { editGroup, factory, error, loading } = useEditGroup()
		return { error, loading, editGroup, factory }
	}
})
</script>
