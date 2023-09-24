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

export default function Listing() {
  const params = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  SwiperCore.use([Autoplay, Navigation, Pagination])
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [params.listingId])
  if (loading) {
    return <Spinner />
  }
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
        <div className="w-full h-[200px] lg-[400px]">
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
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold">
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
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  )
}
