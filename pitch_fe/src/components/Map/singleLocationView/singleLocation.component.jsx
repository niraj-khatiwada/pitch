import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Map, Marker } from 'react-leaflet'
import { selectSelectedLocationDetail } from '../../../redux/reducers/location/location.selectors'
import { selectFilterDisplayName } from '../../../redux/reducers/search/search.selectors'
import { customIcon, defaultIcon } from '../../../icons/customMarkerIcon'
import TileLayerComponent from '../utils/tileLayer.utils'
import PopupComponent from '../utils/popup.utils'
import Snackbar from '../Snackbar/Snackbar.component'

function SingleLocation({ selectedLocationData, allLocationArray }) {
  const [popup, setPopup] = React.useState(false)
  const [popupOfArray, setPopupOfArray] = React.useState({
    item: null,
    isOpen: false,
  })
  const coordinates = [
    parseFloat(selectedLocationData.lat),
    parseFloat(selectedLocationData.lon),
  ]

  return (
    <div>
      <Map
        center={coordinates}
        zoom={50}
        animate={true}
        duration={2}
        easeLinearity={0.5}
      >
        <TileLayerComponent />
        <Snackbar />
        <>
          <Marker
            icon={customIcon}
            position={coordinates}
            onclick={() => setPopup(!popup)}
            key={selectedLocationData.place_id}
          />
          {popup ? <PopupComponent item={selectedLocationData} /> : null}
        </>
        {allLocationArray.length > 1
          ? allLocationArray.map((item) => {
              const coord = [parseFloat(item.lat), parseFloat(item.lon)]
              if (item.place_id !== selectedLocationData.place_id) {
                return (
                  <Marker
                    icon={defaultIcon}
                    position={coord}
                    onClick={() => {
                      popupOfArray.item === null
                        ? setPopupOfArray({ item, isOpen: true })
                        : setPopupOfArray({
                            item,
                            isOpen: !popupOfArray.isOpen,
                          })
                    }}
                    key={item.place_id}
                  />
                )
              }
            })
          : null}
        {allLocationArray.map((item) => {
          if (
            popupOfArray.item !== null &&
            item.place_id === popupOfArray.item.place_id
          )
            return popupOfArray.isOpen ? (
              <PopupComponent item={item} key={item.place_id} />
            ) : null
        })}
      </Map>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedLocationData: selectSelectedLocationDetail,
  allLocationArray: selectFilterDisplayName,
})

export default connect(mapStateToProps)(SingleLocation)
