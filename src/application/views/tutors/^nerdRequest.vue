<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="flex flex-col justify-center w-full mt-9 lg:mt-20 px-4 max-w-4xl mx-auto">
				<span class="heading font-bold text-dark_gray px-8 text-center lg:text-left lg:p-0">
					Find requests you specialize in
					and start tutoring!
				</span>

				<ion-searchbar class="border rounded-md p-0 normalText border-faded_gray mt-1" placeholder="Subjects, topics and related keywords"></ion-searchbar>

				<div class="w-full mt-2">
					<div class="flex items-center font-bold text-dark_gray justify-end normalText">
						Hide Filters
						<ion-icon :icon="filter" class="text-[22px] mr-1 "></ion-icon>
					</div>
					<div class="bg-dark_gray cardPadding rounded-md lg:flex gap-4 items-center">
						<div class="flex gap-4 lg:w-2/4">
							<div class="flex flex-col w-1/2">
								<ion-label class="normalText text-white font-bold mb-2">Urgency</ion-label>
								<ion-select value="notifications" class="w-full  font-medium" placeholder="Any" interface="action-sheet">
									<ion-select-option value="low" >Low</ion-select-option>
									<ion-select-option value="high" >High</ion-select-option>
								</ion-select>
							</div>
							<div class="flex flex-col w-1/2">
								<ion-label class="normalText text-white font-bold mb-2">Duration</ion-label>
								<ion-select value="notifications" class="w-full  font-medium" placeholder="Any" interface="action-sheet">
									<ion-select-option value="low" >Low</ion-select-option>
									<ion-select-option value="high" >High</ion-select-option>
								</ion-select>
							</div>
						</div>
						<div class="flex flex-col mt-3 lg:mt-0 lg:w-1/4">
							<ion-label class="normalText text-white font-bold mb-2">Level</ion-label>
							<ion-select value="notifications" class="w-full  font-medium" placeholder="Any" interface="action-sheet">
								<ion-select-option value="low" >Low</ion-select-option>
								<ion-select-option value="high" >High</ion-select-option>
							</ion-select>
						</div>
						<div class="flex flex-col mt-3 lg:mt-0 lg:w-1/4">
							<ion-label class="normalText text-white font-bold mb-2">Price</ion-label>
							<ion-range min="0" max="100" step="20" class="p-0">
								<ion-icon size="small" slot="start" name="sunny"></ion-icon>
								<ion-icon slot="end" name="sunny"></ion-icon>
							</ion-range>
						</div>

					</div>
				</div>

				<div>
					<NerdRequest class="mb-12"/>
				</div>
			</div>
	
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonSelect, IonSelectOption, IonPage, IonContent, IonSearchbar,   IonLabel, IonRange, IonIcon  } from '@ionic/vue'
import { filter} from 'ionicons/icons'
import NerdRequest from '@/application/components/tutors/NerdRequestCard.vue'

export default defineComponent({
	name: 'tutor a Nerd',
	components: { IonSelect, IonSelectOption, IonPage, IonContent, IonSearchbar,  IonLabel,  NerdRequest, IonRange ,IonIcon, },
	setup(){
		return{
			filter
		}
	}

})
</script>

<style lang="scss" scoped>
ion-range {
	--bar-background:#8B9EB1;
	--bar-background-active:white;
	--bar-height: 5px;
	--bar-border-radius:6px;
	--height: 1.75rem;
  background-color: transparent;
      position: relative;
    left: -30px;
  
  
}
ion-select {
  --placeholder-color: #8B9EB1;
  --placeholder-opacity: 1;
  background-color: #F7F7FC;
  --padding-end:1rem;
  --padding-top:0.5rem !important;
  --padding-bottom:0.5rem !important;
  border-radius: 6px;
  
}

ion-searchbar{
	--background: transparent;
	--box-shadow: none;
	--border-radius:.75rem;
	--icon-color: #8B9EB1;
	--color: #8B9EB1;

}

ion-item{
	--background: transparent;
}




</style>
