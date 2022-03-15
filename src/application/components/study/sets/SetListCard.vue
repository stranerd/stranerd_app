<template>
	<router-link :to="`/study/sets/${set.id}`"
		class="bg-white rounded-xl flex flex-col box-border justify-between card-padding text-main_dark">
		<ion-text class="font-semibold truncate w-full">{{ set.name }}</ion-text>
		<div class="w-full flex items-center justify-between gap-2">
			<Tag :tag="`${formatNumber(set.allSaved.length)} ${pluralize(set.allSaved.length, 'Item', 'Items')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="folderOutline" class="mr-1" />
						<ion-text class="font-semibold">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-2">
				<Avatar :id="set.userId" :name="set.userBio.fullName" :size="24" :src="set.userBio.photo" />
				<Share :link="set.shareLink" :title="set.name" cssClass="text-xl" text="Share this folder" />
				<ion-icon v-if="0 && set.userId !== id" :icon="isSaved ? bookmark : bookmarkOutline"
					class="text-xl"
					@click="openSaveModal(set)" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import { bookmark, bookmarkOutline, folderOutline } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import { useUserSetList } from '@app/composable/users/users/sets'
import { useAuth } from '@app/composable/auth/auth'
import { openSaveModal } from '@app/composable/study/menus'

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
			bookmark,
			bookmarkOutline,
			folderOutline,
			pluralize,
			formatNumber,
			isSaved,
			id,
			openSaveModal
		}
	}
})
</script>
