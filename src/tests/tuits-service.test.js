import {
    createUser,
    deleteUser,
    deleteUsersByUsername, findAllUsers,
    findUserById
} from "../services/users-service"
import {createTuit, deleteTuit, findAllTuits, findTuitById} from "../services/tuits-service"
import axios from "axios";

describe('can create tuit with REST API' ,() => {
    const createUSer = {
        username: 'priyesh123',
        password: 'priyesh123',
        email: 'priyesh@gmail.com'
    };
   const  tuit = {tuit:"1st tuit"};
     let responseUser;
   let responseTuit;
    beforeAll(async () => {
        responseUser = await createUser(createUSer);
    })

    afterAll(async () => {

        await deleteUser(responseUser._id);
      // return deleteTuit(responseTuit._id);
        const deleteTuit1 = await deleteTuit(responseTuit._id);
        expect(deleteTuit1.deletedCount).toBeGreaterThanOrEqual(1);



    })

    test('can insert new users with REST API',async  () => {
         responseTuit = await createTuit(responseUser._id,tuit);
        expect(responseTuit.tuit).toEqual(tuit.tuit);

    })



});

describe('can delete tuit wtih REST API', () => {
    const createUSer = {
        username: 'priyesh123',
        password: 'priyesh123',
        email: 'priyesh@gmail.com'
    };
    const  tuit = {tuit:"1st tuit"};
    let responseUser;
    let responseTuit;
    beforeAll(async () => {
        responseUser = await createUser(createUSer);
        responseTuit = await createTuit(responseUser._id,tuit);
    })

    afterAll(async () => {

        await deleteUser(responseUser._id);
        //await  deleteTuit(responseTuit._id);

    })

    test('can insert new users with REST API',async  () => {

        const deleteTuit1 = await deleteTuit(responseTuit._id);
        expect(deleteTuit1.deletedCount).toBeGreaterThanOrEqual(1);
    })

});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // sample user we want to retrieve
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    let findTuit;
    const  tuit = {tuit:"1st tuit"};

    // setup before running test
    beforeAll(() => {
        // clean up before the test making sure the user doesn't already exist
        return deleteUsersByUsername(adam.username)
    });

    // clean up after ourselves
    afterAll(async () => {
        // remove any data we inserted
         await deleteUsersByUsername(adam.username);
         await deleteTuit(findTuit._id);
    });

    test('can retrieve user from REST API by primary key', async () => {
        // insert the user in the database
        const newUser = await createUser(adam);
        const responseTuit = await createTuit(newUser._id,tuit);

        // verify new user matches the parameter user


        // retrieve the user from the database by its primary key
         findTuit = await findTuitById(responseTuit._id);

        // verify retrieved user matches parameter user
        expect(findTuit.tuit).toEqual("1st tuit");

    });

});

describe('can retrieve all tuits with REST API', () => {

    // sample users we'll insert to then retrieve
    const tuits1 = [
        "1st tuit new 20223", "2nd tuit2 new 20223", "3rd tuit new 20223"
    ];
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };
    let tuitsResponse=[];
    let user;
    let tuitsWeInserted=[];
    // setup data before test
    beforeAll(async () => {
        // insert several known users
         user = await createUser(adam);

         tuitsResponse= tuits1.map( async(tuit) =>
                                       await createTuit(user._id, {tuit:tuit}));

    });



        // clean up after ourselves
        afterAll(async () => {
            await deleteTuit(tuitsWeInserted[0]._id);
            await deleteTuit(tuitsWeInserted[1]._id);
            await deleteTuit(tuitsWeInserted[2]._id);
      /*     await tuitsWeInserted.map( async(insertedTuit)  => { await deleteTuit((insertedTuit._id))});*/
            await deleteUsersByUsername(adam.username);

           /* tuitsResponse.forEach((response)=> response.then( (res) => {(
                console.log((res.data)))}))*/
            // delete the users we inserted



                //(tuitsResponse[0].then((response) => console.log(response)));
         /*  tuitsResponse.forEach((response)=> response.then( (res) => {(
               console.log((res.tuit)))}))*/

            /* tuitsWeInserted.forEach(user => {
           const username = usernames.find(username => username === user.username);
           expect(user.username).toEqual(username);
           expect(user.password).toEqual(`${username}123`);
           expect(user.email).toEqual(`${username}@stooges.com`);
         });*/

            // console.log(tuitsResponse.map(async res => await deleteTuit(res._id)));

        });

        test('can retrieve all tuits from REST API', async () => {


            // retrieve all the users
            const allTuits = await findAllTuits();
           // console.log(users);

            // there should be a minimum number of users
             expect(allTuits.length).toBeGreaterThanOrEqual(tuits1.length);

             // let's check each user we inserted
              tuitsWeInserted = allTuits.filter(
               tuit => tuits1.indexOf(tuit.tuit) >= 0);


            tuitsWeInserted.forEach(async (insertedTuit) => {const tuitTemp = tuits1.find(tuits => tuits===insertedTuit.tuit);
            expect(insertedTuit.tuit).toEqual(tuitTemp);

               })

           //  console.log( allTuits.filter(res => res.tuit=tuits1[1].tuit))
             // compare the actual users in database with the ones we sent
           /* tuitsWeInserted.forEach(user => {
               const username = usernames.find(username => username === user.username);
               expect(user.username).toEqual(username);
               expect(user.password).toEqual(`${username}123`);
               expect(user.email).toEqual(`${username}@stooges.com`);
             });*/
        });
    });