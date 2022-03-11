<template>
	<div :class="{'justify-end': discussion.userId === id}"
		class="flex gap-1 items-end text-main_dark text-sm lg:text-base w-full">
		<Avatar v-if="discussion.userId !== id" :id="discussion.userId" :name="discussion.userBio.fullName"
			:size="24" :src="discussion.userBio.photo" />
		<div :class="discussion.userId === id ? 'bg-new_gray rounded-bl-xl' : 'bg-[#1997DE1A] rounded-br-xl'"
			class="py-[6px] px-3 min-w-[25%] max-w-[70%] lg:max-w-[55%] rounded-t-xl flex flex-col gap-1">
			<span v-if="discussion.userId !== id" class="flex gap-1 items-center text-gray font-semibold">
				<span>{{ discussion.userBio.fullName }}</span>
				<IonIcon v-if="discussion.isUserVerified" :icon="checkmarkCircleOutline" color="primary" />
			</span>
			<div v-if="discussion.isMedia" class="flex flex-col">
				<img v-if="discussion.isImage" :src="discussion.media.link" alt="" class="w-full rounded-t-xl">
				<div :class="{'rounded-t-xl': !discussion.isImage}"
					class="bg-white flex gap-2 items-center p-3 rounded-b-xl">
					<IonIcon :icon="documentOutline" class="text-2xl" />
					<IonText class="flex-grow truncate">{{ discussion.media.name }}</IonText>
					<IonSpinner v-if="loading" class="text-2xl" color="primary" />
					<IonIcon v-else :icon="downloadOutline" class="text-2xl" color="primary" @click="download" />
				</div>
			</div>
			<div class="flex gap-2 items-end">
				<div class="flex-grow">{{ discussion.content }}</div>
				<span class="text-sm">{{ formatTimeAsDigits(new Date(discussion.createdAt)) }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DiscussionEntity } from '@modules/classes'
import { useAuth } from '@app/composable/auth/auth'
import { formatTimeAsDigits } from '@utils/dates'
import { checkmarkCircleOutline, documentOutline, downloadOutline } from 'ionicons/icons'
import { IonSpinner } from '@ionic/vue'
import { useDownloadableLink } from '@app/composable/meta/media'

export default defineComponent({
	name: 'DiscussionsListCard',
	props: {
		discussion: {
			required: true,
			type: DiscussionEntity
		}
	},
	components: { IonSpinner },
	setup (props) {
		const { id } = useAuth()
		const { loading, download } = useDownloadableLink(props.discussion.media!)
		return { id, formatTimeAsDigits, checkmarkCircleOutline, documentOutline, downloadOutline, download, loading }
	}
})
</script>
