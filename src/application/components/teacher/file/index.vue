<template>
	<div class="showcase-flex flex-1">
		<router-link to="/upload">
			<div class="flex items-center justify-between px-4 py-3 text-sm rounded-lg border">
				<span class="flex items-center text-secondaryText">
					<IonIcon :icon="documentOutline" class="mr-4" />
					<IonText>Upload a file</IonText>
				</span>
				<IonIcon :icon="arrowForwardOutline" class="text-secondaryText" />
			</div>
		</router-link>
		<div class="px-4 py-3 rounded-lg border text-sm">
			<span class="flex items-center text-itemBg">
				<IonIcon :icon="search" class="mr-4" />
				<IonText>Search</IonText>
			</span>
		</div>
		
		<div class="">
			<FileCard title="Week 1 Handout.pdf"/>
			<FileCard title="Week 2 Handout.pdf"/>
			<FileCard title="Week 3 Handout.pdf"/>
			<FileCard title="Week 4 Handout.pdf"/>
			<FileCard title="Week 5 Handout.pdf"/>
		</div>
		
	</div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue'
import { arrowForwardOutline, documentOutline, search } from 'ionicons/icons'
import FileCard from './filecard.vue'

export default defineComponent({
	name: 'TeacherFile',
	components: {FileCard},
	setup (props) {
	
		return {
			arrowForwardOutline, documentOutline, search 
		}
	}
})
</script>
