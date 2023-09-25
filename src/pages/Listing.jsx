import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import Spinner from '../components/Spinner'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from 'react-icons/fa'
import 'swiper/css/bundle'
import { getAuth } from 'firebase/auth'
import Contact from '../components/Contact'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Listing() {
  const auth = getAuth()
  const params = useParams()
  const [listing, setListing] = useState(null)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const [contactLandlord, setContactLandlord] = useState(false)
  SwiperCore.use([Autoplay, Navigation, Pagination])
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListing(docSnap.data())
      }
    }
    fetchListing()
  }, [params.listingId])
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: ':cover',
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}
      <div className="m-4 p-4 rounded-lg shadow-lg flex flex-col md:flex-row max-w-6xl lg:mx-auto bg-white lg:space-x-5">
        <div className="w-full">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${' '}
            {listing.offer
              ? listing.discountPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' ? '/month' : ''}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === 'rent' ? 'Rent' : 'Sale'}
            </p>
            <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.offer && (
                <p>${listing.regularPrice - listing.discountPrice} discount</p>
              )}
            </p>
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>{' '}
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center">
              <FaBed className="text-lg mt-1 whitespace-nowrap" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}
            </li>
            <li className="flex items-center">
              <FaBath className="text-lg mt-1 whitespace-nowrap" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : '1 Bath'}
            </li>
            <li className="flex items-center">
              <FaParking className="text-lg mt-1 whitespace-nowrap" />
              {+listing.parking ? 'Parking spot' : 'No parking'}
            </li>
            <li className="flex items-center">
              <FaChair className="text-lg mt-1 whitespace-nowrap" />
              {+listing.furnished ? 'Furnished' : 'Not furnished'}
            </li>
          </ul>
          {listing.userRef == auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className="mt-6 w-full h-[200px] md:h-[400px] z-10 overflow-hidden md:mt-0 md:ml-2">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
          ,
        </div>
      </div>
    </main>
  )
}
