<template>
	<ion-backdrop></ion-backdrop>
	<transition name="slide" appear>
		<div class="fixed top-0 w-screen h-screen " v-if="showModal" @click="close($event)">
			<div>
				<div class="card text-black" >
					
				</div>

			
			</div>
		</div>
	</transition>
</template>

<script>
import { IonBackdrop } from '@ionic/vue'
export default {
	name: 'success',
	components: { IonBackdrop },
	props: ['showModal', 'title', 'sub'],
	data() {
		return {
			loading: false,
			options: [],
			downloadMode: localStorage.getItem('mode') == 'Download',
		}
	},
	methods: {
		close(e) {
			if (e.target.className == 'bg') {
				this.$emit('close')
			}
		},
	},
	mounted() {
		this.options = []
		this.loading = true
	},
	created() {
		this.options = []
		this.loading = true
	},
}
</script>

<style scoped>

.bg {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(35, 31, 31, 0.893);
  width: 100vw;
  max-width: 100vw;
  min-height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
}

.card {
  overflow: hidden;
  padding: 1rem;
  background: #515d4b;
  width: 500px;
  min-height: 300px;
  max-width: 85vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  transform: scale(0);
}
</style>