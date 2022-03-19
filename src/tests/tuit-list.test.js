import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, deleteTuit, findAllTuits, findTuitById} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {createUser, deleteUsersByUsername, findAllUsers} from "../services/users-service";

//jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];
const user={username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"};
const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

const MOCKED_TUITS_1 =
 [ {tuit:"alice's tuit", postedBy:"lll",postedOn:Date.now(),_id:"1",stats:{}},{tuit:" tuit", postedBy:"lll",postedOn:Date.now(),_id:"2",stats:{}},{tuit:" tuit", postedBy:"lll",postedOn:Date.now(),_id:"3",stats:{}}]

;

test('tuit list renders static tuit array', () => {

  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS_1}/>
      </HashRouter>);
  const linkElement = screen.getByText(/alice/i);
  expect(linkElement).toBeInTheDocument();
});


test('tuit list renders async', async () => {


    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    const  tuit = {tuit:"bob's tuit"};

    let responseTuit;

    // setup before running test

        // clean up before the test making sure the user doesn't already exist
        await deleteUsersByUsername(adam.username);
        const newUser = await createUser(adam);
        responseTuit = await createTuit(newUser._id, tuit);



    // clean up after ourselves

        // remove any data we inserted




        // insert the tuit in the database


        // verify new user matches the parameter user


        // retrieve tuits from the database by its primary key
        const findTuit = await findTuitById(responseTuit._id);

        const allTuits =  await findAllTuits();

    render(
        <HashRouter>
            <Tuits tuits={allTuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/bob's tuit/i);
    expect(linkElement).toBeInTheDocument();
    deleteUsersByUsername(adam.username);
    await deleteTuit(findTuit._id);
        // verify retrieved tuits matches parameter user



})

test('tuit list renders mocked', async () => {

    const mock = jest.spyOn(axios, 'get');
    axios.get.mockImplementation(() =>
                                     Promise.resolve({ data: {tuits: MOCKED_TUITS_1} }));

    const response = await findAllTuits();
    const tuits = response.tuits;
    // console.log(response)

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/alice's tuit/i);
    expect(linkElement).toBeInTheDocument();

mock.mockRestore();
});
