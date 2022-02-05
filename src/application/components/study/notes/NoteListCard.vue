<template>
	<div class="m-0 w-full bg-white rounded-xl flex flex-col justify-between items-start gap-4 box-border p-4">
		<div class="w-full justify-between items-start flex">
			<div class="text-base text-main_dark font-bold text-left items-start flex-col flex ml-2 gap-2 flex-grow">
				<ion-text>{{ note.title }}</ion-text>
				<Tag tag="Note" :index="1">
					<template v-slot="slotProps">
						<span class="flex items-center ">
							<ion-icon :icon="document" class="text-base mr-1"  />
							<ion-text class="text-xs font-bold">{{ slotProps.tag }}</ion-text>
						</span>
					</template>
				</Tag>
			</div>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-xl cursor-pointer" @click="openMenu" />
		</div>
		<div class="w-full flex items-center justify-between">
			<div class="flex items-center">
				<Avatar :id="note.userId" :size="24" :src="note.userBio.photo" />
				<ion-text class="text-xs font-bold text-main_dark ml-2">{{ note.userBio.firstName }}</ion-text>
			</div>
			<router-link :to="`/study/notes/${note.id}`">
				<ion-button class="btn-outline text-primary font-bold w-full lg:min-w-[7.5rem]" size="small">
					Read
				</ion-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { document, ellipsisVertical } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { NoteEntity } from '@modules/study'

export default defineComponent({
	name: 'NoteListCard',
	props: {
		note: {
			type: NoteEntity,
			required: true
		},
		openMenu: {
			type: Function,
			required: true
		}
	},
	setup () {
		return { formatNumber, ellipsisVertical, document }
	}
})
</script>
