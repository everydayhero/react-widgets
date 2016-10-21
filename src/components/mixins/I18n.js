import _ from 'lodash'
import React from 'react'
import i18n from '../../lib/i18n'
import Remarkable from 'remarkable'

const md = new Remarkable({ xhtmlOut: true, breaks: true })

export default {
  getI18n () {
    let i18n = this.props.defaultI18n || {}
    if (this.props.i18n) {
      i18n = _.merge({}, i18n, this.props.i18n)
    }
    return i18n
  },

  t (key, params) {
    return i18n.t(this.getI18n(), key, params)
  },

  tm (key, params) {
    let html = md.render(this.t(key, params))
    return <span dangerouslySetInnerHTML={{ __html: html }} />
  }
}
