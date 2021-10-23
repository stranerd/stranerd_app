<template>
	<div class="grid grid-col-12 px-3 text-xs md:text-sm mt-6 col-span-12 md:flex md:flex-row md:justify-center">
		
		<div class="col-span-12 flex flex-col md:w-4/5  md:border md:border-faded_gray md:rounded-lg md:py-6 md:px-6">
			<h3 class="text-center font-bold text-dark_gray">
				Ask questions to help with your homework and studies.
			</h3>

			<div class="mt-3 border border-faded_gray rounded-lg py-5 px-3">
				<ion-textarea rows="9"  v-model="factory.body"
					class="bg-white border-0 focus:outline-none  w-full"  
					placeholder="Write your question here and make sure it is explained in full detail."></ion-textarea>
			</div>

			<div class="mt-3  rounded-lg py-5 px-3 text-icon_inactive relative bg-light_gray flex flex-col justify-center items-center">
				<ion-icon :icon="image" class="text-[32px]"></ion-icon>
				<input
					type="file" id="images"
					name="images"
					class="cursor-pointer w-full h-full absolute"
					style="opacity:0; overflow:hidden; position:absolute;"
					accept="image/x-png,image/jpeg,image/jpg"/>
				<p class="mt-3">
					Add images to help with your question <b>(Optional)</b>
				</p>
			</div>

			<div class="mt-3 py-1 px-2 bg-light_gray rounded-lg flex flex-row">
				<ion-select v-model="factory.subjectId" class="w-full  font-medium" placeholder="Select the subject" interface="action-sheet">
					<ion-select-option :value="subject.id" v-for="(subject, index) in subjects" :key="index + 'subject'">{{ subject.name }}</ion-select-option>
				</ion-select>
			</div>

			<div class="py-2 px-2 pl-6 mt-3 bg-light_gray rounded-lg flex flex-col">
				<ion-input class="w-full font-medium" placeholder="Add related tags" v-model="tag">
				</ion-input>
				<div class="py-2 flex flex-row flex-wrap gap-x-2" v-if="factory.tags.length > 0">
					<span  v-for="(tag, index) in factory.tags" :key="index + 'tag'">
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg flex flex-row items-center" v-if="tag">
							{{ tag }}  <ion-icon :icon="close" class="ml-1 cursor-pointer" @click="removeTag"></ion-icon>
						</span>
					</span>
				</div>
			</div>

			<div class="py-1  px-2 mt-3 bg-light_gray rounded-lg flex flex-row">
				<ion-select v-model="factory.coins" class="w-full  font-medium" placeholder="Set a reward for Best Answers" interface="action-sheet">
					<ion-select-option :value="coin" v-for="(coin, index) in coins" :key="index + 'coin'">{{ coin }} Bronze Coins</ion-select-option>
				</ion-select>
			</div>

			<div class="flex flex-row px-3 mt-7  text-white">
				<div class="w-1/2 flex flex-row justify-center items-center">
					<button class=" px-6 py-3 relative ion-activatable rounded-lg  font-bold bg-dark_gray ">
						Cancel
						<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
					</button>
				</div>
				<div class="w-1/2 flex flex-row justify-center items-center">
					<button class=" px-6 relative ion-activatable font-bold py-3 rounded-lg bg-primary" @click="createQuestion">
						Post question
						<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
					</button>
				</div>
			</div>

			
		</div>

	</div>


</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonSelect, IonSelectOption, IonTextarea, IonInput, IonRippleEffect, IonIcon } from '@ionic/vue'
import { image, close } from 'ionicons/icons'
import { useSubjectList } from '@/application/composable/questions/subjects'
import { useCreateQuestion } from '@/application/composable/questions/questions'
import { useTags } from '@/application/composable/core/forms'

export default defineComponent({
	setup() {

		const { subjects } = useSubjectList()

		const { error, loading, factory, coins, createQuestion  } = useCreateQuestion()

		const { tag, removeTag } = useTags(
			(tag: string) => factory.value.addTag(tag),
			(tag: string) => factory.value.removeTag(tag)
		)


		return {
			image,
			subjects,
			error, loading, factory, coins, tag, removeTag, createQuestion , close
		}
	},
	components: { IonTextarea, IonIcon, IonSelect, IonSelectOption, IonInput, IonRippleEffect }
})
</script>
<style scoped>
.customShadow {
	 box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
}

ion-select {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-input {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-icon {
  font-size: 22px;
}

ion-input {
	--placeholder-color: #8B9EB1;
}
</style>