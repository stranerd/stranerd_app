<template>
	<router-link :to="`/classes/${group.classId}/groups/${group.id}`"
		class="bg-white rounded-xl flex items-center card-padding leading-none">
		<span>
			<IonIcon :icon="chatboxEllipsesOutline" class="text-gray text-heading5" />
		</span>
		<div class="flex flex-col w-full truncate">
			<div class="flex gap-2 text-secondaryText items-center">
				<IonText class="font-semibold w-full truncate capitalize">
					{{ group.name }}
				</IonText>
				<IonText v-if="group.last" class="text-sub whitespace-nowrap">
					{{ formatTime(group.last.createdAt) }}
				</IonText>
			</div>
			<div v-if="group.last" class="flex gap-2 items-center">
				<IonText class="text-sub text-gray w-full truncate">
					<span class="font-bold">{{
						group.last.user.id === id ? 'You' : group.last.user.bio.firstName
					}}</span>:
					{{ group.last.media ? 'Shared a file' : group.last.content }}
				</IonText>
				<span v-if="!!unReadDiscussions" class="dot bg-primary" />
			</div>
		</div>
		<span v-if="group.admins.includes(id)" class="rounded-full p-1" @click.prevent="showMenu">
			<IonIcon :icon="ellipsisVerticalOutline" class="text-gray text-heading" />
		</span>
		<PageLoading v-if="loading" />
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity, GroupEntity } from '@modules/classes'
import {
	chatboxEllipsesOutline,
	closeOutline,
	ellipsisVerticalOutline,
	pencilOutline,
	trashOutline
} from 'ionicons/icons'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import { useGroupDiscussions } from '@app/composable/classes/discussions'
import { openGroupEditModal, useDeleteGroup } from '@app/composable/classes/groups'
import { actionSheetController } from '@ionic/vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'GroupsListCard',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		},
		group: {
			type: GroupEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const router = useRouter()
		const { loading, deleteGroup } = useDeleteGroup(props.group.classId, props.group.id)
		const { unReadDiscussions } = useGroupDiscussions(props.classInst.id, props.group.id)
		const showMenu = async () => {
			const actionSheet = await actionSheetController
				.create({
					buttons: [
						{
							text: 'Rename discussion',
							icon: pencilOutline,
							handler: () => openGroupEditModal(props.group, router)
						},
						{ text: 'Delete discussion', role: 'destructive', icon: trashOutline, handler: deleteGroup },
						{ text: 'Cancel', icon: closeOutline, role: 'cancel' }
					]
				})
			await actionSheet.present()
		}
		return {
			chatboxEllipsesOutline, pencilOutline, trashOutline, ellipsisVerticalOutline,
			formatTime, id, unReadDiscussions, openGroupEditModal,
			loading, deleteGroup, showMenu
		}
	}
})
</script>
