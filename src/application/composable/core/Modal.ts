import { ref } from 'vue'
import { Media } from '@/modules/core'


export const showModal = ref(false)

export const toggleModal = () => {
	showModal.value ? showModal.value = false : showModal.value = true
}

export const componentName = ref('')

export const imageSrc = ref<Media[]>([])
export const selectedImageIndex = ref(0)
