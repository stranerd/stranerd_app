<template>
	<ion-header
		:class="[show ?'bg-dark_gray top-0 bottom-0 !text-white':'', 'w-full flex flex-col z-10 bg-white text-primary lg:shadow']"
		class="fixed"
		role="navigation">
		<div class="md:px-8 p-4 flex items-center">
			<router-link class="mr-auto" to="/">
				<Logo v-if="!show" :secondary="true" />
				<Logo v-else />
			</router-link>
			<div class="gap-8 flex-row lg:flex hidden items-center">
				<router-link class="link-custom px-4" to="/landing">
					Home
				</router-link>
				<router-link class="link-custom px-4" to="/landing#how-it-works">
					How it works
				</router-link>
				<router-link class="link-custom px-4" to="/landing#contact-us">
					About
				</router-link>
				<router-link class="link-custom px-4" to="/landing#contact-us">
					Blog
				</router-link>
				<router-link class="btn bg-primary text-white !px-10 rounded-md" to="/auth/signup">
					Sign Up
				</router-link>
				<router-link class="btn btn-custom border border-dark_gray text-dark_gray !px-10 rounded-md"
					to="/auth/signin">
					Sign In
				</router-link>
			</div>
			<div class="lg:hidden">
				<span class="cursor-pointer" @click="toggleMenu">
					<img src="@app/assets/images/icons/menu-bars.png" v-if="!show" class="w-6" />
					<ion-icon v-else :icon="close" size="100px" />
				</span>
			</div>
		</div>
		<div v-if="show" class="grow-1 lg:hidden px-2 flex flex-col text-center mt-8 gap-6 bg-dark_gray">
			<a class=" smallScreenLink link-custom-sm" @click="navigate('/landing')">
				Home
			</a>
			<a class=" smallScreenLink link-custom-sm" @click="navigate('/landing#how-it-works')">
				How it works
			</a>
			<a class=" smallScreenLink link-custom-sm" @click="navigate('/landing#contact-us')">
				About
			</a>
			<a class=" smallScreenLink link-custom-sm" @click="navigate('/landing#contact-us')">
				Blog
			</a>
			<a
				class="btn bg-white rounded-md text-dark_gray mx-auto min-w-[11rem] w-100"
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
import Logo from '@app/components/core/Logo.vue'
import { IonHeader, IonIcon } from '@ionic/vue'
import { close, menu } from 'ionicons/icons'

export default defineComponent({
	components: { Logo, IonIcon, IonHeader },
	name: 'HomeTopNavigation',
	setup () {
		const router = useRouter()
		const show = ref(false)
		const toggleMenu = () => {
			show.value ? enableScroll() : disableScroll()
			show.value = !show.value
		}
		const navigate = (link: string) => {
			toggleMenu()
			router.push(link)
		}
		return { show, toggleMenu, navigate, menu, close }
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
		color: $color-iconInactive;
		font-weight: 700;
		font-size: 16px;
	}

	.link-custom-sm {
		color: $color-white;
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
