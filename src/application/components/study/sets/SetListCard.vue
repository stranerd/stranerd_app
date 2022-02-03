<template>
	<router-link
		:class="`w-full bg-white rounded-xl flex flex-col gap-2 box-border p-4`"
		:to="`/study/sets/${set.id}`"
	>
		<div class="flex items-center gap-4">
			<ion-icon :icon="folder" class="text-dark_gray text-2xl" />
			<ion-text class="text-dark_gray w-full">{{ set.name }}</ion-text>
		</div>

		<span class="text-sm">{{ formatNumber(set.allSaved.length) }} {{
			pluralize(set.allSaved.length, 'item', 'items')
		}}</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import { folder } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'

export default defineComponent({
	name: 'SetListCard',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	setup () {
		return { folder, pluralize, formatNumber }
	}
})
</script>
