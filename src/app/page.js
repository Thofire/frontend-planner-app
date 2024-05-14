import SigninButton from "./components/googleAuth/SigninButton"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="h1">Personal Planner</h1>
      <div className="titleDiv">Please Log In to Access Your Personal Planner 
      <b><SigninButton></SigninButton></b></div>
      
    </main>
  )
}