'use client';

import { useClerk } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const SignOutPage = () => {
    const { signOut } = useClerk();
    signOut();
    redirect('/');
}

export default SignOutPage