<template>
	<form class="flex flex-col gap-4 justify-center" @submit.prevent="null">
		<template v-if="tab === 0">
			<div class="flex flex-col items-start">
				<CoverAvatar :editable="true" :src="factory.coverPhoto" class="h-20"
					@photo="(p) => factory.coverPhoto = p" />
				<span class="modal-padding-x relative top-[-40px] inline-flex items-center justify-center -mb-10">
					<Avatar :editable="true" :name="factory.name" :size="80"
						:src="factory.photo" @photo="(p) => factory.photo = p" />
				</span>
			</div>
			<div class="flex flex-col gap-4 modal-padding-x">
				<ion-input v-model="factory.name"
					class="w-full bg-new_gray rounded-md"
					placeholder="Add a title"
					show-cancel-button="never"
				/>
				<ion-input v-model="factory.description"
					class="w-full bg-new_gray rounded-md"
					placeholder="Add a short description"
					show-cancel-button="never"
				/>

				<ion-button class="btn-primary ml-auto" @click="tab = 1">Next</ion-button>
			</div>
		</template>
		<div v-else-if="tab === 1" class="flex flex-col gap-4 modal-padding-x">
			<div class="flex gap-4 items-center justify-between">
				<ion-input v-model="course"
					class="w-full bg-new_gray rounded-md"
					placeholder="Add a course"
					show-cancel-button="never"
					@keydown.enter.prevent="addCourse"
				/>
				<IonButton class="btn-primary" @click="addCourse">Add</IonButton>
			</div>

			<div class="flex flex-col gap-1" style="min-height: 178px;">
				<div v-for="(course, index) in factory.courses" :key="index + course"
					class="flex gap-4 items-center justify-between">
					<span class="truncate flex-grow">{{ course }}</span>
					<IonIcon :icon="closeOutline" class="text-red text-heading2"
						@click="factory.removeCourse(course)" />
				</div>
			</div>

			<div class="flex justify-between gap-4">
				<ion-button class="btn-outline border-primary text-primary" @click="tab = 0">Previous</ion-button>
				<ion-button :disabled="loading || !factory.valid" class="btn-primary" @click.prevent="submit">
					<slot name="buttonText">Submit</slot>
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
			</div>
			<PageLoading v-if="loading" />
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ClassFactory } from '@modules/classes'
import { IonRippleEffect } from '@ionic/vue'
import { closeOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'ClassForm',
	components: { IonRippleEffect },
	props: {
		factory: {
			type: ClassFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const tab = ref(0)
		const course = ref('')
		const addCourse = () => {
			if (!course.value) return
			props.factory.addCourse(course.value)
			course.value = ''
		}
		return { tab, course, addCourse, closeOutline }
	}
})
</script>

<style lang="scss" scoped>
	ion-label {
		--color: #{$color-iconInactive} !important;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
