<template>
	<div class="each_comment flex items-start gap-2 mb-4 text-sm">
		<img src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" alt="" class="w-5 h-5 rounded-full object-cover mr-2">
		<div class="info">
			<IonText class="text-sm font-bold ">Timmy<span class="font-normal ml-2">{{comment}}</span></IonText>
			<div class="flex items-center gap-4 text-sm text-secondaryText my-1">
				<IonText class="">30min</IonText>
				<IonText class="">Reply</IonText>
			</div>
			<div v-if="replies.length" >
				<div class="mt-4" :class="{'hidden' : openReplies}" v-for="(item, index) in replies" :key="index">
					<eachComment class="mb-2" :comment="item.comment" :replies="item.replies"/>
				</div>
				<IonText class="text-sm flex items-center" @click="toggleReplies">
					<span class="block mx-3 h-1 w-1 bg-secondaryText rounded-full"></span>
					{{openReplies ? `View ${replies.length} Replies` : `Hide ${replies.length} Replies`}}
				</IonText>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, PropType, ref } from 'vue'



export default defineComponent({
	name: 'eachComment',
    props: {
        comment: {
            type: String,
            required: true,
        },
        replies: {
            required: false,
            type: Array as PropType<{comment:string, replies:[]}[] | []>,
            default: () => [],
        },
    },
	setup () {

        const openReplies = ref(true)

        const toggleReplies = () => {
            openReplies.value = !openReplies.value
        }
	
		return {
			openReplies, toggleReplies
		}
	}
})
</script>
