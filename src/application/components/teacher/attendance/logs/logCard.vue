<template>
    <router-link to="/log-details">
        <div class="p-4 border rounded-lg flex items-center justify-between mb-4 text-sm">
            <IonText class="font-bold">{{date}}</IonText>
            <span class="flex items-center">
                <IonText>32/34</IonText>
                <IonIcon :icon="personOutline"  class="ml-[6px]"/>
            </span>
        </div>
    </router-link>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue'
import { personOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'logCard',
    props: {
        date: {
            type: String,
            required: true
        }
    },
	setup (props) {
	

		return {
			personOutline
		}
	}
})
</script>