<template>
	<div :class="{'justify-end': discussion.user.id === id}"
		class="flex gap-1 items-end text-secondaryText w-full">
		<!-- <Avatar v-if="discussion.user.id !== id" :id="discussion.user.id" :name="discussion.user.bio.fullName"
			:size="24" :src="discussion.user.bio.photo" /> -->
		<div :class="discussion.user.id === id ? 'bg-outlineHover rounded-bl-xl' : 'bg-itemBg rounded-br-xl'"
			class="py-2 px-3 min-w-[25%] max-w-[70%] lg:max-w-[55%] rounded-t-xl flex flex-col gap-1">
			<span v-if="discussion.user.id !== id" class="flex gap-1 items-center text-bodyText font-bold text-xs">
				<span>{{ discussion.user.bio.fullName }}</span>
				<Verified :verified="discussion.user.roles.isVerified" />
			</span>
			<div v-if="discussion.isMedia" class="flex flex-col" @click="openFile">
				<img v-if="discussion.isImage" :src="discussion.media.link" alt="" class="w-full rounded-t-xl">
				<div :class="{'rounded-t-xl': !discussion.isImage}"
					class="bg-bodyBg flex gap-2 items-center p-3 rounded-b-xl">
					<IonIcon :icon="documentOutline" class="text-heading3" />
					<IonText class="w-full truncate">{{ discussion.media.name }}</IonText>
					<SpinLoading v-if="loading" class="text-heading3" />
					<IonIcon v-else-if="!content" :icon="downloadOutline" class="text-heading3" color="primary"
						@click="download" />
				</div>
			</div>
			<div class="flex gap-2 items-end">
				<div class="flex-grow leading-none text-xs">
					<span v-html="discussion.formattedContent" />
				</div>
				<span class="text-sub2 leading-none">{{ formatTimeAsDigits(new Date(discussion.createdAt)) }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DiscussionEntity } from '@modules/classes'
import { useAuth } from '@app/composable/auth/auth'
import { formatTimeAsDigits } from '@utils/dates'
import { documentOutline, downloadOutline } from 'ionicons/icons'
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
			documentOutline, downloadOutline,
			content, download, openFile, loading
		}
	}
})
</script>
