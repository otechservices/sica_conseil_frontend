import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { Subscription, timer } from 'rxjs';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
}

@Component({
  selector: 'app-pmp-test',
  templateUrl: './pmp-test.component.html',
})
export class PmpTestComponent implements OnInit, OnDestroy {
  domain: string = 'personnes';
  isMenuOpen = false;
  currentQuestion = 0;
  selectedAnswers: { [key: number]: number } = {};
  showResults = false;
  timeLeft = 55 * 60;
  isTestStarted = false;
  showExplanation = false;
  timerSubscription: Subscription | undefined;

  domainInfo: { [key: string]: any } = {
    personnes: { title: 'Personnes', color: 'bg-orange-500', icon: 'ri-team-line', description: 'Leadership, gestion d\'équipe, communication et développement des compétences' },
    processus: { title: 'Processus', color: 'bg-yellow-500', icon: 'ri-settings-line', description: 'Gestion du cycle de vie du projet, planification et contrôle' },
    environnement: { title: 'Environnement', color: 'bg-green-500', icon: 'ri-building-line', description: 'Contexte organisationnel, stratégie et conformité' }
  };

  questions: Question[] = [
    { id: 1, question: "Quelle est la principale responsabilité d'un chef de projet selon le PMI ?", options: ["Gérer les ressources techniques du projet", "Assurer la livraison du projet dans les délais, le budget et la qualité requis", "Superviser l'équipe de développement uniquement", "Rédiger tous les documents du projet"], correctAnswer: 1, explanation: "Selon le PMI, le chef de projet est responsable de la livraison du projet en respectant le triangle de la performance : délais, coût et qualité.", difficulty: 'Facile' },
    { id: 2, question: "Dans le cadre de la gestion des parties prenantes, quelle matrice est utilisée pour analyser leur influence et leur intérêt ?", options: ["Matrice des risques", "Matrice pouvoir/intérêt", "Matrice RACI", "Matrice de traçabilité"], correctAnswer: 1, explanation: "La matrice pouvoir/intérêt permet de cartographier les parties prenantes selon leur niveau d'influence (pouvoir) et leur degré d'intérêt pour le projet.", difficulty: 'Moyen' },
    { id: 3, question: "Quel processus permet d'identifier formellement qu'un projet ou une phase peut commencer ?", options: ["Élaborer la charte du projet", "Planifier la gestion du contenu", "Définir les activités", "Estimer les coûts"], correctAnswer: 0, explanation: "L'élaboration de la charte du projet est le processus qui autorise formellement l'existence du projet et donne au chef de projet l'autorité nécessaire.", difficulty: 'Moyen' },
    { id: 4, question: "Quelle technique est utilisée pour identifier les risques du projet ?", options: ["Analyse SWOT uniquement", "Brainstorming, entretiens, analyse documentaire", "Diagramme de Gantt", "Méthode du chemin critique"], correctAnswer: 1, explanation: "L'identification des risques utilise plusieurs techniques comme le brainstorming, les entretiens, l'analyse documentaire, l'analyse des hypothèses, etc.", difficulty: 'Facile' },
    { id: 5, question: "Dans la méthode du chemin critique, qu'est-ce que la marge libre ?", options: ["Le temps disponible avant que le projet soit en retard", "Le temps qu'une activité peut être retardée sans affecter la date de début au plus tôt de l'activité suivante", "La durée minimale du projet", "Le temps nécessaire pour terminer toutes les activités"], correctAnswer: 1, explanation: "La marge libre est le temps qu'une activité peut être retardée sans impacter le début au plus tôt de ses activités successeures.", difficulty: 'Difficile' }
  ];

  constructor(private route: ActivatedRoute, private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.domain = params['domain'] || 'personnes';
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimer() {
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.handleSubmitTest();
      }
    });
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  handleStartTest(): void {
    this.isTestStarted = true;
    this.currentQuestion = 0;
    this.selectedAnswers = {};
    this.showResults = false;
    this.timeLeft = 55 * 60;
    this.startTimer();
  }

  handleAnswerSelect(questionId: number, answerIndex: number): void {
    this.selectedAnswers[questionId] = answerIndex;
  }

  handleNextQuestion(): void {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.showExplanation = false;
    }
  }

  handlePreviousQuestion(): void {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.showExplanation = false;
    }
  }

  handleSubmitTest(): void {
    this.showResults = true;
    this.isTestStarted = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  calculateScore(): number {
    let correct = 0;
    this.questions.forEach(question => {
      if (this.selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / this.questions.length) * 100);
  }

  get currentDomainInfo() {
    return this.domainInfo[this.domain];
  }

  get currentQ() {
    return this.questions[this.currentQuestion];
  }

  get progress() {
    return ((this.currentQuestion + 1) / this.questions.length) * 100;
  }

  get correctAnswersCount() {
    return this.questions.filter(q => this.selectedAnswers[q.id] === q.correctAnswer).length;
  }

  get answeredQuestionsCount(): number {
    return Object.keys(this.selectedAnswers).length;
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }
}
