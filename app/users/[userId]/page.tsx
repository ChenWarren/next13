import getUser from "@/lib/getUser"
import getUserPosts from "@/lib/getUserPosts"
import { User, Post } from "@/types"
import { Suspense } from "react"

type Params = {
    params: {
        userId: string
    }
}

type Props = {
    promise: Promise<Post[]>
}

export default async function UserDetail({params: { userId }}: Params) {
    const userData: Promise<User> = getUser(userId)
    const userPostsData: Promise<Post[]> = getUserPosts(userId)
    const user = await userData

    return (
        <>
            <h1>{user.name}</h1>
            <Suspense fallback={<p>Loading...</p>}>
                {/* @ts-expect-error Async Server Component */}
                <UserPosts promise={userPostsData}/>
            </Suspense>
        </>
    )
}

const UserPosts = async ({promise}: Props) => {
    const posts = await promise

    const constent = posts.map((post) => {
        return (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        )
    })

    return constent
}