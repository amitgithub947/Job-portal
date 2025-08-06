import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/Jobs/JobDescription'
import Companies from './components/admin/Companies'
import CompaniesCreate from './components/admin/CompaniesCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/Jobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/Login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/job',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  //admin ke liye
  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies/></ProtectedRoute> 
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><CompaniesCreate/></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:'/admin/job',
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><PostJobs/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  }

])
function App() {

  return (
    <>
    <RouterProvider router  = {appRouter}/>

    </>
  )
}

export default App
