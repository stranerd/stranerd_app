import {
	AxiosStranerd
} from '../orgRepository'

export	const getUser = ()=> {
	const url = '/users/:id'
	return AxiosStranerd.post(url)
}