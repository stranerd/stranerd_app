<template>
	<DefaultLayout>
		<template v-slot:panel>
			<ProfilePanel />
		</template>
		<form v-if="editMode" class="flex flex-col gap-6 page-padding" @submit.prevent="updateAccount">
			<div class="flex flex-col gap-2">
				<IonLabel>Account number</IonLabel>
				<IonInput v-model="factory.number" placeholder="Enter account number" type="number" />
				<DisplayError :error="factory.errors.number" />
			</div>

			<div class="flex flex-col gap-2">
				<IonLabel>Bank</IonLabel>
				<IonSelect v-model="factory.bankCode" class="capitalize w-full"
					interface="action-sheet" placeholder="Select bank">
					<IonSelectOption v-for="bank in banks" :key="bank.id" :value="bank.code" class="capitalize">
						{{ bank.name }}
					</IonSelectOption>
				</IonSelect>
			</div>

			<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
				<SpinLoading v-if="loading" class="mr-4" />
				<span>Save</span>
			</IonButton>
		</form>
		<div v-else class="flex flex-col lg:gap-8">
			<div class="flex flex-col card card-padding border-bottom-line">
				<div class="flex justify-between items-center">
					<IonText class="font-light">Account number</IonText>
					<IonIcon :icon="createOutline" class="text-secondaryText" @click="editMode = !editMode" />
				</div>
				<IonText class="font-bold text-xl">{{ wallet?.account?.number || 'N/A' }}</IonText>
			</div>
			<div class="flex flex-col card card-padding border-bottom-line">
				<IonText class="font-light">Bank</IonText>
				<IonText class="font-bold text-xl">{{ wallet?.account?.bankName || 'N/A' }}</IonText>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ProfilePanel from '@app/components/layout/panels/ProfilePanel.vue'
import { useEditAccount } from '@app/composable/payment/wallets'
import { createOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'AccountWalletDetails',
	components: { ProfilePanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Account Details', { back: true })
		const editMode = ref(false)
		const { factory, wallet, banks, loading, error, message, updateAccount: save } = useEditAccount()
		const updateAccount = async () => {
			const res = await save()
			if (res) editMode.value = false
		}
		return {
			editMode, createOutline,
			factory, wallet, banks, loading, error, message, updateAccount
		}
	}
})
</script>
