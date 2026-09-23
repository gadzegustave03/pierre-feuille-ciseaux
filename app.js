let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("scoreJoueur");
let scoreOrdinateur = document.getElementById("score-ordinateur");
let btnJoueur = document.querySelectorAll(".btn-joueur");
let opierreBtn = document.getElementById("opierre");
let opapierBtn = document.getElementById("opapier");
let ociseauxBtn = document.getElementById("ociseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

const PIERRE = "pierre";
const PAPIER = "papier";
const CISEAUX = "ciseaux";
const SCORE_MAX = 5;

const joueurManche = (e) => {
  let choix = e.target.closest(".btn-joueur");

  btnJoueur.forEach((btn) => {
    btn.classList.add("desactive");
    btn.removeEventListener("click", joueurManche);
  });

  choix.classList.remove("desactive");
  choix.classList.add("active");

  let choixJoueur = choix.id;
  let choixOrdinateur = faireChoixOrdinateur();

  verifierGagnant(choixJoueur, choixOrdinateur);

  if (verifierFinPartie()) {
    nextBtn.style.visibility = "hidden";
    return;
  }

  nextBtn.style.visibility = "visible";
};

const faireChoixOrdinateur = () => {
  let nbAleatoire = Math.floor(Math.random() * 3);

  switch (nbAleatoire) {
    case 0:
      opierreBtn.classList.add("active");
      return PIERRE;
    case 1:
      opapierBtn.classList.add("active");
      return PAPIER;
    default:
      ociseauxBtn.classList.add("active");
      return CISEAUX;
  }
};

const verifierGagnant = (choixJoueur, choixOrdinateur) => {
  if (choixJoueur === choixOrdinateur) {
    message.textContent = "Égalité !";
    return;
  }

  if (
    (choixJoueur === PIERRE && choixOrdinateur === CISEAUX) ||
    (choixJoueur === PAPIER && choixOrdinateur === PIERRE) ||
    (choixJoueur === CISEAUX && choixOrdinateur === PAPIER)
  ) {
    victoireJoueur();
  } else {
    victoireOrdinateur();
  }
};

const victoireOrdinateur = () => {
  message.textContent = "L'ordinateur gagne cette manche !";
  scoreOrdinateur.textContent = Number(scoreOrdinateur.textContent) + 1;
};

const victoireJoueur = () => {
  message.textContent = "Vous gagnez cette manche !";
  scoreJoueur.textContent = Number(scoreJoueur.textContent) + 1;
};

const verifierFinPartie = () => {
  if (Number(scoreJoueur.textContent) >= SCORE_MAX) {
    message.textContent = "Bravo ! Vous avez gagné la partie en 5 points !";
    return true;
  }

  if (Number(scoreOrdinateur.textContent) >= SCORE_MAX) {
    message.textContent = "L'ordinateur a gagné la partie. Réinitialisez pour rejouer !";
    return true;
  }

  return false;
};

const preparerNouvelleManche = () => {
  btnJoueur.forEach((btn) => {
    btn.classList.remove("desactive");
    btn.classList.remove("active");
    btn.addEventListener("click", joueurManche);
  });

  nextBtn.style.visibility = "hidden";
  opierreBtn.classList.remove("active");
  opapierBtn.classList.remove("active");
  ociseauxBtn.classList.remove("active");
  message.textContent = "À vous de jouer !";
};

nextBtn.addEventListener("click", preparerNouvelleManche);

btnJoueur.forEach((btn) => {
  btn.addEventListener("click", joueurManche);
});

resetBtn.addEventListener("click", () => {
  scoreJoueur.textContent = 0;
  scoreOrdinateur.textContent = 0;
  preparerNouvelleManche();
});
