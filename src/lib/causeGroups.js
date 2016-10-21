import _ from 'lodash'

const causeGroups = [
  {
    name: 'safety',
    icon: 'plus-square',
    causes: [
      'crime_legal_related',
      'public_safety_disaster_preparedness_relief',
      'international_foreign_affairs_national_security'
    ]
  }, {
    name: 'health',
    icon: 'heart',
    causes: [
      'health_care',
      'diseases_disorders_medical_disciplines',
      'medical_research',
      'mental_health_crisis_intervention'
    ]
  }, {
    name: 'nature',
    icon: 'leaf',
    causes: [
      'animal_related',
      'environment',
      'food_agriculture_nutrition'
    ]
  }, {
    name: 'community',
    icon: 'comments-o',
    causes: [
      'civil_rights_social_action_advocacy',
      'employment',
      'youth_development',
      'religion_related',
      'social_science',
      'science_technology',
      'housing_shelter',
      'human_services',
      'philanthropy_voluntarism_grantmaking_foundations',
      'arts_culture_humanities',
      'community_improvement_capacity_building',
      'education',
      'recreation_sports',
      'public_social_benefit',
      'mutual_membership_benefit',
      'unknown'
    ]
  }
]

export default {
  all: causeGroups,

  findByName (name) {
    return _.find(causeGroups, 'name', name)
  },

  findByCause (cause) {
    return _.find(causeGroups, function (causeGroup) {
      return _.includes(causeGroup.causes, cause)
    })
  }
}
