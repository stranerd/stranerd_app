<template>
	<div :class="{'justify-end': discussion.userId === id}"
		class="flex gap-1 items-end text-main_dark w-full">
		<Avatar v-if="discussion.userId !== id" :id="discussion.userId" :name="discussion.userBio.fullName"
			:size="24" :src="discussion.userBio.photo" />
		<div :class="discussion.userId === id ? 'bg-new_gray rounded-bl-xl' : 'bg-[#1997DE1A] rounded-br-xl'"
			class="py-[6px] px-3 min-w-[25%] max-w-[70%] lg:max-w-[55%] rounded-t-xl flex flex-col gap-1">
			<span v-if="discussion.userId !== id" class="flex gap-1 items-center text-gray font-semibold">
				<span>{{ discussion.userBio.fullName }}</span>
				<Verified :verified="discussion.userRoles.isVerified" />
			</span>
			<div v-if="discussion.isMedia" class="flex flex-col" @click="openFile">
				<img v-if="discussion.isImage" :src="discussion.media.link" alt="" class="w-full rounded-t-xl">
				<div :class="{'rounded-t-xl': !discussion.isImage}"
					class="bg-white flex gap-2 items-center p-3 rounded-b-xl">
					<IonIcon :icon="documentOutline" class="text-2xl" />
					<IonText class="w-full truncate">{{ discussion.media.name }}</IonText>
					<SpinLoading v-if="loading" class="text-2xl" />
					<IonIcon v-else-if="!content" :icon="downloadOutline" class="text-2xl" color="primary"
						@click="download" />
				</div>
			</div>
			<div class="flex gap-2 items-end">
				<div class="flex-grow leading-none">
					<span v-html="discussion.formattedContent" />
				</div>
				<span class="text-sub2 leading-none">{{ formatTimeAsDigits(new Date(discussion.createdAt)) }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { DiscussionEntity } from '@modules/classes'
import { useAuth } from '@app/composable/auth/auth'
import { formatTimeAsDigits } from '@utils/dates'
import { documentOutline, downloadOutline } from 'ionicons/icons'
import { useDownload } from '@app/composable/meta/media'
import { saveDiscussionsReadState } from '@app/composable/classes/discussions'
import { isWeb } from '@utils/constants'

export default defineComponent({
	name: 'DiscussionsListCard',
	props: {
		discussion: {
			required: true,
			type: DiscussionEntity
		}
	},
	setup (props) {
		const { id } = useAuth()
		const {
			content, loading, openFile, downloadWeb, download: downloadApp
		} = useDownload(props.discussion.media?.name ?? '', props.discussion.media?.link ?? '', 'discussions')
		const download = isWeb ? downloadWeb : downloadApp
		onMounted(async () => {
			await saveDiscussionsReadState(props.discussion)
		})
		return {
			id, formatTimeAsDigits, isWeb,
			documentOutline, downloadOutline,
			content, download, openFile, loading
		}
	}
})
</script>
