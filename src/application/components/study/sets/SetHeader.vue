<template>
	<div
		class="bg-primary h-36 rounded-b-xl sm:rounded-3xl flex flex-col sm:flex-row justify-between sm:items-center p-8 pt-5">
		<div class="flex flex-col w-full text-left">
			<ion-text class="text-white leading-tight text-3xl font-bold">
				{{ set.isRoot ? 'Your library' : set.name }}
			</ion-text>
			<ion-text class="text-white text-base font-bold">
				Collection of your created and saved study materials
			</ion-text>
		</div>

		<div v-if="set.isRoot" class="bg-white p-3 px-6 rounded-xl lg:grid place-items-center cursor-pointer hidden"
			@click="openCreateStudy">
			<div class="flex items-center cursor-pointer">
				<ion-text class="text-primary mr-1 font-bold">Create</ion-text>
				<ion-icon :icon='chevronDown' class="text-primary text-xl" />
			</div>
		</div>
		<div v-else />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { chevronDown, flash, folder } from 'ionicons/icons'
import { SetEntity } from '@modules/study'
import { useStudyPopover } from '@app/composable/core/modals'

export default defineComponent({
	name: 'SetHeader',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	setup () {
		const openCreateStudy = useStudyPopover().openCreateStudy
		return { chevronDown, openCreateStudy, folder, flash }
	}

})
</script>
