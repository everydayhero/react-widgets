import React from 'react'
import sampleSize from 'lodash/sampleSize'
import uniqBy from 'lodash/uniqBy'
import numbro from 'numbro'
import totals from '../../../api/totals'
import pages from '../../../api/pages'

class CampaignSocialProof extends React.Component {

  constructor (props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.loadTotals = this.loadTotals.bind(this)
    this.onSuccessTotals = this.onSuccessTotals.bind(this)
    this.loadPages = this.loadPages.bind(this)
    this.onSuccessPages = this.onSuccessPages.bind(this)

    this.state = {
      loadingTotals: false,
      loadingPages: false,
      numberOfPages: 0,
      numberOfDonations: 0,
      images: []
    }
  }

  componentWillMount () {
    this.loadTotals()
    this.loadPages()
  }

  loadPages () {
    this.setState({ loadingPages: true })

    const { numberOfPagesToRequest, campaignUid } = this.props
    pages.findByCampaign(campaignUid, 'individual', numberOfPagesToRequest, 0, this.onSuccessPages)
  }

  loadTotals () {
    const { campaignUid } = this.props
    this.setState({loadingTotals: true})
    totals.findByCampaigns(
      {
        campaignUids: [campaignUid]
      },
      this.onSuccessTotals
    )
  }

  onSuccessPages (result) {
    const pagesWithUniqueOwners = uniqBy(result.pages, 'owner_uid')
    const images = sampleSize(
      pagesWithUniqueOwners.map(
        (page) => (page.image.medium_image_url)
      ), this.props.numberOfImages
    )
    this.setState({
      images,
      numberOfPages: result.meta.count,
      loadingPages: false
    })
  }

  onSuccessTotals (result) {
    const donationsByType = result.types
    const numberOfDonations = Object.keys(donationsByType).reduce((tally, donationType) => {
      return tally + donationsByType[donationType].doc_count
    }, 0)
    this.setState({
      numberOfDonations,
      loadingTotals: false
    })
  }

  renderPhoto (imageUrl, index) {
    return (
      <div className='CampaignSocialProof__photo' key={index}>
        { imageUrl ? <img src={imageUrl} /> : <div /> }
      </div>
    )
  }

  renderProfilePhotos (images) {
    let index = images.length
    let renderedImages = []
    while (index) {
      renderedImages.push(this.renderPhoto(images[index - 1], index))
      index -= 1
    }
    return renderedImages
  }

  renderProfilePhotosContainer () {
    const { images, loadingPages } = this.state
    const imagesSet = loadingPages ? new Array(this.props.numberOfImages) : images
    return (
      <div className='CampaignSocialProof__photosContainer'>
        { this.renderProfilePhotos(imagesSet) }
      </div>
    )
  }

  renderSubtitle () {
    const { numberOfPages, numberOfDonations, loadingPages } = this.state
    const number = numberOfPages + numberOfDonations

    return (
      <div className={`CampaignSocialProof__subtitle${loadingPages ? '--loading' : ''}`}>
        { !loadingPages && `${numbro(number).format(this.props.numberFormat)} contributors` }
      </div>
    )
  }

  render () {
    const { loadingPages } = this.state

    if (!loadingPages && this.state.images.length < 3) return null

    return (
      <div className='CampaignSocialProof'>
        { this.renderProfilePhotosContainer() }
        { this.renderSubtitle() }
      </div>
    )
  }
}

CampaignSocialProof.displayName = 'CampaignSocialProof'

CampaignSocialProof.propTypes = {
  numberOfImages: React.PropTypes.number,
  numberOfPagesToRequest: React.PropTypes.number,
  campaignUid: React.PropTypes.string.isRequired,
  numberFormat: React.PropTypes.string
}

CampaignSocialProof.defaultProps = {
  numberFormat: '0,0',
  numberOfImages: 5,
  numberOfPagesToRequest: 50
}

export default CampaignSocialProof
