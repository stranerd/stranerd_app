<template>
	<div class="w-full bg-white rounded-xl flex flex-col gap-2 box-border p-4">
		<div class="flex items-center gap-2">
			<ion-icon :icon="folderOutline" class="text-dark_gray text-2xl" />
			<ion-text class="text-dark_gray text-semibold w-full">{{ set.name }}</ion-text>
			<ion-icon :icon="ellipsisVerticalOutline" class="text-dark_gray text-2xl" @click="openMenu" />
		</div>

		<span class="text-sm">{{ formatNumber(set.allSaved.length) }} {{
			pluralize(set.allSaved.length, 'item', 'items')
		}}</span>

		<div class="w-full flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="set.userId" :size="24" :src="set.userBio.photo" />
				<ion-text class="text-xs font-bold text-main_dark flex items-center gap-1">
					<span>{{ set.userBio.firstName }}</span>
					<IonIcon v-if="set.isUserVerified" :icon="checkmarkCircleOutline" color="primary" />
				</ion-text>
			</div>
			<router-link :to="`/study/sets/${set.id}`">
				<ion-button class="btn-outline text-primary font-bold w-full lg:min-w-[7.5rem]" size="small">
					Open
				</ion-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import { checkmarkCircleOutline, ellipsisVerticalOutline, folderOutline } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'

export default defineComponent({
	name: 'SetListCard',
	props: {
		set: {
			type: SetEntity,
			required: true
		},
		openMenu: {
			type: Function,
			required: true
		}
	},
	setup () {
		return { ellipsisVerticalOutline, folderOutline, pluralize, formatNumber, checkmarkCircleOutline }
	}
})
</script>
