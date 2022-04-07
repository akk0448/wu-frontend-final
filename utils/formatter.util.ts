import xmlFormatterFromPackage from 'xml-formatter'

export const jsonFormatter = (out: string) => {
	return JSON.stringify(JSON.parse(out), null, 4)
}

export const xmlFormatter = xmlFormatterFromPackage

export const formatterMap = {
	xml: xmlFormatter,
	json: jsonFormatter,
}
