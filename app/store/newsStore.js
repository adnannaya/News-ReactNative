import { action, computed, makeObservable, observable } from "mobx";

class News{
    newsList = [];

    constructor(){
        makeObservable(this, {
            newsList: observable,
            markBookmark: action,
            unMarkBookmark: action,
            addNews: action,
            count: computed
        })
    }
    markBookmark(id){
        let newsIndex = this.newsList.findIndex((n) => n.id === id);
        if(newsIndex >= 0){
            this.newsList[newsIndex].is_bookmarked = false
            this.newsList = [...this.newsList];

            return this.newsList[newsIndex]
        }
        else{
            return null;
        }
    }

    unMarkBookmark(id){
        let newsIndex = this.newsList.findIndex((n) => n.id === id);
        if(newsIndex >= 0){
            this.newsList[newsIndex].is_bookmarked = true;
            this.newsList = [...this.newsList]
            return this.newsList[newsIndex]
        }
        else{
            return null;
        }
    }

    addNews(news){
        this.newsList = news;
    }
    get count(){
        return this.newsList.length;
    }
}

export const newsListStore = new News();