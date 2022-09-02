<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg relative py-12 md:py-28 -z-20">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Get in touch</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">Make an enquiry</h2>
				<p class="text-lg">
					Want to find out more information? Let us know how we can help you by filling out this form.
				</p>
				<router-link class="btn landing_btn-outline lg:hidden" to="/auth/signup">
					See all
				</router-link>
			</div>
			
			<div class="flex flex-col w-full md:max-w-xl lg:w-[50%] bg-white shadow-xl p-5 rounded-xl">
				<IonLabel class="font-bold mb-2">Who are you?</IonLabel>
				<IonSelect v-model="userType"
					:size="24" placeholder="Please Select" position="floating" >
					<ion-select-option value="student">Student</ion-select-option>
					<ion-select-option value="school">School</ion-select-option>
				</IonSelect>
				<StudentForm v-show="userType === 'student'"/>
				<SchoolForm v-show="userType === 'school'"/>
			</div>
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg relative py-12 md:py-28 -z-20">
		<div
			class="container mx-auto text-primaryText p-6 flex flex-col gap-6 lg:gap-16 items-center justify-center">
			<h2 class="lg:text-5xl text-3xl font-bold  text-white lg:leading-[62px]">Contact links</h2>

			<div class="flex flex-wrap items-center justify-center md:gap-5 gap-3">
				<router-link v-for="item in contactLinks" :key="item.icon" to="/"
					class="md:h-56 md:w-56 h-28 w-28 rounded-2xl bg-white flex items-center justify-center"
				>
					<div class="text-primaryBg flex flex-col items-center justify-center gap-3">
						<IonIcon :icon="item.icon" class="text-2xl md:text-5xl font-bold"/>
						<p class="text-md md:text-xl">{{item.text}}</p>
					</div>
				</router-link>
			</div>
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg relative py-12 md:py-28 -z-20">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row-reverse gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col w-full md:max-w-xl lg:w-[50%] bg-white ">
				<Accordion v-for="faq in faqs" :key="faq.answer" :faq="faq"/>
			</div>
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Need to know</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">Frequently asked questions</h2>
				<router-link class="btn landing_btn-outline" to="/auth/signup">
					See all
				</router-link>
			</div>
		</div>
	</div>
	<LandingFooter/>
</template>

<script lang="ts" setup>
import { logoWhatsapp, logoInstagram, logoTwitter, mail, call } from 'ionicons/icons'
import StudentForm from './studentForm.vue'
import SchoolForm from './schoolForm.vue'
import Accordion from './accordion.vue'
import LandingFooter from '../LandingFooter.vue'
import { ref } from 'vue'


const userType = ref('')
const contactLinks = [
	{icon: call, text: 'Call', route: '/'},
	{icon: mail, text: 'Mail', route: '/'},
	{icon: logoWhatsapp, text: 'Whatsapp', route: '/'},
	{icon: logoInstagram, text: 'Instagram', route: '/'},
	{icon: logoTwitter, text: 'Twitter', route: '/'}
]
const faqs = [
	{question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?', answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quod reprehenderit corporis exercitationem necessitatibus? Id voluptatum, reiciendis nisi ipsum mollitia eaque nisi cupiditate provident magnam iste consequuntur. Laborum, voluptatum provident'},
	{question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?', answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quod reprehenderit corporis exercitationem necessitatibus? Id voluptatum, reiciendis fugiat ipsum mollitia eaque nisi cupiditate provident magnam iste consequuntur. Laborum, voluptatum provident'},
	{question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?', answer: 'Lorem ipsum cupiditate sit amet consectetur adipisicing elit. Officia quod reprehenderit corporis exercitationem necessitatibus? Id voluptatum, reiciendis fugiat ipsum mollitia eaque nisi cupiditate provident magnam iste consequuntur. Laborum, voluptatum provident'},
	{question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?', answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quod reprehenderit corporis exercitationem necessitatibus? Id voluptatum, reiciendis fugiat ipsum mollitia fugiat nisi cupiditate provident magnam iste consequuntur. Laborum, voluptatum provident'}
]
</script>

<style scoped>

</style>
