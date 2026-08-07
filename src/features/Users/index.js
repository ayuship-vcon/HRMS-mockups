import React from "react";
import { ReusableTable } from "../../components";

const columns = [
    { field: "name", headerName: "Name" },
    { field: "surname", headerName: "Surname" },
    { field: "height", headerName: "Height" },
    { field: "city", headerName: "City" },
    { field: "age", headerName: "Age" },
    {
        field: "status",
        headerName: "Status",
        render: (value) => (
            <span style={{ color: value === "Active" ? "green" : "red" }}>{value}</span>
        ),
    },
];
const data = [
    { name: "John", age: 30, surname: 'Doe', height: 5.2, city: "California", status: "Active" },
    { name: "Jane", surname: "Smith", age: 25, height: 5.2, city: "Miami", status: "Inactive" },
    { name: "Adrian", surname: "Jane", age: 23, height: 6.1, city: "Los Angeles", status: "Active" },
    { name: "Iulia", surname: "Clark", age: 54, height: 5.4, city: "London", status: "Active" },
    { name: "Bianca", surname: "Sium", age: 22, height: 5.9, city: "Florida", status: "Inactive" },
    { name: "John", age: 30, surname: 'Doe', height: 5.2, city: "California", status: "Active" },
    { name: "Jane", surname: "Smith", age: 25, height: 5.2, city: "Miami", status: "Inactive" },
    { name: "Adrian", surname: "Jane", age: 23, height: 6.1, city: "Los Angeles", status: "Active" },
    { name: "Iulia", surname: "Clark", age: 54, height: 5.4, city: "London", status: "Active" },
    { name: "Bianca", surname: "Sium", age: 22, height: 5.9, city: "Florida", status: "Inactive" },
];
const Users = () => {
    return (
        <div style={{margin: 25}}>
            <ReusableTable columns={columns} data={data} />
        </div>
    )
};
export default Users;