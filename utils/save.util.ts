import download from 'downloadjs'
import { contentType } from 'mime-types'

export const saveFile = (content: string, fileName: string, type: string) => {
	const fileType = contentType(type)
	if (fileType === false) {
		console.log('Cannot get content type')
		download(content, fileName, contentType('text') as string)
	} else {
		download(content, fileName, fileType)
	}
}
