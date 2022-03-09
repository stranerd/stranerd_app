<template>
	<router-link :to="`/classes/${classInst.id}`"
		class="rounded-xl bg-white gap-2 p-4 flex items-center w-full">
		<Avatar :name="classInst.fullName" :size="40" :src="classInst.photo" class="md:hidden" />
		<Avatar :name="classInst.fullName" :size="48" :src="classInst.photo" class="hidden md:inline" />
		<div class="flex flex-col font-bold">
			<ion-text class="text-main_dark text-semibold capitalize">
				{{ classInst.name }}
			</ion-text>
			<ion-text class="text-xs text-gray">
				{{ classInst.members.length }} {{ pluralize(classInst.members.length, 'member', 'members') }}
			</ion-text>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import { pluralize } from '@utils/commons'

export default defineComponent({
	name: 'ClassListCard',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	setup () {
		return { pluralize }
	}
})
</script>
