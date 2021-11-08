<template>
	<IonPage>
		<IonContent>
			<div class="normalText pt-4">
				<UserProfileCard :userId="userId" />
				<div class="mx-auto md:w-[83.33%] lg:w-[50%] grid grid-cols-12">
					<slot />
				</div>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import UserProfileCard from '@app/components/users/users/UserProfileCard.vue'

export default defineComponent({
	name: 'UserPageWrapper',
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	components: { IonPage, IonContent, UserProfileCard }
})
</script>
