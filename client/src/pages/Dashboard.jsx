 import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComponent from '../components/DashboardComponent';

const Dashboard = () => {

  const location = useLocation();
const [tab,setTab] = useState("");

useEffect(() =>{

  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get("tab");
   if(tabFromUrl){
    setTab(tabFromUrl);
   }

},[location.search])

  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
<div className=''>
{/* sideBar */}

<DashSidebar/>

</div>

<div className='flex-1' >
{/* Content Based On the SideBar Navigation */}
{/* profile */}

{tab === 'profile' &&  
<DashProfile/>
}

{/* posts */}

{tab=== 'posts' && <DashPosts/>}

{/* users */}

{tab === 'users' && <DashUsers/>}

{/* comments */}

{tab === 'comments' && <DashComments/>}

{/* all information in dashboard component */}

{tab === 'dash' && <DashboardComponent/>}
</div>

    </div>
  )
}

export default Dashboard