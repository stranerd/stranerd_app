<template>
	<Justified>
		<div v-if="video">
			<div class="blueTop py-4">
				<div
					class="flex flex-col md:flex-row md:justify-between justify-start items-start px-4 w-full lg:w-8/12 w-full mx-auto">
					<ion-text class="heading lg:text-xl font-bold text-main_dark text-start">
						{{ video.title }}
					</ion-text>
					<div class="items-center text-gray font-normal  flex gap-3 mt-4 md:mt-0">
						<Avatar :id="video.userId" :name="video.userBio.fullName" :size="24"
							:src="video.userBio.photo" />
						<Share :link="video.shareLink" :title="video.title" cssClass="text-xl"
							text="Share this video" />
						<ion-icon :icon="isSaved ? bookmark : bookmarkOutline" class="text-xl"
							@click="openSaveModal(video)" />
					</div>
				</div>
			</div>
			<div class="bg-white w-full lg:w-8/12 w-full mx-auto">
				<Video :video="video" />
			</div>
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import {
	add,
	bookmark,
	bookmarkOutline,
	checkmarkCircleOutline,
	chevronDown,
	chevronUp,
	contract,
	pencil,
	remove,
	scan,
	shareSocial
} from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useVideo } from '@app/composable/study/videos'
import Share from '@app/components/core/Share.vue'
import Video from '@app/components/study/videos/Video.vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { openSaveModal } from '@app/composable/study/menus'

export default defineComponent({
	name: 'StudyVideosVideoId',
	displayName: 'Video',
	components: { Justified, Avatar, Video, Share },
	setup () {
		const { videoId } = useRoute().params
		const { error, loading, video } = useVideo(videoId as string)
		const { sets } = useUserSetList()
		const isSaved = computed(() => sets.value.some((set) => set.allSaved.includes(videoId as string)))
		return {
			add, remove, scan, chevronDown, loading, video, error, isSaved, openSaveModal,
			chevronUp, pencil, contract, bookmark, shareSocial, checkmarkCircleOutline, bookmarkOutline
		}
	}
})
</script>
