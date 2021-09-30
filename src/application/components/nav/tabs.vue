<template>
	<ion-tabs>
		<ion-tab-bar slot="bottom">
			<ion-router-outlet></ion-router-outlet>
			<ion-tab-button tab="questions" href="/dashboard/questions">
				<ion-icon :icon="triangle" />
				<ion-label>Questions</ion-label>
			</ion-tab-button>
          
			<ion-tab-button tab="tutors" href="/dashboard/tutors">
				<ion-icon :icon="ellipse" />
				<ion-label>Tutors</ion-label>
			</ion-tab-button>
        
			<ion-tab-button tab="wallet" href="/dashboard/wallet">
				<ion-icon :icon="square" />
				<ion-label>Coins</ion-label>
			</ion-tab-button>

			<ion-tab-button tab="profile" href="/dashboard/profile">
				<ion-icon :icon="square" />
				<ion-label>Me</ion-label>
			</ion-tab-button>
				
		</ion-tab-bar>
	</ion-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/vue'
import { ellipse, square, triangle } from 'ionicons/icons'

export default defineComponent ({
	name: 'tabs',
	components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet },
	setup() {
		return {
			ellipse, 
			square, 
			triangle,
		}
	}
})
</script>