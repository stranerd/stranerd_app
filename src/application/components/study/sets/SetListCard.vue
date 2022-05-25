<template>
	<router-link :to="`/study/sets/${set.id}`"
		class="flex flex-col justify-between card-padding">
		<ion-text class="font-500 truncate w-full">{{ set.name }}</ion-text>
		<div class="w-full flex items-center justify-between gap-2 text-sub text-secondaryText">
			<Tag :tag="`${formatNumber(set.allSaved.length)} ${pluralize(set.allSaved.length, 'Item', 'Items')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="folderOutline" class="mr-1" />
						<ion-text class="font-semibold">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center gap-3">
				<Avatar :id="set.user.id" :name="set.user.bio.fullName" :size="24" :src="set.user.bio.photo" />
				<Share :link="set.shareLink" :title="set.name" cssClass="text-xl" text="Share this folder" />
				<SaveToSet v-if="0 && set.user.id !== id" :entity="set" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import { folderOutline } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'SetListCard',
	components: { SaveToSet },
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	setup () {
		const { id } = useAuth()
		return {
			folderOutline, pluralize, formatNumber, id
		}
	}
})
</script>
