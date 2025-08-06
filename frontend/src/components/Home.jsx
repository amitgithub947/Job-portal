import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './Home/HeroSection'
import CategoryCarousel from './Home/CategoryCarousel'
import LatestJobs from './Home/LatestJobs'
import Footer from './Home/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate("/admin/companies");
    }
  },[]);
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
