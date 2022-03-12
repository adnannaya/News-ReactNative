import { action, computed, observable, observe } from "mobx";

class News{
    newsList = [];

    constructor(){
        observable(this, {
            newsList: observe,
            markBookmark: action,
            unMarkBookmark: action,
            addNews: action,
            count: computed
        })
    }
    markBookmark(id){
        let newsIndex = this.newsList.findIndex((n) => n.id === id);
        if(newsIndex >= 0){
            console.log("Record found for markBookmark")
            this.newsList[newsIndex].is_bookmarked = true
            this.newsList[newsIndex].title = "Adnan"
        }
    }

    unMarkBookmark(id){
        let newsIndex = this.newsList.findIndex((n) => n.id === id);
        if(newsIndex >= 0){
            console.log("Record found for unMarkBookmark")
            this.newsList[newsIndex].is_bookmarked = false
            this.newsList[newsIndex].title = "Fatema"
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