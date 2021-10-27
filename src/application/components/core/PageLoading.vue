<template>
  <ion-loading
    :is-open="true"
    message="Please wait..."
    :duration="timeout"
  >
  </ion-loading>
</template>

<script>
import { IonLoading } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
	props: {
		timeout: { type: Number, default: 100000 },
	},
	components: { IonLoading },
	setup() {
		const isOpenRef = ref(false);

		return { isOpenRef }
	}
});
</script>