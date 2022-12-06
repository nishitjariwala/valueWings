import * as ActionTypes from '../actionTypes';

export const getNews = (news) => ({
    type:ActionTypes.GET_NEWS,
    payload : news
})

export const getNewsFailed = (err) => ({
    type:ActionTypes.GET_NEWS_FAILED,
    payload : err
})

export const fetchNews = () => (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    
    fetch("https://value-wings.herokuapp.com/api/news/fetchCarNews", requestOptions)
    .then(response => response.json())
    .then(result => {dispatch(getNews(result))})
    .catch(error => {console.log('error', error);dispatch(getNewsFailed(error))});
}