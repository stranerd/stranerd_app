<template>
	<div class="block text-gray">
		<div v-if="group && group.members.includes(id)" class="body">
			<div class="flex items-center">
				<IonIcon :icon="chatboxEllipsesOutline" class="text-4xl md:text-5xl" />
				<div class="ml-2 flex flex-col">
					<IonText class="text-main_dark font-semibold">{{ group.name }}</IonText>
					<IonText class="text-xs">
						Created {{ formatTime(group.createdAt) }} by <span
							class="text-primary">{{ group.userBio.fullName }}</span>
					</IonText>
				</div>
				<router-link :to="`/classes/${classId}/groups`" class="ml-auto flex">
					<IonIcon :icon="closeOutline" class="text-2xl" />
				</router-link>
			</div>
			<DiscussionsList :groupId="groupId" class="content" />
			<DiscussionForm :groupId="groupId" />
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

<style lang="scss" scoped>
	.block {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 12000;
		background: rgba($color-mainDark, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;

		@media (min-width: $lg) {
			padding: 2rem 1rem;
		}

		.body {
			background: $color-white;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;

			@media (min-width: $lg) {
				border-radius: 0.5rem;
				width: 80%;
			}

			& > * {
				padding: 0.5rem 1rem;
			}

			.content {
				flex-grow: 1;
				border-top: $border;
				border-bottom: $border;
				overflow-y: auto;

				&::-webkit-scrollbar {
					display: none;
				}
			}
		}
	}
</style>
