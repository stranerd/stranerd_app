<template>
	<div class="showcase-flex">
		<EmptyState v-if="!loading && !error && groups.length === 0"
			info="This class has no groups yet!" />
		<GroupsListCard v-for="group in groups" :key="group.hash" :classInst="classInst" :group="group" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import { useGroupList } from '@app/composable/classes/groups'
import GroupsListCard from '@app/components/classes/groups/GroupsListCard.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'GroupsList',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { GroupsListCard },
	setup (props) {
		const { id } = useAuth()
		const { loading, error, groups } = useGroupList(props.classInst.id)
		return { id, loading, error, groups }
	}
})
</script>
