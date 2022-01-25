<template>
	<router-link
		:class="`w-full ${colorClass} rounded-xl flex flex-col gap-[1rem] box-border p-4`"
		:to="`/study/sets/${set.id}`"
	>
		<ion-icon :icon="folder" class="text-faded_gray text-3xl" />

		<ion-text class="text-sm text-main_dark font-bold w-full text-left">{{ set.name }}</ion-text>

		<span>{{ formatNumber(set.allSaved.length) }} {{ pluralize(set.allSaved.length, 'item', 'items') }}</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import { ellipsisVertical, folder } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'

export default defineComponent({
	name: 'SetListCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-white'
		},
		set: {
			type: SetEntity,
			required: true
		}
	},
	setup () {
		return { ellipsisVertical, folder, pluralize, formatNumber }
	}
})
</script>
