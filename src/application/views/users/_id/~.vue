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
import { useRoute } from 'vue-router'

export default defineComponent({
	components: { IonContent, IonPage },
	layout: 'users',
	middlewares: [async () => {
		const { id } = useRoute().params
		return `/users/${id}/`
	}]
})
</script>
