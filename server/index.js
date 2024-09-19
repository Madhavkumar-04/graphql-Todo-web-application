const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");

const array = [
    {
        id: "1",
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        phone: "555-1234",
        website: "johndoe.com"
    },
    {
        id: "2",
        name: "Jane Smith",
        username: "janesmith",
        email: "jane@example.com",
        phone: "555-5678",
        website: "janesmith.net"
    },
    {
        id: "3",
        name: "Alice Johnson",
        username: "alicej",
        email: "alice@example.com",
        phone: "555-8765",
        website: "alicejohnson.org"
    },
    {
        id: "4",
        name: "Bob Williams",
        username: "bobw",
        email: "bob@example.com",
        phone: "555-4321",
        website: "bobwilliams.info"
    },
    {
        id: "5",
        name: "Charlie Brown",
        username: "charlieb",
        email: "charlie@example.com",
        phone: "555-9876",
        website: "charliebrown.io"
    }
];
async function start() {
    const app = express();

    const typeDefs = `
        type User{
            id:ID,
            name:String!,
            username :String!,
            email:String!,
            phone:String!,
            website : String!,
        }
        type Todo {
            id: ID
            title: String!
            completed: Boolean
            user :User
        }

        type Query {
            getTodos: [Todo],
            getAllUser:[User],
            getUserById(id:ID!) : User
        }
    `;

    const resolvers = {
        Todo: {
            user: (todo) => array.find((user) => user.id == todo.id)
        },
        Query: {
            getTodos: () => [
                { id: 1, title: "Learn GraphQL", completed: false },
                { id: 2, title: "Write code", completed: true }
            ],
            getAllUser: () => [
                {
                    id: "1",
                    name: "John Doe",
                    username: "johndoe",
                    email: "john@example.com",
                    phone: "555-1234",
                    website: "johndoe.com"
                },
                {
                    id: "2",
                    name: "Jane Smith",
                    username: "janesmith",
                    email: "jane@example.com",
                    phone: "555-5678",
                    website: "janesmith.net"
                },
                {
                    id: "3",
                    name: "Alice Johnson",
                    username: "alicej",
                    email: "alice@example.com",
                    phone: "555-8765",
                    website: "alicejohnson.org"
                },
                {
                    id: "4",
                    name: "Bob Williams",
                    username: "bobw",
                    email: "bob@example.com",
                    phone: "555-4321",
                    website: "bobwilliams.info"
                },
                {
                    id: "5",
                    name: "Charlie Brown",
                    username: "charlieb",
                    email: "charlie@example.com",
                    phone: "555-9876",
                    website: "charliebrown.io"
                }
            ],
            getUserById: (id) => array.find((user) => user.id == todo.id),
        },
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();  // Ensure the ApolloServer is started

    app.use(bodyParser.json());
    app.use(cors());

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server started at port 8000"));
}

start();
