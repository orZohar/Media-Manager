import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Color } from 'ng2-charts';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
    chart;
    videosList = [];
    booksList = [];
    subscriptions: Subscription = new Subscription();
    public barChartLabels = [];
    public barChartLabels2 = [];
    public barChartType = 'bar';
    public barChartType2 = "bar"
    public barChartLegend = true;
    public barChartData = [];
    public barChartData2 = [];
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        title: "Media Added each day",
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    userCallback: function (label, index, labels) {
                        // when the floored value is the same as the value we have a whole number
                        if (Math.floor(label) === label) {
                            return label;
                        }
                    },
                }, defaultFontColor: 'blue',
                legend: {
                    defaultFontColor: 'blue',
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: 'black',
                        defaultFontColor: 'blue'
                        
                    }
                }   
                
            }],
        },
    };
    public barChartColor: Color[] = [
        { backgroundColor: '#66CDAA' },
      ]
      public barChartColor2: Color[] = [
        { backgroundColor: '#5F9EA0' },
      ]
    
    constructor(private mediaService: MediaService) { }

    ngOnInit() {
        var booksYearsArray = []
        var videosYearsArray = [];
        var booksObj = {};
        var videosObj = {};
        
        if (localStorage.getItem('users')) {
            var usersList = JSON.parse(localStorage.getItem("users"));
          }
          var user = usersList.find(user => user.userData.username === this.mediaService.user.userData.username);
    
        // get list of spesific media 
        this.videosList = user.videosList;
        this.booksList = user.booksList;  

        if (this.videosList && this.videosList.length > 0) {
            // get years list of spesific media 
            videosYearsArray = this.getAllMediaYears('videosList');
    
            videosYearsArray = videosYearsArray.sort();
            videosObj = this.prepareGraphValues(videosYearsArray, 'videosList');
            this.barChartData2 = [
                { data: Object.values(videosObj), label: 'Videos by year (last 25 years)' }
            ]
        }

        if (this.booksList && this.booksList.length > 0) {
            booksYearsArray = this.getAllMediaYears('booksList');
            // push unique years to axis and prepare object with xaxis values
            booksYearsArray = booksYearsArray.sort();
            booksObj = this.prepareGraphValues(booksYearsArray, 'booksList');
            // assign yaxis
            this.barChartData = [
                { data: Object.values(booksObj), label: 'Books by year (last 25 years)' },
            ];

        }
    }

    getMediaByType(mediaType) {
        if (localStorage.getItem(mediaType)) {
            return JSON.parse(localStorage.getItem(mediaType)) || [];
        }
    }

    getAllMediaYears(mediaType) {
        var yearsArray = [];
        if (mediaType === 'booksList')
            // take all medias between 1995 and 2020 and push them 
            this.booksList.forEach(element => {
                // if date exists and in the last 25 years 
                if (element.volumeInfo.publishedDate && parseInt(element.volumeInfo.publishedDate) > 1995 && parseInt(element.volumeInfo.publishedDate) < 2021) {
                    var year = parseInt(element.volumeInfo.publishedDate);
                    yearsArray.push(year)
                }
            });
        else {
            this.videosList.forEach(element => {
                // if date exists and in the last 25 years 
                if (element.snippet.publishedAt && parseInt(element.snippet.publishedAt) > 1995 && parseInt(element.snippet.publishedAt) < 2021) {
                    var year = parseInt(element.snippet.publishedAt);
                    yearsArray.push(year)
                }
            });
        }
        return yearsArray;
    }

    prepareGraphValues(mediaYearsArray, mediaType) {
        var obj = {};
        for (var i = 0; i < mediaYearsArray.length; i++) {
            if (!obj[mediaYearsArray[i]]) {
                obj[mediaYearsArray[i]] = 1;
                // push unique dates to Axis
                if (mediaType === 'booksList') {
                    this.barChartLabels.push(mediaYearsArray[i])
                } else {
                    this.barChartLabels2.push(mediaYearsArray[i])
                }
            } else {
                obj[mediaYearsArray[i]]++;
            }
        }
        return obj;
    }
}