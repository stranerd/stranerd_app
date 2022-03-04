<template>
	<div class="showcase-flex">
		<EmptyState v-if="!loading && !error && groups.length === 0"
			info="This class has no groups yet!" />
		<GroupForm v-if="classInst.admins.includes(id)"
			:error="createError"
			:factory="factory"
			:loading="createLoading"
			:submit="createGroup"
			class="bg-white px-4 md:py-4 rounded-xl"
		>
			<template v-slot:buttonText>
				Start new discussion
			</template>
		</GroupForm>
		<GroupsListCard v-for="group in groups" :key="group.hash" :classInst="classInst" :group="group" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ClassEntity } from '@modules/classes'
import { useCreateGroup, useGroupList } from '@app/composable/classes/groups'
import GroupsListCard from '@app/components/classes/groups/GroupsListCard.vue'
import { useAuth } from '@app/composable/auth/auth'
import GroupForm from '@app/components/classes/groups/GroupForm.vue'

export default defineComponent({
	name: 'GroupsList',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { GroupsListCard, GroupForm },
	setup (props) {
		const { id } = useAuth()
		const { loading, error, groups } = useGroupList(props.classInst.id)
		const { factory, error: createError, loading: createLoading, createGroup } = useCreateGroup()
		onMounted(() => {
			factory.value.classId = props.classInst.id
		})
		return {
			id, loading, error, groups,
			factory, createError, createLoading, createGroup
		}
	}
})
</script>
