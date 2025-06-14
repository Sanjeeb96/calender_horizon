import Header from "@/components/header/Header";
import MainView from "@/components/MainView";

export default function Home() {
  return (
    <div>
      <Header />
      <MainView eventsData={[]} />
    </div>
  );
}
