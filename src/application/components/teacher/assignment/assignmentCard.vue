<template>
	<div class="p-4 border rounded-lg">
		<IonText class="block mb-4 font-bold">{{title}}</IonText>
		<IonText class="block mb-4">{{desc}}</IonText>
		<div class="flex items-center mb-4">
			<div class="w-8 flex items-center justify-start">
				<IonIcon :icon="timeOutline" class="text-secondaryText" />
			</div>
            
			<IonText class="flex items-center">
				<span class="text-danger">{{time}} {{date}}</span>
				<span class="block mx-3 h-1 w-1 bg-secondaryText rounded-full"></span>
				<span class="text-secondaryText">{{deadline}}</span>
			</IonText>
		</div>

		<div class="flex items-center mb-4">
			<div class="w-8 flex items-center justify-start">
				<IonIcon :icon="attachOutline" class="text-secondaryText" />
			</div>
			<IonText class="text-secondaryText">{{attachment}} attachments</IonText>
		</div>

		<div class="flex items-center ">
			<div class="w-8 flex items-center justify-start">
				<IonIcon :icon="personOutline" class="text-secondaryText" />
			</div>
			<IonText class="text-secondaryText">{{author}}</IonText>
		</div>
	</div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue'
import { timeOutline, attachOutline, personOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'assignmentCard',
	props: {
		title: {
			required: true,
			type: String
		},
		desc: {
			type: String,
            default: 'Write a 500 - 1000 word report on steam engines, it’s properties, uses and present implementations.'
		},
		attachment: {
			type: Number,
			default: 3
		},
        deadline: {
            type: String,
            default: '7 days left'
        },
        date: {
            type: String,
            default: 'Wed, August 3'
        },
        time: {
            type: String,
            default: '12PM'
        },
        author: {
            type: String,
            default: 'Mowete Akanji'
        }
	},
	setup (props) {
	
		return {
			timeOutline, attachOutline, personOutline
		}
	}
})
</script>
