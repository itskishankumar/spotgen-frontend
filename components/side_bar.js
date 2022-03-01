import { BsFillBarChartFill, BsBarChart } from "react-icons/bs"
import { RiSearchLine, RiSearchFill } from "react-icons/ri"
import Link from 'next/link'
import { useRouter } from 'next/router'

const sideBarData = [
    {
        id: 1,
        title: 'Search',
        href: '/search',
        icon: <RiSearchLine style={{ color: 'white' }} />,
        iconSelected: <RiSearchFill style={{ color: 'white' }} />,
    },
    {
        id: 2,
        title: 'Insights',
        href: '/insights',
        icon: <BsBarChart style={{ color: 'white' }} />,
        iconSelected: <BsFillBarChartFill style={{ color: 'white' }} />,
    },
]

export default function SideBar() {
    const router = useRouter()

    return (
        <div className='h-full max-h-screen overflow-y-auto shrink bg-gradient-to-bl from-blue-900 to-black w-52 p-5'>
            <Link href={'/'}>
                <a href={'/'}>
                    <p className='mb-5 pl-2 font-bold text-white text-2xl'> SPOTGEN </p>
                </a>
            </Link>
            <nav>
                <ul>
                    {sideBarData.map(({ id, href, title, icon, iconSelected }) => (
                        <Link href={href} key={id}>
                            <a href={href}>
                                <li className='mb-3 p-2 flex flex-row items-center' key={title}>
                                    {router.asPath === href ?
                                        iconSelected : icon
                                    }
                                    <p className={`flex ml-3 cursor-pointer text-white ${router.asPath === href && 'font-bold'}`}>{title}</p>
                                </li>
                            </a>
                        </Link>
                    ))}
                </ul>
            </nav>
        </div >
    )
}