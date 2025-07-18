import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex'>
        <div className='w-64 min-h-full bg-blue-300'>
            <ul className='menu text-white'>
                <li><NavLink to="dashboard/users">All Users</NavLink></li>
            </ul>
        </div>
        <div className='flex'>
            <Outlet></Outlet>
        </div>
    </div>  
  )
}

export default Dashboard