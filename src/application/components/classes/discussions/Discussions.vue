<template>
	<div class="chat-block text-gray">
		<div v-if="group && group.members.includes(id)" class="body">
			<div class="flex items-center">
				<IonIcon :icon="chatboxEllipsesOutline" class="text-heading5" />
				<div class="ml-2 flex flex-col">
					<IonText class="text-secondaryText font-semibold">{{ group.name }}</IonText>
					<IonText class="text-sub">
						Created {{ formatTime(group.createdAt) }} by <span
							class="text-primary">{{ group.user.bio.fullName }}</span>
					</IonText>
				</div>
				<router-link :to="`/classes/${classId}/groups`" class="ml-auto flex">
					<IonIcon :icon="closeOutline" class="text-heading3" />
				</router-link>
			</div>
			<DiscussionsList :classId="classId" :groupId="groupId" class="content" />
			<DiscussionForm :classId="classId" :groupId="groupId" />
		</div>
		<div v-else class="body justify-center">
			<EmptyState :route="`/classes/${classId}/groups`"
				btnText="Back to class"
				info="This group doesn't exist or you are not a member of the class it is in." />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { chatboxEllipsesOutline, closeOutline } from 'ionicons/icons'
import { useGroupList } from '@app/composable/classes/groups'
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
			closeOutline, chatboxEllipsesOutline, formatTime,
			loading, error, group, id
		}
	}
})
</script>
