<template>
	<IonPage>
		<IonContent>
			<Leaderboard class="max-w-4xl mx-auto" />
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import Leaderboard from '@app/components/users/leaderboard/Leaderboard.vue'

export default defineComponent({
	name: 'UsersLeaderboard',
	layout: 'justified',
	displayName: 'LeaderBoard',
	components: { IonPage, IonContent, Leaderboard }
})
</script>
