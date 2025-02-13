import Link from 'next/link'
export default function Page() {
return (
    <div>
        <h1>Sign in</h1>
        <Link href="/EditSelectPage" className="w-1/5">
                <button className="hover:bg-blue-500 py-4 w-1/3 flex-1 rounded">
                    Temp
                </button>
        </Link>
    </div>
    
);
}