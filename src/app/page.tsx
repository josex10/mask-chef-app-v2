import { redirect } from "next/navigation";

const MainPage = async () => {
  redirect("/sign-in");
};

export default MainPage;
