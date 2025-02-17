import React, { FormEventHandler } from "react";
import { IFormData } from "../utils/interfaces";

const Form = ({ data, setData, setShowData }: {
    data: IFormData;
    setData: React.Dispatch<React.SetStateAction<IFormData>>;
    setShowData: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'age') {
            setData({
                ...data,
                [e.target.name]: parseInt(e.target.value)
            });
            return;
        }
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const status = Object.values(data).every((value) => {
            return typeof value === 'string' ? value.trim() !== '' : value !== 0;
        })
        if (status) {
            setShowData(true);
        } else {
            alert('Please fill in all the fields correctly!');
        }
    }

    return (
        <form className="w-full items-center p-4 bg-[#282828] flex gap-2 flex-col max-w-[512px] h-[80vh]  py-8 rounded-lg overflow-y-auto" onSubmit={handleSubmit} method="POST">
            <div className="w-full flex flex-col gap-1">
                <label className="cursor-pointer text-sm text-slate-200" htmlFor="firstName">First Name</label>
                <input type="text" className="p-2 bg-[#181818] text-white rounded-lg focus:outline-0 w-full" placeholder="Name" id="firstName" name="firstName" aria-label="Name" value={data.firstName} onChange={handleChange} required />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="cursor-pointer text-sm text-slate-200" htmlFor="lastName">Last Name</label>
                <input type="text" className="p-2 bg-[#181818] text-white rounded-lg focus:outline-0 w-full" placeholder="Last Name" id="lastName" name="lastName" aria-label="Last Name" value={data.lastName} onChange={handleChange} required />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="cursor-pointer text-sm text-slate-200" htmlFor="age">Age</label>
                <input type="number" className="p-2 bg-[#181818] text-white rounded-lg focus:outline-0 w-full" placeholder="Age" id="age" name="age" aria-label="Age" value={data.age} onChange={handleChange} required />
            </div>
            <div className="w-full flex items-center my-2 gap-8">
                <label className="text-slate-200">Gender</label>
                <div className="flex gap-4">
                    <label className="cursor-pointer flex items-center gap-2 text-slate-200">
                        <input type="radio" className="accent-[#ff9800]" name="gender" value="male" checked={data.gender === "male"} onChange={handleChange} required />
                        Male
                    </label>
                    <label className="cursor-pointer flex items-center gap-2 text-slate-200">
                        <input type="radio" className="accent-[#ff9800]" name="gender" value="female" checked={data.gender === "female"} onChange={handleChange} required />
                        Female
                    </label>
                </div>
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="cursor-pointer text-sm text-slate-200" htmlFor="skills">Skillset</label>
                <select className="p-3 bg-[#181818] text-white rounded-lg focus:outline-0 w-full" id="skills" name="skills" aria-label="Skillset" value={data.skills} onChange={handleChange} required>
                    <option value="">Select an option</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="FullStack">FullStack</option>
                </select>
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="cursor-pointer text-sm text-slate-200" htmlFor="email">Email</label>
                <input type="email" className="p-2 bg-[#181818] text-white rounded-lg focus:outline-0 w-full" placeholder="Email" id="email" name="email" aria-label="Email" value={data.email} onChange={handleChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="cursor-pointer text-sm text-slate-200" htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" className="p-2 bg-[#181818] text-white rounded-lg focus:outline-0 w-full" placeholder="Phone Number" id="phoneNumber" name="phoneNumber" aria-label="Phone Number" value={data.phoneNumber} onChange={handleChange} required pattern="[0-9]{10}" />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="cursor-pointer text-sm text-slate-200" htmlFor="address">Address</label>
                <textarea className="p-2 bg-[#181818] text-white rounded-lg focus:outline-0 w-full" placeholder="Address" id="address" name="address" aria-label="Address" value={data.address} onChange={handleChange} required />
            </div>

            <button type="submit" className="p-2 mt-4 bg-blue-600 hover:bg-blue-500 cursor-pointer rounded-lg focus:outline-0 w-full">Submit</button>
        </form>
    );
};

export default Form;


/*
Skills (Select Dropdown)
Email (Text Input)
Phone Number (Number Input)
Address (TextArea)
*/