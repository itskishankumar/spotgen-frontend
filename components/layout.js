import SideBar from './side_bar'
import MainContentWrapper from './main_content_wrapper'

export default function Layout({ children }) {
  return (
    <div className='h-screen w-screen flex flex-row'>
      <SideBar />
      <main className='flex-1 w-px bg-gradient-to-br from-black to-blue-900 p-10 max-h-screen overflow-y-auto scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
        <MainContentWrapper props={children} />
      </main>
    </div >
  )
}