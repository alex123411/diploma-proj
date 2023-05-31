import { ChangeEvent, ChangeEventHandler, FC, PropsWithChildren, useEffect, useState } from "react"
import ContentBox from "../UI/ContentBox";
import UserService, { User, emptyUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";


interface Props extends PropsWithChildren {
    className?: string;
}


const ProfilePage: FC<Props> = ({ children, className = "", ...props }) => {
    const [userData, setUserData] = useState<User>(emptyUser);
    const [isEditable, setisEditable] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!UserService.isLoggedIn()) navigate('/auth')
        else {
            const fetchUserData = async () => {
                const user: User = await UserService.getUserData()
                setUserData(user)
            }

            fetchUserData();
        }

    }, []);

    const handleLogout = () => {
        UserService.logout()
        navigate('/auth');
    }

    const handleSaveEdit = async () => {
        if (userData) UserService.update(userData)
            .then(user => {
                setUserData(user)
            })
            .catch(error => {
                console.error('Errpr while updateing a user ' + error)
            })
    }

    const handleUserEdit = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    if (userData.id < 1) return <h2>Please log in</h2>

    return (

        <div {...props} className={"w-100" + className}>
            <div className="d-flex justify-content-between mt-2 mb-2">
                <h1>
                    YOUR PROFILE: {userData.name}
                </h1>
                <div className='d-flex'>
                    <button className="btn btn-primary button-edit" onClick={handleSaveEdit}>Save Edit</button>
                    <button className="btn btn-warning" onClick={handleLogout}>Log out</button>
                </div>

            </div>
            <ContentBox>
                <h2>General Information</h2>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Highest Degree</label>
                    <select
                        name="degree"
                        value={userData.degree}
                        onChange={handleUserEdit}
                        className="form-select"
                        id="inputGroupSelect01"
                    >
                        <option selected>Choose...</option>
                        <option value="1">High School</option>
                        <option value="2">College</option>
                        <option value="3">Bachelors</option>
                        <option value="4">Masters</option>
                        <option value="5">Phd</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Expirience</label>
                    <select
                        name="experience"
                        value={userData.experience}
                        onChange={handleUserEdit}
                        className="form-select"
                        id="inputGroupSelect01"
                    >
                        <option selected>Choose...</option>
                        <option value="1">0-2</option>
                        <option value="2">2-5</option>
                        <option value="3">5-10</option>
                        <option value="4">10+</option>
                    </select>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="User Position">City</label>
                    <input
                        className="form-control"
                        type="text"
                        name="location"
                        value={userData.location}
                        onChange={handleUserEdit}
                        placeholder="City"
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="User Position">Desired Salary</label>
                    <input
                        className="form-control"
                        type="text"
                        name="desiredSalary"
                        value={userData.desiredSalary}
                        onChange={handleUserEdit}
                        placeholder="Input Salary you want"
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="User Position">English level: </label>
                    <input
                        className="form-control"
                        type="text"
                        name="englishLevel"
                        value={userData.englishLevel}
                        onChange={handleUserEdit}
                    />
                </div>
            </ContentBox>
            <ContentBox>
                <p>Your Skills:</p>
                <ul>
                    <li>SKILL 1</li>
                    <li>SKILL 2</li>
                    <li>SKILL 3</li>
                </ul>
            </ContentBox>
            <ContentBox>
                <p>Languages:</p>
                <ul>
                    <li>LANG 1</li>
                    <li>LANG 2</li>
                    <li>LANG 3</li>
                </ul>
            </ContentBox>
            <ContentBox>
                <p>Education:</p>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="School Name"
                        aria-label="School Name"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="dropdown mb-1">
                    <button className="btn btn-secondary dropdown-toggle dropdown-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        Degree
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        <li className="dropdown-item">High School</li>
                        <li className="dropdown-item">Bachelors</li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle dropdown-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        Major
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        <li className="dropdown-item">High School</li>
                        <li className="dropdown-item">Bachelors</li>
                    </ul>
                </div>
            </ContentBox>
        </div>
    )
}

export default ProfilePage