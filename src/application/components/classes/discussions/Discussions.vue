<template>
	<div class="chat-block">
		<div v-if="group && group.members.includes(id)" class="body">
			<div class="flex items-center bg-headerBg text-headerText px-4 gap-4">
				<router-link :to="`/classes/${classId}/groups`">
					<IonIcon :icon="arrowBackOutline" class="text-2xl" />
				</router-link>
				<Avatar :name="group.name" :size="36" />
				<div class="flex flex-col flex-grow truncate">
					<IonText class="font-semibold">{{ group.name }}</IonText>
					<IonText class="text-sm">
						Created {{ formatTime(group.createdAt) }} by <span>{{ group.user.bio.fullName }}</span>
					</IonText>
				</div>
				<span v-if="group.admins.includes(id)">
					<IonIcon :icon="createOutline" class="text-2xl" @click="openGroupEditModal(group, $router)" />
				</span>
			</div>
			<DiscussionsList :classId="classId" :groupId="groupId" class="content" />
			<DiscussionForm :classId="classId" :groupId="groupId" />
		</div>
		<div v-else-if="!loading" class="body justify-center">
			<EmptyState :route="`/classes/${classId}/groups`"
				btnText="Back to class"
				info="This group doesn't exist or you are not a member of the class it is in." />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { arrowBackOutline, chatboxEllipsesOutline, createOutline } from 'ionicons/icons'
import { openGroupEditModal, useGroupList } from '@app/composable/classes/groups'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import DiscussionForm from '@app/components/classes/discussions/DiscussionForm.vue'
import DiscussionsList from '@app/components/classes/discussions/DiscussionsList.vue'

export default defineComponent({
	name: 'Discussions',
	components: { DiscussionForm, DiscussionsList },
	props: {
		classId: {
			required: true,
			type: String
		},
		groupId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { loading, error, groups } = useGroupList(props.classId)
		const group = computed(() => groups.value.find((group) => group.id === props.groupId) ?? null)
		return {
			arrowBackOutline, chatboxEllipsesOutline, createOutline,
			formatTime, loading, error, group, id, openGroupEditModal
		}
	}
})
</script>
