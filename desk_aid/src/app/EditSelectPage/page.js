
import Link from 'next/link'
export default function Page() {
    return (
        <div className="p-2">
            <h1>Edit Page</h1>
            <div className='w-full'>
            <Link href="/" className="w-1/5">
                <button className="hover:bg-blue-500 py-4 mx-2 w-1/5 flex-1 rounded">
                    Edit Resources
                </button>
            </Link>
            <Link href="/" className="w-1/5">
                <button className="hover:bg-blue-500 py-4 mx-2 w-1/5 flex-1 rounded">
                    Edit Guide Categories
                </button>
            </Link>
            <Link href="/" className="w-1/5">
                <button className="hover:bg-blue-500 py-4 mx-2 w-1/5 flex-1 rounded">
                    Edit Guides
                </button>
            </Link>
            </div>
        </div>
    );
}