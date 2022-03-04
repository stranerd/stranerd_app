<template>
	<form class="flex flex-col gap-4 justify-center" @submit.prevent="submit">
		<ion-input v-model="factory.name"
			class="w-full border border-new_gray"
			placeholder="New Group Name"
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
		--padding-top: 0.75rem;
		--padding-bottom: 0.75rem;
		--padding-right: 0;
		--padding-left: 0;
	}
</style>
