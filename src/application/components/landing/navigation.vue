<template>
	<!-- :class="[show ?'bg-dark_gray top-0 bottom-0 !text-white':'', 'w-full flex flex-col z-10 bg-white lg:shadow']" -->
	<ion-header
		:class="[show ?'bg-dark_gray top-0 bottom-0 !text-white':'', 'w-full z-10 bg-white lg:shadow']"
		class="md:px-8 p-4 fixed"
		role="navigation">
		<div class="container flex flex-col mx-auto">
			<div class="flex items-center">
				<router-link class="mr-auto" to="">
					<img v-if="!show" alt="Stranerd" class="w-24 md:w-32" src="@app/assets/images/logo/logo-gray.svg">
					<img v-else alt="Stranerd" src="@app/assets/images/logo/logo-white.svg">
				</router-link>
				<ul class="gap-8 flex-row lg:flex items-center hidden">
					<li>
						<router-link class="link-custom text-md font-bold text-main_dark px-4" to="/landing">
							Home
						</router-link>
					</li>
					<li>
						<router-link class="link-custom text-md font-bold text-main_dark px-4"
							to="/landing#how-it-works">
							How it works
						</router-link>
					</li>
					<li>
						<router-link class="link-custom text-md font-bold text-main_dark px-4" to="/landing#contact-us">
							About
						</router-link>
					</li>
					<li>
						<router-link class="link-custom text-md font-bold text-main_dark px-4" to="/landing#contact-us">
							Blog
						</router-link>
					</li>
					<li>
						<router-link class="btn bg-primary text-white !px-10 rounded-md" to="/auth/signup">
							Sign Up
						</router-link>
					</li>
					<li>
						<router-link class="btn btn-custom border border-dark_gray text-main_dark !px-10 rounded-md"
							to="/auth/signin">
							Sign In
						</router-link>
					</li>
				</ul>
				<div class="lg:hidden">
					<span class="cursor-pointer" @click="toggleMenu">
						<img v-if="!show" class="w-6" src="@app/assets/images/icons/menu-bars.png" />
						<ion-icon v-else :icon="close" size="100px" />
					</span>
				</div>
			</div>
			<div v-if="show" class="grow-1 lg:hidden px-2 flex flex-col text-center mt-8 gap-6 bg-dark_gray">
				<ul class="grow-1 lg:hidden px-10 flex flex-col text-center mt-8 gap-8 bg-dark_gray">
					<li>
						<a class=" smallScreenLink text-sm font-medium text-white link-custom-sm"
							@click="navigate('/landing')">
							Home
						</a>
					</li>
					<li>
						<a class=" smallScreenLink text-sm font-medium text-white link-custom-sm"
							@click="navigate('/landing#how-it-works')">
							How it works
						</a>
					</li>
					<li>
						<a class=" smallScreenLink text-sm font-medium text-white link-custom-sm"
							@click="navigate('/landing#contact-us')">
							About
						</a>
					</li>
					<li>
						<a class=" smallScreenLink text-sm font-medium text-white link-custom-sm"
							@click="navigate('/landing#contact-us')">
							Blog
						</a>
					</li>
					<li>
						<a
							class="btn bg-white border-2 border-white rounded-md text-main_dark text-sm mx-auto min-w-[11rem] w-100"
							@click="navigate('/auth/signin')"
						>
							Sign In
						</a>
					</li>
					<li>
						<a
							class="btn text-white mx-auto w-100 min-w-[11rem] text-sm border-2 border-white rounded-md"
							@click="navigate('/auth/signup')"
						>
							Sign Up
						</a>
					</li>
				</ul>
			</div>
		</div>
	</ion-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { disableScroll, enableScroll } from '@utils/html'
import { IonHeader, IonIcon } from '@ionic/vue'
import { close } from 'ionicons/icons'

export default defineComponent({
	components: { IonIcon, IonHeader },
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
		return { show, toggleMenu, navigate, close }
	}
})
</script>

