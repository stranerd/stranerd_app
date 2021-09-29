<template>
	<section>
		<nav class="default-top-nav gap-1" role="navigation">
			<template v-if="showSearch">
				<span @click="showSearch = false">
					<Icon
						class="head-icons"
						class-name="text-dark head-icons"
						size="l"
						icon-name="close-thin"
					/>
				</span>
				<SearchBar class="flex-grow-1" />
			</template>
			<template v-else>
				<span :class="{'d-lg-none': !showLeftMenu}" @click="openLeftMenu">
					<Icon
						class="head-icons"
						class-name="head-icons"
						size="s"
						icon-name="hamburger"
					/>
				</span>

				<NuxtLink to="/" class="mx-auto mx-md-0">
					<Logo :secondary="false" class="logo" />
					<div class="sm-logo text-dark">
						{{ $route.name }}
					</div>
				</NuxtLink>

				<SearchBar class="middle-body mx-auto d-none d-lg-flex" />

				<div class="right-body gap-0 gap-sm-1-5 gap-md-2-25 gap-lg-3 gap-xl-4 ms-md-auto ms-lg-0">
					<span class="d-lg-none" @click="showSearch = !showSearch">
						<Icon
							class="head-icons d-lg-none"
							class-name="head-icons"
							size="s"
							icon-name="search"
						/>
					</span>
					<MessageLink :key="'messages' + isLoggedIn" class="d-md-inline d-none" />
					<NotificationBell :key="'notifications' + isLoggedIn" class="d-sm-inline d-none" />

					<span :class="{'d-lg-none': !showRightMenu}" @click="openRightMenu">
						<Icon
							class="head-icons d-lg-none d-sm-inline d-none"
							class-name="head-icons"
							size="s"
							icon-name="right-nav"
						/>
					</span>

					<div
						v-if="isLoggedIn"
						class="d-none d-lg-flex gap-0-25 gap-lg-0-5 align-items-center cursor-pointer"
						@click="show = !show"
					>
						<Avatar :size="36" :src="user.avatar" />
						<span class="flex gap-0-5 align-items-center">
							<DynamicText :truncate="true" class="username">
								{{ user.fullName }}
							</DynamicText>
							<i :class="show ? 'fa-angle-up' : 'fa-angle-down'" class="fas" />
						</span>
					</div>
				</div>
				<div v-if="show" class="menu-bg">
					<div class="under" @click="show = false" />
					<div class="drop-menu gap-1-5">
						<NuxtLink to="/account/">
							<img alt="" src="@app/assets/images/icons/user.svg">
							Profile
						</NuxtLink>
						<NuxtLink to="/invite/">
							<i class="fas fa-user-friends" />
							Refer A Friend
						</NuxtLink>
						<NuxtLink v-if="isAdmin" to="/admin/">
							<img alt="" src="@app/assets/images/icons/admin.svg">
							Admin
						</NuxtLink>
						<span class="cursor-pointer" @click="signout">
							<img alt="" src="@app/assets/images/icons/signout.svg">
							Sign Out
						</span>
						<PageLoading v-if="loading" />
					</div>
				</div>
			</template>
		</nav>
		<div :class="{'search': showSearch}" class="dummy" />
	</section>
</template>

<script lang="ts">
import SearchBar from '@app/components/search/SearchBar.vue'
import NotificationBell from '@app/components/layouts/topNavigations/NotificationBell.vue'
import MessageLink from '@app/components/layouts/topNavigations/MessageLink.vue'
import { defineComponent, PropType, ref } from 'vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
import { useMenuModal } from '@app/hooks/core/modals'

export default defineComponent({
	name: 'DefaultTopNavigation',
	components: { SearchBar, NotificationBell, MessageLink },
	props: {
		showLeftMenu: {
			type: Boolean,
			required: false,
			default: false
		},
		showRightMenu: {
			type: Boolean,
			required: false,
			default: false
		},
		openLeftMenu: {
			type: Function as PropType<() => {}>,
			required: false,
			default: useMenuModal().openSidebar
		},
		openRightMenu: {
			type: Function as PropType<() => {}>,
			required: false,
			default: useMenuModal().openRightSidebar
		}
	},
	setup () {
		const { isLoggedIn, isAdmin, user } = useAuth()
		const show = ref(false)
		const showSearch = ref(false)
		const { loading, error, signout } = useSessionSignout()
		return { show, isLoggedIn, isAdmin, user, loading, error, signout, showSearch }
	}
})
</script>

<style lang="scss" scoped>
	.menu-bg {
		position: fixed;
		width: 100vw;
		height: vh(100);
		left: 0;
		top: 0;
		z-index: 2;

		.under {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}

		.drop-menu {
			position: absolute;
			top: 60px;
			right: 24px;
			display: flex;
			flex-direction: column;
			width: auto;
			min-width: 200px;
			padding: 1.5rem;
			background: $color-white 0% 0% no-repeat padding-box;
			box-shadow: 0 10px 10px rgba($color-primary, 0.1);
			border-radius: 6px;

			& > * {
				display: flex;
				align-items: center;
				color: $color-dark;
				font-weight: 600;

				img, i {
					margin-right: 18px;
					width: 24px;
					font-size: 24px;
					filter: brightness(50%);
				}
			}
		}
	}

	.default-top-nav {
		position: fixed;
		top: 0;
		z-index: 3;
		// box-shadow: 0 8px 16px 5px rgba($color-primaryDark, 0.2);
		width: 100%;
		display: flex;
		align-items: center;
		color: $color-white;
		background: $color-primaryDark;
		padding: 0.75rem 1rem;
		@media (max-width: $md) {
			background: $color-white;
			border-bottom: 4px solid $color-primaryDark;
			padding: 0.75rem 1.875rem;
		}
		@media (max-width: $sm) {
			padding: 0.75rem 1.125rem;
			border-bottom: 1px solid $color-line;
		}
		@media (min-width: $md) {
			padding: 0.75rem 2rem;
		}
		@media (min-width: $lg) {
			padding: 0.75rem 3rem;
		}
		@media (min-width: $xl) {
			padding: 0.75rem 4rem;
		}
	}

	.middle-body {
		flex-grow: 1;
		max-width: 45%;
	}

	.right-body {
		display: flex;
		align-items: center;
	}

	.username {
		font-size: 18px;
		font-weight: 600;
	}

	.dummy {
		height: 44px;
		@media (min-width: $md) {
			height: 48px;
		}
		@media (min-width: $lg) {
			height: 60px;
		}

		&.search {
			height: 57px;
			@media (min-width: $md) {
				height: 57px;
			}
			@media (min-width: $lg) {
				height: 60px;
			}
		}
	}

	.head-icons {
		color: white;
		@media (max-width: $md) {
			color: $color-primaryDark;
		}
		@media (max-width: $sm) {
			color: $color-dark;
		}
	}

	.sm-logo {
		display: block;
		font-size: 1.125rem;
		font-weight: 600;
		text-transform: capitalize;
		@media (min-width: $md) {
			display: none;
		}
	}

	.logo {
		display: none;
		@media (min-width: $md) {
			display: block;
		}
	}
</style>
