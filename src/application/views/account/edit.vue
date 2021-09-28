<template>
	<div class="d-flex flex-column gap-1">
		<h1 class="mb-0 mx-auto">
			Edit Your Profile
		</h1>
		<AccountProfileForm :cancel="cancel" />
	</div>
</template>

<script lang="ts">
import AccountProfileForm from '@app/components/users/account/AccountProfileForm.vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'AccountEditPage',
	components: { AccountProfileForm },
	middleware: 'isAuthenticated',
	setup () {
		const router = useRouter()
		const cancel = () => router.push('/account/')
		return { cancel }
	},
	head: {}
})
</script>
