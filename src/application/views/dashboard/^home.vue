<template>
	<ion-page>
		<ion-content :fullscreen="true" class=" mx-auto">
			<div class="w-full flex justify-between">
				<span class="text-[24px] font-bold text-sub">
					Featured tutors
				</span>

				<div class="flex justify-center items-center ">
					<a class="commentIcons" to="#" >
						<ion-icon :icon="chevronBackOutline" class="text-2xl"/>
					</a>
					<a
						v-for="(comment,index) in 3"
						:key="'comment'+ index"
						:class="currentIndex === index ? 'commentIconsDotActive' : 'commentIconsDot'"
							
					>
						<i class="fas fa-circle" />
					</a>
					<a class="commentIcons" to="#" @click.prevent="goToNext">
						<ion-icon :icon="chevronForwardOutline" class="text-2xl"/>
					</a>
				</div>

				<div class="text-primary flex items-center font-bold text-base">
					<span>view all</span>
					<ion-icon :icon="chevronForwardOutline" class="text-2xl"></ion-icon>	
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent, IonIcon } from '@ionic/vue'
import { chevronForwardOutline, chevronBackOutline } from 'ionicons/icons'

export default  {
	name: 'Home',
	components: { IonContent, IonPage, IonIcon },
	setup(){
		return{
			chevronForwardOutline, chevronBackOutline
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>