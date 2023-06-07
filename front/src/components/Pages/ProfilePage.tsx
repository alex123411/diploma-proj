import { ChangeEvent, ChangeEventHandler, FC, PropsWithChildren, useEffect, useState } from "react"
import ContentBox from "../UI/ContentBox";
import UserService, { emptyUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { allCitiesInUkraine } from "../../utils/locations";
import { User } from "../../models/userModel";


interface Props extends PropsWithChildren {
    className?: string;
}

const ProfilePage: FC<Props> = ({ children, className = "", ...props }) => {
    const [userData, setUserData] = useState<User>(emptyUser);
    const [skillToAdd, setSkillToAdd] = useState<string>('');

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

    const handleRemoveSkill = (index: number) => {
        setUserData((prevState) => {
            const updatedSkills = [...prevState.skills];
            updatedSkills.splice(index, 1); // Remove the skill at the specified index
            return {
                ...prevState,
                skills: updatedSkills
            };
        });
    };

    const handleSkillChange = (index: number, value: string) => {
        setUserData((prevState) => {
            const updatedSkills = [...prevState.skills];
            updatedSkills[index] = value; // Update the skill at the specified index
            return {
                ...prevState,
                skills: updatedSkills
            };
        });
    };

    const handleAddSkill = () => {
        setUserData((prevState) => {
            const updatedSkills = [...prevState.skills ?? [], skillToAdd];
            return {
                ...prevState,
                skills: updatedSkills

            };
        });
        setSkillToAdd('')
    };

    const handleAddSkillChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >) => {
        const { name, value } = e.target;
        setSkillToAdd(value);
    }

    if (userData.id < 1) return <h2>Please log in</h2>

    return (

        <div {...props} className={"w-100" + className}>
            <div className="d-flex justify-content-between mt-2 mb-2">
                <h1>
                    {`Hello, ${userData.name} !`}
                </h1>
                <div className='d-flex'>
                    <button className="btn btn-primary button-edit" onClick={handleSaveEdit}>Save Edit</button>
                    <button className="btn btn-warning" onClick={handleLogout}>Log out</button>
                </div>
            </div>
            <ContentBox>
                <h2 className="mb-3">General Information About You</h2>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Highest Degree</label>
                    <select
                        name="degree"
                        value={userData.degree ?? "0"}
                        onChange={handleUserEdit}
                        className="form-select"
                        id="inputGroupSelect01"
                    >
                        <option value="0">Choose...</option>
                        <option value="1">High School</option>
                        <option value="2">College</option>
                        <option value="3">Bachelors</option>
                        <option value="4">Masters</option>
                        <option value="5">Phd</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect02">Experience</label>
                    <select
                        name="experience"
                        value={userData.experience ?? "0"}
                        onChange={handleUserEdit}
                        className="form-select"
                        id="inputGroupSelect02"
                    >
                        <option value="0">Choose...</option>
                        <option value="1">0-2</option>
                        <option value="2">2-5</option>
                        <option value="3">5-10</option>
                        <option value="4">10+</option>
                    </select>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect03">Desired Salary $</label>
                    <select
                        name="desiredSalary"
                        value={userData.desiredSalary ?? "0"}
                        onChange={handleUserEdit}
                        className="form-select"
                        id="inputGroupSelect03"
                    >
                        <option value="0">Choose...</option>
                        <option value="1">100-500</option>
                        <option value="2">500-1000</option>
                        <option value="3">1000-2000</option>
                        <option value="4">3000-5000</option>
                        <option value="5">5000-10000</option>
                        <option value="6">10000+</option>
                    </select>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect04">English Level</label>
                    <select
                        name="englishLevel"
                        value={userData.englishLevel ?? "0"}
                        onChange={handleUserEdit}
                        className="form-select"
                        id="inputGroupSelect04"
                    >
                        <option value="0">Choose...</option>
                        <option value="1">No English</option>
                        <option value="2">Beginner/Elementary</option>
                        <option value="3">Pre-Intermediate</option>
                        <option value="4">Intermediate</option>
                        <option value="5">Upper-Intermediate</option>
                        <option value="6">Advanced/Fluent</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect05">Current Location</label>
                    <select
                        name="location"
                        value={userData.location ?? "0"}
                        onChange={handleUserEdit}
                        className="form-select"
                        id="inputGroupSelect05"
                    >
                        <option value="0">Choose...</option>
                        <option value="1">Not in Ukraine</option>
                        {allCitiesInUkraine.map((city, i) =>
                            <option value={i + 2} key={city}>{city}</option>
                        )}
                    </select>
                </div>
            </ContentBox>
            <ContentBox>
                <h2 className="mb-3">Add Your Skills</h2>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control input-skill-add"
                        value={skillToAdd}
                        onChange={handleAddSkillChange}
                    />
                    <button
                        className="btn btn-success skill-btn-add"
                        onClick={handleAddSkill}
                    >
                        Add
                    </button>
                </div>
                <div className="skills-grid">
                    {userData.skills?.map((skill, index) => (
                        <div key={index} className="input-group mb-3 justify-content-center">
                            <input
                                type="text"
                                className="form-control input-skill-remove"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                            />
                            <button
                                className="btn btn-danger skill-btn-remove"
                                onClick={() => handleRemoveSkill(index)}
                            >
                                -
                            </button>
                        </div>

                    ))}
                </div>
            </ContentBox>
        </div>
    )
}

export default ProfilePage