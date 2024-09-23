const axios = require('axios')
const { MongoClient } = require('mongodb');
const UtilsV3 = require('../sperant/sperantV3.utils');


const MongoService = require('./mongo.base')


class MongoV1 extends MongoService {

    analytics = async() => {

        const uri = process.env.MONGODB_URI_PROD;
        const client = new MongoClient(uri);

        try {
            await client.connect();
            let response = await this.fetchData(client);

            return response;

        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    };

    fetchData = async(client) => {
        //databasesList = await client.db().admin().listDatabases();

        let results = await client.db().collection('analytics').aggregate([
            { $group: { _id: { type: "$type", day: { $dayOfMonth: "$createdAt" } }, "date": { "$first": "$createdAt" }, count: { $count: {} } } }
        ]).toArray();

        /*let results = await client.db().collection('analytics').aggregate([
          {$group:{_id:{type:"$type", day:{ date : "$createdAt" }}, count:{ $count:{} } } }
        ]).toArray();*/

        /*let results = await client.db().collection('analytics').aggregate([
          {
              '$project': {
                  newFieldName: {'$dateToString': {format: '%Y-%m-%d', date: '$createdAt'}}
              }
          },
          {$group:{_id:{type:"$type", date: "$newFieldName"}, count:{ $count:{} } } }
        ]).toArray();*/



        /*let resultLoginAprobado = await client.db().collection('analytics').countDocuments({type: "login_aprobado"});
        let resultRegistroIniciado = await client.db().collection('analytics').countDocuments({type: "registros_iniciados"});
        let resultRegistroAprobado = await client.db().collection('analytics').countDocuments({type: "registros_aprobados"});*/

        return {
            data: results
        }

    };

}

module.exports = MongoV1