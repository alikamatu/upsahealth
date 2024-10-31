import PageNav from "./conponent/PageNav";
import PageRead from "./conponent/PageRead";
import TopNav from "./conponent/TopNav";

export default function Dashboard() {
  return (
    <div>
      <TopNav />
      <PageNav />
      <PageRead />
    </div>
  )
}