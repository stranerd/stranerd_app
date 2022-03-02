<template>
	<div class="bg-white rounded-xl flex flex-col gap-6 box-border justify-between p-4 text-main_dark">
		<div class="w-full justify-between items-start flex gap-2">
			<ion-text class="font-semibold truncate w-full">{{ set.name }}</ion-text>
			<router-link :to="`/study/sets/${set.id}`">
				<ion-icon :icon="arrowForwardCircleOutline" class="text-primary text-xl" />
			</router-link>
		</div>

		<div class="w-full flex items-center justify-between gap-2">
			<Tag :index="4"
				:tag="`${formatNumber(set.allSaved.length)} ${pluralize(set.allSaved.length, 'Item', 'Items')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="folderOutline" class="mr-1" />
						<ion-text class="text-xs font-semibold">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-2">
				<Avatar :id="set.userId" :size="24" :src="set.userBio.photo" />
				<Share :link="set.shareLink" :title="set.name" cssClass="text-xl" text="Share this folder" />
				<ion-icon v-if="0 && set.userId !== id" :icon="isSaved ? bookmark : bookmarkOutline"
					class="text-xl" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import { arrowForwardCircleOutline, bookmark, bookmarkOutline, folderOutline } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import { useUserSetList } from '@app/composable/users/users/sets'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'SetListCard',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { sets } = useUserSetList()
		const isSaved = computed(() => sets.value.some((set) => set.allSaved.includes(props.set.id)))
		return {
			arrowForwardCircleOutline,
			bookmark,
			bookmarkOutline,
			folderOutline,
			pluralize,
			formatNumber,
			isSaved,
			id
		}
	}
})
</script>
