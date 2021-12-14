<template>
	<div
		class="rounded-xl bg-white md:py-6 md:px-6 py-4 px-3 md:text-sm text-xs flex flex-col lg:col-start-5 lg:col-end-9 md:col-start-3 md:col-end-11 col-span-12">

		<div class="flex flex-col gap-1 text-center justify-center items-center ">
			<h3 class="text-xl font-semibold text-main_dark">Are you sure you want to submit?</h3>

		</div>


		<div class="flex flex-row  mt-5  text-white gap-4">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<ion-button class=" btn-secondary w-full"
					@click="closeCreateSet">
					No
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</ion-button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<ion-button class=" btn-primary w-full" @click="createSet">
					Yes
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</ion-button>
			</div>
		</div>

	</div>
	<PageLoading v-if="loading"/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonRippleEffect } from '@ionic/vue'
import { chevronDown, ellipse, ellipseOutline } from 'ionicons/icons'
import { useStudyModal } from '@app/composable/core/modals'
import { useCreateSet } from '@root/application/composable/study/sets'
import {  useTags } from '@app/composable/core/forms'


export default defineComponent({
	setup () {
		const closeCreateSet = () => {
			useStudyModal().closeCreateSet()
		}

		const {createSet, factory, error,loading} = useCreateSet()

        		const { tag, removeTag } = useTags(
			(tag: string) => factory.value.addTag(tag),
			(tag: string) => factory.value.removeTag(tag)
		)

		return {
			error, loading, tag, removeTag,
			createSet, factory, closeCreateSet,
			chevronDown, ellipse, ellipseOutline
		}
	},
	components: {
		IonRippleEffect
	}
})
</script>
<style scoped>
	ion-input {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
	}

	ion-radio{
		--color: #8B9EB1 !important; 
	}

		ion-label{
		--color: #8B9EB1 !important; 
	}


</style>
