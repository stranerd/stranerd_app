<template>
	<ion-header
		:class="[show ?'fixed bg-white top-0 bottom-0 !text-white':'', 'w-full flex flex-col  z-10 bg-white text-primary nav-shadow']"
		role="navigation">
		<div class="md:px-16 p-4 hidden lg:flex items-center justify-between">
			<router-link class="hidden lg:block" to="/">
				<Logo :secondary="true" />
			</router-link>
			<div class="gap-8 flex-row lg:flex hidden items-center text-gray">
				<router-link class="link-custom  px-4" to="/">
					Home
				</router-link>
				<router-link class="link-custom px-4" to="/questions">
					Questions
				</router-link>
				<router-link class="link-custom px-4" to="/study">
					Study
				</router-link>

				<search-bar class="flex-grow w-full" />
			</div>

			<div class="gap-8 lg:flex hidden">
				<router-link class="btn border border-faded_gray text-primary !px-10 rounded-xl" to="/auth/signup">
					Sign Up
				</router-link>
				<router-link class="btn btn-custom text-white bg-primary !px-10 rounded-xl"
					to="/auth/signin">
					Log In
				</router-link>
			</div>
		</div>

		<ion-toolbar
			:class="{'text-white': show}"
			:style="`--background:${show ? '#546DD3' : 'white'}`"
			class="lg:hidden bg-white px-4 border-0 h-12 flex items-center justify-center"
		>
			<div class="flex items-center justify-between">
				<template v-if="showSearch">
					<search-bar />
				</template>
				<template v-else>
					<span class="cursor-pointer" @click="toggleMenu">
						<ion-icon :icon="show ? close : menu" size="100px" />
					</span>
					<router-link class="flex items-center" to="/">
						<Logo :secondary="!show" />
					</router-link>
				</template>
				<IonIcon :icon="showSearch ? close : search" class="text-xl ml-4" @click="toggleSearch" />
			</div>
		</ion-toolbar>
		<div v-if="show" class="grow-1 lg:hidden px-2 flex flex-col text-center mt-8 gap-6 bg-white text-main_dark">
			<router-link class="smallScreenLink link-custom-sm" to="/">
				Home
			</router-link>
			<router-link class=" smallScreenLink link-custom-sm" to="/questions">
				Questions
			</router-link>
			<router-link class=" smallScreenLink link-custom-sm" to="/study">
				Study
			</router-link>

			<router-link class="btn btn-custom  text-white bg-primary h-12 rounded-xl w-60 mx-auto"
				to="/auth/signin">
				Log In
			</router-link>
			<router-link class="btn border border-faded_gray text-primary h-12 rounded-xl w-60 mx-auto"
				to="/auth/signup">
				Sign Up
			</router-link>
		</div>
	</ion-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { disableScroll, enableScroll } from '@utils/html'
import Logo from '@app/components/core/Logo.vue'
import { IonHeader, IonIcon, IonToolbar } from '@ionic/vue'
import SearchBar from '@app/components/search/SearchBar.vue'
import { close, menu, search } from 'ionicons/icons'

export default defineComponent({
	components: { Logo, IonIcon, IonHeader, IonToolbar, SearchBar },
	name: 'HomeTopNavigation',
	setup () {
		const show = ref(false)
		const toggleMenu = () => {
			show.value ? enableScroll() : disableScroll()
			show.value = !show.value
		}
		const showSearch = ref(false)
		const toggleSearch = () => {
			showSearch.value = !showSearch.value
		}
		return {
			show, toggleMenu, showSearch,
			toggleSearch, menu, close, search
		}
	}
})
</script>

<style lang="scss" scoped>
	.link-custom {
		font-weight: 700;
		font-size: 16px;
	}

	.link-custom-sm {
		font-weight: 700;
		font-size: 16px;
	}

	.nav-shadow {
		box-shadow: 0 5px 10px rgba(84, 109, 211, 0.1);
	}
</style>
