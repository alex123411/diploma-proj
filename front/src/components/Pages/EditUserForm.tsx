import React, { useState, ChangeEvent, FormEvent } from "react";

interface EditableUserData {
    degree: string;
    englishLevel: string;
    name: string;
    skills: string;
    experience: string;
    location: string;
    desiredSalary: string;
}

const initialEditableUserData: EditableUserData = {
    degree: "",
    englishLevel: "",
    name: "",
    skills: "",
    experience: "",
    location: "",
    desiredSalary: "",
};

const EditUserForm: React.FC = () => {
    const [editableUserData, setEditableUserData] = useState<EditableUserData>(
        initialEditableUserData
    );

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditableUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Here you can perform any necessary actions with the updated data
        console.log(editableUserData);
        // Reset the form after submission
        setEditableUserData(initialEditableUserData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Ступінь освіти:
                <input
                    type="text"
                    name="degree"
                    value={editableUserData.degree}
                    onChange={handleChange}
                />
            </label>

            <label>
                Рівень англійської мови:
                <input
                    type="text"
                    name="englishLevel"
                    value={editableUserData.englishLevel}
                    onChange={handleChange}
                />
            </label>

            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={editableUserData.name}
                    onChange={handleChange}
                />
            </label>

            <label>
                Skills:
                <textarea
                    name="skills"
                    value={editableUserData.skills}
                    onChange={handleChange}
                />
            </label>

            <label>
                Experience:
                <textarea
                    name="experience"
                    value={editableUserData.experience}
                    onChange={handleChange}
                />
            </label>

            <label>
                Location:
                <input
                    type="text"
                    name="location"
                    value={editableUserData.location}
                    onChange={handleChange}
                />
            </label>

            <label>
                Desired Salary:
                <input
                    type="text"
                    name="desiredSalary"
                    value={editableUserData.desiredSalary}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditUserForm;
