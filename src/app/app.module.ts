import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatSliderModule } from '@angular/material/slider';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatInputModule } from '@angular/material/input';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    DialogComponent,
    QuizPageComponent,
    QuizResultComponent,
    FavoritesComponent,
    CommentsSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
    MatSliderModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [HttpClientModule, MatDialogModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
