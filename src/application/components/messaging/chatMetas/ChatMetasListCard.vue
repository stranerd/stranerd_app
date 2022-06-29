<template>
	<router-link :to="chatMeta.getToLink(id)" class="flex items-center leading-none py-2 gap-2">
		<span>
			<Avatar :name="chatMeta.getToName(id)" :size="40" :src="chatMeta.getToPhoto(id)" />
		</span>
		<div class="flex flex-col w-full gap-1 leading-none">
			<div class="flex gap-2 items-center">
				<IonText class="font-bold w-full truncate capitalize">
					{{ chatMeta.getToName(id) }}
				</IonText>
				<IonText v-if="chatMeta.last" class="text-sm whitespace-nowrap">
					{{ formatTime(chatMeta.last.createdAt) }}
				</IonText>
			</div>
			<div v-if="chatMeta.last" :class="{'font-bold': chatMeta.hasUnRead(id)}"
				class="flex gap-2 items-center text-sm">
				<IonText class="w-full truncate">
					<span v-if="chatMeta.isClasses(chatMeta)">
						{{ chatMeta.last.from.id === id ? 'You' : chatMeta.last.from.bio.firstName }} :&nbsp;
					</span>
					{{ chatMeta.last.media ? 'Shared a file' : chatMeta.last.body }}
				</IonText>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import { ChatMetaEntity } from '@modules/messaging'

export default defineComponent({
	name: 'ChatMetasListCard',
	props: {
		chatMeta: {
			type: ChatMetaEntity,
			required: true
		}
	},
	setup () {
		const { id } = useAuth()
		return { formatTime, id }
	}
})
</script>
