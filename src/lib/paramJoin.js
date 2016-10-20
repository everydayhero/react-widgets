import _ from 'lodash'

function paramJoin (ids, joinString) {
  ids = _.isString(ids) ? [ids] : ids
  return ids.length > 1 ? ids.join(joinString) : ids[0]
}

export default paramJoin
