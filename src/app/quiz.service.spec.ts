import { TestBed } from '@angular/core/testing';
import { QuizCategory, QuizData, QuizDifficulty } from 'src/models/quiz.models';
import { CommentData } from 'src/models/comments.models';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and get questions amount', () => {
    service.addQuestionsAmount(10);
    expect(service.getQuestionsAmount()).toEqual(10);
  });

  it('should add and get difficulty', () => {
    service.addDifficulty(QuizDifficulty.Easy);
    expect(service.getDifficulty()).toEqual(QuizDifficulty.Easy);
  });

  it('should add max questions amount', () => {
    service.addQuestionsAmount(30);
    service.addMaxQuestionsAmount(20);
    expect(service.questionsAmount).toEqual(service.maxQuestionsAmount);
    expect(service.maxQuestionsAmount).toEqual(20);

    service.addQuestionsAmount(5);
    service.addMaxQuestionsAmount(10);
    expect(service.questionsAmount).toEqual(5);
    expect(service.maxQuestionsAmount).toEqual(10);
  });

  it('should add and get score', () => {
    service.addScore([0, 0, 1, 1, 0, 1]);
    expect(service.getScore()).toEqual([0, 0, 1, 1, 0, 1]);
  });

  it('should add and get quiz category', () => {
    service.addQuizCategory(QuizCategory.Code);
    expect(service.getQuizCategory()).toEqual(QuizCategory.Code);
  });

  it('should add, get and reset questions', () => {
    let question = [
      {
        id: 1,
        question: 'How to delete a directory in Linux?',
        description: 'delete folder',
        answers: {
          answer_a: 'ls',
          answer_b: 'delete',
          answer_c: 'remove',
          answer_d: 'rmdir',
          answer_e: null,
          answer_f: null,
        },
        multiple_correct_answers: 'false',
        correct_answers: {
          answer_a_correct: 'false',
          answer_b_correct: 'false',
          answer_c_correct: 'false',
          answer_d_correct: 'true',
          answer_e_correct: 'false',
          answer_f_correct: 'false',
        },
        explanation: 'rmdir deletes an empty directory',
        tip: null,
        tags: [],
        category: 'linux',
        difficulty: 'Easy',
      },
    ];
    service.addQuestions(question);
    expect(service.getQuestions()).toEqual(question);
    service.questionsReset();
    expect(service.questions).toEqual([]);
  });

  it('should add and get user answers', () => {
    let answersValues: any[] = [
      {
        a: false,
        b: false,
        c: false,
        d: true,
        e: false,
        f: false,
      },
    ];
    service.addUserAnswers(answersValues);
    expect(service.getUserAnswers()).toEqual(answersValues);
  });

  it('should add and get quiz data', () => {
    let quizData: QuizData[] = [
      {
        category: QuizCategory.Linux,
        imageUrl: '',
        favorite: false,
      },
      {
        category: QuizCategory.Code,
        imageUrl: '',
        favorite: false,
      },
    ];
    service.addQuizData(quizData);
    expect(service.getQuizData()).toEqual(quizData);
  });

  it('should add and get comments', () => {
    let commentData: CommentData[] = [
      {
        email: 'email1@email.com',
        comment: 'cool',
      },
      {
        email: 'email2@email.com',
        comment: 'love that quiz',
      },
    ];
    service.addComments(commentData, QuizCategory.Code);
    expect(service.getComments(QuizCategory.Code)).toEqual(commentData);
  });
});
