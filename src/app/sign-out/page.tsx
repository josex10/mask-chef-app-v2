'use client'

import { useClerk } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const SignOutPage = async() => {
    const { signOut } = useClerk();
    await signOut();
    redirect('/');
}

export default SignOutPage