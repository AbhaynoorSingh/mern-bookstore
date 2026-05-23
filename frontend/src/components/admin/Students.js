import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';

function Students() {
    const [students, setStudents] = useState([]);

    const fetchingData = async () => {
        try {
            const response = await fetch("http://localhost:8080/allstudents", {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);

           
            if (result && Array.isArray(result.success)) {
                setStudents(result.success);
            } else {
                console.error('Expected an array inside the `success` key but got:', result);
                setStudents([]); 
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setStudents([]);
        }
    };

    useEffect(() => {
        fetchingData();
    }, [students]);

    return (
        <div style={{backgroundColor:"aliceblue",height:"100vh",width:"100%"}}>
            <AdminNavbar />
            <h1 style={{ textAlign: "center", margin: "20px" }}>Students</h1>

            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th>student-id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                   {students.map((data,index)=>(
                    <tr key={index}>

                    <td>{data._id} </td>
                    <td>{data.name} </td>
                    <td>{data.age} </td>
                    <td>{data.phoneno} </td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>
    );
}

export default Students;
