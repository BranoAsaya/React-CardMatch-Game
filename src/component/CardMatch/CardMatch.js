import React, { Component } from "react";
import * as Styles from "./CardMatch.module.css";
export default class CardMatch extends Component {
  state = { cards: [], timer: 0, moves: 0, matchCard: false, isSame: false };
  array = [];
  GameStarted = false;
  clock;
  restartArray = [];
  cardBack = true;
  imgElement;

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  startGame = () => {
    if (this.cardBack) {
      const cardsArray = ["", "", "", "", "", "", "", ""];
      const cardObject = {
        img: "https://i.ibb.co/P1yFqzm/card-back.png",
        flipped: false,
      };
      const newArray = cardsArray.map((card) => (card = cardObject));
      this.setState({ cards: newArray });
      this.restartArray = [...newArray];
      this.array = newArray;
      this.GameStarted = true;
      this.timerHandler();
    } else {
      this.array = this.state.cards;
    }

    this.generateCards();
  };
  generateCards = () => {
    let id = 1;
    const AllCards = this.array.map((card, i) => {
      return (
        <div key={i} className={Styles.card}>
          <img
            className={Styles.imgCard}
            src={card.img}
            alt="card"
            onClick={(e) => this.flipCard(e, i)}
            name={i % 2 === 0 ? id : id++}
            hidden={card.flipped}
            ref={card=>this.imgElement = card}
          />
        </div>
      );
    });
    this.restartArray = [...AllCards];

    if (this.cardBack) {
      this.shuffleCards(AllCards);
      this.array = AllCards;
    }
    this.startDisabled = true;
  };

  flipCard = (e, i) => {
    const flipCardArr = [...this.state.cards];
    const card = e.target;
    let index = +card.name;
    const imgArray = [
      "https://i.ibb.co/R3Lrt4g/card1.png",
      "https://i.ibb.co/6FLtJkG/card2.png",
      "https://i.ibb.co/jWNvKv5/card3.png",
      "https://i.ibb.co/QfN6pvr/card4.png",
      "https://i.ibb.co/bm8g5nc/card5.png",
      "https://i.ibb.co/2nRKrVw/card6.png",
      "https://i.ibb.co/gjYRGDZ/card7.png",
      "https://i.ibb.co/Lrp79Tm/card8.png",
    ];
    let img = imgArray[index];
    this.setState({ matchCard: card.name });
    this.setState({ isSame: i });
    if (card.src === imgArray[index]) {
      card.src = "https://i.ibb.co/P1yFqzm/card-back.png";
      this.setState({ cards: flipCardArr });
      this.setState({ moves: this.state.moves + 1 });
    } else {
      card.src = img;
      this.setState({ cards: flipCardArr });
      this.setState({ moves: this.state.moves + 1 });
    }
    this.matchCardHandler(card, i);
  };
  shuffleCards(arr) {
    arr.sort(() => Math.random() - 0.5);
  }
  timerHandler = () => {
    this.clock = setInterval(
      () => this.setState({ timer: this.state.timer + 1 }),
      1000
    );
  };
  stopGame = () => {
    clearInterval(this.clock);
  };
  restartGame = () => {
    this.stopGame();
    this.setState({ timer: 0 });
    this.GameStarted = false;
    this.array = [];
    this.setState({ moves: 0 });
    this.setState({ matchCard: false });
  };
  matchCardHandler = (e, i) => {
    if (e.name === this.state.matchCard && i !== this.state.isSame) {
      console.log("match");
      e.hidden = true;
    } else {
      setTimeout(() => {
        e.src = "https://i.ibb.co/P1yFqzm/card-back.png";
      }, 1000);

      
    }
  };
  

  render() {
    return (
      <>
        <h1 className={Styles.heading}>Card Memory Match Game</h1>
        <button
          onClick={this.startGame}
          className={Styles.btn}
          disabled={this.GameStarted}
        >
          Play &#9972;;
        </button>
        <button onClick={this.restartGame} className={Styles.btn}>
          Restart
        </button>
        <h4> &#8987;Timer: {this.state.timer}</h4>
        <h4> &#9823;Moves: {this.state.moves}</h4>
        <article className={Styles.wrapper}>
          <section className={Styles.container}>{this.array}</section>
        </article>
      </>
    );
  }
}
