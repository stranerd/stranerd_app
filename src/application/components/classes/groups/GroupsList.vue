<template>
	<div class="flex flex-col gap-4">
		<div class="flex justify-end">
			<IonButton class="btn-primary" size="small" @click="openGroupModal(classInst, $router)">Add Group
			</IonButton>
		</div>
		<EmptyState v-if="!loading && !error && groups.length === 0" info="This class has no discussion groups yet!" />
		<GroupsListCard v-for="group in groups" :key="group.hash" :classInst="classInst" :group="group" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import { openGroupModal, useGroupList } from '@app/composable/classes/groups'
import GroupsListCard from '@app/components/classes/groups/GroupsListCard.vue'

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
		const { loading, error, groups } = useGroupList(props.classInst.id)
		return { loading, error, groups, openGroupModal }
	}
})
</script>
