<template>
	<form class="flex flex-col md:flex-row md:items-center gap-2 justify-center" @submit.prevent="submit">
		<ion-input v-model="factory.body"
			class="w-full border border-new_gray"
			placeholder="Post an announcement"
			show-cancel-button="never"
		/>

		<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full md:w-auto" type="submit">
			<slot name="buttonText">Submit</slot>
			<ion-ripple-effect class="rounded-lg" />
		</ion-button>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AnnouncementFactory } from '@modules/classes'
import { IonRippleEffect } from '@ionic/vue'

export default defineComponent({
	name: 'AnnouncementForm',
	components: { IonRippleEffect },
	props: {
		factory: {
			type: AnnouncementFactory,
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
	ion-textarea, ion-input {
		--padding-top: 0.75rem;
		--padding-bottom: 0.75rem;
		--padding-right: 0;
		--padding-left: 0;
	}
</style>
