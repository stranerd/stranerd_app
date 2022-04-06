<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto md:p-4 lg:py-8 max-w-[800px]">
			<form class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4"
				@submit.prevent="updatePassword">
				<ion-text class="text-heading font-semibold">
					{{ hasPassword ? 'Update Password' : 'Add Password' }}
				</ion-text>
				<div v-if="hasPassword" class="border border-faded_gray rounded-lg">
					<IonInput v-model="factory.oldPassword" class="w-full font-medium"
						placeholder="Confirm Old Password"
						type="password" />
				</div>
				<div class="flex md:flex-row gap-4 flex-col w-full">
					<div class="border border-faded_gray rounded-lg w-full">
						<IonInput v-model="factory.password" class="w-full font-medium"
							placeholder="Enter New Password"
							type="password" />
					</div>
					<div class="border border-faded_gray rounded-lg w-full">
						<IonInput v-model="factory.cPassword" class="w-full font-medium"
							placeholder="Confirm New Password"
							type="password" />
					</div>
				</div>
				<ion-button :disabled="loading" class="btn-primary w-40" type="submit">
					Save Password
					<IonSpinner v-if="loading" name="lines-small" />
				</ion-button>
			</form>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { IonSpinner } from '@ionic/vue'
import { usePasswordUpdate } from '@app/composable/auth/passwords'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'SettingsSecurity',
	displayName: 'Security',
	components: { Justified, IonSpinner },
	middlewares: ['isAuthenticated'],
	setup () {
		const { hasPassword } = useAuth()
		const { factory, error, loading, updatePassword } = usePasswordUpdate()
		return { hasPassword, factory, error, loading, updatePassword }
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		--background: #{$color-primary};
		--box-shadow: none;
		height: 2.75rem;
	}

	ion-input, ion-textarea {
		--border-width: 1px !important;
		--border-style: solid !important;
	}

	ion-select, ion-radio-group {
		color: $color-gray !important;
	}
</style>
