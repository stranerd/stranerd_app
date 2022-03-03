<template>
	<Justified>
		<div v-if="video">
			<div class="blueTop ">
				<ion-text class="heading lg:text-2xl font-bold text-white text-center ">
					{{ video.title }}
				</ion-text>
			</div>
			<div class="lg:w-8/12 w-full mx-auto p-4 md:my-4">
				<Video :video="video" />
			</div>
			<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
				<div class="lg:w-8/12 max-w-[60rem] w-full px-4 mx-auto flex items-center justify-between">
					<div class="flex">
						<Avatar :id="video.userId" :size="28" :src="video.userBio.photo" class="mx-2" />
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
