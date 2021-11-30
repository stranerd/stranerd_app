<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="bg-primary w-full min-h-[150px] flex flex-col justify-center items-center pt-0 pb-1">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center my-2">
				{{note?.title}}
			</ion-text>
			<!-- <div class="flex items-center md:flex-row flex-col">
				<div class="flex items-center mr-6">
					<ShowRatings :rating="5" class="mr-3" />
					<ion-text class="text-white font-semibold">
						(14 reviews)
					</ion-text>
				</div>
				<ion-text class="text-faded_gray font-semibold">
					leave a rating
				</ion-text>

			</div> -->
		</div>
		<div class="w-full pb-12 bg-light_gray">
			<div
				:class="[false ? 'flex items-center justify-center flex-col':'', 'lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-white']">

		
				<pdf :src="pdfdata" v-for="i in numPages" :key="i" :id="i" :page="i"
					:scale="1" style="width:80%;margin:20px auto;"
					:annotation="true"
					:resize="true"
				>
					<template v-slot:loading>
						loading content here...
					</template>
				</pdf>


				<!-- <div class="w-full mx-auto fixed bottom-12 md:inset-x-0 inset-x-4">
					<div class="lg:w-8/12 w-full px-4 mx-auto flex  items-center  my-8 max-w-[40rem]  bg-dark_gray text-2xl text-white rounded-xl">
						<div class="py-2 px-4 !-my-2 border-r border-light_gray flex justify-between items-center gap-4">
							<ion-icon :icon="chevronDown" @click="page--"/>
							<ion-text class="text-lg">{{page}} of {{numPages}}</ion-text>
							<ion-icon :icon="chevronUp" @click="page++"/>
						</div>
						<div class="py-2 px-4 border-r border-light_gray flex justify-between items-center gap-4">
							<ion-icon :icon="remove"/>
							<ion-text class="text-lg border border-light_gray rounded-md py-1 px-4 ">100</ion-text>
							<ion-icon :icon="add"/>
						</div>
						<div class="py-2 px-4 flex justify-center items-center">
							<ion-icon :icon="scan"/>
				
						</div>
				
					</div>
				</div> -->
			
			</div>

		</div>
	
		<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
			<div class="lg:w-8/12 max-w-[60rem] w-full px-4 mx-auto flex items-center justify-between">
				<div class="flex" v-if="note">
					<Avatar :size="28" class="mx-2" :src="note?.userBio?.photo" :id="note?.userId" />
					<ion-text class="text-icon_inactive"> by <b>{{note?.userBio.firstName}}</b></ion-text>
				</div>

				<div class="flex items-center ">

					<!-- <ion-icon
						:icon="pencil"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
					<ion-icon
						:icon="bookmark"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/> -->
					<Share
						cssClass="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
				
				</div>
			</div>
		</div>


	</Justified>
	<page-loading v-if="loading && pdfLoading"/>
</template>



<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { add, bookmark, chevronDown, chevronUp, contract, pencil, remove, scan, shareSocial } from 'ionicons/icons'
// import ShowRatings from '@app/components/core/ShowRatings.vue'
import Avatar from '@app/components/core/Avatar.vue'
import { defineComponent, onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNote } from '@root/application/composable/study/notes'

//@ts-ignore
import pdfvuer from 'pdfvuer'
import Share from '@root/application/components/core/Share.vue'


export default defineComponent( {
	name: 'view Notes',
	displayName: 'Notes', 
	components: {
		Justified,
		Avatar,
		pdf: pdfvuer,
		Share
	},
	setup () {
		

		const { id } = useRoute().params
		const {error, loading, note, listener} = useNote(id as string)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		const page = ref(1) 
		const scale = ref(1) 
		const numPages = ref(0) 
		const pdfdata = ref(undefined) 
		const pdfLoading = ref(true) 
		const formattedZoom =	computed(()=>{
			return scale.value *100
		})


		const getPdf = ()=> {
			
			pdfdata.value = pdfvuer.createLoadingTask('https://arkokoley.github.io/pdfvuer/nationStates.pdf')
			//@ts-ignore
			pdfdata?.value?.then((pdf: any) => {
				pdfLoading.value = false
				numPages.value = pdf.numPages
			})
		}


		//@ts-ignore
		onMounted(getPdf)
		return {
			page,pdfdata, note, loading,scale, numPages,pdfLoading,
			add,remove, scan, chevronDown,
			chevronUp,  pencil, contract, bookmark, shareSocial
		}
	},

})
</script>



<style lang="scss" scoped>
	.footer-shadow {
		box-shadow: 0px -5px 5px rgba(139, 158, 177, 0.05);
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
	}

	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
