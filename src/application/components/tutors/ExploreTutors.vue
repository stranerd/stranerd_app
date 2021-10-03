<template>
	<div class="grid grid-col-6 px-3 ">
		<div class="col-span-6 mt-[26px] text-center leading-none flex flex-col justify-center items-center">
			<span class="text-gray-600 text-xs max-w-[288px]" >Discover and choose a preferred tutor from a range of subjects and request a session directly.</span>
		</div>
	</div>

	<div class="grid grid-col-6 px-3 mt-1 ">
		<div class="flex items-center search mt-[26px]">
			<ion-searchbar
				placeholder="Search for Tutors"
			/>
			<ion-select value="level" ok-text="Okay" cancel-text="Dismiss">
				<ion-select-option value="level">Level</ion-select-option>
				<ion-select-option value="subject">Subject</ion-select-option>
			</ion-select>
		</div>
	
	</div>


</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonSearchbar, IonSelect, IonSelectOption } from '@ionic/vue'
import { imagesOutline} from 'ionicons/icons'

export default defineComponent({
	setup() {
		return {
			imagesOutline
		}
	},
	components: { IonSearchbar , IonSelect, IonSelectOption}
})
</script>
<style scoped lang="scss">
.search{
    border-radius:3.125rem !important;
    background: #F8F8FF;
}

 ion-select{
background: #F8F8FF;
height: 2.5rem;
border-radius: 0 3.125rem 3.125rem 0 !important;
width: 6.75rem;
border-left: 1px solid #D7E2EC;
 }
ion-searchbar{
    --icon-color :#546DD3 !important;
    border-radius:3.125rem !important;
    --border-radius:3.125rem;
    --placeholder-color: #A5ACB6;
    --background: #F8F8FF;
    --box-shadow: none;
    height: 40px;
     --padding-right: 0 !important;
     padding: 0 !important;

}
</style>