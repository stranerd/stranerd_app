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
		<MetaBlock v-if="unRead.length" :metas="unRead" class="border-bottom-line" title="Unread" />
		<ClassesList :hideSearch="true" />
		<MetaBlock :metas="connects" class="border-bottom-line" title="Direct Messages" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassesList from '@app/components/classes/classes/ClassesList.vue'
import { arrowForwardOutline, linkOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import MetaBlock from '@app/components/messaging/chatMetas/MetaBlock.vue'
import { useChatMetas } from '@app/composable/messaging/chatMetas'

export default defineComponent({
	name: 'DashboardView',
	components: { ClassesList, MetaBlock },
	setup () {
		const { user } = useAuth()
		const { connects, unRead, error, loading } = useChatMetas()
		return { user, arrowForwardOutline, linkOutline, connects, unRead, error, loading }
	}
})
</script>
