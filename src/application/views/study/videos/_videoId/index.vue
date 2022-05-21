<template>
	<Justified>
		<div v-if="video">
			<div class="blueTop py-4">
				<div
					class="flex flex-col md:flex-row md:justify-between justify-start items-start px-4 w-full lg:w-8/12 w-full mx-auto">
					<ion-text class="text-heading font-bold text-main_dark text-start">
						{{ video.title }}
					</ion-text>
					<div class="items-center text-gray font-normal  flex gap-3 mt-4 md:mt-0">
						<Avatar :id="video.user.id" :name="video.user.bio.fullName" :size="24"
							:src="video.user.bio.photo" />
						<Share :link="video.shareLink" :title="video.title" cssClass="text-xl"
							text="Share this video" />
						<SaveToSet :entity="video" />
					</div>
				</div>
			</div>
			<div class="bg-white w-full lg:w-8/12 w-full mx-auto">
				<StudyVideo :video="video" />
			</div>
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import {
	add,
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
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useVideo } from '@app/composable/study/videos'
import Share from '@app/components/core/Share.vue'
import StudyVideo from '@app/components/study/videos/StudyVideo.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'StudyVideosVideoId',
	displayName: 'Video',
	components: { Justified, Avatar, StudyVideo, Share, SaveToSet },
	setup () {
		const { videoId } = useRoute().params
		const { error, loading, video } = useVideo(videoId as string)
		return {
			add, remove, scan, chevronDown, loading, video, error,
			chevronUp, pencil, contract, shareSocial, checkmarkCircleOutline
		}
	}
})
</script>
