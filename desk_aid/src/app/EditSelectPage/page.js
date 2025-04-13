import Link from 'next/link'

export default function Page() {
    return (
        <div>
            <h1>What would you like to edit?</h1>
            <div className="flex items-center justify-center my-20">
                <Link href="/EditResources" className="w-full mx-5">
                    <button className="hover:bg-blue-500 py-4 w-full rounded-md">
                        Edit Resources
                    </button>
                </Link>
                <Link href="/EditCategories" className="w-full mx-5">
                    <button className="hover:bg-blue-500 py-4 w-full rounded-md">
                        Edit Guide Categories
                    </button>
                </Link>
                <Link href="/EditGuides" className="w-full mx-5">
                    <button className="hover:bg-blue-500 py-4 w-full rounded-md">
                        Edit Guides
                    </button>
                </Link>
            </div>
        </div>
    );
}



