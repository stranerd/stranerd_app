<template>
	<DefaultLayout>
		<form class="p-4 flex flex-col gap-4" @submit.prevent="updatePassword">
			<IonText class="text-xl font-semibold">
				{{ hasPassword ? 'Update Password' : 'Add Password' }}
			</IonText>
			<IonInput v-if="hasPassword" v-model="factory.oldPassword" class="w-full font-medium"
				placeholder="Confirm Old Password"
				type="password" />
			<div class="flex md:flex-row gap-4 flex-col w-full">
				<IonInput v-model="factory.password" class="w-full font-medium"
					placeholder="Enter New Password"
					type="password" />
				<IonInput v-model="factory.cPassword" class="w-full font-medium"
					placeholder="Confirm New Password"
					type="password" />
			</div>
			<IonButton :disabled="loading" class="w-full btn-primary" type="submit">
				<SpinLoading v-if="loading" />
				<span v-else>Save Password</span>
			</IonButton>
		</form>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePasswordUpdate } from '@app/composable/auth/passwords'
import { useAuth } from '@app/composable/auth/auth'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SettingsSecurity',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Security', { back: true })
		const { hasPassword } = useAuth()
		const { factory, error, loading, updatePassword } = usePasswordUpdate()
		return { hasPassword, factory, error, loading, updatePassword }
	}
})
</script>
