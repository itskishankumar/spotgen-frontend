import Insight1 from "./insight1"
import Insight2 from "./insight2"
import Insight3 from "./insight3"
import Insight4 from "./insight4"
import Insight5 from "./insight5"
import Link from 'next/link'

export default function Insights() {
    return (
        <div className='pb-10 grid grid-cols-2 grid-rows-3 gap-5'>
            <Link href='insights/insight4'>
                <a href='insights/insight4' className='hover:opacity-50'>
                    <Insight4 isDynamic={false} />
                </a>
            </Link>
            <Link href='insights/insight5'>
                <a href='insights/insight5' className='hover:opacity-50'>
                    <Insight5 isDynamic={false} />
                </a>
            </Link>
            <Link href='insights/insight1'>
                <a href='insights/insight1' className='hover:opacity-50'>
                    <Insight1 isDynamic={false} />
                </a>
            </Link>
            <Link href='insights/insight2'>
                <a href='insights/insight2' className='hover:opacity-50'>
                    <Insight2 isDynamic={false} />
                </a>
            </Link>
            <Link href='insights/insight3'>
                <a href='insights/insight3' className='hover:opacity-50'>
                    <Insight3 isDynamic={false} />
                </a>
            </Link>
        </div >
    )
}