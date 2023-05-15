import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../Actions/user/index";
import { HeaderDiv } from "./style";
import logo from '../../assets/images/logo.png'





export function Header() {

    const userloged = useSelector((state: any) => state.user.username);


    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUserData()); // <-- clear user data from Redux store
        sessionStorage.removeItem("userData"); // <-- clear session storage
        window.location.href = "/"; // <-- redirect to login page
    };


    return (

        <HeaderDiv>
            <div className="info">
                <img src={logo} alt="" />
                <h2>Hello, {userloged} </h2>
            </div>
            <div className="logout">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </HeaderDiv>
    )
};
