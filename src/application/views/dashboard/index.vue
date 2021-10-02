<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="home" class="tabStyle tabStyleActive" href="/dashboard/home">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="homeOutline"></ion-icon>
						<span class="tabText">Home</span>
					</div>
				</ion-tab-button>
				<ion-tab-button tab="questions" class="tabStyle tabStyleActive" href="/dashboard/questions">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="chatbubbleEllipsesOutline"></ion-icon>
						<span class="tabText">Questions</span>
					</div>
				</ion-tab-button>
          
				<ion-tab-button tab="tutors" class="tabStyle" href="/dashboard/tutors">
					<div class="flex py-1 flex-col items-center justify-center">
						<ion-icon :icon="peopleOutline"></ion-icon>
						<span class="tabText">Tutors</span>
					</div>
				</ion-tab-button>
        
				<ion-tab-button tab="wallet" class="tabStyle" href="/dashboard/wallet">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="walletOutline"></ion-icon>
						<span class="tabText">Wallet</span>
					</div>
				</ion-tab-button>

				<ion-tab-button tab="profile" class="tabStyle" href="/dashboard/profile">
					<div class="flex flex-col py-1 items-center justify-center">
						<ion-icon :icon="personOutline"></ion-icon>
						<span class="tabText">Profile</span>
					</div>
				</ion-tab-button>
				
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonPage, IonRouterOutlet, IonIcon } from '@ionic/vue'
import { homeOutline, peopleOutline, walletOutline, personOutline, chatbubbleEllipsesOutline } from 'ionicons/icons'

export default {
	name: 'dashboard',
	components: { IonTabs, IonTabBar, IonTabButton, IonPage, IonRouterOutlet, IonIcon },
	setup() {
		return {
			homeOutline, 
			peopleOutline, 
			walletOutline,
			personOutline,
			chatbubbleEllipsesOutline
		}
	}
}
</script>
<style scoped>


.tabStyle {
	@apply border-t-2 border-gray-300 
}

ion-tab-button  {
	--color-selected: #546dd2;
}

ion-tab-bar {
	--background: white;
}

.tabText {
	font-size: 10px;
}

ion-icon {
  font-size: 22px;
}


</style>