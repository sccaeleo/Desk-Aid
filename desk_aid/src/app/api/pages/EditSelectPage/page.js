import Link from 'next/link'
export default function Page() {

    return (
        <div>
            <h1>Edit Page</h1>
            <div className='flex justify-evenly'>
                <Link href="/api/pages/EditResources" className='flex justify-center w-1/3'>
                    <button className="hover:bg-blue-500 py-4 w-4/5 rounded">
                        Edit Resources
                    </button>
                </Link>
                <Link href="/api/pages/EditCategories" className='flex justify-center w-1/3'>
                    <button className="hover:bg-blue-500 py-4 w-4/5 rounded">
                        Edit Guide Categories
                    </button>
                </Link>
                <Link href="/api/pages/EditGuides" className='flex justify-center w-1/3'>
                    <button className="hover:bg-blue-500 py-4 w-4/5 rounded">
                        Edit Guides
                    </button>
                </Link>
            </div>
        </div>
    );
}

