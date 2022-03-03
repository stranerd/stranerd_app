<template>
	<div class="w-full bg-white rounded-xl flex flex-col justify-between box-border card-padding text-main_dark">
		<div class="w-full justify-between items-start flex gap-2">
			<ion-text class="font-semibold truncate w-full">{{ video.title }}</ion-text>
			<router-link :to="`/study/videos/${video.id}`">
				<ion-icon :icon="arrowForwardCircleOutline" class="text-primary text-xl" />
			</router-link>
		</div>

		<div class="w-full flex items-center justify-between gap-2">
			<Tag tag="Video">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="playCircleOutline" class="text-base mr-1" />
						<ion-text class="text-xs">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-2">
				<Avatar :id="video.userId" :name="video.userBio.firstName" :size="24" :src="video.userBio.photo" />
				<Share :link="video.shareLink" :text="video.description" :title="video.title" cssClass="text-xl" />
				<ion-icon :icon="isSaved ? bookmark : bookmarkOutline" class="text-xl" @click="openSaveModal(video)" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Avatar from '@app/components/core/Avatar.vue'
import { VideoEntity } from '@modules/study'
import {
	arrowForwardCircleOutline,
	bookmark,
	bookmarkOutline,
	checkmarkCircleOutline,
	playCircleOutline
} from 'ionicons/icons'
import { useUserSetList } from '@app/composable/users/users/sets'
import { openSaveModal } from '@app/composable/study/menus'

export default defineComponent({
	name: 'VideosListCard',
	components: { Avatar },
	props: {
		video: {
			type: VideoEntity,
			required: true
		}
	},
	setup (props) {
		const { sets } = useUserSetList()
		const isSaved = computed(() => sets.value.some((set) => set.allSaved.includes(props.video.id)))
		return {
			playCircleOutline,
			checkmarkCircleOutline,
			arrowForwardCircleOutline,
			bookmark,
			bookmarkOutline,
			isSaved,
			openSaveModal
		}
	}
})
</script>
