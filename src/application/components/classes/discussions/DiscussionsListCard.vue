<template>
	<div
		class="flex gap-4 items-center w-full text-sm">
		<Avatar :id="discussion.user.id" :name="discussion.user.bio.fullName" :size="24"
			:src="discussion.user.bio.photo" />
		<div class="min-w-[25%] max-w-[70%] lg:max-w-[55%] rounded-t-xl flex flex-col gap-1">
			<span class="flex gap-1 items-center">
				<span :class="{ 'text-info': discussion.user.id === id }" class="font-bold">
					{{ discussion.user.id !== id ? discussion.user.bio.fullName : 'You' }}</span>
				<Verified :verified="discussion.user.roles.isVerified" />
				<IonIcon :icon="ellipse" class="dot" />
				<span class="text-[0.9em] leading-none text-secondaryText">
					{{ formatTimeAsDigits(new Date(discussion.createdAt)) }}
				</span>
			</span>
			<div v-if="discussion.isMedia" class="flex flex-col" @click="openFile">
				<img v-if="discussion.isImage" :src="discussion.media.link" alt="" class="w-full rounded-t-xl">
				<div :class="{'rounded-t-xl': !discussion.isImage}"
					class="bg-itemBg flex gap-2 items-center p-2 rounded-b-xl">
					<span>
						<IonIcon :icon="documentOutline" />
					</span>
					<IonText class="w-full truncate">{{ discussion.media.name }}</IonText>
					<span>
						<SpinLoading v-if="loading" />
						<IonIcon v-else-if="!content" :icon="downloadOutline" @click="download" />
					</span>
				</div>
			</div>
			<span class="leading-none" v-html="discussion.formattedContent" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DiscussionEntity } from '@modules/classes'
import { useAuth } from '@app/composable/auth/auth'
import { formatTimeAsDigits } from '@utils/dates'
import { documentOutline, downloadOutline, ellipse } from 'ionicons/icons'
import { useDownload } from '@app/composable/meta/media'
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
		return {
			id, formatTimeAsDigits, isWeb,
			documentOutline, downloadOutline, ellipse,
			content, download, openFile, loading
		}
	}
})
</script>
