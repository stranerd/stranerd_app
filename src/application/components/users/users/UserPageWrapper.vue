<template>
<<<<<<< HEAD
	<IonPage>
		<IonContent>
			<div class="normalText">
				<PageLoading v-if="loading" />
				<template v-if="user">
					<UserProfileCard :user="user" />
					<div class="mx-auto md:w-[83.33%] lg:w-[50%] grid grid-cols-12">
						<slot :user="user" />
					</div>
				</template>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import UserProfileCard from '@app/components/users/users/UserProfileCard.vue'
import PageLoading from '@app/components/core/PageLoading.vue'
=======
	<Justified>
		<div class="normalText">
			<PageLoading v-if="loading" />
			<template v-if="user">
				<UserProfileCard :user="user" />
				<div class="mx-auto md:w-[83.33%] lg:w-[50%] grid grid-cols-12">
					<slot :user="user" />
				</div>
			</template>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import UserProfileCard from '@app/components/users/users/UserProfileCard.vue'
import PageLoading from '@app/components/core/PageLoading.vue'
import Justified from '@app/layouts/Justified.vue'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
import { useUser } from '@app/composable/users/user'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'UserPageWrapper',
<<<<<<< HEAD
	components: { IonPage, IonContent, UserProfileCard, PageLoading },
	setup () {
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
=======
	components: { UserProfileCard, PageLoading, Justified },
	setup () {
		const { userId } = useRoute().params
		const { user, loading, error, listener } = useUser(userId as string)
		onMounted(listener.startListener)
		onBeforeMount(listener.closeListener)
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
		return { user, loading, error }
	}
})
</script>
