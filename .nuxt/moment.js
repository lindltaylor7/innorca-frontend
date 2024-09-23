import moment from 'moment'

import 'moment/locale/es'

import 'moment-timezone'

moment.tz.setDefault('America/Lima')

export default (ctx, inject) => {
  ctx.$moment = moment
  inject('moment', moment)
}
