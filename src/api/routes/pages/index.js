import routes from '..'

const pages = ({
  ids
}) => (
  routes.client.get('/api/v2/pages', {
    params: {
      ids: ids.join(',')
    }
  }).then(({ data }) => (
    data.pages.map((page) => ({
      amount: page.amount.cents,
      charityName: page.charity_name,
      id: page.id,
      imgSrc: page.image.large_image_url,
      isoCode: page.amount.currency.iso_code,
      medImgSrc: page.image.medium_image_url,
      name: page.name,
      symbol: page.amount.currency.symbol,
      totalMembers: page.team_member_uids.length,
      url: page.url
    }))
  ))
)

export default pages
