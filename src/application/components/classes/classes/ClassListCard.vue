<template>
	<router-link :to="`/classes/${classInst.id}`"
		class="rounded-xl bg-white gap-2 p-4 flex items-center w-full">
		<Avatar :size="40" class="md:hidden" />
		<Avatar :size="48" class="hidden md:inline" />
		<div class="flex flex-col font-bold">
			<ion-text class="text-main_dark text-semibold">
				CAZDEO - Mathematics
			</ion-text>
			<ion-text class="text-xs text-gray">
				14 members
			</ion-text>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'

export default defineComponent({
	name: 'ClassListCard',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	}
})
</script>
