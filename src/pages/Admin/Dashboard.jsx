import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex p-8 gap-8 md:p-20'>
        <div className=' w-20 sm:w-64 min-h-full border'>
            <ul className='menu border text-white w-full'>
                <li className='bg-blue-300'><NavLink to="users" end>All Users</NavLink></li>
            </ul>
        </div>
        <div className='flex-1'>
            <Outlet></Outlet>
        </div>
    </div>  
  )
}

export default Dashboard