import '../index.css'
import SidebarNav from './SidebarNav'
import SidebarSocials from './SidebarSocials'
import { ContentProps } from './Content'


function Sidebar({refs} : ContentProps)  {
  
  return (
    <>
    <aside className="pl-2 md:pl-0 flex md:h-dvh md:float-left md:w-5/12 sm:w-full h-100 flex-col flex-nowrap md:top-0 md:sticky pt-16">
    <div className='group hover:bg-content-background-hover w-fit p-3 rounded-lg duration-300'>
    <h1 className='text-white text-5xl font-bold group-hover:text-background-complementary duration-300'>Kryštof Marval</h1>
    <h2 className='text-white text-xl mt-2'>Software Developer</h2>
    <p className="text-gray-400 text-base mt-5 max-w-xs">I take intererest in every technology under the sun. Sometimes this comes at a cost, but it's incredibly fun!</p>
    </div>
    <SidebarNav refs={refs}></SidebarNav>
    <SidebarSocials></SidebarSocials>
    </aside>
    </>
  )
}

export default Sidebar
