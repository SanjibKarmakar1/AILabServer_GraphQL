const express = require('express');
const bodyParser = require('body-parser');
// const graphqlHttp = require('express-graphql');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());



app.use(
    '/graphql',
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    }));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0tqny.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})



// https://www.youtube.com/watch?v=bgq7FRSPDpI&list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_&index=7
// http://localhost:3000/graphql

// query {
//     events {
//       creator {
//         email
//       }
//     }
//   }


// query {
//     events {
//       creator {
//         email,
//         createdEvents {
//           title
//           creator {
//             email
//           }
//         }
//       }
//     }
//   }

// mutation {
//     createEvent (eventInput: {title: "another event!", description:"asdasd", price: 999.99, date: "2020-08-16T06:18:16.179Z"}) {
//       title
      
//     }
    
//   }

// mutation {
//     bookEvent(eventId: "5f391903a7ebb925f831d8af") {
//       _id
//       createdAt
//       user {
//         email
//       }
//     }
//   }