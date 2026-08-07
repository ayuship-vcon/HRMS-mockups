import { useMsal } from "@azure/msal-react";
// import { Button } from './components';

import Button from '@mui/material/Button';
import { Upload } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from '../../rtk/reducer/userSlice'
import { useState } from "react";
import { useCreateUserMutation, useGetUserByIdQuery, useGetUsersQuery } from "../../rtk/api/userApi";
import BasicCard from "./Component/Card";
import { Grid } from "@mui/material";

function Home() {

    const { instance } = useMsal();
    const [text, setText] = useState('')
    const todo = useSelector(state => state.user.todos)
    console.log(todo, 'todotodotodo')
    const dispatch = useDispatch()
    const handleLogin = async () => {
        try {
            await instance.loginPopup({
                scopes: ["user.read"],
            });
        } catch (error) {
            console.error(error);
        }
    }
    const userId = 1;

    const {
        data,
        isLoading: isGetUserLoading,
    } = useGetUserByIdQuery(userId, {
        skip: !userId,
    });

    const {
        data: userData,
        isLoading: isUsersLoading,
        refetch,
    } = useGetUsersQuery();
    //   pollingInterval: 5000, API automatically runs every: 5 seconds 
    const [
        createUser,
        {
            isLoading: isCreateUserLoading,
            error: createUserError,
            isSuccess: isCreateUserSuccess,
        },
    ] = useCreateUserMutation();

    console.log(userData, 'userDatauserData');

    if (isGetUserLoading || isCreateUserLoading || isUsersLoading) {
        return <h2>Loading...</h2>;
    }
    console.log(data, 'datadatadata');

    console.log(text, 'textttt')
    const handleFiles = (file) => {
        console.log(file, 'loggggggg')
    }
    const handleSubmit = async () => {
        if (text) {
            dispatch(addTodo({ id: Date.now(), text, completed: false }))
            setText('')
        } try {
            const payload = {
                firstName: "Ayushi",
                age: 24,
            };

            const response =
                await createUser(payload).unwrap();

            console.log(response);
        } catch (err) {
            console.log(err);
        }

    }
    const handleDelete = (item) => {
        dispatch(deleteTodo(item.id))
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to My App</h1>
                <div style={{ marginBottom: 15 }}>
                    <Button variant="contained" onClick={handleLogin} >Click Me</Button>
                </div>
                {/* <Button title='Continue with Microsoft' onPress={handleLogin} /> */}
                <Upload
                    maxSize={2 * 1024 * 1024} // 10MB
                    multiple={true}
                    onFilesChange={ handleFiles}
                />
                <div style={{ padding: 5, paddingBottom: 4 }}>

                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What needs to be done?"
                    />
                </div>
                <button onClick={handleSubmit}>Add todo</button>
                {todo.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <li
                            key={item.id}
                            onClick={() => dispatch(toggleTodo(item.id))}
                            style={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                                padding: '10px',
                                borderBottom: '1px solid #eee'
                            }}
                        >
                            {item.text}
                        </li>
                        <button onClick={() => handleDelete(item)}>delete</button>
                    </div>
                ))}

            </header>
            <Grid container spacing={3}>
                {userData.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item.id} sx={{ display: "flex" }}>
                        <BasicCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Home;
