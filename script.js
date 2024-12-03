document.addEventListener("DOMContentLoaded", () => {

    const btnElement = document.querySelectorAll("button");
    const resultElement = document.getElementById("result");
    const userScoreElement = document.getElementById("user-score");
    const compScoreElement = document.getElementById("comp-score");
    const resetButton = document.getElementById("reset");
    const resultPageElement = document.querySelector(".result-page");
    const finalResultElement = document.querySelector(".final-result");
    const userChoiceContainer = document.getElementById("user-choice-icon");
    const compChoiceContainer = document.getElementById("comp-choice-icon");

    let userScore = 0;
    let compScore = 0;

    const choiceImages = {
        rock: "./images/rock.png",
        paper: "./images/paper.png",
        scissor: "./images/scissor.png"
    };

    btnElement.forEach((btn) => {
        btn.addEventListener("click", () => {
            resetButtonStyles();
            btn.style.backgroundColor = "#f0a500";

            const userSelection = btn.id;
            const compSelection = compChoice();

            userChoiceContainer.innerHTML = "";
            compChoiceContainer.innerHTML = "";

            const userImg = document.createElement("img");
            userImg.src = choiceImages[userSelection];
            userImg.alt = userSelection;
            userImg.width = 100;
            userImg.height = 100;
            userChoiceContainer.appendChild(userImg);

            const compImg = document.createElement("img");
            compImg.src = choiceImages[compSelection];
            compImg.alt = compSelection;
            compImg.width = 100;
            compImg.height = 100;
            compChoiceContainer.appendChild(compImg);

            const result = playRound(userSelection, compSelection);
            resultElement.textContent = result;

            const totalScore = userScore + compScore;


            if (totalScore >= 7) {
                resultPageElement.classList.add("show");
                finalResultElement.classList.add("show");
                if (userScore === compScore) {
                    finalResultElement.textContent = "It's a tie 👏";
                    finalResultElement.style.color = "black";
                } else if (userScore > compScore) {
                    finalResultElement.textContent = "You won 🎉";
                    finalResultElement.style.color = "green";
                } else {
                    finalResultElement.textContent = "You lose 😞";
                    finalResultElement.style.color = "red";
                }
            } else {
                resultPageElement.classList.remove("show");
                finalResultElement.classList.remove("show");
            }
        });
    });

    function compChoice() {
        const choices = ["rock", "paper", "scissor"];
        const randomChoice = Math.floor(Math.random() * choices.length);
        return choices[randomChoice];
    }

    function playRound(userSelection, compSelection) {
        if (userSelection === compSelection) {
            return "It's a tie 🤝";
        } else if (
            (userSelection === "rock" && compSelection === "scissor") ||
            (userSelection === "paper" && compSelection === "rock") ||
            (userSelection === "scissor" && compSelection === "paper")
        ) {
            userScore++;
            userScoreElement.textContent = userScore;
            return `You won! ${userSelection} beats ${compSelection} 👌`;
        } else {
            compScore++;
            compScoreElement.textContent = compScore;
            return `You lose! ${compSelection} beats ${userSelection} 😢`;
        }
    }

    resetButton.addEventListener("click", () => {
        userScore = 0;
        compScore = 0;
        userScoreElement.textContent = userScore;
        compScoreElement.textContent = compScore;
        resultElement.textContent = "Game Reset! Let's Play!";
        resultPageElement.classList.remove("show");
        finalResultElement.classList.remove("show");
        finalResultElement.textContent = "";
        userChoiceContainer.innerHTML = "";
        compChoiceContainer.innerHTML = "";
        resetButtonStyles();
    });

    function resetButtonStyles() {
        btnElement.forEach((btn) => {
            btn.style.backgroundColor = ""; // Reset background color
        });
    }
})