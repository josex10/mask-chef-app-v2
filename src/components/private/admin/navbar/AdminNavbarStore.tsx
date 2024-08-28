"use client"
import useStoreAuth from "@/store/private/admin/auth";
import IAuthProfile from "@/utils/interfaces/private/admin/profile";

type TAmindNavbarStore = {
    cookie: IAuthProfile;
}
const AdminNavbarStore = ({cookie}: TAmindNavbarStore) => {
    const login = useStoreAuth((state)=>state.login);
    login(cookie);

    return (<></>);
}

export default AdminNavbarStore