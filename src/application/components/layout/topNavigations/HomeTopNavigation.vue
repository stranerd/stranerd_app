<template>
	<ion-header
		:class="[show ?'fixed bg-white top-0 bottom-0 !text-white':'', 'w-full flex flex-col  z-10 bg-white text-primary lg:shadow']"
		role="navigation">
		<div class="md:px-8 p-4 hidden md:flex items-center justify-between">
			<router-link class="hidden lg:block" to="/">
				<Logo  :secondary="true"  />
			</router-link>
			<div class="gap-8 flex-row lg:flex hidden items-center text-gray	">
				<router-link class="link-custom  px-4" to="/">
					Home
				</router-link>
				<router-link class="link-custom px-4" to="/#how-it-works">
					Questions
				</router-link>
				<router-link class="link-custom px-4" to="/#contact-us">
					study
				</router-link>
		

			</div>

			<div class="gap-8 lg:flex hidden">
				<router-link class="btn border border-faded_gray text-primary   !px-10 rounded-xl" to="/auth/signup">
					Sign Up
				</router-link>
				<router-link class="btn btn-custom  text-white bg-primary  !px-10 rounded-xl"
					to="/auth/signin">
					Log In
				</router-link>


			</div>
		</div>

		<ion-toolbar
			:style="`--background:${show ? '#546DD3' : 'white'}`"
			class="md:hidden  bg-white px-4 border-0 h-12 flex items-center justify-center "
			:class= "{ 'text-white': show}"
		>
			<div class="flex items-center justify-between">
				<span class="cursor-pointer" @click="toggleMenu">
					<ion-icon v-if="!show" :icon="menu" size="100px" />
					<ion-icon v-else :icon="close" size="100px" />
				</span>
				<router-link class="flex items-center" to="/">
					<Logo   v-if="show" />
					<img class="w-24" src="@app/assets/images/logo/logo-dark.svg" v-else />
						
				</router-link>
				<IonIcon :icon="showSearch ? close : search" class="text-xl "
					@click="toggleSearch" />
				<search-bar v-if="showSearch" class="absolute -left-3 z-50 top-1" />
			</div>
		</ion-toolbar>		
		<div v-if="show" class="grow-1 lg:hidden px-2 flex flex-col text-center mt-8 gap-6 bg-white text-main_dark">
			<a class=" smallScreenLink link-custom-sm" @click="navigate('/')">
				Home
			</a>
			<a class=" smallScreenLink link-custom-sm" @click="navigate('/#how-it-works')">
				questions
			</a>
			<a class=" smallScreenLink link-custom-sm" @click="navigate('/#contact-us')">
				Study
			</a>
	
			<a
				class="btn bg-white rounded-md text-main_dark mx-auto min-w-[11rem] w-100"
				@click="navigate('/auth/signin')"
			>
				Sign In
			</a>
			<a
				class="btn text-white mx-auto w-100 min-w-[11rem] border-2 border-white rounded-md"
				@click="navigate('/auth/signup')"
			>
				Sign Up
			</a>

		</div>
	</ion-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { disableScroll, enableScroll } from '@utils/html'
import Logo from '../../core/Logo.vue'
import { IonHeader, IonIcon } from '@ionic/vue'
import SearchBar from '@app/components/search/SearchBar.vue'
import { close, menu, search } from 'ionicons/icons'

export default defineComponent({
	components: { Logo, IonIcon, IonHeader, SearchBar },
	name: 'HomeTopNavigation',
	setup () {
		const router = useRouter()
		const show = ref(false)
		const toggleMenu = () => {
			show.value ? enableScroll() : disableScroll()
			show.value = !show.value
		}
		const showSearch = ref(false)
		const toggleSearch = () => {
			showSearch.value = !showSearch.value
		}
		const navigate = (link: string) => {
			toggleMenu()
			router.push(link)
		}
		return { 
			show, toggleMenu, navigate, showSearch, 
			toggleSearch, menu, close, search
		  }
	}
})
</script>

<style lang="scss" scoped>


	.white-btn-custom {
		font-size: 16px;
		border: 2px solid $color-primary;
		border-radius: 6px;
	}


	.link-custom {
		font-weight: 700;
		font-size: 16px;
	}

	.link-custom-sm {
		font-weight: 500;
		font-size: 14px;
	}


	.bottomLogo {
		position: fixed;
		bottom: 2%;
		width: 100%;
		left: 0%;
	}
</style>
