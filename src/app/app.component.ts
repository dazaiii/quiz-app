import { Component } from '@angular/core';
import { QuizCategory, QuizData } from 'src/models/quiz.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  quizData: QuizData[] = [
    {
      category: QuizCategory.Linux,
      imageUrl:
        'http://cdn.benchmark.pl/uploads/article/81951/MODERNICON/79c8174b200411f446931eb09ec041d332babfc9.jpg',
      favorite: false,
    },
    {
      category: QuizCategory.Code,
      imageUrl:
        'https://nofluffjobs.com/blog/wp-content/uploads/2017/01/pair-programming.png',
      favorite: false,
    },
    {
      category: QuizCategory.CMS,
      imageUrl:
        'https://www.grupa-tense.pl/wp-content/uploads/2021/03/cms_okladka-1.jpg',
      favorite: false,
    },
    {
      category: QuizCategory.SQL,
      imageUrl:
        'https://infoshareacademy.com/wp-content/uploads/2022/01/1920x1080-Wieczorowy-SQL-1.png',
      favorite: false,
    },
    {
      category: QuizCategory.Docker,
      imageUrl:
        'https://www.droptica.pl/sites/droptica.pl/files/styles/blog_banner_image/public/2018-08/docker_codeception-07.jpg?itok=gMKdUxDN',
      favorite: false,
    },
    {
      category: QuizCategory.DevOps,
      imageUrl:
        'https://www.bssolutions.pl/wp-content/uploads/2020/10/devops.png',
      favorite: false,
    },
    {
      category: QuizCategory.Random,
      imageUrl:
        'https://www.incimages.com/uploaded_files/image/1920x1080/getty_497254373_155996.jpg',
      favorite: false,
    },
  ];
}
