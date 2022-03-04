<template>
	<form class="flex flex-col gap-4 justify-center" @submit.prevent="submit">
		<ion-textarea v-model="factory.body"
			class="w-full border border-new_gray"
			placeholder="Announcement"
			rows="3"
			show-cancel-button="never"
		/>

		<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full hidden" size="small" type="submit">
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
		--padding-top: 0.75rem;
		--padding-bottom: 0.75rem;
		--padding-right: 0;
		--padding-left: 0;
	}
</style>
