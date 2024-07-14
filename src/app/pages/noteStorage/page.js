import NewPostPage from '../../components/newPostPage'
import NewStoragePage from '../../components/noteStoragePage'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <NewStoragePage/>
    </main>
  )
}
