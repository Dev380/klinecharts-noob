export function formatDate (dateTimeFormat: Intl.DateTimeFormat, timestamp: number, format: string): string {
  const date: Record<string, string> = {}
  
  dateTimeFormat.formatToParts(new Date(timestamp)).forEach(({ type, value }) => {
    switch (type) {
      case 'year': {
        date.YYYY = value
        break
      }
      case 'month': {
        date.MM = value
        break
      }
      case 'day': {
        date.DD = value
        break
      }
      case 'hour': {
        date.HH = value === '24' ? '00' : value
        break
      }
      case 'minute': {
        date.mm = value
        break
      }
      case 'second': {
        date.ss = value
        break
      }
	  case 'dayPeriod': {
		date.AP = " " + value.toLocaleUpperCase(dateTimeFormat.resolvedOptions().locale).replaceAll('.', '')
	  }
    }
  })
  return format.replace(/YYYY|MM|DD|HH|mm|ss|AP/g, key => date[key])
}
