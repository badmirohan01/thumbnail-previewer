import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex justify-center items-center max-w-screen'>
            <SignIn forceRedirectUrl='/dashbroad' />
        </div>
    )
}