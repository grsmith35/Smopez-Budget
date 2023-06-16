const { gql } = require('apollo-server');
const { dateScalar } = require('../models/ScalarTypes')

const typeDefs = gql`
    scalar Date

    type Account {
        _id: ID
        name: String!
        email: String!
        password: String!
        balance: Int
        pays: [Pay]   
        bills: [Bill]
        budgets: [Budget]
    }

    type Pay {
        _id: ID
        name: String!
        consistency: String!
        source: String!
        amount: Int!
    }

    type Bill {
        _id: ID
        name: String!
        date: String!
        amount: Int!
        source: String!
        automated: Boolean!
    }

    type Budget {
        _id: ID
        name: String!,
        timePeriod: String!,
        amount: Int!
        charges: [Charge]
    }

    type Charge {
        _id: ID
        name: String!,
        budget: String!,
        amount: Float!
        date: Date!
    }

    type Query {
        getAccounts: [Account]
        getAccount(_id: ID!): Account
        getBudget(_id: ID!): Budget
        #getPays(_id: ID!): Pay
    }

    type Auth {
        token: ID!
        account: Account
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addAccount(name: String!, email: String!, password: String!): Account
        editAccount(_id: ID!, name: String, email: String): Account
        editAccountBalance(_id: ID!, balance: Int!): Account
        deleteAccount(_id: ID!): Account
        addPay(_id: ID!, name: String!, consistency: String!, source: String!, amount: Int!): Pay
        editPay(_id: ID!, name: String, source: String, consistency: String, amount: Int ): Pay
        deletePay(_id: ID!, accountId: ID!): Pay
        addBill(_id: ID!, name: String!, source: String!, date: String!, amount: Int!, automated: Boolean!): Bill
        editBill(_id: ID!, name: String, source: String, date: String, amount: Int, automated: Boolean): Bill
        deleteBill(_id: ID!, accountId: ID!): Bill
        addBudget(_id: ID!, name: String!, timePeriod: String!, amount: Int!): Budget
        editBudget(_id: ID!, name: String, timePeriod: String, amount: Int): Budget
        deleteBudget(_id: ID!, accountId: ID!): Budget
        addCharge(_id: ID!, name: String!, amount: Float!, date: Date!, budget: String!): Charge
        editCharge(_id: ID!, name: String, date: String, amount: Float, budget: String): Charge
        deleteCharge(_id: ID!, accountId: ID!): Charge
    }
   
`;

module.exports = typeDefs;