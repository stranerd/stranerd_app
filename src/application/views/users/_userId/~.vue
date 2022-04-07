<template>
	<IonPage>
		<IonContent>
			<h1>404</h1>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'UsersUserId404',
	components: { IonContent, IonPage },
	middlewares: [async ({ to }) => `/users/${to.params.userId}/`]
})
</script>
