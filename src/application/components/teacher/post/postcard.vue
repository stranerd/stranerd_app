<template>
	<div class="p-4 border rounded-lg">
		<div class="postHeader flex items-center justify-between">
			<span class="flex items-center">
				<img src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" alt="" class="w-5 h-5 rounded-full object-cover mr-2">
				<p class="text-sm text-secondaryText font-semibold">Mowete</p>
				<p class="flex items-center text-sm"><span class="mx-3 h-1 w-1 bg-secondaryText rounded-full"></span>1 day ago</p>
			</span>
			<p class="py-1 px-2 rounded text-white text-sm"
				:class="{'bg-danger': tag == 'Assignment', 'bg-green': tag == 'Announcement', 'bg-info': tag == 'Discussion'}"
			>{{tag}}</p>
		</div>
		<div class="postCard-content my-4">
			<h2 class="text-sm font-bold mb-2" v-if="postHeading">{{postHeading}}</h2>
			<p class="text-sm">I have uploaded all necessary files for this semester. I am available for discussions every tuesday by 2pm.</p>
		</div>
		<div class="postFooter flex items-center justify-between" v-if="preview">
			<router-link to="/comments/comment" class="flex items-center text-sm text-secondaryText font-medium">
				<IonIcon :icon="returnDownBackOutline" class="mr-2" />
				Reply
			</router-link>
			<span class="flex items-center gap-5">
				<router-link to="/comments/comment" class="flex items-center text-sm text-secondaryText font-medium">
					<IonIcon :icon="attachOutline" class="mr-1" />
					3
				</router-link>
				<router-link to="/comments/comment" class="flex items-center text-sm text-secondaryText font-medium">
					<IonIcon :icon="chatbubbleOutline" class="mr-1" />
					12
				</router-link>
			</span>
		</div>
		<div class="attachments flex items-center flex-wrap mt-4 gap-2" v-if="!preview">
			<router-link to="/" class="border border-info text-info text-sm rounded-lg  py-1 px-2 flex items-center">
				<IonIcon :icon="documentOutline" class="mr-1" />
				attach1.pdf
			</router-link>
			<router-link to="/" class="border border-info text-info text-sm rounded-lg  py-1 px-2 flex items-center">
				<IonIcon :icon="documentOutline" class="mr-1" />
				attach2.pdf
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { returnDownBackOutline, attachOutline, chatbubbleOutline, documentOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'postlistCard',
	props: {
		tag: {
			required: true,
			type: String
		},
		postHeading: {
			required: false,
			type: String
		},
		preview: {
			type: Boolean,
			default: true
		}
	},
	setup (props) {
	
		return {
			returnDownBackOutline, attachOutline, chatbubbleOutline, documentOutline
		}
	}
})
</script>
