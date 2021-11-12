<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<Leaderboard class="max-w-4xl mx-auto" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import Leaderboard from '@app/components/users/leaderboard/Leaderboard.vue'

export default defineComponent({
	name: 'tutor leaderboard',
	layout: 'justified',
	displayName: 'LeaderBoard',
	components: { IonPage, IonContent, Leaderboard }
})
</script>
