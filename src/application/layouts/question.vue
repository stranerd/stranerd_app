<template>
	<IonPage>
		<TopBar :isNotDashboard="true" />
		<IonHeader class="block lg:hidden" mode="ios">
			<IonToolbar class="px-2">
				<IonButtons slot="start" @click="router.go(-1)">
					<IonIcon :icon="arrowBackOutline" class="text-[23px] text-dark_gray" />
				</IonButtons>
				<IonTitle>Answers</IonTitle>
			</IonToolbar>
		</IonHeader>
		<IonContent :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<slot />
				</div>
				<div class="layout-side-right">
					<SideProfileNav />
				</div>
			</div>
		</IonContent>
		<SideNavBar />
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { arrowBackOutline, arrowRedo, chevronDown, send, shareSocial, star, thumbsDown, thumbsUp } from 'ionicons/icons'
import { useRoute, useRouter } from 'vue-router'
import { useQuestion } from '@app/composable/questions/questions'
import { showAddAnswer, useAnswerList } from '@app/composable/questions/answers'
import SideProfileNav from '@app/components/layout/sidebars/SideProfileNav.vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'
import SideNavBar from '@app/components/layout/sidebars/DefaultSidebar.vue'

export default defineComponent({
	name: 'QuestionLayout',
	components: {
		IonPage,
		IonContent,
		SideProfileNav,
		IonTitle,
		IonIcon,
		IonButtons,
		IonHeader,
		IonToolbar,
		TopBar,
		SideNavBar
	},
	setup () {
		const route = useRoute()
		const router = useRouter()

		const { error, loading, question } = useQuestion(route.params.id as string)
		const { answers } = useAnswerList(route.params.id as string)

		return {
			arrowBackOutline,
			arrowRedo,
			shareSocial,
			chevronDown,
			thumbsDown,
			thumbsUp,
			star,
			send,
			router,
			showAddAnswer,
			error, loading, question,
			answers
		}
	}
})

</script>
<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}
</style>
