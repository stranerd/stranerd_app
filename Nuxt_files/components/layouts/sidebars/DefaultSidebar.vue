<template>
	<aside class="flex flex-col gap-1">
		<div v-if="isLoggedIn" class="flex items-center mx-1-5 d-block d-sm-none">
			<Avatar :size="50" :src="user.avatar" />
			<div class="flex flex-col ms-1 gap-0-5">
				<DynamicText :truncate="true" class="font-bold text-sub">
					{{ user.firstName }}
				</DynamicText>
				<NuxtLink class="font-bold text-primary" to="/account/">
					Go to Profile
				</NuxtLink>
			</div>
		</div>
		<div class="sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<Icon
					class="me-1-5"
					icon-name="questions"
					size="s"
				/>
				<span>Questions</span>
			</NuxtLink>

			<!-- <NuxtLink class="sidebar-link" to="/nerds">
				<Icon
					class=" me-1-5"
					size="s"
					icon-name="study"
				/>
				<span>Study</span>
			</NuxtLink> -->

			<NuxtLink class="sidebar-link" to="/nerds">
				<Icon
					class=" me-1-5"
					icon-name="tutors"
					size="s"
				/>
				<span>Tutors</span>
			</NuxtLink>

			<!-- <NuxtLink class="sidebar-link" to="/nerds">
				<Icon
					class=" me-1-5"
					size="s"
					icon-name="class"
				/>
				<span>Class</span>
			</NuxtLink> -->

			<!-- <NuxtLink class="sidebar-link" to="/schedule">
				<Icon
					class=" me-1-5"
					size="s"
					icon-name="schedule"
				/>
				<span>Schedule</span>
			</NuxtLink> -->

			<NuxtLink class="sidebar-link" to="/account/e-wallet">
				<Icon
					class=" me-1-5"
					icon-name="e-wallet"
					size="s"
				/>
				<span>e-Wallet</span>
			</NuxtLink>

			<div class="sidebar-link d-block d-sm-none" @click="signout">
				<Icon
					class=" me-1-5"
					icon-name="logout"
					size="s"
				/>
				<span>Log Out</span>
			</div>
		</div>
		<div class="sidebar-links px-1-5 gap-1 d-inline d-sm-none fixed ">
			<div v-if="isLoggedIn" class="text-primary font-bold" @click="buy">
				<span>Buy Coins</span>
			</div>
		</div>
		<div class="sidebar-links px-1-5 gap-1 d-none d-sm-inline">
			<button v-if="isLoggedIn" class="sidebar-btn btn" @click="buy">
				<span>Buy Coins</span>
			</button>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useAccountModal } from '@app/hooks/core/modals'
import { useSessionSignout } from '@app/hooks/auth/session'

export default defineComponent({
	name: 'DefaultSidebar',
	setup () {
		const { user, isAdmin, isLoggedIn } = useAuth()
		const buy = () => useAccountModal().openBuyCoins()
		const { signout } = useSessionSignout()
		return { isLoggedIn, user, isAdmin, buy, signout }
	}

})
</script>

<style lang="scss" scoped>
	.fixed {
		position: fixed;
		bottom: 0;
		margin-left: 0.5rem;
		padding: 1rem 2rem;
		font-size: 18px;
	}
</style>
