<template>
	<ion-page class="fixed">
		<ion-content
			slot="fixed"
			class="flex flex-col bg-dark h-screen w-screen items-center py-3 fixed"
		>

		
		</ion-content>
	</ion-page>
</template>

<script>
// import { IonContent, IonButton, IonPage } from '@ionic/vue'
import { IonContent, IonPage } from '@ionic/vue'
import { defineComponent, ref } from 'vue'



export default defineComponent({
	components: { IonContent,IonPage},

})
</script>

<style lang="scss">
img {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}
	ion-content{
		--background: $color-dark;
		transition: all .5s ease-in-out;
	}

	ion-button{
    --background: white;
    --border-radius: 3.125rem;
    --color: #4D5C6F;
    --background-hover: white;
	--padding-top: 1rem;
	--padding-bottom: 1rem;
	height: 2.75rem;
	transition: all .5s ease-in-out;

}

.swiper-container{
	height: 34rem;
}
	.swiper-pagination-bullet {
		background-color: $color-white;
		height: .625rem;
		width: .625rem;
		border-radius: 3.125rem;
		transition: all .5s ease-in-out;
		margin-right: 10px;
		opacity: 1;
	}

	.swiper-pagination-bullet-active {
		background-color: $color-gold;
		height: .625rem;
		width: 1.75rem;
		border-radius: .625rem;
		transition: all .5s ease-in-out;
		margin-right: 10px;

	}


</style>