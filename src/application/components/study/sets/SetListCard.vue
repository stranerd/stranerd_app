<template>
	<router-link :to="`/study/sets/${set.id}`"
		class="bg-white rounded-xl flex flex-col box-border justify-between card-padding text-main_dark">
		<ion-text class="font-500 truncate w-full">{{ set.name }}</ion-text>
		<div class="w-full flex items-center justify-between gap-2 text-sub">
			<Tag :tag="`${formatNumber(set.allSaved.length)} ${pluralize(set.allSaved.length, 'Item', 'Items')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="folderOutline" class="mr-1" />
						<ion-text class="font-semibold">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-3">
				<template v-if="edit && set.user.id === id">
					<span class="text-primary font-bold" @click.prevent="openSetEditModal(set, $router)">Edit</span>
					<span class="text-red font-bold" @click.prevent="deleteSet">Delete</span>
				</template>
				<template v-else>
					<Avatar :id="set.user.id" :name="set.user.bio.fullName" :size="24" :src="set.user.bio.photo" />
					<Share :link="set.shareLink" :title="set.name" cssClass="text-xl" text="Share this folder" />
					<SaveToSet v-if="0 && set.user.id !== id" :entity="set" />
				</template>
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
import { openSetEditModal, useDeleteSet } from '@app/composable/study/sets'

export default defineComponent({
	name: 'SetListCard',
	components: { SaveToSet },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
		edit: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { deleteSet, loading } = useDeleteSet(props.set.id)
		return {
			folderOutline, pluralize, formatNumber, id,
			openSetEditModal, deleteSet, loading
		}
	}
})
</script>
