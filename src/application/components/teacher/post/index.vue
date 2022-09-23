<template>
	<div class="showcase-flex flex-1 p-4 ">
		<div class="flex items-center justify-between px-4 py-3 rounded-lg border">
			<span class="flex items-center text-secondaryText">
				<IonIcon :icon="readerOutline" class="mr-4" />
				Make a post
			</span>
			<IonIcon :icon="arrowForwardOutline" class="text-secondaryText" />
		</div>
		<div class="px-4 py-3 rounded-lg border">
			<span class="flex items-center text-itemBg">
				<IonIcon :icon="search" class="mr-4" />
				Search
			</span>
		</div>
		<PostCard tag="Announcement"/>
		<PostCard tag="Assignment" postHeading="Week 1 Assignment"/>
		<PostCard tag="Discussion"/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowForwardOutline, readerOutline, search } from 'ionicons/icons'
import PostCard from './postcard.vue'


export default defineComponent({
	name: 'TeacherPost',
	components: { PostCard },
	setup (props) {
	
		return {
			arrowForwardOutline, readerOutline, search
		}
	}
})
</script>
