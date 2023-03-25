import type { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'
import { User } from '@/types'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Users',
}

export default async function UsersLayout() {
    const usersData: Promise<User[]> = getAllUsers()
    const users = await usersData

    const content = (
        <>
            <h2>
                <Link href={'/'}>Back to Home</Link>
            </h2>
            <section>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <Link href={`/users/${user.id}`}>{user.name}</Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )

    return content
}