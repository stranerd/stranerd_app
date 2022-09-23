<template>
	<div class="py-4 px-6 my-4 border rounded-lg flex items-center justify-between">
        <div class="flex items-center">
            <IonIcon :icon="documentOutline" class="text-5xl font-thin mr-4" />
            <div>
                <IonText class="block">{{title}}</IonText>
                <IonText class="block text-xs flex items-center text-secondaryText">{{size}}
                    <span class="block mx-3 h-1 w-1 bg-secondaryText rounded-full"></span>
                    {{fileType}}
                </IonText>
            </div>
        </div>
		
        <IonIcon :icon="downloadOutline" class="text-2xl text-primaryBg font-thin" />
	</div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue'
import { downloadOutline, documentOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'fileCard',
	props: {
		title: {
			required: true,
			type: String
		},
		size: {
			type: String,
            default: '725 KB'
		},
		fileType: {
			type: String,
            default: 'PDF'
		}
	},
	setup (props) {
	
		return {
			downloadOutline, documentOutline
		}
	}
})
</script>
