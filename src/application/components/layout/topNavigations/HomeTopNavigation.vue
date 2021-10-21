<template>
	<nav :class="[show ?'fixed bg-primary top-0 bottom-0':'', 'w-full flex flex-col bg-primary text-white z-10 lg:bg-white lg:text-primary']" role="navigation">
		<div class="md:px-8 p-4 flex items-center">
			<router-link class="mr-auto" to="/">
				<Logo :secondary="true" class="lg:inline-block hidden" />
				<Logo class="lg:hidden" />
			</router-link>
			<div class="gap-2 flex-row-reverse lg:flex hidden items-center">
				<router-link class="btn btn-lg btn-custom bg-white text-primary px-12" to="/auth/signup">
					Sign Up
				</router-link>
				<router-link class="btn btn-lg btn-custom px-12" to="/auth/signin">
					Sign In
				</router-link>
				<router-link class="link-custom px-4" to="/#contact-us">
					Contact
				</router-link>
				<router-link class="link-custom px-4" to="/#how-it-works">
					How it works
				</router-link>
				<router-link class="link-custom px-4" to="/">
					Home
				</router-link>
			</div>
			<div class="lg;hidden">
				<span class="cursor-pointer" @click="toggleMenu">
					<i
						:class="show ? 'fa-times' : 'fa-bars'"
						class="fas"
						style="font-size: 28px;"
					/>
				</span>
			</div>
		</div>
		<div v-if="show" class="flex-grow-1 lg;hidden px-2 flex flex-column text-center mt-2">
			<a class="mb-2 smallScreenLink link-custom-sm" @click="navigate('/')">
				Home
			</a>
			<a class="mb-2 smallScreenLink link-custom-sm" @click="navigate('/#how-it-works')">
				How it works
			</a>
			<a class="mb-2 smallScreenLink link-custom-sm" @click="navigate('/#contact-us')">
				Contact
			</a>
			<a
				class="btn bg-white text-primary mx-auto mb-1 w-100"
				style="max-width: 400px; font-size: 14px;"
				@click="navigate('/auth/signin')"
			>
				Sign In
			</a>
			<a
				class="btn text-white mx-auto w-100"
				style="max-width: 400px; font-size: 14px;"
				@click="navigate('/auth/signup')"
			>
				Sign Up
			</a>
			<!-- <div class="bottomLogo flex flex-row items-center justify-content-center gap-1">
				<a href="https://instagram.com/officialstranerd" target="_blank">
					<img alt="" height="30" src="@app/assets/images/homepage/instagram_white.svg">
				</a>
				<a href="https://twitter.com/stranerds" target="_blank">
					<img alt="" height="30" src="@app/assets/images/homepage/twitter_white.svg">
				</a>
				<a href="https://facebook.com/officialstranerd" target="_blank">
					<img alt="" height="30" src="@app/assets/images/homepage/facebook_white.svg">
				</a>
			</div> -->
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { disableScroll, enableScroll } from '@/utils/html'
import Logo from '../../core/Logo.vue'
import { IonIcon } from '@ionic/vue'
import { add, home } from 'ionicons/icons'


export default defineComponent({
	components: { Logo },
	name: 'HomeTopNavigation',
	components: { IonIcon }
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
		return { show, toggleMenu, navigate }
	}
})
</script>

<style lang="scss" scoped>




	.white-btn-custom {
		font-size: 16px;
		border: 2px solid $color-primary;
		border-radius: 6px;
	}

	.btn-custom {
		background-color: $color-primary;
		color: $color-white;
		font-size: 16px;
		border: 2px solid $color-primary;
		font-weight: 700;
		border-radius: 6px;
	}

	.link-custom {
		color: $color-primary;
		font-weight: 700;
		font-size: 16px;
	}

	.link-custom-sm {
		color: $color-white;
		font-weight: 700;
		font-size: 14px;
	}

	.smallScreenLink:hover {
		background-color: rgba($color-white, 0.2);
	}

	.bottomLogo {
		position: fixed;
		bottom: 2%;
		width: 100%;
		left: 0%;
	}
</style>
