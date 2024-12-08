import PageNav from "./conponent/PageNav";
import PageRead from "./conponent/PageRead";
import TopNav from "./conponent/TopNav";

export default function Dashboard() {
  
  return (
    <div className="p-8 bg-wallpaper text-white bg-no-repeat bg-fixed">
      <PageNav />
      <PageRead />
    </div>
  )
}