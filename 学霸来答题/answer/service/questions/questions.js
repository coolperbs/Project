import ajax from '../../common/ajax/ajax';

var App = getApp();
var HOST = App.HOST;

var url = {
    list: HOST + 'api/answer_v1/activities',
    question: HOST + 'api/answer_v1/activities',
    quizzes: HOST + 'api/answer_v1/quizzes',
    bonus: HOST + 'api/answer_v1/activities', // /api/answer_v1/activities/{activity_id}/bonus
    rank: HOST + 'api/answer_v1/balances/ranking'
};


var handle = {
    getList: function (callback) {
        ajax.query({
            url: url.list,
            param: {}
        }, callback);
    },
    getQuestion: function (id, callback) {
        ajax.query({
            url: url.question + '/' + id
        }, callback);
    },
    postAnswer: function (param, callback) {
        ajax.post({
            url: url.quizzes,
            param: param
        }, callback);
    },
    getBonus: function (actId, callback) {
        ajax.query({
            url: url.bonus + '/' + actId + '/bonus',
            param: {}
        }, callback);
    },
    useCard: function () {

    },
    getRank:function (callback) {
        ajax.query({
            url: url.rank ,
            param: {}
        }, res=>{
            //todo 错误处理
            callback(res)
        });
    },
    getOnline : function( actId, callback ) {
        ajax.query({
            url: url.bonus + '/' + actId + '/onlines',
            param: {}
        }, callback);
    }

};
module.exports = handle;