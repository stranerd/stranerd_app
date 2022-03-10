<template>
	<Justified>
		<div v-if="video">
			<div class="blueTop ">
				<div class="flex flex-col md:flex-row md:justify-between justify-start items-start lg:w-8/12 w-full max-w-[60rem] mx-auto px-4">
					<div>
						<ion-text class="heading lg:text-xl font-bold text-main_dark text-start">
							{{ video.title }}
						</ion-text>
				
					</div>

					<div class="items-center text-gray font-normal  flex gap-3 mt-4 md:mt-0">
					
						<Avatar :id="video.userId" :name="video.userBio.fullName" :size="24"
							:src="video.userBio.photo" />
						<Share :link="video.shareLink" :title="video.title" cssClass="text-xl"
							text="Share this video" />
						<!-- <ion-icon :icon="isSaved ? bookmark : bookmarkOutline" class="text-xl"
							@click="openSaveModal(video)" /> -->
					</div>
				</div>
			</div>
			<div class="lg:w-8/12 w-full mx-auto py-4 md:my-4">
				<Video :video="video" />
			</div>
			<!-- <div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
				<div class="lg:w-8/12 max-w-[60rem] w-full px-4 mx-auto flex items-center justify-between">
					<div class="flex">
						<Avatar :id="video.userId" :name="video.userBio.fullName" :size="28" :src="video.userBio.photo"
							class="mx-2" />
						<ion-text class="text-icon_inactive flex items-center gap-1">
							<span>by <b>{{ video.userBio.firstName }} </b></span>
							<IonIcon v-if="video.isUserVerified" :icon="checkmarkCircleOutline" color="primary" />
						</ion-text>
					</div>
					<div class="flex items-center">
						<Share :text="video.description" :title="video.title"
							cssClass="text-icon_inactive text-xl cursor-pointer mx-2" />
					</div>
				</div>
			</div> -->
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import {
	add,
	bookmark,
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
import Video from '@app/components/study/videos/Video.vue'

export default defineComponent({
	name: 'StudyVideosVideoId',
	displayName: 'Video',
	components: { Justified, Avatar, Video, Share },
	setup () {
		const { videoId } = useRoute().params
		const { error, loading, video } = useVideo(videoId as string)
		return {
			add, remove, scan, chevronDown, loading, video, error,
			chevronUp, pencil, contract, bookmark, shareSocial, checkmarkCircleOutline
		}
	}
})
</script>
