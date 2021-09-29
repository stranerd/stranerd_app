<template>
	<nav class="mobile-bottom-nav d-sm-none">
		<NuxtLink to="/">
			<div class="mobile-bottom-nav__item mobile-bottom-nav__item--active  ">
				<div class="mobile-bottom-nav__item-content">
					<Icon
						class="text-dark"
						size="s"
						:icon-name="$route.name=='dashboard'?'home':'home-outline'"
					/>
				</div>
			</div>
		</NuxtLink>

		<NuxtLink to="/sessions">
			<div class="mobile-bottom-nav__item">
				<Icon
					class="text-dark"
					size="s"
					:icon-name="$route.name=='sessions'?'chat':'chat-outline'"
				/>
			</div>
		</NuxtLink>

		<NuxtLink to="/questions/create">
			<div class="mobile-bottom-nav__item">
				<Icon
					class="text-dark"
					size="s"
					:icon-name="$route.name=='questions-create'?'create':'create-outline'"
				/>
			</div>
		</NuxtLink>

		<NuxtLink to="/notifications">
			<div class="mobile-bottom-nav__item">
				<Icon
					class="text-dark"
					size="s"
					:icon-name="$route.name=='notifications'?'bell':'bell-outline'"
				/>
			</div>
		</NuxtLink>

		<NuxtLink to="/widgets">
			<div class="mobile-bottom-nav__item">
				<Icon
					class="text-dark"
					size="s"
					:icon-name="$route.name=='widgets'?'app':'app-outline'"
				/>
			</div>
		</NuxtLink>
	</nav>
</template>

<script>
import { useQuestionsModal } from '@/application/hooks/core/modals'
import { useRedirectToAuth } from '@/application/hooks/auth/session'
import { useAuth } from '@/application/hooks/auth/auth'

export default {

	setup () {
		const { isLoggedIn } = useAuth()
		const { redirect } = useRedirectToAuth()
		const askQuestion = () => {
			if (isLoggedIn.value) useQuestionsModal().openAskQuestions()
			else redirect()
		}

		return { askQuestion }
	}
}
</script>

<style lang="scss">
	.icon {
		width: 1.25rem;
		height: 1.25rem;
		object-fit: contain;
	}

	.mobile-bottom-nav {
		color: $color-dark;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		will-change: transform;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 50px;
		border-top: 1px solid $color-line;

		// box-shadow: 0 -2px 5px -2px #333;
		background-color: #fff;

		&__item {
			text-align: center;
			font-size: 1.25rem;
			justify-content: center;
		}

		&__item-content {
			display: flex;
			flex-direction: column;
		}
	}
</style>
