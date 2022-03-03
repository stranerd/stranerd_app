<template>
	<form class="flex flex-col gap-4 text-center justify-center items-center" @submit.prevent="submit">
		<div class="bg-light_gray w-full rounded-md flex items-center p-4">
			<ion-text class="text-primary font-bold">
				NAME
			</ion-text>
			<ion-input v-model="factory.name"
				class="w-full text-left"
				placeholder="Name the group"
				show-cancel-button="never"
			/>
		</div>

		<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full" type="submit">
			<slot name="buttonText">Submit</slot>
			<ion-ripple-effect class="rounded-lg" />
		</ion-button>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GroupFactory } from '@modules/classes'
import { IonRippleEffect } from '@ionic/vue'

export default defineComponent({
	name: 'GroupForm',
	components: { IonRippleEffect },
	props: {
		factory: {
			type: GroupFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-input {
		--padding-top: 0;
		--padding-bottom: 0;
		--padding-right: 0;
		--padding-left: 0;
	}
</style>
