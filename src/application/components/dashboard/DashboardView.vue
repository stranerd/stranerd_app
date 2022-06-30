<template>
	<div>
		<router-link v-if="user && !user.school"
			class="card-padding flex items-center justify-between border-bottom-line"
			to="/settings/school">
			<IonText>Account Setup</IonText>
			<IonIcon :icon="arrowForwardOutline" />
		</router-link>
		<router-link class="card-padding !gap-4 flex items-center border-bottom-line" exact-active-class="hasBg"
			to="/connect">
			<IonIcon :icon="linkOutline" />
			<IonText>Stranerd Connect</IonText>
		</router-link>
		<DashboardChatMetasList />
		<ClassesList :hideSearch="true" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassesList from '@app/components/classes/classes/ClassesList.vue'
import DashboardChatMetasList from '@app/components/messaging/chatMetas/DashboardChatMetasList.vue'
import { arrowForwardOutline, linkOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'DashboardView',
	components: { ClassesList, DashboardChatMetasList },
	setup () {
		const { user } = useAuth()
		return { user, arrowForwardOutline, linkOutline }
	}
})
</script>
