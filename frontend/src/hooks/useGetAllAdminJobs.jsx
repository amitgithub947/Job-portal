// import { setAllAdminJobs } from '@/redux/jobSlice'
import { setAllAdminJobs } from '@/Redux/jobslice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BACKEND_URL } from '@/utils/config'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/job/getadminjobs`,{withCredentials:true});
                // console.log("res",res.data);
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchAllAdminJobs();
    },[dispatch])
}

export default useGetAllAdminJobs
