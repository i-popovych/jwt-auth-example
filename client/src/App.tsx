import React, { useEffect, useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, logout } from "./store/slices/user/actions";
import { AppDispatch, RootState } from "./store";
import { IUser } from "./models/user.model";
import { userService } from "./api/models/services/UserService";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, message } = useSelector((state: RootState) => state.user);
  const [users, setUsers] = useState<null | IUser[]>(null)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setUsers(null)
    dispatch(logout());
  };

  const handleFetchUsers = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setUsers(null)
    setIsFetching(true)
    try {
      const res = await userService.fetchUsers();
      setUsers(res.data)
    } catch (e) {
      alert(e)
    } finally {
      setIsFetching(false)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div>
        user: {user ? user.email : "no user"}
        <br/>
        {user
          ? user.isActivated
            ? "email was verified"
            : "email was not verified"
          : ""}
      </div>

      {user ? <button onClick={handleLogout}>Logout</button> : <AuthForm />}
      <button onClick={handleFetchUsers}>Fetch users</button>
      {users && users.map(i => <div key={i.email}>{i.email}</div>)}
      {isFetching && <div>Fetching of users...</div>}
    </div>
  );
}

export default App;
