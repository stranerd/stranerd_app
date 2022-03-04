<template>
	<form class="flex flex-col gap-4 text-center justify-center items-center" @submit.prevent="submit">
		<div class="bg-light_gray w-full rounded-md flex items-center p-4">
			<ion-textarea v-model="factory.body"
				class="w-full text-left"
				placeholder="Announcement"
				rows="3"
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
import { AnnouncementFactory } from '@modules/classes'
import { IonRippleEffect, IonTextarea } from '@ionic/vue'

export default defineComponent({
	name: 'AnnouncementForm',
	components: { IonRippleEffect, IonTextarea },
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
	ion-textarea {
		--padding-top: 0;
		--padding-bottom: 0;
		--padding-right: 0;
		--padding-left: 0;
	}
</style>
