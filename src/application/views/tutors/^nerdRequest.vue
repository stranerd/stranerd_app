<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="flex flex-col justify-center w-full mt-9 lg:mt-20 px-4 max-w-4xl mx-auto">
				<span class="heading font-bold text-dark_gray px-8 text-center lg:text-left lg:p-0">
					Find requests you specialize in
					and start tutoring!
				</span>

				<ion-searchbar class="border rounded-md p-0 normalText border-faded_gray mt-1"
					placeholder="Subjects, topics and related keywords"></ion-searchbar>

				<div class="w-full mt-2">
					<div class="flex items-center font-bold text-dark_gray justify-end normalText">
						<div class="cursor-pointer flex items-center gap-2" @click="showFilter = !showFilter">
							<span> {{ showFilter ? 'Hide Filters' : 'Filter' }} </span>
							<ion-icon :class="['text-[22px] mr-1', showFilter ? ' rotate-180' : '']"
								:icon="filter"></ion-icon>
						</div>

					</div>
					<div v-if="showFilter" class="bg-dark_gray cardPadding rounded-md lg:flex gap-4 items-center mt-2">
						<div class="flex gap-4 lg:w-2/4">
							<div class="flex flex-col w-1/2">
								<ion-label class="normalText text-white font-bold mb-2">Urgency</ion-label>
								<ion-select class="w-full  font-medium" interface="action-sheet" placeholder="Any"
									value="notifications">
									<ion-select-option value="low">Low</ion-select-option>
									<ion-select-option value="high">High</ion-select-option>
								</ion-select>
							</div>
							<div class="flex flex-col w-1/2">
								<ion-label class="normalText text-white font-bold mb-2">Duration</ion-label>
								<ion-select class="w-full  font-medium" interface="action-sheet" placeholder="Any"
									value="notifications">
									<ion-select-option value="low">Low</ion-select-option>
									<ion-select-option value="high">High</ion-select-option>
								</ion-select>
							</div>
						</div>
						<div class="flex flex-col mt-3 lg:mt-0 lg:w-1/4">
							<ion-label class="normalText text-white font-bold mb-2">Level</ion-label>
							<ion-select class="w-full  font-medium" interface="action-sheet" placeholder="Any"
								value="notifications">
								<ion-select-option value="low">Low</ion-select-option>
								<ion-select-option value="high">High</ion-select-option>
							</ion-select>
						</div>
						<div class="flex flex-col mt-3 lg:mt-0 lg:w-1/4">
							<ion-label class="normalText text-white font-bold mb-2">Price</ion-label>
							<ion-range class="p-0 normalText font-semibold" max="100" min="0" pin="true" step="1">
								<ion-icon slot="start" name="sunny" size="small"></ion-icon>
								<ion-icon slot="end" name="sunny"></ion-icon>
							</ion-range>
						</div>

					</div>
				</div>

				<div>
					<NerdRequest class="mb-12" />
				</div>
			</div>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonContent, IonIcon, IonLabel, IonPage, IonRange, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/vue'
import { filter } from 'ionicons/icons'
import NerdRequest from '@app/components/users/tutors/NerdRequestCard.vue'

export default defineComponent({
	name: 'tutor a Nerd',
	components: {
		IonSelect,
		IonSelectOption,
		IonPage,
		IonContent,
		IonSearchbar,
		IonLabel,
		NerdRequest,
		IonRange,
		IonIcon
	},
	setup () {
		const showFilter = ref(false)
		return {
			filter,
			showFilter

		}
	}

})
</script>

<style lang="scss" scoped>
	ion-range {
		--bar-background: #8B9EB1;
		--bar-background-active: white;
		--bar-height: 5px;
		--bar-border-radius: 6px;
		--height: 1.75rem;
		--pin-background: transparent;
		--pin-color: white;
		--knob-size: 16px;
		background-color: transparent;
		position: relative;
		left: -30px;


	}

	ion-select {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
		background-color: #F7F7FC;
		--padding-end: 1rem;
		--padding-top: 0.5rem !important;
		--padding-bottom: 0.5rem !important;
		border-radius: 6px;

	}

	ion-searchbar {
		--background: transparent;
		--box-shadow: none;
		--border-radius: .75rem;
		--icon-color: #8B9EB1;
		--color: #8B9EB1;

	}

	ion-item {
		--background: transparent;
	}


</style>
