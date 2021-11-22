<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="bg-primary w-full min-h-[130px] flex flex-col justify-center items-center pt-0 pb-1">
			<div class="flex items-center ">

				<ion-text class="text-white font-semibold text-center text-xl">
					JAMB > Test (Timed) > Mathematics (2021)
				</ion-text>

			</div>
		</div>

		<div class="flex items-center justify-center flex-col lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-white ">
			<ion-text class="text-4xl text-main_dark font-bold">Splendid!</ion-text>	

			<div class="h-60 w-60 rounded-full grid place-items-center bg-light_blue my-12">
				<DonutChart :score="70" :size="180" :total="100" />
			</div>	

			<ion-text class="text-main_dark my-4">
				Correct answers - <b>38/40 </b> 
			</ion-text>
			<ion-text class="text-main_dark">
				Time used - <b>33m 46s </b> 
			</ion-text>

			<div class="md:w-80 mt-20 mx-auto w-full px-4 flex items-center justify-between">
				<ion-text class="text-primary cursor-pointer">
					See <b>Solutions</b> 
				</ion-text>
				
				<router-link class="text-primary cursor-pointer" to="/study">
					Back to <b> My Study</b> 
				</router-link>
			
			</div>

		</div>


	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'


export default {
	name: 'submitted testprep',
	displayName: 'Test Prep',
	components: {
		Justified,

	},
	setup () {

		return { }
	}
}
</script>


<style lang="scss" scoped>
.btn-lgx {
    @media (min-width: 1042px){
	--padding-top: 1.5rem;
	--padding-bottom: 1.5rem;
	--padding-start: 4.5rem;
	--padding-end: 4.5rem;
    }

}
	.footer-shadow {
		box-shadow: 0px -5px 5px rgba(139, 158, 177, 0.05);
	}
input[type="radio"]:checked+label{
     @apply border-primary
      } 
	.segment-button-checked {
		color: white !important
	}

	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #4D5C6F;
		--background-focused: #4D5C6F;
		--indicator-color: #4D5C6F;
		--indicator-box-shadow: none;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
		color: #8B9EB1;
		font-weight: bold;
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
		@media (max-width: 770px) {
			box-shadow: none;
			border-radius: 0;
		}
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
