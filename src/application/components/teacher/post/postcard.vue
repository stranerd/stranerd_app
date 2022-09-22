<template>
	<div class="p-4 border rounded-lg">
		<div class="postHeader flex items-center justify-between">
			<span class="flex items-center">
				<img src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" alt="" class="w-5 h-5 rounded-full object-cover mr-2">
				<p class="text-sm text-secondaryText font-semibold">Mowete</p>
				<p class="flex items-center text-sm"><span class="mx-4 h-1 w-1 bg-secondaryText rounded-full"></span>1 day ago</p>
			</span>
			<p class="py-1 px-2 rounded bg-green text-white text-sm">Announcement</p>
		</div>
		<p class="text-sm my-4">I have uploaded all necessary files for this semester. I am available for discussions every tuesday by 2pm.</p>
		<div class="postFooter flex items-center justify-between">
			<button class="flex items-center text-sm text-secondaryText font-medium">
				<IonIcon :icon="returnDownBackOutline" class="mr-2" />
				Reply
			</button>
			<span class="flex items-center gap-4">
				<button class="flex items-center text-sm text-secondaryText font-medium">
					<IonIcon :icon="attachOutline" class="mr-1" />
					2
				</button>
				<button class="flex items-center text-sm text-secondaryText font-medium">
					<IonIcon :icon="chatbubbleOutline" class="mr-1" />
					3
				</button>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { returnDownBackOutline, attachOutline, chatbubbleOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'postlistCard',
	components: {  },
	setup (props) {
	
		return {
			returnDownBackOutline, attachOutline, chatbubbleOutline
		}
	}
})
</script>
