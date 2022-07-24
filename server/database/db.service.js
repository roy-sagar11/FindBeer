const NoSQL = require('nosql');
const { v4: uuid } = require('uuid');
const commentsCollection = NoSQL.load('./database/comments.nosql');
const requestLogCollection = NoSQL.load('./database/log.nosql');

class DbService {
    static updateReview(req, res, next) {
        const beerId = +req.params.id;
        const { comment, rating } = req.body;
        const user = req.headers['x-user'];
        commentsCollection.find().where('beerId', beerId).where('user', user).first().callback((error, findRes) => {
            if (error) {
                next(error);
                return;
            }
            if (findRes) {
                commentsCollection.update(
                    {
                        ...findRes,
                        comment,
                        rating,
                        updatedAt: new Date().getTime(),
                    }
                )
                .where('beerId', beerId)
                .where('user', user)
                .callback((error) => {
                    if (error) {
                        next(error);
                        return
                    }
                    res.status(200).send({ ...findRes, comment, rating });
                })
                return
            }
            // No comment found for this user and beer. creating new
            const newReview = {
                id: uuid(),
                user,
                beerId,
                comment,
                rating,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
            }
            commentsCollection.insert(newReview).callback((error) => {
                if (error) {
                    next(error);
                    return;
                }
                res.status(201).send(newReview);
            })

        })
    }

    static getReviews(req, res, next) {
        commentsCollection.find().sort('updatedAt', true).callback((error, result) => {
            if(error){
                next(error);
                return;
            }
            // converting into hashmap for easier finding in frontend
            let formattedResult = {};
            result.map((r) => {
                if(formattedResult[r.beerId]){
                    formattedResult[r.beerId].push(r);
                }else{
                    formattedResult[r.beerId] = [r];
                }
            })
            res.status(200).send(formattedResult);
        })
    }

    static addRequestLog(req) {
        requestLogCollection.insert({
            id: uuid(),
            path: req.url,
            method: req.method,
            user: req.headers['x-user'],
            time: new Date().toISOString(),
        })
    }
}

exports.DbService = DbService;