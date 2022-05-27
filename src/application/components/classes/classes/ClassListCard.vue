<template>
	<router-link :to="`/classes/${classInst.id}`"
		class="card-padding flex items-center w-full">
		<Avatar :name="classInst.name" :size="40" :src="classInst.photo" class="md:hidden" />
		<Avatar :name="classInst.name" :size="48" :src="classInst.photo" class="hidden md:inline" />
		<div class="flex flex-col">
			<ion-text class="text-secondaryText font-500 capitalize">
				{{ classInst.name }}
			</ion-text>
			<ion-text class="text-sub text-gray">
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
