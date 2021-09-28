<template>
	<div class="d-flex flex-column align-items-center gap-0-5 p-2">
		<Heading class="color-dark" no-grow variant="2">
			Balance
		</Heading>
		<NuxtLink class="d-block w-92" to="/account/e-wallet">
			<AccountCoinBalance :user="user" class="justify-content-center" />
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import AccountCoinBalance from '@app/components/users/account/AccountCoinBalance.vue'

export default defineComponent({
	name: 'ProfileHeadCard',
	components: { AccountCoinBalance },
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	}
})
</script>

<style lang="scss" scoped>
	.w-92 {
		width: 92%;
	}
</style>
