<template>
	<div 
		class="flex gap-1 items-center text-secondaryText w-full">
		<Avatar  :id="discussion.user.id" :name="discussion.user.bio.fullName" class="self-center"
			:size="36" :src="discussion.user.bio.photo" />
		<div
			class="py-2 px-3 min-w-[25%] max-w-[70%] lg:max-w-[55%] rounded-t-xl flex flex-col gap-1">
			<span class="flex gap-1 items-center ">
				<span class="font-bold text-[15px]" :class="discussion.user.id !== id ? 'text-bodyText ' : 'text-info'">{{ discussion.user.id !== id ? discussion.user.bio.fullName : "You" }}</span>
				<Verified :verified="discussion.user.roles.isVerified" />
				<div class="dot bg-secondaryText"></div>
				<span class="text-[10px]  leading-none text-secondaryText">{{ formatTimeAsDigits(new Date(discussion.createdAt)) }}</span>
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
				<div class="flex-grow leading-none text-[15px]">
					<span v-html="discussion.formattedContent" />
				</div>
				
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
