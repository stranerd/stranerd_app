<template>
	<div class="chat-block text-bodyText">
		<div v-if="group && group.members.includes(id)" class="body">
			<div class="flex items-center bg-headerBg text-headerText">
				<router-link :to="`/classes/${classId}/groups`" class="mr-4 flex">
					<IonIcon :icon="arrowBackOutline" class="text-heading2" />
				</router-link>
				<avatar :name="group.name" :size="36"  />
				<div class="ml-2 flex flex-col">
					<IonText class="font-semibold">{{ group.name }}</IonText>
					<IonText class="text-sub">
						Created {{ formatTime(group.createdAt) }} by <span
							class="">{{ group.user.bio.fullName }}</span>
					</IonText>
				</div>

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
import { chatboxEllipsesOutline, arrowBackOutline } from 'ionicons/icons'
import { useGroupList } from '@app/composable/classes/groups'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import DiscussionForm from '@app/components/classes/discussions/DiscussionForm.vue'
import DiscussionsList from '@app/components/classes/discussions/DiscussionsList.vue'
import Avatar from '../../core/Avatar.vue'

export default defineComponent({
	name: 'Discussions',
	components: { DiscussionForm, DiscussionsList, Avatar },
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
			arrowBackOutline, chatboxEllipsesOutline, formatTime,
			loading, error, group, id
		}
	}
})
</script>
