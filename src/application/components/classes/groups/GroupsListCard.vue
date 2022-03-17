<template>
	<router-link :to="`/classes/${group.classId}/groups/${group.id}`"
		class="bg-white rounded-xl flex items-center card-padding">
		<IonIcon :icon="chatboxEllipsesOutline" class="text-gray text-4xl md:text-5xl" />
		<div class="flex flex-col w-full">
			<div class="flex gap-2 text-main_dark">
				<IonText class="font-semibold w-full truncate capitalize">
					{{ group.name }}
				</IonText>
				<IonText v-if="group.last" class="text-sub">
					{{ formatTime(group.last.createdAt) }}
				</IonText>
			</div>
			<div v-if="group.last" class="flex gap-2 items-center">
				<IonText class="text-sub text-gray w-full truncate">
					<span class="font-bold">{{ group.last.userId === id ? 'You' : group.last.userBio.firstName }}</span>:
					{{ group.last.media ? 'Shared a file' : group.last.content }}
				</IonText>
				<span v-if="!!unReadDiscussions" class="dot bg-primary" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity, GroupEntity } from '@modules/classes'
import { chatboxEllipsesOutline } from 'ionicons/icons'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import { useGroupDiscussions } from '@app/composable/classes/discussions'

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
		const { unReadDiscussions } = useGroupDiscussions(props.group.id)
		return { chatboxEllipsesOutline, formatTime, id, unReadDiscussions }
	}
})
</script>
