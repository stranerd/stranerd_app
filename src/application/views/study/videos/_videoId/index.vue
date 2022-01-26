<template>
	<Justified>
		<div class="bg-primary w-full min-h-[150px] flex flex-col justify-center items-center pt-0 pb-1">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center my-2">
				{{ video?.title }}
			</ion-text>
		</div>

		<div
			:class="[isFullscreen ? 'flex items-center justify-center flex-col':'', 'lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-white']">

			<div ref="screen" class="bg-faded_gray h-[25rem] min-w-[57px] w-full grid place-items-center rounded-md "
				@click="toggle">
				<div class="bg-white rounded-full grid place-items-center h-16 w-16">
					<ion-icon
						:icon="play"
						class="text-faded_gray text-3xl"
					/>
				</div>

			</div>

			<div class="w-full flex flex-col items-center justify-between my-8 max-w-[40rem] mx-auto">
				<ion-text class="text-lg text-main_dark font-bold">
					Description
				</ion-text>
				<ion-text class="text-main_dark text-sm text-center">
					{{ video?.description }}
				</ion-text>
			</div>
		</div>

		<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
			<div class="lg:w-8/12 max-w-[60rem] w-full px-4 mx-auto flex items-center justify-between">
				<div class="flex">
					<Avatar :id="video?.userId" :size="28" :src="video?.userBio?.photo" class="mx-2" />
					<ion-text class="text-icon_inactive"> by <b>{{ video?.userBio.firstName }}</b></ion-text>
				</div>

				<div class="flex items-center">

					<ion-icon
						:icon="pencil"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
					<ion-icon
						:icon="bookmark"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
					<Share
						cssClass="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
				</div>
			</div>
		</div>
	</Justified>
	<page-loading v-if="loading" />
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { add, bookmark, chevronBack, chevronForward, contract, pencil, play, scan, shareSocial } from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { defineComponent } from 'vue'

import { useRoute } from 'vue-router'
import { useVideo } from '@app/composable/study/videos'

export default defineComponent({
	name: 'StudyVideosVideoId',
	displayName: 'Videos',
	components: {
		Justified,
		// ShowRatings,
		Avatar
	},
	setup () {
		const { videoId } = useRoute().params
		const { error, loading, video } = useVideo(videoId as string)
		return {
			loading, video, play, add,
			scan, chevronBack, chevronForward,
			pencil, contract, bookmark, shareSocial
		}
	}
})
</script>
