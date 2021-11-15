<template>
<<<<<<< HEAD
	<IonPage>
		<IonContent>
			<Leaderboard class="max-w-4xl mx-auto" />
		</IonContent>
	</IonPage>
=======
	<Justified>
		<div>
			<Leaderboard class="max-w-4xl mx-auto" />
		</div>
	</Justified>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
</template>

<script lang="ts">
import { defineComponent } from 'vue'
<<<<<<< HEAD
import { IonContent, IonPage } from '@ionic/vue'
=======
import Justified from '@app/layouts/Justified.vue'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
import Leaderboard from '@app/components/users/leaderboard/Leaderboard.vue'

export default defineComponent({
	name: 'UsersLeaderboard',
<<<<<<< HEAD
	layout: 'justified',
	displayName: 'LeaderBoard',
	components: { IonPage, IonContent, Leaderboard }
=======
	displayName: 'LeaderBoard',
	components: { Justified, Leaderboard }
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
})
</script>
