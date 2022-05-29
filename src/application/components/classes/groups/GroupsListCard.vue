<template>
	<router-link :to="`/classes/${group.classId}/groups/${group.id}`"
		class="flex items-center leading-none py-2 gap-2">
		<span>
			<Avatar :name="group.name" :size="40" :src="classInst.photo" />
		</span>
		<div class="flex flex-col w-full gap-1 leading-none">
			<div class="flex gap-2 items-center">
				<IonText class="font-bold w-full truncate capitalize">
					{{ group.name }}
				</IonText>
				<IonText v-if="group.last" class="text-sub whitespace-nowrap">
					{{ formatTime(group.last.createdAt) }}
				</IonText>
			</div>
			<div v-if="group.last" class="flex gap-2 items-center text-sub">
				<IonText class="w-full truncate">
					{{ group.last.user.id === id ? 'You' : group.last.user.bio.firstName }}
					: {{ group.last.media ? 'Shared a file' : group.last.content }}
				</IonText>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity, GroupEntity } from '@modules/classes'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'

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
	setup () {
		const { id } = useAuth()
		return { formatTime, id }
	}
})
</script>
