import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
//import {findAllUsers} from "../services/users-service";
import axios from "axios";
import {createUser,deleteUsersByUsername,findAllUsers} from "./services";

/**
 * List of mock user.
 * @type {[{password: string, _id: string, email: string, username: string}, {password: string, _id: string, email: string, username: string}]}
 */
const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

/**
 * The below test tests if the above users get rendered.
 */
test('user list renders static user array', () => {

  render(
      <HashRouter>
        <UserList users={MOCKED_USERS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

test('user list renders async', async () => {
    const MOCKED_USERS_1 =
        {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com'};
    /**
     * Mocking create users
     * @type {unknown}
     */
    const userRes = await createUser(MOCKED_USERS_1);

    /**
     * The below returns the async users
     * @type {unknown}
     */
  const users = await findAllUsers();
  render(
      <HashRouter>
        <UserList users={users}/>
      </HashRouter>);

    /**
     * to verify if the test screen renders the user.
     * @type {*}
     */
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();

  await deleteUsersByUsername(userRes.username);
})

/**
 * Mocking api
 */
test('user list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');
  axios.get.mockImplementation(() =>
                                   Promise.resolve({ data: {users: MOCKED_USERS} }));

  const response = await findAllUsers();
  const users = response.users;
 // console.log(response)

  render(
      <HashRouter>
        <UserList users={users}/>
      </HashRouter>);

  const user = screen.getByText(/sarah_conor/i);
  expect(user).toBeInTheDocument();
    mock.mockRestore();  // restore original implementation
});