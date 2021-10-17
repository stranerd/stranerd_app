class BaseApiService {
  baseUrl = 'https://jsonplaceholder.typicode.com';
  resource;

  constructor(resource: string) {
   	if (!resource) throw new Error('Resource is not provided')
  	this.resource = resource
  }

  getUrl(id = '') {
  	return `${this.baseUrl}/${this.resource}/${id}`
  }

  handleErrors(err: string) {
  	// Note: here you may want to add your errors handling
  	console.log({ message: 'Errors is handled here', err })
  }
}

class ReadOnlyApiService extends BaseApiService {
	constructor(resource: string) {
		super(resource)
	}
	async fetch(config = {}) {
		try {
			const response = await fetch(this.getUrl(), config)
			return await response.json()
		} catch (err: any) {
			this.handleErrors(err)
		}
	}
	async get(id: string) {
		try {
			if (!id) throw Error('Id is not provided')
			const response = await fetch(this.getUrl(id))
			return await response.json()
		} catch (err: any) {
			this.handleErrors(err)
		}
	}
}

class ModelApiService extends ReadOnlyApiService {
	constructor(resource: string) {
		super(resource)
	}
	async post(data = {}) {
		try {
			const response = await fetch(this.getUrl(), {
				method: 'POST',
				body: JSON.stringify(data)
			})
			const { id } = response.json()
			return id
		} catch (err: any) {
			this.handleErrors(err)
		}
	}
	async put(id: string, data = {}) {
		if (!id) throw Error('Id is not provided')
		try {
			const response = await fetch(this.getUrl(id), {
				method: 'PUT',
				body: JSON.stringify(data)
			})
			const { id: responseId } = response.json()
			return responseId
		} catch (err: any) {
			this.handleErrors(err)
		}
	}
	async delete(id: string) {
		if (!id) throw Error('Id is not provided')
		try {
			await fetch(this.getUrl(id), {
				method: 'DELETE'
			})
			return true
		} catch (err: any) {
			this.handleErrors(err)
		}
	}
}